export type Node = {
  name: string;
  children: string[];
};

export class CyclicError extends Error {
  private _nodeName: string;
  private _nodePaths: string[];

  constructor(nodeName: string, traversedPaths: string[]) {
    const nodePaths = traversedPaths.slice(traversedPaths.indexOf(nodeName));
    nodePaths.push(nodeName);

    super(
      `${nodeName} cyclically depends on itself. path : ${nodePaths.join(
        " -> "
      )}`
    );
    this._nodeName = nodeName;
    this._nodePaths = nodePaths;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get nodeName() {
    return this._nodeName;
  }

  get nodePaths() {
    return this._nodePaths;
  }
}

export class PossibleCyclicError extends Error {
  private _nodeNames: string[];

  constructor(nodeNames: string[]) {
    super(`detected a cycle in ( ${nodeNames.join(", ")} )`);
    this._nodeNames = nodeNames;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get nodeNames() {
    return this._nodeNames;
  }
}

export class RepeatedNodesError extends Error {
  private _nodeNames: string[];

  constructor(nodeNames: string[]) {
    super(`Repeated ( ${nodeNames.join(", ")} )`);
    this._nodeNames = nodeNames;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get nodeNames() {
    return this._nodeNames;
  }
}
