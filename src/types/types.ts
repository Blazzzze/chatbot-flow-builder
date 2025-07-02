import type { Node as RFNode, Edge as RFEdge } from 'reactflow';

export interface FlowNode extends RFNode {
  data: { text: string };
}

export type FlowEdge = RFEdge;

export interface SavedFlow {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

