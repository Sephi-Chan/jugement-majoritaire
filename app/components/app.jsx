import React from 'react'
import { connect } from 'react-redux'
import PrepareChoices from 'components/prepare_choices'
import RateChoices from 'components/rate_choices'
import Results from 'components/results'
import ChangeVotes from 'components/change_votes'

function App(props) {
  switch (props.page) {
    case 'vote':
      return <RateChoices {...props} />;

    case 'results':
      return <Results {...props} />;

    case 'change_votes':
      return <ChangeVotes {...props} />;

    case 'choices':
      return (<div>
        <div className="jumbotron">
          <div className="container">
            <h1>Jugement majoritaire</h1>
            <p>Cet outil vous permet de prendre des décisions collectivement grâce au système de scrutin du <a href="">jugement majoritaire</a>. Il vous assure ainsi de convenir au plus grand nombre sans imposer de choix cornéliens aux votants.</p>
          </div>
        </div>

        <PrepareChoices {...props} />
      </div>);
  }
}


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App)
