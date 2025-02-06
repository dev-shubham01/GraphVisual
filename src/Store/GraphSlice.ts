import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "../type";

// Utility function to find a node by ID
const findNodeById = (nodes: Node[], id: string): Node | undefined =>
  nodes.find((node) => node.id === id);

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  history: Array<{ type: string; id: string; prev: any; current: any }>;
  future: Array<{ type: string; id: string; prev: any; current: any }>;
  canUndo: boolean;
  canRedo: boolean;
}

const initialState: GraphState = {
  nodes: [
    { id: "1", position: { x: 450, y: 0 }, data: { label: "Node 1", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "2", position: { x: 120, y: 250 }, data: { label: "Node 2", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "3", position: { x: 850, y: 250 }, data: { label: "Node 3", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "4", position: { x: -50, y: 500 }, data: { label: "Node 4", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "5", position: { x: 250, y: 500 }, data: { label: "Node 5", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "6", position: { x: 100, y: 800 }, data: { label: "Node 6", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "7", position: { x: -200, y: 800 }, data: { label: "Node 7", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "8", position: { x: 700, y: 500 }, data: { label: "Node 8", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "9", position: { x: 1100, y: 500 }, data: { label: "Node 9", color: "#ffffff", fontSize: 14 }, type: "customNode" },
    { id: "10", position: { x: 1200, y: 800 }, data: { label: "Node 10", color: "#ffffff", fontSize: 14 }, type: "customNode" },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2", animated: true, type: "customEdge" },
    { id: "e1-3", source: "1", target: "3", animated: true, type: "customEdge" },
    { id: "e2-4", source: "2", target: "4", animated: true, type: "customEdge" },
    { id: "e2-5", source: "2", target: "5", animated: true, type: "customEdge" },
    { id: "e4-7", source: "4", target: "7", animated: true, type: "customEdge" },
    { id: "e5-6", source: "5", target: "6", animated: true, type: "customEdge" },
    { id: "e3-8", source: "3", target: "8", animated: true, type: "customEdge" },
    { id: "e3-9", source: "3", target: "9", animated: true, type: "customEdge" },
    { id: "e9-10", source: "9", target: "10", animated: true, type: "customEdge" },
  ],
  history: [],
  future: [],
  canUndo: false,
  canRedo: false,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      const node = findNodeById(state.nodes, id);

      if (!node || node.position.x === position.x && node.position.y === position.y) return; // Edge case: no change in position

      const prevPosition = { ...node.position };
      node.position = { ...position };

      // Log action for undo/redo
      state.history.push({
        type: "position",
        id,
        prev: prevPosition,
        current: { ...position },
      });

      state.future = []; // Clear future actions

      // Update undo/redo states
      state.canUndo = state.history.length > 0;
      state.canRedo = false; // No redo if action is done
    },

    updateNodeProperties: (
      state,
      action: PayloadAction<{ id: string; color?: string; fontSize?: number }>
    ) => {
      const { id, color, fontSize } = action.payload;
      const node = findNodeById(state.nodes, id);

      if (!node || (node.data.color === color && node.data.fontSize === fontSize)) return; // Edge case: no property change

      const prevState = { ...node.data };
      node.data = {
        ...node.data,
        ...(color && { color }),
        ...(fontSize && { fontSize }),
      };

      // Log action for undo/redo
      state.history.push({
        type: "properties",
        id,
        prev: prevState,
        current: { ...node.data },
      });

      state.future = []; // Clear future actions

      // Update undo/redo states
      state.canUndo = state.history.length > 0;
      state.canRedo = false; // No redo if action is done
    },

    undoAction: (state) => {
      const lastAction = state.history.pop();
      if (!lastAction) return;

      state.future.push(lastAction); // Move to future stack
      const node = findNodeById(state.nodes, lastAction.id);
      if (!node) return;

      if (lastAction.type === "position") {
        node.position = { ...lastAction.prev };
      } else if (lastAction.type === "properties") {
        node.data = { ...lastAction.prev };
      }

      // Update undo/redo states
      state.canUndo = state.history.length > 0;
      state.canRedo = state.future.length > 0;
    },

    redoAction: (state) => {
      const lastUndoneAction = state.future.pop();
      if (!lastUndoneAction) return;

      state.history.push(lastUndoneAction); // Move back to history
      const node = findNodeById(state.nodes, lastUndoneAction.id);
      if (!node) return;

      if (lastUndoneAction.type === "position") {
        node.position = { ...lastUndoneAction.current };
      } else if (lastUndoneAction.type === "properties") {
        node.data = { ...lastUndoneAction.current };
      }

      // Update undo/redo states
      state.canUndo = state.history.length > 0;
      state.canRedo = state.future.length > 0;
    },
  },
});

export const { updateNodePosition, updateNodeProperties, undoAction, redoAction } = graphSlice.actions;
export default graphSlice.reducer;
