import React from 'react'
import { addChoice, removeChoice, startVote } from 'components/actions'
import { map, size } from 'underscore'


class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.dispatch(removeChoice(this.props.choice))
  }

  render() {
    return (<tr>
      <td style={{ verticalAlign: 'middle' }}>{this.props.choice}</td>
      <td><button className="btn btn-danger" onClick={this.handleClick}>Supprimer</button></td>
    </tr>);
  }
}


function ChoicesList({ choices, dispatch }) {
  return (<table className="table table-striped table-bordered">
    <tbody>
      {map(choices, function(choice){
        return (<Choice key={choice} {...{ choice, dispatch }}>{choice}</Choice>);
      })}
    </tbody>
  </table>);
}


export default class PrepareChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choice: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }


  handleChange(event) {
    this.setState({ choice: event.target.value });
  }


  handleStart(event) {
    this.props.dispatch(startVote());
  }


  handleSubmit(event) {
    event.preventDefault();
    this.choiceInput.focus();

    if(this.state.choice.trim() != '') {
      this.setState({ choice: '' });
      this.props.dispatch(addChoice(this.state.choice));
    }
  }


  componentDidMount() {
    this.choiceInput.focus();
  }


  render() {
    const enableStartButton = 1 < size(this.props.choices);

    return (<div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">Ajouter des choix</div>
        <div className="panel-body">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input className="form-control" value={this.state.choice} onChange={this.handleChange} ref={(el) => this.choiceInput = el} />
              <span className="input-group-btn">
                <button className="btn btn-primary">Ajouter ce choix</button>
              </span>
            </div>
          </form>

          <br />
          <ChoicesList {...this.props} />
        </div>
        <div className="panel-footer">
          <button className="btn btn-success" onClick={this.handleStart} disabled={!enableStartButton}>Commencer le vote</button>
        </div>
      </div>
    </div>);
  }
}
