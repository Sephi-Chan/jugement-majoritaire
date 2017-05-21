import { reduce, each, sortBy, where, max, size, filter, map } from 'underscore'
import { RATINGS } from 'components/ratings'


function prepareTable(ratings) {
  const firstRating = Object.values(ratings)[0];
  return reduce(firstRating, function(memo, _rating, choice) {
    memo[choice] = reduce(RATINGS, function(memoo, value, _label) {
      memoo[value] = {
        size: 0,
        frequency: 0,
        cumulativeFrequency: 0
      };
      return memoo;
    }, { choice });
    return memo;
  }, {});
}


// Return the winning choice.
function selectWinner(table) {
  const sortedTable = sortBy(table, 'majorityRating').reverse();
  const winnerMention = sortedTable[0] ? sortedTable[0].majorityRating : null;
  const winnerRows = where(table, { majorityRating: winnerMention });

  if (winnerRows.length == 1) {
    return winnerRows[0].choice;
  }
  else { // Many choices with the best mention. Find the one having the winning mention with the highest cumulative frequency.
    const cumulativeFrequencies = map(winnerRows, (row) => row[winnerMention].cumulativeFrequency);
    const maxCumulativeFrequency = max(cumulativeFrequencies);
    const bisWinnerRows = filter(winnerRows, (row) => row[winnerMention].cumulativeFrequency == maxCumulativeFrequency);

    if (bisWinnerRows.length == 1) {
      return bisWinnerRows[0].choice;
    }
    else { // Many choices have the max cumulative frequency. Find the one with most votes over the winning mention.
      const cumulativeSizes = map(bisWinnerRows, (row) => row[winnerMention + 1].cumulativeSize);
      const maxCumulativeSize = max(cumulativeSizes);
      const terWinnerRows = filter(bisWinnerRows, (row) => row[winnerMention + 1].cumulativeSize == maxCumulativeSize);

      if (terWinnerRows.length == 1) {
        return terWinnerRows[0].choice;
      }
      else { // Fuck you.
        return null;
      }
    }
  }
}


export function buildStats(ratings) {
  const totalSize = size(ratings);
  const table = prepareTable(ratings);
  const firstRating = Object.values(ratings)[0];

  // Fill sizes and frequencies.
  each(ratings, function(rating, _voterId) {
    each(rating, function(value, choice) {
      table[choice][value].frequency = ++table[choice][value].size / totalSize;
    })
  });

  // Fill cumulative sizes and frequencies.
  each(firstRating, function(_rating, choice){
    each(RATINGS, function(value, _label) {
      const previousCumulativeFrequency = table[choice][value + 1] ? table[choice][value + 1].cumulativeFrequency : 0;
      table[choice][value].cumulativeFrequency = table[choice][value].frequency + previousCumulativeFrequency
      const previousCumulativeSize = table[choice][value + 1] ? table[choice][value + 1].cumulativeSize : 0;
      table[choice][value].cumulativeSize = table[choice][value].size + previousCumulativeSize
    });
  });

  each(table, function(stats, choice) {
    table[choice].majorityRating =
      table[choice][5].cumulativeFrequency > 50/100 ? 5 :
        table[choice][4].cumulativeFrequency > 50/100 ? 4 :
          table[choice][3].cumulativeFrequency > 50/100 ? 3 :
            table[choice][2].cumulativeFrequency > 50/100 ? 2 :
              1
  });

  table.winner = selectWinner(table);

  return table;
}
