import React, { useEffect, useState, DragEvent } from 'react';
import { FlowNode, FlowEdge, SavedFlow } from '../types/types';
import './NodePanel.css';

interface NodePanelProps {
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
}

const NodePanel: React.FC<NodePanelProps> = ({ setNodes, setEdges }) => {
  const [savedFlows, setSavedFlows] = useState<SavedFlow[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saved-flows');
    if (stored) {
      setSavedFlows(JSON.parse(stored));
    }
  }, []);

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('application/reactflow', 'text');
    e.dataTransfer.effectAllowed = 'move';
  };

  const loadFlow = (flow: SavedFlow) => {
    setNodes(flow.nodes);
    setEdges(flow.edges);
  };

  return (
    <aside className="node-panel">
      <h3>New Node</h3>
      <div className="node-item" draggable onDragStart={onDragStart}>
        Message
      </div>

      <hr />

      <h3>Saved Flows</h3>
      {savedFlows.length === 0 ? (
        <p className="empty">— no saved flows —</p>
      ) : (
        savedFlows.map((flow) => (
          <div key={flow.id} className="saved-flow-item">
            <span className="flow-name">{flow.name}</span>
            <button onClick={() => loadFlow(flow)}>Load</button>
          </div>
        ))
      )}
    </aside>
  );
};

export default NodePanel;
