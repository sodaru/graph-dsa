import { useCases } from "./usecases";
import { dfs } from "../src/dfs";
import { Node } from "../src/types";

describe("test graph algo : dfs", () => {
  test.each(useCases)("%s", (name, nodes, bfsExpected, expected) => {
    let result: Node[] | string;
    try {
      result = dfs(nodes);
    } catch (e) {
      result = e.message;
    }
    expect(result).toEqual(expected);
  });
});
