import React from 'react';
import { FlowNode } from '../types/types';

interface SettingsProps {
  node: FlowNode;
  updateNode: (id: string, text: string) => void;
  clearSelection: () => void;
}

const SettingsPanel: React.FC<SettingsProps> = ({ node, updateNode, clearSelection }) => {
  return (
    <aside style={{ padding: 16, borderRight: '1px solid #eee' }}>
      <button onClick={clearSelection}>← Back</button>
      <h3>Message</h3>
      <textarea
        style={{ width: '100%', height: 80 }}
        value={node.data.text}
        onChange={(e) => updateNode(node.id, e.target.value)}
      />
    </aside>
  );
};

export default SettingsPanel;