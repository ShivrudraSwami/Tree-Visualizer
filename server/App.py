from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithms import TreeAlgorithms

app = Flask(__name__)
CORS(app)

@app.route('/traverse', methods=['POST'])
def traverse():
    data = request.json
    tree = data.get('tree')
    root = data.get('root')
    algo = data.get('type')
    
    path = []
    if algo == 'bfs': path = TreeAlgorithms.bfs(tree, root)
    elif algo == 'dfs': path = TreeAlgorithms.dfs(tree, root)
    elif algo == 'zigzag': path = TreeAlgorithms.zigzag(tree, root)
    elif algo == 'vertical': path = TreeAlgorithms.vertical(tree, root)
    elif algo == 'boundary': path = TreeAlgorithms.boundary(tree, root)

    return jsonify({"path": path})

if __name__ == '__main__':
    app.run(debug=True, port=5000)