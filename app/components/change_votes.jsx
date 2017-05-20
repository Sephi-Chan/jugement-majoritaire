import React from 'react'
import { showVoterRatings, nextVoter, showResults } from 'components/actions'
import { map } from 'underscore'


function VotersList({ ratings, voterNames, dispatch }) {
  return (<table className="table table-striped table-bordered">
    <tbody>
      {map(ratings, function(rating, voterId) {
        const voterName = voterNames[voterId] || `Électeur #${voterId}`;
        return (<tr key={voterId}>
          <td style={{ verticalAlign: 'middle' }}>{voterName}</td>
          <td>
            <button className="btn btn-primary" onClick={() => dispatch(showVoterRatings(voterId))}>Modifier le vote</button>
            <button className="btn btn-danger pull-right">Supprimer le vote</button>
          </td>
        </tr>);
      })}
    </tbody>
  </table>);
}


export default function ChangeVotes(props) {
  return (<div className="container">
    <br />
    <div className="panel panel-default">
      <div className="panel-heading">Modifier les votes</div>
      <div className="panel-body">
        <VotersList ratings={props.ratings} voterNames={props.voterNames} dispatch={props.dispatch} />
      </div>
      <div className="panel-footer">
        <button className="btn btn-primary" onClick={() => props.dispatch(nextVoter())}>Ajouter un autre électeur</button>&nbsp;
        <button className="btn btn-success" onClick={() => props.dispatch(showResults())}>Retour aux résultats</button>
      </div>
    </div>
  </div>);
}
