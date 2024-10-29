// src/Node.jsx
import React, { useState } from 'react';

function Node({ node, onSelect }) {
    const { children, label } = node;
    const [showChildren, setShowChildren] = useState(false);

    const handleClick = () => {
        setShowChildren(!showChildren);
        onSelect(node);
    };

    return (
        <>
            <div onClick={handleClick} style={{ marginBottom: "10px", cursor: 'pointer' }}>
                <span>{label}</span>
            </div>
            {children && children.length > 0 && (
                <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
                    {showChildren && children.map((child) => (
                        <Node node={child} key={child.key} onSelect={onSelect} />
                    ))}
                </ul>
            )}
        </>
    );
}

export default Node;
