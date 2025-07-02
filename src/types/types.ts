import type { Node as RFNode, Edge as RFEdge } from 'reactflow';

/**
 * FlowNode
 * --------
 * Builds on top of RFNode by enforcing that each node's
 * `data` field contains a simple `{ text: string }` shape.
 * This gives us a consistent way to attach a label or content
 * to any node in our flow.
 */
export interface FlowNode extends RFNode {
    data: { text: string };
}

/**
 * FlowEdge
 * --------
 * Right now this is just an alias for the Edge type from reactflow.
 * We keep it around in case we want to add custom edge metadata later.
 */
export type FlowEdge = RFEdge;

/**
 * SavedFlow
 * ---------
 * Represents a serialized flow that can be saved, loaded, or transferred.
 * - id:   a unique string to identify the flow
 * - name: a human-readable title for the flow
 * - nodes: an array of FlowNode objects
 * - edges: an array of FlowEdge objects (connections between nodes)
 */
export interface SavedFlow {
    id: string;
    name: string;
    nodes: FlowNode[];
    edges: FlowEdge[];
}
