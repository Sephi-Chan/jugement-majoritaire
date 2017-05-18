import React from 'react'
import { showVoterRatings } from 'components/actions'
import { RankingsByChoice, buildStats } from 'components/ratings_analyzer'
import { map, pick } from 'underscore'


function WinnerName({ name, isWinner }) {
  if (isWinner) return (<strong>{name} Winner!!!</strong>);
  return (<span>{name}</span>);
}


function DetailsTable({ choice, stats, winner }) {
  return (<table className="table">
    <caption><WinnerName name={choice} isWinner={stats == winner} /></caption>
    <thead>
      <tr>
        <td></td>
        <td>Très bien</td>
        <td>Bien</td>
        <td>Assez bien</td>
        <td>Moyen</td>
        <td>À rejeter</td>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Effectif</td>
        <td>{stats[5].size}</td>
        <td>{stats[4].size}</td>
        <td>{stats[3].size}</td>
        <td>{stats[2].size}</td>
        <td>{stats[1].size}</td>
      </tr>

      <tr>
        <td>Fréquence</td>
        <td>{+(stats[5].frequency * 100).toFixed(2)}%</td>
        <td>{+(stats[4].frequency * 100).toFixed(2)}%</td>
        <td>{+(stats[3].frequency * 100).toFixed(2)}%</td>
        <td>{+(stats[2].frequency * 100).toFixed(2)}%</td>
        <td>{+(stats[1].frequency * 100).toFixed(2)}%</td>
      </tr>

      <tr>
        <td>Fréquence cumulée</td>
        <td>{+(stats[5].cumulativeFrequency * 100).toFixed(2)}%</td>
        <td>{+(stats[4].cumulativeFrequency * 100).toFixed(2)}%</td>
        <td>{+(stats[3].cumulativeFrequency * 100).toFixed(2)}%</td>
        <td>{+(stats[2].cumulativeFrequency * 100).toFixed(2)}%</td>
        <td>{+(stats[1].cumulativeFrequency * 100).toFixed(2)}%</td>
      </tr>
    </tbody>
  </table>);
}


function DetailsTables({ stats, choices }) {
  const choiceStats = pick(stats, Object.keys(choices));

  return (<div>
    {map(choiceStats, function(choiceStats, choice) {
      return (<DetailsTable key={choice} choice={choice} stats={choiceStats} winner={stats.winner} />);
    })}
  </div>);
}


function ChoiceBar({ stats }) {
  return (<div>
    <h2>{stats.choice} {stats.majorityRating}</h2>
    <div className="progress">
      <div className="progress-bar progress-bar-success" style={{ width: `${stats[5].frequency * 100}%` }}>
        <span className="sr-only">35% Complete (success)</span>
      </div>
      <div className="progress-bar progress-bar" style={{ width: `${stats[4].frequency * 100}%` }}>
        <span className="sr-only">20% Complete (warning)</span>
      </div>
      <div className="progress-bar progress-bar-info" style={{ width: `${stats[3].frequency * 100}%` }}>
        <span className="sr-only">20% Complete (warning)</span>
      </div>
      <div className="progress-bar progress-bar-warning" style={{ width: `${stats[2].frequency * 100}%` }}>
        <span className="sr-only">20% Complete (warning)</span>
      </div>
      <div className="progress-bar progress-bar-danger" style={{ width: `${stats[1].frequency * 100}%` }}>
        <span className="sr-only">10% Complete (danger)</span>
      </div>
    </div>
  </div>)
}


function SummaryGraphics({ stats, choices }) {
  const choiceStats = pick(stats, Object.keys(choices));

  return (<div>
    {map(choiceStats, function(choiceStats, choice) {
      return (<ChoiceBar key={choice} choice={choice} stats={choiceStats} winner={stats.winner} />);
    })}
  </div>);
}


export default function Results({ ratings, choices }) {
  const stats = buildStats(ratings);

  return (<div className="container">
    <h2>Résultats ({Object.keys(ratings).length} votants)</h2>

    <SummaryGraphics stats={stats} choices={choices} />

    <DetailsTables stats={stats} choices={choices} />
  </div>);
}
