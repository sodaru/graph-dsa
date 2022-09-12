import { useCases } from "./usecases";
import { bfs } from "../src/bfs";
import { Node } from "../src/types";

describe("test graph algo : bfs", () => {
  test.each(useCases)("%s", (name, nodes, expected) => {
    let result: Node[] | string;
    try {
      result = bfs(nodes);
    } catch (e) {
      result = e.message;
    }
    expect(result).toEqual(expected);
  });
});
