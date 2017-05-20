import { reduce, each, sortBy, where, max, map, size } from 'underscore'
import { RATINGS, RATING_BY_VALUE } from 'components/ratings'


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


function selectWinner(table) {
  const sortedTable = sortBy(table, 'majorityRating').reverse();
  const winnerRating = sortedTable[0] ? sortedTable[0].majorityRating : null;
  const winners = where(table, { majorityRating: winnerRating });
  return max(winners, (winner) => winner[winnerRating].cumulativeFrequency);
}


export function buildStats(ratings) {
  const totalSize = Object.keys(ratings).length
  const table = prepareTable(ratings);
  const firstRating = Object.values(ratings)[0];

  // Fill sizes and frequencies.
  each(ratings, function(rating, _voterId) {
    each(rating, function(value, choice) {
      table[choice][value].frequency = ++table[choice][value].size / totalSize;
    })
  });

  // Fill cumulative frequencies.
  each(firstRating, function(_rating, choice){
    each(RATINGS, function(value, _label) {
      const previousCumulativeFrequency = table[choice][value + 1] ? table[choice][value + 1].cumulativeFrequency : 0;
      table[choice][value].cumulativeFrequency = table[choice][value].frequency + previousCumulativeFrequency
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
