import React from 'react'
import { showVoterRatings, nextVoter, changeVotes } from 'components/actions'
import { buildStats } from 'components/ratings_analyzer'
import { map, pick, size } from 'underscore'
import { COLORS_BY_RATING } from 'components/ratings'


function DetailsTable({ choice, stats, winner }) {
  return (<table className="table">
    <caption>{choice}</caption>
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
  return (<div className="progress" style={{ marginBottom: 0 }}>
    <div className="progress-bar" style={{ width: `${stats[5].frequency * 100}%`, background: COLORS_BY_RATING[5] }} />
    <div className="progress-bar" style={{ width: `${stats[4].frequency * 100}%`, background: COLORS_BY_RATING[4] }} />
    <div className="progress-bar" style={{ width: `${stats[3].frequency * 100}%`, background: COLORS_BY_RATING[3] }} />
    <div className="progress-bar" style={{ width: `${stats[2].frequency * 100}%`, background: COLORS_BY_RATING[2] }} />
    <div className="progress-bar" style={{ width: `${stats[1].frequency * 100}%`, background: COLORS_BY_RATING[1] }} />
  </div>)
}


function SummaryGraphics({ stats, choices }) {
  const choiceStats = pick(stats, Object.keys(choices));

  return (<div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', width: '2px', height: 'calc(100% + 10px)', marginTop: '-5px', background: 'green', left: '60%' }} />
    <table className="table table-bordered table-striped">
      <tbody>
        {map(choiceStats, function(choiceStats, choice) {
          return (<tr key={choice}>
            <td style={{ width: '20%' }}>{choice}</td>
            <td><ChoiceBar choice={choice} stats={choiceStats} winner={stats.winner} /></td>
          </tr>);
        })}
      </tbody>
    </table>
  </div>);
}


function VotersList({ ratings, voterNames, dispatch }) {
  return (<table className="table table-striped table-bordered">
    <tbody>
      {map(ratings, function(rating, voterId) {
        const voterName = voterNames[voterId] || `Électeur #${voterId}`;
        return (<tr key={voterId}>
          <td style={{ verticalAlign: 'middle' }}>{voterName}</td>
          <td>
            <button className="btn btn-success" onClick={() => dispatch(showVoterRatings(voterId))}>Modifier le vote</button>
            <button className="btn btn-danger pull-right">Supprimer le vote</button>
          </td>
        </tr>);
      })}
    </tbody>
  </table>);
}


export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
  }

  render() {
    const stats = buildStats(this.props.ratings);

    return (<div>
      <div className="container">
        <div className="page-header">
          <h1>
            {stats.winner.choice}
            <small> est vainqueur avec {size(this.props.ratings)} votants</small>
          </h1>
        </div>
      </div>

      <div className="container">
        <SummaryGraphics stats={stats} choices={this.props.choices} />

        <p>
          <button className="btn btn-primary" onClick={() => this.props.dispatch(nextVoter())}>Ajouter un autre électeur</button>&nbsp;
          <button className="btn btn-warning" onClick={() => this.props.dispatch(changeVotes())}>Modifier les votes</button>&nbsp;
          {this.state.showDetails
            ? <button className="btn btn-info" onClick={() => this.setState({ showDetails: false })}>Masquer le détail</button>
            : <button className="btn btn-info" onClick={() => this.setState({ showDetails: true })}>Afficher le détail</button>}
        </p>

        {this.state.showDetails && <DetailsTables stats={stats} choices={this.props.choices} />}
      </div>
      </div>);
  }
}
