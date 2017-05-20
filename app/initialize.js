import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from 'components/app'
import reducer from 'components/reducer'
import { addChoice, removeChoice, startVote, rateChoice, showResults, nextVoter, nameVoter } from 'components/actions'

document.addEventListener('DOMContentLoaded', function() {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(reducer, devtools);

  // store.dispatch(addChoice('Macron'));
  // store.dispatch(addChoice('Fillon'));
  // store.dispatch(addChoice('Asselineau'));
  // store.dispatch(addChoice('Mélenchon'));
  //
  // store.dispatch(startVote());
  //
  // store.dispatch(rateChoice(1, 'Macron', 3));
  // store.dispatch(rateChoice(1, 'Fillon', 1));
  // store.dispatch(rateChoice(1, 'Asselineau', 5));
  // store.dispatch(nameVoter(1, 'Sephi-Chan'));
  // store.dispatch(rateChoice(1, 'Mélenchon', 3));
  // store.dispatch(nextVoter());
  //
  // store.dispatch(rateChoice(2, 'Macron', 2));
  // store.dispatch(rateChoice(2, 'Fillon', 4));
  // store.dispatch(rateChoice(2, 'Asselineau', 2));
  // store.dispatch(rateChoice(2, 'Mélenchon', 1));
  //
  // store.dispatch(rateChoice(3, 'Macron', 5));
  // store.dispatch(rateChoice(3, 'Fillon', 4));
  // store.dispatch(rateChoice(3, 'Asselineau', 2));
  // store.dispatch(rateChoice(3, 'Mélenchon', 4));
  //
  // store.dispatch(rateChoice(4, 'Macron', 4));
  // store.dispatch(rateChoice(4, 'Fillon', 4));
  // store.dispatch(rateChoice(4, 'Asselineau', 5));
  // store.dispatch(rateChoice(4, 'Mélenchon', 1));
  //
  // store.dispatch(rateChoice(5, 'Macron', 1));
  // store.dispatch(rateChoice(5, 'Fillon', 4));
  // store.dispatch(rateChoice(5, 'Asselineau', 4));
  // store.dispatch(rateChoice(5, 'Mélenchon', 2));
  //
  // store.dispatch(showResults());

  render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
  );
});
