// src/NodeTree.jsx
import React from 'react';
import Node from './Node';

const NodeTree = ({ nodes, onSelect }) => {
    return (
        <ul>
            {nodes.map((node) => (
                <Node node={node} key={node.key} onSelect={onSelect} />
            ))}
        </ul>
    );
};

export default NodeTree;
