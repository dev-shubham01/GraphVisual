import React from "react";

interface ColorSelectorProps {
  color: string;
  onColorChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onColorChange }) => {
  return (
  
      <input
      className="colorInputBox"
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
 
  );
};

export default ColorSelector;
