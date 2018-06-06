import helpers from "./helpers";
import TrafficAPI from "./bey2ollak-api";
import model from "./model";
import sigma from "./sigma-js";

const getTrafficInfo = function() {
  TrafficAPI.getTrafficInfo()
    .then(res => {
      const { graph } = model.setGraph(res);
      sigma.renderGraph(graph);
    })
    .catch(err => console.error(err));
};

helpers.$on(document, "DOMContentLoaded", getTrafficInfo);
