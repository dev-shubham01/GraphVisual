// src/types.ts
export interface Node {
    id: string;
    position: { x: number; y: number };
    data: {
      label: string;
      color: string;
      fontSize: number;
    };
    type:string;
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    type:String;
    animated:boolean;
  }
  
  export interface State {
    nodes: Node[];
    edges: Edge[];
  }