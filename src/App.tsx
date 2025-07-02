import React, { useState, useCallback } from 'react';
import {
  ReactFlowProvider, // Context provider for React Flow components
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuid } from 'uuid'; // Generate unique IDs for saved flows

import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import FlowCanvas from './components/FlowCanvas';
import SaveButton from './components/SaveButton';
import { FlowNode, FlowEdge, SavedFlow } from './types/types';
import { validate } from './utils/validation';

import './App.css';

const App: React.FC = () => {
  // Array of nodes on the canvas
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  // Array of edges connecting the nodes
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  // Currently selected node ID (for showing its settings)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  // Any validation or save error message
  const [error, setError] = useState<string | null>(null);

  // Handler invoked when the user clicks "Save"
  const handleSave = useCallback(() => {
    // Run validation logic on current nodes & edges
    const err = validate(nodes, edges);
    if (err) {
      setError(err); // Show error banner if invalid
      return;
    }
    setError(null); // Clear previous errors

    // Prompt user to name this flow
    const name = window.prompt(
      'Name this flow:',
      `Flow @ ${new Date().toLocaleTimeString()}`
    );
    if (!name) return; // If user cancels, abort

    // Build the flow object to persist
    const newFlow: SavedFlow = {
      id: uuid(),
      name,
      nodes,
      edges,
    };

    // Retrieve existing flows, append new one, and save back to localStorage
    const stored = localStorage.getItem('saved-flows');
    const arr: SavedFlow[] = stored ? JSON.parse(stored) : [];
    arr.push(newFlow);
    localStorage.setItem('saved-flows', JSON.stringify(arr));

    alert(`Saved flow "${name}"!`);
    console.log('Persisted:', newFlow);
  }, [nodes, edges]);

  // Update the `text` property of a specific node
  const updateNode = (id: string, text: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? {
              ...n,
              data: { ...n.data, text },
            }
          : n
      )
    );
  };

  // Clear any selected node in the UI
  const clearSelection = () => setSelectedNodeId(null);

  // Find the selected node object by its ID
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      {/* Error banner displayed when save validation fails */}
      {error && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: '#fdd',
            color: '#900',
            padding: 8,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Cannot save Flow: {error}
        </div>
      )}

      {/* Provide React Flow context to child components */}
      <ReactFlowProvider>
        {/* Sidebar: either node creation panel or node settings */}
        <div style={{ width: 240, borderRight: '1px solid #eee' }}>
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              updateNode={updateNode}
              clearSelection={clearSelection}
            />
          ) : (
            <NodePanel setNodes={setNodes} setEdges={setEdges} />
          )}
        </div>

        {/* Main canvas area where nodes & edges are rendered */}
        <div style={{ flex: 1 }}>
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
          />
        </div>

        {/* Floating save button to persist the current flow */}
        <SaveButton onClick={handleSave} />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
