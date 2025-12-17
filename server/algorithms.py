from collections import deque, defaultdict

class TreeAlgorithms:
    
    @staticmethod
    def bfs(tree_adj, root):
        if not root: return []
        queue = deque([root])
        path = []
        visited = set([root])
        while queue:
            curr = queue.popleft()
            path.append(curr)
            children = tree_adj.get(str(curr), [])
            for child in children:
                if child not in visited:
                    visited.add(child)
                    queue.append(child)
        return path

    @staticmethod
    def dfs(tree_adj, root):
        path = []
        visited = set()
        def _dfs_helper(node):
            if node in visited: return
            visited.add(node)
            path.append(node)
            children = tree_adj.get(str(node), [])
            for child in children:
                _dfs_helper(child)
        if root: _dfs_helper(root)
        return path

    @staticmethod
    def zigzag(tree_adj, root):
        if not root: return []
        result = []
        queue = deque([root])
        left_to_right = True
        while queue:
            level_size = len(queue)
            current_level = []
            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node)
                children = tree_adj.get(str(node), [])
                for child in children: queue.append(child)
            if not left_to_right: current_level.reverse()
            result.extend(current_level)
            left_to_right = not left_to_right
        return result

    @staticmethod
    def vertical(tree_adj, root):
        if not root: return []
        dist_map = defaultdict(list)
        queue = deque([(root, 0)]) 
        min_hd, max_hd = 0, 0
        while queue:
            curr, hd = queue.popleft()
            dist_map[hd].append(curr)
            min_hd = min(min_hd, hd)
            max_hd = max(max_hd, hd)
            children = tree_adj.get(str(curr), [])
            if len(children) > 0: queue.append((children[0], hd - 1))
            if len(children) > 1: queue.append((children[1], hd + 1))
        path = []
        for i in range(min_hd, max_hd + 1):
            path.extend(dist_map[i])
        return path

    @staticmethod
    def boundary(tree_adj, root):
        if not root: return []
        path = []
        def is_leaf(node):
            return len(tree_adj.get(str(node), [])) == 0
        def add_left(node):
            curr = node
            while curr:
                if not is_leaf(curr): path.append(curr)
                children = tree_adj.get(str(curr), [])
                if len(children) > 0: curr = children[0]
                elif len(children) > 1: curr = children[1]
                else: curr = None
        def add_leaves(node):
            if is_leaf(node):
                path.append(node)
                return
            for child in tree_adj.get(str(node), []): add_leaves(child)
        def add_right(node):
            stack = []
            curr = node
            while curr:
                if not is_leaf(curr): stack.append(curr)
                children = tree_adj.get(str(curr), [])
                if len(children) > 1: curr = children[1]
                elif len(children) > 0: curr = children[0]
                else: curr = None
            while stack: path.append(stack.pop())
        
        if not is_leaf(root): path.append(root)
        children = tree_adj.get(str(root), [])
        if len(children) > 0: add_left(children[0])
        add_leaves(root)
        if len(children) > 1: add_right(children[1])
        return path