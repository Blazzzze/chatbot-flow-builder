import React from 'react';
import { FlowNode } from '../types/types';

// Props for our SettingsPanel component.
// - node: the currently selected flow node
// - updateNode: function to change the node's text
// - clearSelection: function to go back / deselect the node
interface SettingsProps {
    node: FlowNode;
    updateNode: (id: string, text: string) => void;
    clearSelection: () => void;
}

// A sidebar panel where you can view/edit the selected node's text
const SettingsPanel: React.FC<SettingsProps> = ({
    node,
    updateNode,
    clearSelection,
}) => {
    return (
        // 'aside' acts as a sidebar; simple styling to separate it visually
        <aside style={{ padding: 16, borderRight: '1px solid #eee' }}>
            {/* Back button to clear the selection and return to the main view */}
            <button onClick={clearSelection}>← Back</button>

            {/* Section heading */}
            <h3>Message</h3>

            {/* 
                Text area bound to node.data.text.
                When the user types, we call updateNode with the new value.
            */}
            <textarea
                style={{ width: '100%', height: 80 }}
                value={node.data.text}
                onChange={(e) => {
                    // Pass the updated text back up to the parent
                    updateNode(node.id, e.target.value);
                }}
            />
        </aside>
    );
};

export default SettingsPanel;