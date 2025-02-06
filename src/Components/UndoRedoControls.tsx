import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { undoAction, redoAction } from "../store/graphSlice";
import { RootState } from "../store/store";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import './UndoRedoControls.css';

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();
  const canUndo = useSelector((state: RootState) => state.graph.canUndo);
  const canRedo = useSelector((state: RootState) => state.graph.canRedo);

  const handleUndo = () => {
    if (canUndo) {
      dispatch(undoAction()); 
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      dispatch(redoAction());
    }
  };

  return (
    <div className="undoRedoContainer">
      <UndoIcon 
        className={`undo ${!canUndo ? 'disabled' : ''}`} 
        onClick={handleUndo} 
        disabled={!canUndo} 
      />
      <RedoIcon 
        className={`redo ${!canRedo ? 'disabled' : ''}`} 
        onClick={handleRedo} 
        disabled={!canRedo} 
      />
    </div>
  );
};

export default UndoRedoControls;
