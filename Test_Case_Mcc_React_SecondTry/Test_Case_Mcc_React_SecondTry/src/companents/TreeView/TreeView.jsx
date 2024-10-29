// src/TreeView.jsx
import React, { useState } from 'react';
import NodeTree from '../NodeTree/NodeTree';

const treeData = [
    {
        key: "0",
        label: "Documents",
        children: [
            {
                key: "0-0",
                label: "Document 1-1",
                children: [
                    {
                        key: "0-1-1",
                        label: "Document-0-1.doc",
                    },
                    {
                        key: "0-1-2",
                        label: "Document-0-2.doc",
                    },
                ],
            },
        ],
    },
    {
        key: "1",
        label: "Desktop",
        children: [
            {
                key: "1-0",
                label: "document1.doc",
            },
            {
                key: "0-0",
                label: "documennt-2.doc",
            },
        ],
    },
    {
        key: "2",
        label: "Downloads",
        children: [],
    },
];

const TreeView = ({ nodes = treeData }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [tree, setTree] = useState(nodes);

    const handleSelectNode = (node) => {
        setSelectedNode(node);
    };

    const handleAddNode = () => {
        if (selectedNode) {
            const newNode = {
                key: `${selectedNode.key}-new`,
                label: 'New Node',
                children: [],
            };
            const updatedTree = updateTree(tree, selectedNode.key, newNode);
            setTree(updatedTree);
        }
    };

    const handleRemoveNode = () => {
        if (selectedNode) {
            const updatedTree = removeNode(tree, selectedNode.key);
            setTree(updatedTree);
            setSelectedNode(null);
        }
    };

    const handleEditNode = () => {
        if (selectedNode) {
            const newLabel = prompt('Enter new label:', selectedNode.label);
            if (newLabel) {
                const updatedTree = updateTree(tree, selectedNode.key, { ...selectedNode, label: newLabel });
                setTree(updatedTree);
            }
        }
    };

    const handleResetTree = () => {
        setTree(treeData);
        setSelectedNode(null);
    };

    const updateTree = (nodes, key, newNode) => {
        return nodes.map((node) => {
            if (node.key === key) {
                return { ...node, children: [...node.children, newNode] };
            }
            if (node.children && node.children.length > 0) {
                return { ...node, children: updateTree(node.children, key, newNode) };
            }
            return node;
        });
    };

    const removeNode = (nodes, key) => {
        return nodes.filter((node) => node.key !== key).map((node) => {
            if (node.children && node.children.length > 0) {
                return { ...node, children: removeNode(node.children, key) };
            }
            return node;
        });
    };

    return (
        <div>
            <NodeTree nodes={tree} onSelect={handleSelectNode} />
            <div>
                <button onClick={handleAddNode}>Add</button>
                <button onClick={handleRemoveNode}>Remove</button>
                <button onClick={handleEditNode}>Edit</button>
                <button onClick={handleResetTree}>Reset</button>
            </div>
        </div>
    );
};

export default TreeView;
