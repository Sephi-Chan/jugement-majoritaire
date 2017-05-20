export const ADD_CHOICE = 'ADD_CHOICE';
export const REMOVE_CHOICE = 'REMOVE_CHOICE';
export const START_VOTE = 'START_VOTE';
export const RATE_CHOICE = 'RATE_CHOICE';
export const NEXT_VOTER = 'NEXT_VOTER';
export const SHOW_RESULTS = 'SHOW_RESULTS';
export const SHOW_VOTER_RATINGS = 'SHOW_VOTER_RATINGS';
export const NAME_VOTER = 'NAME_VOTER';
export const SHOW_CHANGE_VOTES = 'SHOW_CHANGE_VOTES';

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

export function rateChoice(voterId, choice, rating) {
  return { type: RATE_CHOICE, voterId, choice, rating };
}

export function showResults() {
  return { type: SHOW_RESULTS };
}

export function showVoterRatings(voterId) {
  return { type: SHOW_VOTER_RATINGS, voterId };
}

export function endVote() {
  return { type: END_VOTE };
}

export function nameVoter(voterId, name) {
  return { type: NAME_VOTER, voterId, name };
}

export function changeVotes() {
  return { type: SHOW_CHANGE_VOTES };
}
