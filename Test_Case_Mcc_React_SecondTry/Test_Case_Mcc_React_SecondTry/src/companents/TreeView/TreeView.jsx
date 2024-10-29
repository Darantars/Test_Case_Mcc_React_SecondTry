import React, { useState } from 'react';
import NodeTree from '../NodeTree/NodeTree';
import '../../styles/TreeViewStyle.css';


const treeData = [
    {
        key: "0",
        label: "Node 1",
        children: [
            {
                key: "0-0",
                label: "Node 1-1",
                children: [
                    {
                        key: "0-0-1",
                        label: "Node 1-1-1",
                        children: [],
                    },
                    {
                        key: "0-0-2",
                        label: "Node 1-1-2",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        key: "1",
        label: "Node 2",
        children: [
            {
                key: "1-0",
                label: "Node 2-1",
                children: [],
            },
            {
                key: "1-1",
                label: "Node 2-2",
                children: [],
            },
        ],
    },
    {
        key: "2",
        label: "Node 3",
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
        const newNode = {
            key: generateKey(selectedNode ? selectedNode.key : null),
            label: 'New Node',
            children: [],
        };

        if (selectedNode) {
            const updatedTree = addNodeToTree(tree, selectedNode.key, newNode);
            setTree(updatedTree);
        } else {
            setTree([...tree, newNode]);
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

    const generateKey = (parentKey) => {
        if (parentKey === null) {
            return `${tree.length}`;
        }
        const parentNode = findNodeByKey(tree, parentKey);
        return `${parentKey}-${parentNode.children.length}`;
    };

    const findNodeByKey = (nodes, key) => {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                const foundNode = findNodeByKey(node.children, key);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return null;
    };

    const addNodeToTree = (nodes, parentKey, newNode) => {
        return nodes.map(node => {
            if (node.key === parentKey) {
                return { ...node, children: [...node.children, newNode] };
            }
            if (node.children && node.children.length > 0) {
                return { ...node, children: addNodeToTree(node.children, parentKey, newNode) };
            }
            return node;
        });
    };

    const updateTree = (nodes, key, newNode) => {
        return nodes.map((node) => {
            if (node.key === key) {
                return { ...newNode, children: node.children };
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
        <div className="tree-view-container">
            <h2>Tree</h2>
            <NodeTree nodes={tree} onSelect={handleSelectNode} selectedNode={selectedNode} />
            <div className="button-group">
                <button className="button" onClick={handleAddNode}>Add</button>
                <button className="button" onClick={handleRemoveNode}>Remove</button>
                <button className="button" onClick={handleEditNode}>Edit</button>
                <button className="button" onClick={handleResetTree}>Reset</button>
            </div>
        </div>
    );
};

export default TreeView;