export const map = <T extends { name: string }>(
  nodes: T[]
): Record<string, T> => {
  const _map = Object.fromEntries(nodes.map(node => [node.name, node]));
  return _map;
};
