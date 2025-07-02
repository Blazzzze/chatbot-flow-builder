import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * A "Send Message" node showing data.text
 */
const TextNode: React.FC<NodeProps> = ({ data, isConnectable }) => (
  <div style={{
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 8,
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    minWidth: 200,
  }}>
    <div style={{
      background: '#aaf',
      padding: 6,
      borderRadius: '6px 6px 0 0',
      fontWeight: 'bold'
    }}>
      Send Message
    </div>
    <div style={{ padding: 8 }}>{data.text}</div>

    {/* target: left, multiple inbound allowed */}
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
    {/* source: right, we'll validate single outbound in utils */}
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#555' }}
      isConnectable={isConnectable}
    />
  </div>
);

export default TextNode;