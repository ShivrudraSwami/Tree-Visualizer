import React, { useState, useEffect } from 'react';
import TreeNode from './components/TreeNode.jsx';
import { generatePerfectTree } from './utils/treeGenerator';

const App = () => {
    const [treeData, setTreeData] = useState({});
    const [rootId, setRootId] = useState(null);
    const [visitedNodes, setVisitedNodes] = useState(new Set());
    const [activeNode, setActiveNode] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const { adjList, root } = generatePerfectTree(7); // Depth 5 = 31 Nodes
        setTreeData(adjList);
        setRootId(root);
    }, []);

    const runAlgorithm = async (type) => {
        if (isAnimating) return;
        setVisitedNodes(new Set());
        setActiveNode(null);
        setIsAnimating(true);
        try {
            // const res = await fetch('http://localhost:5000/traverse',{
            const res = await fetch('http://127.0.0.1:5000/traverse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tree: treeData, root: rootId, type })
            });
            const { path } = await res.json();
            let i = 0;
            const interval = setInterval(() => {
                if (i >= path.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    setActiveNode(null);
                    return;
                }
                setActiveNode(path[i]);
                setVisitedNodes(prev => new Set(prev).add(path[i]));
                i++;
            }, 400);
        } catch (err) { setIsAnimating(false); }
    };

    const renderTree = (nodeId) => {
        const children = treeData[nodeId] || [];
        return (
            <TreeNode key={nodeId} id={nodeId} 
                isActive={activeNode === nodeId} 
                isVisited={visitedNodes.has(nodeId)} 
                childrenRender={children.map(child => renderTree(child))} 
            />
        );
    };

    const btnStyle = { margin: '5px', padding: '10px 15px', background: '#3742fa', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' };

    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '20px', backgroundColor: '#f1f2f6', minHeight: '100vh' }}>
            <h1>DSA Tree Visualizer</h1>
            <div style={{ marginBottom: '20px' }}>
                <button style={btnStyle} onClick={() => runAlgorithm('bfs')} disabled={isAnimating}>BFS</button>
                <button style={btnStyle} onClick={() => runAlgorithm('dfs')} disabled={isAnimating}>DFS</button>
                <button style={btnStyle} onClick={() => runAlgorithm('zigzag')} disabled={isAnimating}>Zig-Zag</button>
                <button style={btnStyle} onClick={() => runAlgorithm('vertical')} disabled={isAnimating}>Vertical</button>
                <button style={btnStyle} onClick={() => runAlgorithm('boundary')} disabled={isAnimating}>Boundary</button>
            </div>
            <div style={{ overflow: 'auto', padding: '20px', background: '#fff', borderRadius: '10px', display: 'inline-block' }}>
                {rootId && renderTree(rootId)}
            </div>
        </div>
    );
};
export default App;