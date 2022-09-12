import { map } from "./map";
import { Node, PossibleCyclicError, RepeatedNodesError } from "./types";

/**
 * Sorts the nodes in bfs order
 *
 * throws `PossibleCyclicError` if there is a cycle is detected in graph
 *
 * this function uses kahn's algorithm, thus iterates the nodes multiple times
 *
 * does not fail for missing verticies
 */
export const bfs = (nodes: Node[]): Node[] => {
  const inDegree: Record<string, number> = Object.fromEntries(
    nodes.map(node => [node.name, 0])
  );
  if (Object.keys(inDegree).length < nodes.length) {
    throw new RepeatedNodesError(nodes.map(node => node.name));
  }

  const filterNodesByInDegree = (type: "zero" | "non-zero") => {
    return Object.keys(inDegree).filter(nodeName =>
      type == "zero" ? inDegree[nodeName] === 0 : inDegree[nodeName] !== 0
    );
  };

  nodes.forEach(node => {
    node.children.forEach(childName => {
      inDegree[childName]++;
    });
  });

  const queue: string[] = filterNodesByInDegree("zero");

  const nodeMap = map(nodes);

  const sortedNodes: Node[] = [];

  while (queue.length > 0) {
    const currentNodeName = queue.shift();
    sortedNodes.push(nodeMap[currentNodeName]);
    nodeMap[currentNodeName].children.forEach(childName => {
      inDegree[childName]--;
      if (inDegree[childName] === 0) {
        queue.push(childName);
      }
    });
  }

  if (sortedNodes.length != nodes.length) {
    throw new PossibleCyclicError(filterNodesByInDegree("non-zero"));
  }

  return sortedNodes;
};
