import React, { useState, useCallback } from 'react';
import {
  ReactFlowProvider,
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuid } from 'uuid';

import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import FlowCanvas from './components/FlowCanvas';
import SaveButton from './components/SaveButton';
import { FlowNode, FlowEdge, SavedFlow } from './types/types';
import { validate } from './utils/validation';

import './App.css';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(() => {
    const err = validate(nodes, edges);
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    const name = window.prompt(
      'Name this flow:',
      `Flow @ ${new Date().toLocaleTimeString()}`
    );
    if (!name) return;

    const newFlow: SavedFlow = {
      id: uuid(),
      name,
      nodes,
      edges,
    };

    const stored = localStorage.getItem('saved-flows');
    const arr: SavedFlow[] = stored ? JSON.parse(stored) : [];
    arr.push(newFlow);
    localStorage.setItem('saved-flows', JSON.stringify(arr));

    alert(`Saved flow "${name}"!`);
    console.log('Persisted:', newFlow);
  }, [nodes, edges]);

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

  const clearSelection = () => setSelectedNodeId(null);
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
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

      <ReactFlowProvider>
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

        <SaveButton onClick={handleSave} />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
