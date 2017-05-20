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
      <td className="text-center"><input type="checkbox" value="5" checked={5 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="checkbox" value="4" checked={4 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="checkbox" value="3" checked={3 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="checkbox" value="2" checked={2 == this.props.rating} onChange={this.handleChange} /></td>
      <td className="text-center"><input type="checkbox" value="1" checked={1 == this.props.rating} onChange={this.handleChange} /></td>
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
    this.state = { name: '' }
  }


  handleChange(event) {
    this.setState({ name: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();

    if(this.state.name.trim() != '') {
      this.setState({ name: '' });
      this.props.dispatch(nameVoter(this.props.voterId, this.state.name));
    }
  }


  render() {
    const voterName = this.props.voterNames[this.props.voterId];
    const placeholder = voterName || `Optionnel : nom du votant ${this.props.voterId}…`;
    const submitLabel = voterName ? `Renommer le votant #${this.props.voterId}` : `Nommer le votant #${this.props.voterId}`;

    return (<form className="form-horizontal" onSubmit={this.handleSubmit}>
      <div className="input-group">
        <input className="form-control" value={this.state.name} onChange={this.handleChange} placeholder={placeholder} />
        <span className="input-group-btn">
          <button className="btn btn-primary">{submitLabel}</button>
        </span>
      </div>
    </form>);
  }
}


export default class RateChoices extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextVoterClick = this.handleNextVoterClick.bind(this);
  }


  handleNextVoterClick(event) {
    this.props.dispatch(nextVoter());
  }

  isRatingFull() {
    return size(this.props.ratings[this.props.voterId]) == size(this.props.choices);
  }


  render() {
    const voterName = this.props.voterNames[this.props.voterId];
    const showGoToResultsButton = 1 < size(this.props.ratings) && this.isRatingFull();

    return (<div className="container">
      <br />
      <div className="panel panel-default">
        <div className="panel-heading">Choix {voterName ? `de ${voterName}` : `du votant #${this.props.voterId}`}</div>
        <div className="panel-body">
          <NameVoterForm {...this.props} />
          <br />
          <ChoicesTable {...this.props} />
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary" disabled={!this.isRatingFull()} onClick={this.handleNextVoterClick}>Enregistrer les choix d'un autre électeur</button>
          {showGoToResultsButton && <button className="btn btn-success pull-right" onClick={() => this.props.dispatch(showResults())}>Voir les résultats</button>}
        </div>
      </div>
    </div>);
  }
}
