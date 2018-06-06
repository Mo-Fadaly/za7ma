import helpers from "./helpers";
import X2JS from "./xml2json";

function parseXMLToJSON(data) {
  const x2js = new X2JS();
  const JSONObj = x2js.xml_str2json(data);
  return JSONObj;
}

function parseResponse(resp) {
  const { rd } = resp.en;
  const nodes = [];
  const edges = [];

  rd.forEach((obj, i) => {
    const { nm, mn, hr } = obj;
    const roadRegex = nm.match(/(.)+;/);
    const sourceRegex = nm.match(/;(.)+To/);
    const targetRegex = nm.match(/To(.)+/);

    const isNull = sourceRegex === null || targetRegex === null || roadRegex === null;

    if (isNull) {
      return;
    }

    const source = sourceRegex[0]
      .replace(/;/, "")
      .replace(/To/, "")
      .trim();

    if (source === "") {
      return;
    }

    let traffic;
    let time;

    if (obj.stnm) {
      traffic = obj.stnm;
    } else {
      traffic = "unknown";
    }

    if (hr === "0") {
      time = `${mn} mins`;
    } else {
      time = `${hr} hrs ${mn} mins`;
    }

    const road = roadRegex[0].replace(/;/, "");

    const target = targetRegex[0].replace(/To/, "").trim();

    const node = {
      label: target
    };

    const node1 = {
      label: source
    };

    const edge = {
      source,
      target,
      road,
      traffic,
      time,
      id: `e${i}`
    };

    function containsNode(n, arr) {
      return arr.some(el => el.label === n.label);
    }

    if (!containsNode(node, nodes)) {
      nodes.push(node);
    }

    if (!containsNode(node1, nodes)) {
      nodes.push(node1);
    }

    edges.push(edge);
  });

  const graph = {
    nodes,
    edges
  };

  return graph;
}

const getTrafficInfo = function() {
  const url =
    "https://www.bey2ollak.com/Bey2ollak/Traffic?action=getTraffic&ver=1.0&w=320&h=240&deviceType=0&lang=1&protocol=1&city=0&lang=1";

  return helpers
    .getXML(url)
    .then(res => parseXMLToJSON(res))
    .then(resp => parseResponse(resp));
};

export default { getTrafficInfo };
