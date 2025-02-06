import React from "react";
import { NodeProps, Handle, Position } from "react-flow-renderer";
import "./CustomNode.css";

const NodeCustomizationPanel: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="nodeCustomizatinPanel" style={{backgroundColor:data?.color}}>
      <span
        className="nodeLabel"
        style={{
          fontSize: data?.fontSize || 14,
          color: "#000000", 
        }}
      >
        {data?.label || "Custom Node"}
      </span>

      <Handle type="target" position={Position.Top} className="node-handle" />
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default NodeCustomizationPanel;
