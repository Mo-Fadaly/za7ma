let state = {};

const resetState = function() {
  state = {};
};

const setGraph = function(data) {
  resetState();
  state.graph = data;
  return state;
};

export default { state, setGraph };
