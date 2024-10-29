import React from 'react';
import '../../styles/TreeViewStyle.css';


const NodeTree = ({ nodes, onSelect, selectedNode }) => {
    const handleNodeClick = (node) => {
        onSelect(node);
    };

    const renderNode = (node, level = 0) => {
        const isSelected = selectedNode && selectedNode.key === node.key;
        const hasChildren = node.children && node.children.length > 0;

        return (
            <div
                key={node.key}
                className={`node ${isSelected ? 'selected' : ''}`}
                style={{ marginLeft: level * 20 }}
                onClick={() => handleNodeClick(node)}
            >
                <span className="node-label">{node.label}</span>
                {hasChildren && <span className="node-children-icon">have childrens</span>}
            </div>
        );
    };

    const renderNodes = (nodes, level = 0) => {
        return nodes.map(node => (
            <React.Fragment key={node.key}>
                {renderNode(node, level)}
                {node.children && renderNodes(node.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className="tree-view">
            {renderNodes(nodes)}
        </div>
    );
};

export default NodeTree;