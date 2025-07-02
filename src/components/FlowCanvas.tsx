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

// Define what props this canvas component expects from its parent
interface FlowCanvasProps {
    nodes: FlowNode[];                              // array of nodes to render
    edges: FlowEdge[];                              // array of edges between nodes
    setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;  // updater for nodes
    setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;  // updater for edges
    selectedNodeId: string | null;                  // id of the node user clicked
    setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>; // setter for selection
}

// Map a custom node type key to the actual component
const nodeTypes = { text: TextNode };

const FlowCanvas: React.FC<FlowCanvasProps> = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNodeId,
}) => {
    // Handle dragging/resizing/moving of nodes and update state accordingly
    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((current) => applyNodeChanges(changes, current)),
        [setNodes]
    );

    // Handle changes to edges (like deletion) and update state
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((current) => applyEdgeChanges(changes, current)),
        [setEdges]
    );

    // When the user draws a new connection between two nodes
    const onConnect: OnConnect = useCallback(
        (connection: Connection) =>
            setEdges((current) =>
                addEdge(
                    {
                        ...connection,
                        // make the arrow at the end look closed
                        markerEnd: { type: MarkerType.ArrowClosed },
                    },
                    current
                )
            ),
        [setEdges]
    );

    // Save which node was clicked so parent can show details, etc.
    const onNodeClick = useCallback(
        (_event: React.MouseEvent, node: RFNode) => setSelectedNodeId(node.id),
        [setSelectedNodeId]
    );

    // Allow dropping by preventing default behavior
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move'; // show the right cursor
    }, []);

    // Handle drop of a new node type from the sidebar onto the canvas
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            // figure out where in the canvas the drop happened
            const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (!type) return; // bail if no valid node type

            const position = {
                x: event.clientX - bounds.left,
                y: event.clientY - bounds.top,
            };

            // create a new node object
            const newNode: FlowNode = {
                id: `${type}-${Date.now()}`, // unique id
                type,                        // type matches our nodeTypes map
                position,                    // where to place it
                data: { text: 'New message' }, // default payload
            };

            // append the new node to the existing ones
            setNodes((current) => current.concat(newNode));
        },
        [setNodes]
    );

    // Render the React Flow canvas with all props wired up
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
                defaultEdgeOptions={{
                    // fallback arrow style for programmatically added edges
                    markerEnd: { type: MarkerType.ArrowClosed },
                }}
                fitView // auto-zoom/pan so everything fits nicely
            >
                <Background /> {/* faint grid in the background */}
                <Controls />   {/* zoom + fit view controls */}
            </ReactFlow>
        </div>
    );
};

export default FlowCanvas;
