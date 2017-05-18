import React from 'react'
import { connect } from 'react-redux'
import PrepareChoices from 'components/prepare_choices'
import RateChoices from 'components/rate_choices'
import Results from 'components/results'

function App(props) {
  if (props.screen == 'vote') {
    return <RateChoices {...props} />;
  }
  else if (props.screen == 'results') {
    return <Results {...props} />;
  }
  else {
    return <PrepareChoices {...props} />;
  }
}


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App)
