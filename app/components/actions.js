export const ADD_CHOICE = 'ADD_CHOICE';
export const REMOVE_CHOICE = 'REMOVE_CHOICE';
export const START_VOTE = 'START_VOTE';
export const VOTE = 'VOTE';
export const NEXT_VOTER = 'NEXT_VOTER';
export const SHOW_RESULTS = 'SHOW_RESULTS';
export const SHOW_VOTER_RATINGS = 'SHOW_VOTER_RATINGS';
export const SHOW_CHANGE_VOTES = 'SHOW_CHANGE_VOTES';
export const START_OVER = 'START_OVER';
export const REMOVE_VOTE = 'REMOVE_VOTE';


export function addChoice(choice) {
  return { type: ADD_CHOICE, choice };
}

export function removeChoice(choice) {
  return { type: REMOVE_CHOICE, choice };
}

export function startVote() {
  return { type: START_VOTE };
}

export function nextVoter() {
  return { type: NEXT_VOTER };
}

export function vote(voterId, vote, name) {
  return { type: VOTE, voterId, vote, name };
}

export function showResults() {
  return { type: SHOW_RESULTS };
}

export function showVoterRatings(voterId) {
  return { type: SHOW_VOTER_RATINGS, voterId: parseInt(voterId) };
}

export function endVote() {
  return { type: END_VOTE };
}

export function changeVotes() {
  return { type: SHOW_CHANGE_VOTES };
}

export function startOver() {
  return { type: START_OVER };
}

export function removeVote(voterId) {
  return { type: REMOVE_VOTE, voterId: parseInt(voterId) };
}
