const renderGraph = function(graph) {
  const { nodes, edges } = graph;

  const trafficDict = {
    "mafeesh amal": "#ed2c2c",
    za7ma: "#ff6f1c",
    lazeez: "#ffdc00",
    mashy: "#cefd4c",
    "7alawa": "#19ac25",
    unknown: "#000"
  };

  const sigmaNodes = nodes.map(node => ({
    id: node.label,
    label: node.label,
    x: Math.random(),
    y: Math.random(),
    color: "#000",
    size: 1
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
  }, 430);
  s.refresh();
};

export default { renderGraph };
