import { Node } from "../src/types";

// prettier-ignore
export const useCases: [
  string, // name
  Node[], // nodes
  Node[] | string, // expected nodes or error in bfs
  Node[] | string // expected nodes or error in dfs
][] = [
  ["Empty nodes", [], [], []],
  ["One node", [{name: "A", children: []}], [{name: "A", children: []}], [{name: "A", children: []}]],
  ["Two nodes", 
    [{name: "A", children: []}, {name: "B", children: []}], 
    [{name: "A", children: []}, {name: "B", children: []}], 
    [{name: "A", children: []}, {name: "B", children: []}]
  ],
  ["Repeated Node", 
    [{name: "A", children: []}, {name: "B", children: []}, {name: "A", children: []}], 
    'Repeated ( A, B, A )', 
    'Repeated ( A, B, A )', 
  ],
  ["medium sized graph",
    [{name: "A", children: ["B","C"]}, {name: "B", children: ["C","D"]}, {name: "C", children: ["D"]}, {name: "D", children: []}, {name: "E", children: ["C", "F"]}, {name: "F", children: []}],
    [{name: "A", children: ["B","C"]}, {name: "E", children: ["C", "F"]}, {name: "B", children: ["C","D"]}, {name: "F", children: []}, {name: "C", children: ["D"]}, {name: "D", children: []}, ],
    [{name: "D", children: []}, {name: "C", children: ["D"]}, {name: "B", children: ["C","D"]}, {name: "A", children: ["B","C"]}, {name: "F", children: []}, {name: "E", children: ["C", "F"]}],
  ],
  ["cyclic medium sized graph",
    [{name: "A", children: ["B","C"]}, {name: "B", children: ["C","D"]}, {name: "C", children: ["D"]}, {name: "D", children: ["E"]}, {name: "E", children: ["C", "F"]}, {name: "F", children: []}],
    "detected a cycle in ( C, D, E, F )",
    "C cyclically depends on itself. path : C -> D -> E -> C",
  ],
  ["medium sized forest", 
    [ 
      {name: "B", children: ["C", "E"]}, 
      {name: "E", children: []}, 
      {name: "C", children: ["D"]}, 
      {name: "D", children: []},
      {name: "A", children: ["B"]},
      {name: "P", children: ["Q", "R"]},
      {name: "Q", children: []},
      {name: "X", children: ["Y"]},
      {name: "Z", children: ["M"]},
      {name: "M", children: []},
      {name: "Y", children: ["Z"]},
      {name: "R", children: []}
    ], [ 
      {name: "A", children: ["B"]},
      {name: "P", children: ["Q", "R"]},
      {name: "X", children: ["Y"]},
      {name: "B", children: ["C", "E"]}, 
      {name: "Q", children: []},
      {name: "R", children: []},
      {name: "Y", children: ["Z"]},
      {name: "C", children: ["D"]}, 
      {name: "E", children: []}, 
      {name: "Z", children: ["M"]},
      {name: "D", children: []},
      {name: "M", children: []},
    ], [ 
      {name: "D", children: []},
      {name: "C", children: ["D"]}, 
      {name: "E", children: []}, 
      {name: "B", children: ["C", "E"]}, 
      {name: "A", children: ["B"]},
      {name: "Q", children: []},
      {name: "R", children: []},
      {name: "P", children: ["Q", "R"]},
      {name: "M", children: []},
      {name: "Z", children: ["M"]},
      {name: "Y", children: ["Z"]},
      {name: "X", children: ["Y"]},
    ]
  ]
];
