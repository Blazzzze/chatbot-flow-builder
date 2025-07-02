import React, { useEffect, useState, DragEvent } from 'react';
import { FlowNode, FlowEdge, SavedFlow } from '../types/types';
import './NodePanel.css';

interface NodePanelProps {
    // Functions passed down from parent to update the diagram's nodes and edges
    setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
    setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
}

const NodePanel: React.FC<NodePanelProps> = ({ setNodes, setEdges }) => {
    // Local state to hold any flows saved in localStorage
    const [savedFlows, setSavedFlows] = useState<SavedFlow[]>([]);

    useEffect(() => {
        // When the component mounts, try to grab saved flows from localStorage
        const stored = localStorage.getItem('saved-flows');
        if (stored) {
            // If we find them, parse the JSON and store it in our local state
            setSavedFlows(JSON.parse(stored));
        }
    }, []); // Empty dependency array = run once on mount

    // Handler for initiating a drag from our "New Node" panel into the canvas
    const onDragStart = (e: DragEvent) => {
        // Required by React Flow to recognize the dragged item
        e.dataTransfer.setData('application/reactflow', 'text');
        e.dataTransfer.effectAllowed = 'move';
    };

    // Load a saved flow: replace the current nodes and edges
    const loadFlow = (flow: SavedFlow) => {
        setNodes(flow.nodes);
        setEdges(flow.edges);
    };

    return (
        <aside className="node-panel">
            <h3>New Node</h3>
            {/* This draggable div can be dragged into the React Flow canvas */}
            <div className="node-item" draggable onDragStart={onDragStart}>
                Message
            </div>

            <hr />

            <h3>Saved Flows</h3>
            {savedFlows.length === 0 ? (
                // If no flows have been saved yet, show a placeholder
                <p className="empty">— no saved flows —</p>
            ) : (
                // Otherwise, list each saved flow with a Load button
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
