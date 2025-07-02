import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  Connection,
  EdgeChange,
  NodeChange,
  OnConnect,
  MarkerType,
  Node as RFNode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowNode, FlowEdge } from '../types/types';
import TextNode from './nodes/TextNode';

interface FlowCanvasProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const nodeTypes = { text: TextNode };

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  setSelectedNodeId,
}) => {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            // attach a closed arrowhead at the target handle
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: RFNode) =>
      setSelectedNodeId(node.id),
    [setSelectedNodeId]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const newNode: FlowNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { text: 'New message' },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        // default for any edges rendered (e.g. programmatic ones)
        defaultEdgeOptions={{
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
