import React from "react";
import { NodeProps, Handle, Position } from "react-flow-renderer";
import "./CustomNode.css";

const CustomNode: React.FC<NodeProps & { selected: boolean }> = ({ id, data, selected }) => {
  return (
    <div
      className={`nodeCustomizatinPanel ${selected ? "selectedNode" : ""}`}
      style={{ backgroundColor: data?.color }}
    >
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
export default CustomNode;