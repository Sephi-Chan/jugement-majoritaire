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

  // In this case the winning mention is 3 and both Fillon and Macron have it.
  // They have the same cumulative frequency for this vote (80%).
  // Fillon has most votes in mentions 4 and 5 so he wins.
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


  // In this case the winning mention is 3 and both Fillon and Macron have it.
  // Fillon has 100% of cumulative frequency for mentions 3, 4 and 5 while Macron has only 80% so Fillon wins.
  // store.dispatch(addChoice('Macron'));
  // store.dispatch(addChoice('Fillon'));
  // store.dispatch(addChoice('Asselineau'));
  // store.dispatch(addChoice('Mélenchon'));
  // store.dispatch(startVote());
  // store.dispatch(vote(1, { Macron: 2, Fillon: 3, Asselineau: 5, Mélenchon: 4 }, 'Corwin'));
  // store.dispatch(vote(2, { Macron: 3, Fillon: 3, Asselineau: 1, Mélenchon: 1 }, 'Mandor'));
  // store.dispatch(vote(3, { Macron: 3, Fillon: 3, Asselineau: 2, Mélenchon: 5 }, 'Random'));
  // store.dispatch(vote(4, { Macron: 3, Fillon: 3, Asselineau: 1, Mélenchon: 1 }));
  // store.dispatch(vote(5, { Macron: 3, Fillon: 3, Asselineau: 1, Mélenchon: 1 }));
  // store.dispatch(nextVoter());
  // store.dispatch(showResults());


  // In this case the winning mention is 3 and both Fillon and Macron have it.
  // They have the same cumulative frequency for this vote (0.8).
  // They have the same number of votes over mention 4 and 5 so nobody win.
  // store.dispatch(addChoice('Macron'));
  // store.dispatch(addChoice('Fillon'));
  // store.dispatch(addChoice('Asselineau'));
  // store.dispatch(addChoice('Mélenchon'));
  // store.dispatch(startVote());
  // store.dispatch(vote(1, { Macron: 3, Fillon: 4, Asselineau: 1, Mélenchon: 1 }));
  // store.dispatch(vote(2, { Macron: 4, Fillon: 3, Asselineau: 1, Mélenchon: 2 }));
  // store.dispatch(vote(3, { Macron: 3, Fillon: 3, Asselineau: 4, Mélenchon: 3 }));
  // store.dispatch(nextVoter());
  // store.dispatch(showResults());


  // Test case to chose a victor in case of tie (A should win).
  // store.dispatch(addChoice('A'));
  // store.dispatch(addChoice('B'));
  // store.dispatch(startVote());
  // store.dispatch(vote(1, { A: 1, B: 1 }));
  // store.dispatch(vote(2, { A: 2, B: 2 }));
  // store.dispatch(vote(3, { A: 3, B: 3 }));
  // store.dispatch(vote(4, { A: 3, B: 3 }));
  // store.dispatch(vote(5, { A: 3, B: 3 }));
  // store.dispatch(vote(6, { A: 3, B: 3 }));
  // store.dispatch(vote(7, { A: 4, B: 4 }));
  // store.dispatch(vote(8, { A: 5, B: 5 }));
  // store.dispatch(vote(9, { A: 1, B: 2 }));
  // store.dispatch(vote(10, { A: 5, B: 4 }));
  // store.dispatch(nextVoter());
  // store.dispatch(showResults());

  render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
  );
});
