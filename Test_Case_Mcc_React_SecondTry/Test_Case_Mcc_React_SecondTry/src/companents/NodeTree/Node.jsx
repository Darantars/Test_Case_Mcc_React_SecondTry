import React from 'react';
import '../../styles/TreeViewStyle.css';

const NodeTree = ({ nodes, onSelect, selectedNode }) => {
    const handleNodeClick = (node) => {
        onSelect(node);
    };

    const renderNode = (node) => {
        const isSelected = selectedNode && selectedNode.key === node.key;
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div
                key={node.key}
                className={`node ${isSelected ? 'selected' : ''}`}
                
            >
                <span className="node-label"
                    onClick={() => handleNodeClick(node)}>{node.label}</span>
                {hasChildren && <span className="node-children-icon">has children</span>}
                {node.children && node.children.map(renderNode)}
            </div>
        );
    };

    return (
        <div className="tree-view">
            {nodes.map(renderNode)}
        </div>
    );
};

export default NodeTree;
