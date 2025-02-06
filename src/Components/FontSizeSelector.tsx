import React from "react";


interface FontSizeSelectorProps {
  fontSize: number;
  onFontSizeChange: (fontSize: number) => void;
}

const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ fontSize, onFontSizeChange }) => {
  return (
    <div>
      <input
        className="fontInputBox"
        type="number"
        value={fontSize}
        onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
        min="12"
        max="24"
      />
    </div>
  );
};

export default FontSizeSelector;
