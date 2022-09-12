import { map } from "./map";
import { CyclicError, Node, RepeatedNodesError } from "./types";

/**
 * Sorts the nodes in dfs order
 *
 * throws `CyclicError` if there is a cycle is detected in graph
 *
 * this function uses recursion and thus subjected to `RangeError: Maximum call stack size exceeded` error
 *
 * fails for missing vertices
 */
export const dfs = (nodes: Node[]): Node[] => {
  const nodeMap = map(nodes);
  if (Object.keys(nodeMap).length < nodes.length) {
    throw new RepeatedNodesError(nodes.map(node => node.name));
  }

  const visited: Record<string, boolean> = {};
  const completed: Record<string, boolean> = {};
  const dfsOrder: Node[] = [];

  const traverse = (node: Node, traversed: string[]): void => {
    if (completed[node.name]) {
      return;
    }

    if (visited[node.name]) {
      throw new CyclicError(node.name, traversed);
    }
    visited[node.name] = true;

    node.children.forEach(nodeName =>
      traverse(nodeMap[nodeName], [...traversed, node.name])
    );

    completed[node.name] = true;
    dfsOrder.push(node);
  };
  nodes.forEach(node => traverse(node, []));

  return dfsOrder;
};
