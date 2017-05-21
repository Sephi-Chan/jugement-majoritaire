import { ADD_CHOICE, REMOVE_CHOICE, START_VOTE, VOTE, NEXT_VOTER, SHOW_RESULTS, SHOW_VOTER_RATINGS, NAME_VOTER, SHOW_CHANGE_VOTES } from 'components/actions'
import { omit } from 'underscore'
// State shape:
// state = {
//   voterId: null,
//   nextVoterId:
//   choices = {
//     'Macron' => 'Macron',
//     'Fillon' => 'Fillon',
//     'Asselineau' => 'Asselineau',
//   },
//   ratings: {
//     1: { 'Macron': 3, 'Fillon': 1, 'Asselineau': 1 }
//     2: { 'Macron': 1, 'Fillon': 1, 'Asselineau': 6 }
//   },
//   names: {
//     1: "Sephi-Chan"
//   }
// }


const initialState = {
  page: 'choices',
  nextVoterId: 1,
  choices: {},
  ratings: {},
  names: {}
};


const callbacks = {
  [ADD_CHOICE]: function(state, action) {
    return { ...state,
      choices: { ...state.choices,
        [action.choice]: action.choice
      }
    };
  },

  [REMOVE_CHOICE]: function(state, action) {
    return { ...state,
      choices: omit(state.choices, action.choice)
    };
  },

  [START_VOTE]: function(state, action) {
    return { ...state,
      page: 'vote',
      voterId: state.nextVoterId,
      nextVoterId: state.nextVoterId + 1
    }
  },

  [VOTE]: function(state, action) {
    return { ...state,
      ratings: { ...state.ratings, [action.voterId]: action.vote },
      names: { ...state.names, [action.voterId]: action.name }
    }
  },

  [NEXT_VOTER]: function(state, action) {
    return { ...state,
      page: 'vote',
      voterId: state.nextVoterId,
      nextVoterId: state.nextVoterId + 1
    }
  },

  [SHOW_RESULTS]: function(state, action) {
    return { ...state,
      page: 'results'
    }
  },

  [SHOW_VOTER_RATINGS]: function(state, action) {
    return { ...state,
      page: 'vote',
      voterId: action.voterId
    }
  },

  [NAME_VOTER]: function(state, action) {
    return { ...state,
      names: { ...state.names,
        [action.voterId]: action.name
      }
    }
  },

  [SHOW_CHANGE_VOTES]: function(state, action) {
    return { ...state,
      page: 'change_votes'
    }
  }
}


export default function(state = initialState, action) {
  return callbacks[action.type] ? callbacks[action.type](state, action) : state;
}
