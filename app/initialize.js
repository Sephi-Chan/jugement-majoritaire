import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from 'components/app'
import reducer from 'components/reducer'
import { addChoice, removeChoice, startVote, vote, showResults, nextVoter } from 'components/actions'

document.addEventListener('DOMContentLoaded', function() {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(reducer, devtools);

  // store.dispatch(addChoice('Macron'));
  // store.dispatch(addChoice('Fillon'));
  // store.dispatch(addChoice('Asselineau'));
  // store.dispatch(addChoice('Mélenchon'));
  // store.dispatch(startVote());
  // store.dispatch(vote(1, { Macron: 1, Fillon: 2, Asselineau: 5, Mélenchon: 4 }, 'Corwin'));
  // store.dispatch(vote(2, { Macron: 3, Fillon: 4, Asselineau: 1, Mélenchon: 1 }, 'Mandor'));
  // store.dispatch(vote(3, { Macron: 3, Fillon: 3, Asselineau: 2, Mélenchon: 5 }, 'Random'));
  // store.dispatch(vote(4, { Macron: 3, Fillon: 3, Asselineau: 1, Mélenchon: 1 }));
  // store.dispatch(vote(5, { Macron: 3, Fillon: 5, Asselineau: 1, Mélenchon: 1 }));
  // store.dispatch(nextVoter());
  // store.dispatch(showResults());

  render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
  );
});
