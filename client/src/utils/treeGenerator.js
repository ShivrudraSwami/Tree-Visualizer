export const generatePerfectTree = (depth) => {
    const adjList = {};
    const totalNodes = Math.pow(2, depth) - 1;
    for (let i = 1; i <= totalNodes; i++) {
        const left = 2 * i;
        const right = 2 * i + 1;
        adjList[i] = [];
        if (left <= totalNodes) adjList[i].push(left);
        if (right <= totalNodes) adjList[i].push(right);
    }
    return { adjList, root: 1 };
};