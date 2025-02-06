import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { addEdge, Background, useNodesState, useEdgesState, ConnectionLineType, Controls } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateNodePosition, updateNodeProperties } from "../store/graphSlice";
import CustomNode from "./CustomeNode";
import UndoRedoControls from "./UndoRedoControls";
import ColorSelector from "./ColorSelector";
import FontSizeSelector from "./FontSizeSelector";
import { debounce } from "lodash";
import CustomEdge from "./CustomEdge";
import './GraphContainer.css';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.graph);

  const [localNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [localFontSize, setLocalFontSize] = useState<number>(14);
  const [localColor, setLocalColor] = useState<string>("#ffffff");

  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setLocalFontSize(node.data?.fontSize || 14);
    setLocalColor(node.data?.color || "#ffffff");
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "customEdge",
          animated: true,
          style: { stroke: "red" },
        },
        eds
      )
    );
  }, [setEdges]);

  const handleNodePositionChange = useCallback(
    debounce((id: string, position: { x: number; y: number }) => {
      dispatch(updateNodePosition({ id, position }));
    }, 300),
    [dispatch]
  );

  const handleColorChange = useCallback(
    debounce((color: string) => {
      if (selectedNode) {
        dispatch(updateNodeProperties({ id: selectedNode.id, color }));
        setLocalColor(color);
      }
    }, 300),
    [dispatch, selectedNode]
  );

  const handleFontSizeChange = (fontSize: number) => {
    if (selectedNode) {
      dispatch(updateNodeProperties({ id: selectedNode.id, fontSize }));
      setLocalFontSize(fontSize);
    }
  };

  return (
    <div className="graphContainer">
      <ReactFlow
        nodes={localNodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            selected: node.id === selectedNode?.id, // Add selected flag to node data
          },
        }))}
        edges={localEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDragStop={(event, node) =>
          handleNodePositionChange(node.id, node.position)
        }
        fitView
        attributionPosition="bottom-right"
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>

      <div className="nodeCustomizationPanel">
        <UndoRedoControls />

        <div className="selectionPanel">
          <div className="colorSelection">
            <span>Color:</span>{" "}
            {selectedNode ? (
              <ColorSelector color={localColor} onColorChange={handleColorChange} />
            ) : null}
          </div>
          <div className="textSelection">
            <span>Font: </span>
            {selectedNode ? (
              <FontSizeSelector fontSize={localFontSize} onFontSizeChange={handleFontSizeChange} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GraphContainer;
