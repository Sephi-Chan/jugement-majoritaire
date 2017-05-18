import React from 'react'
import { rateChoice, nextVoter, showResults } from 'components/actions'
import { RATINGS } from 'components/ratings'
import { map } from 'underscore'


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
      <td><input type="checkbox" value="5" checked={5 == this.props.rating} onChange={this.handleChange} /></td>
      <td><input type="checkbox" value="4" checked={4 == this.props.rating} onChange={this.handleChange} /></td>
      <td><input type="checkbox" value="3" checked={3 == this.props.rating} onChange={this.handleChange} /></td>
      <td><input type="checkbox" value="2" checked={2 == this.props.rating} onChange={this.handleChange} /></td>
      <td><input type="checkbox" value="1" checked={1 == this.props.rating} onChange={this.handleChange} /></td>
    </tr>);
  }
}


function ChoicesTable({ voterId, choices, ratings, dispatch }) {
  return (<table>
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
      {map(choices, function(choice){
        const choiceRating = ratings[voterId] ? ratings[voterId][choice] : undefined
        return (<Choice key={choice} rating={choiceRating}  {...{ voterId, choice, dispatch }}>{choice}</Choice>);
      })}
    </tbody>
  </table>);
}



export default function RateChoices(props) {
  return (<div>
    <h2>Choix du votant #{props.voterId}</h2>

    <ChoicesTable {...props} />

    <div>
      <button onClick={() => props.dispatch(nextVoter())}>Enregistrer un autre électeur</button>
      <button onClick={() => props.dispatch(showResults())}>Voir les résultats</button>
    </div>
  </div>);
}
