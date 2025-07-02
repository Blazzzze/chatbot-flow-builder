import React from 'react';

// Here we're defining what props this button needs.
// In our case, it just needs a function to run when someone clicks it.
interface SaveButtonProps {
    onClick: () => void; // This will be fired off on button press
}

// A lightweight component for a "Save Changes" button
const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => (
    // We wrap the button in a div so we can stick it to the top-right corner
    <div style={{ position: 'fixed', top: 10, right: 10 }}>
        <button
            style={{
                padding: '8px 16px',      // some nice spacing
                border: '1px solid #005', // subtle border
                borderRadius: 4,          // rounded corners
                background: 'white',      // keeps it clean and simple
                cursor: 'pointer'         // makes it clear it's clickable
            }}
            onClick={onClick} // when clicked, trigger the handler passed in from props
        >
            Save Changes
        </button>
    </div>
);

export default SaveButton; // export it so other parts of the app can use it