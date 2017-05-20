import React from 'react'
import { rateChoice, nextVoter, showResults, nameVoter } from 'components/actions'
import { COLORS_BY_RATING } from 'components/ratings'
import { map, size } from 'underscore'


class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.props.dispatch(rateChoice(this.props.voterId, this.props.choice, parseInt(event.target.value)))
  }


  render() {
    return (<tr>
      <td>{this.props.choice}</td>
      <td className="text-center"><input type="radio" value="5" checked={5 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="4" checked={4 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="3" checked={3 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="2" checked={2 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="1" checked={1 == this.props.rating} onChange={this.handleChange} /></td>
    </tr>);
  }
}


function ChoicesTable({ voterId, choices, ratings, dispatch }) {
  return (<table className="table table-striped table-bordered">
    <tbody>
      <tr>
        <th></th>
        <th className="text-center">Très bien</th>
        <th className="text-center">Bien</th>
        <th className="text-center">Assez bien</th>
        <th className="text-center">Moyen</th>
        <th className="text-center">À rejeter</th>
      </tr>

      <tr>
        <th></th>
        <th className="text-center" style={{ height: '10px', background: COLORS_BY_RATING[5] }}></th>
        <th className="text-center" style={{ height: '10px', background: COLORS_BY_RATING[4] }}></th>
        <th className="text-center" style={{ height: '10px', background: COLORS_BY_RATING[3] }}></th>
        <th className="text-center" style={{ height: '10px', background: COLORS_BY_RATING[2] }}></th>
        <th className="text-center" style={{ height: '10px', background: COLORS_BY_RATING[1] }}></th>
      </tr>

      {map(choices, function(choice){
        const choiceRating = ratings[voterId] ? ratings[voterId][choice] : undefined
        return (<Choice key={choice} rating={choiceRating}  {...{ voterId, choice, dispatch }}>{choice}</Choice>);
      })}
    </tbody>
  </table>);
}


class NameVoterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { name: props.voterNames[props.voterId] || '' }
  }


  handleChange(event) {
    const name = event.target.value.trim();
    this.setState({ name: name });
    this.props.dispatch(nameVoter(this.props.voterId, name == '' ? undefined : name));
  }


  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    return (<form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label htmlFor="voter_name">Nom (optionnel)</label>
        <input id='voter_name' className="form-control" value={this.state.name} onChange={this.handleChange} placeholder={`Électeur #${this.props.voterId}…`} />
      </div>
    </form>);
  }
}


export default function RateChoices(props) {
  const isRatingFull = size(props.ratings[props.voterId]) == size(props.choices);
  const isRatingBlank = size(props.ratings[props.voterId]) == 0;
  const voterName = props.voterNames[props.voterId];
  const someoneAlreadyVoted = 0 < size(props.ratings);

  // Next voter button is disabled by default. It is enabled when:
  // The user filled a redio button for every choice.
  const enableNextVoterButton = isRatingFull;


  // Both buttons always disabled if the user is filling a vote.


  return (<div className="container">
    <br />
    <div className="panel panel-default">
      <div className="panel-heading">Choix {voterName ? `de ${voterName}` : `de l'électeur #${props.voterId}`}</div>
      <div className="panel-body">
        <NameVoterForm {...props} />
        <br />
        <ChoicesTable {...props} />
      </div>
      <div className="panel-footer">
        <button className="btn btn-primary" onClick={() => props.dispatch(nextVoter())}>Enregistrer et ajouter un autre électeur</button>&nbsp;
        <button className="btn btn-success" onClick={() => props.dispatch(showResults())}>Enregistrer et voir les résultats</button>
      </div>
    </div>
  </div>);
}
