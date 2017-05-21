import React from 'react'
import { vote, nextVoter, showResults } from 'components/actions'
import { COLORS_BY_RATING } from 'components/ratings'
import { map, size } from 'underscore'


class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.props.handleRadioChange(this.props.choice, parseInt(event.target.value));
  }


  render() {
    return (<tr>
      <td>{this.props.choice}</td>
      <td className="text-center"><input type="radio" value="5" checked={5 == this.props.value} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="4" checked={4 == this.props.value} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="3" checked={3 == this.props.value} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="2" checked={2 == this.props.value} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="radio" value="1" checked={1 == this.props.value} onChange={this.handleChange} /></td>
    </tr>);
  }
}


function ChoicesTable({ choices, handleRadioChange, vote }) {
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
        return (<Choice key={choice} choice={choice} value={vote[choice]} handleRadioChange={handleRadioChange} />);
      })}
    </tbody>
  </table>);
}


function NameVoterInput({ name, voterId, handleNameChange }) {
  return (<div>
    <div className="form-group">
      <label htmlFor="voter_name">Nom (optionnel)</label>
      <input id='voter_name' className="form-control" value={name} onChange={handleNameChange} placeholder={`Électeur #${voterId}…`} />
    </div>
  </div>);
}


export default class RateChoices extends React.Component {
  constructor(props) {
    super(props);
    this.saveRating = this.saveRating.bind(this);
    this.showResults = this.showResults.bind(this);
    this.nextVoter = this.nextVoter.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.state = {
      name: props.names[props.voterId] || '',
      rating: props.ratings[props.voterId] || {}
    };
  }


  handleNameChange(event) {
    this.setState({ name: event.target.value.trim() });
  }


  handleRadioChange(choice, value) {
    this.setState(function(previousState) {
      return { rating: { ...previousState.rating, [choice]: value } };
    });
  }


  saveRating() {
    this.props.dispatch(vote(this.props.voterId, this.state.rating, this.state.name ? this.state.name : undefined));
  }


  showResults() {
    this.props.dispatch(showResults());
    this.setState({ name: '', rating: {} });
  }


  nextVoter() {
    this.props.dispatch(nextVoter());
    this.setState({ name: '', rating: {} });
  }


  render() {
    const isRatingFull = size(this.state.rating) == size(this.props.choices);

    return (<div className="container">
      <br />
      <div className="panel panel-default">
        <div className="panel-heading">
          Choix de l'électeur
          {this.state.name && ` : ${this.state.name}`}
        </div>
        <div className="panel-body">
          <NameVoterInput name={this.state.name} voterId= {this.props.voterId} handleNameChange={this.handleNameChange} />
          <br />
          <ChoicesTable choices={this.props.choices} handleRadioChange={this.handleRadioChange} vote={this.state.rating} />
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary" disabled={!isRatingFull} onClick={this.saveRating}>Enregistrer le vote</button>&nbsp;
          <button className="btn btn-default" onClick={this.nextVoter}>Ajouter un autre électeur</button>&nbsp;
          <button className="btn btn-success" onClick={this.showResults}>Afficher les résultats</button>
        </div>
      </div>
    </div>);
  }
}
