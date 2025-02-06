
import React from "react";
import { EdgeProps, Handle, Position } from "react-flow-renderer";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}) => {
 
  const path = `M${sourceX},${sourceY} C${sourceX},${(sourceY + targetY) / 2} ${targetX},${(sourceY + targetY) / 2} ${targetX},${targetY}`;


  return (
    <g>
      <path
        id={id}
        className="custom-edge"
        d={path}
        style={{ ...style, fill: "transparent", stroke: "#FF5733", strokeWidth: 4 }} 
      />
      <Handle type="source" position={Position.Left} id="source" style={{ background: "#FF5733" }} />
      <Handle type="target" position={Position.Right} id="target" style={{ background: "#FF5733" }} />
    </g>
  );
};

export default CustomEdge;

