const renderGraph = function(graph) {
  const { nodes, edges } = graph;

  const trafficDict = {
    "mafeesh amal": "#ff4136",
    za7ma: "#ff851b",
    lazeez: "#39cccc",
    mashy: "#ffdc00",
    "7alawa": "#2ecc40",
    unknown: "#aaa"
  };

  const sigmaNodes = nodes.map(node => ({
    id: node.label,
    label: node.label,
    x: Math.random(),
    y: Math.random(),
    color: "#0074d9",
    size: 0
  }));

  const sigmaEdges = edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    color: trafficDict[`${edge.traffic}`],
    x: Math.random(),
    y: Math.random()
  }));

  const sigmaGraph = {
    nodes: sigmaNodes,
    edges: sigmaEdges
  };

  const s = new sigma({
    graph: sigmaGraph,
    renderer: {
      container: "sigma"
    }
  });

  s.startForceAtlas2();
  setTimeout(() => {
    s.killForceAtlas2();
  }, 1000);
  s.refresh();
};

export default { renderGraph };
