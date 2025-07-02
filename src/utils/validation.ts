import { FlowNode, FlowEdge } from '../types/types';

export function validate(nodes: FlowNode[], edges: FlowEdge[]): string | null {

  if (nodes.length > 1) {
    const starts = nodes.filter(
      (node) => !edges.some((e) => e.target === node.id)
    );
    if (starts.length > 1) {
      return 'More than one node has no incoming connection.';
    }
  }


  for (const node of nodes) {
    const outs = edges.filter((e) => e.source === node.id);
    if (outs.length > 1) {
      return 'One or more nodes have multiple outgoing connections.';
    }
  }

  return null;
}