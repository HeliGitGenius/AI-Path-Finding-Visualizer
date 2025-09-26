// Application data
const applicationData = {
  "gridSizes": [
    {"size": 15, "label": "Small (15x15)"},
    {"size": 25, "label": "Medium (25x25)"},
    {"size": 35, "label": "Large (35x35)"}
  ],
  "algorithms": [
    {
      "id": "bfs",
      "name": "Breadth-First Search",
      "description": "Explores all nodes at the current depth before moving to the next depth level. Guarantees shortest path in unweighted graphs.",
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V)",
      "pros": ["Guarantees shortest path", "Simple to implement", "Good for unweighted graphs"],
      "cons": ["Can be slow for large spaces", "Uses more memory"],
      "applications": ["Social networks", "GPS navigation", "Puzzle solving"]
    },
    {
      "id": "dijkstra",
      "name": "Dijkstra's Algorithm", 
      "description": "Finds shortest paths from source to all other nodes using a priority queue. Explores nodes in order of distance from start.",
      "timeComplexity": "O((V + E) log V)",
      "spaceComplexity": "O(V)",
      "pros": ["Guarantees shortest path", "Works with weighted graphs", "Versatile"],
      "cons": ["Slower than A*", "Explores in all directions"],
      "applications": ["Network routing", "Flight connections", "Traffic optimization"]
    },
    {
      "id": "astar",
      "name": "A* Search",
      "description": "Uses heuristics to guide search toward the goal. Combines actual distance with estimated remaining distance.",
      "timeComplexity": "O(b^d)",
      "spaceComplexity": "O(b^d)", 
      "pros": ["Very efficient", "Heuristic-guided", "Optimal with admissible heuristic"],
      "cons": ["Requires good heuristic", "More complex"],
      "applications": ["Game AI", "Robotics", "Route planning"]
    }
  ],
  "heuristics": [
    {
      "id": "manhattan",
      "name": "Manhattan Distance",
      "description": "Sum of absolute differences in coordinates. Good for grid-based movement (no diagonals).",
      "formula": "|x1-x2| + |y1-y2|"
    },
    {
      "id": "euclidean", 
      "name": "Euclidean Distance",
      "description": "Straight-line distance between two points. Good when diagonal movement is allowed.",
      "formula": "√((x1-x2)² + (y1-y2)²)"
    }
  ],
  "cellTypes": {
    "EMPTY": 0,
    "WALL": 1, 
    "START": 2,
    "END": 3,
    "VISITED": 4,
    "PATH": 5
  },
  "colors": {
    "EMPTY": "#ffffff",
    "WALL": "#2c3e50",
    "START": "#27ae60", 
    "END": "#e74c3c",
    "VISITED": "#3498db",
    "PATH": "#f1c40f",
    "GRID_LINE": "#e0e0e0"
  },
  "speeds": [
    {"id": "slow", "name": "Slow", "delay": 100},
    {"id": "medium", "name": "Medium", "delay": 50},
    {"id": "fast", "name": "Fast", "delay": 10},
    {"id": "instant", "name": "Instant", "delay": 0}
  ]
};

// Grid class for managing the pathfinding grid
class Grid {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.startPos = null;
        this.endPos = null;
        this.initialize();
    }

    initialize() {
        // Initialize empty grid
        this.cells = Array(this.size).fill(null).map(() => 
            Array(this.size).fill(applicationData.cellTypes.EMPTY)
        );
        
        // Set default start and end positions
        this.startPos = {row: 1, col: 1};
        this.endPos = {row: this.size - 2, col: this.size - 2};
        
        // Place start and end on grid
        this.cells[this.startPos.row][this.startPos.col] = applicationData.cellTypes.START;
        this.cells[this.endPos.row][this.endPos.col] = applicationData.cellTypes.END;
    }

    isValid(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    isWalkable(row, col) {
        if (!this.isValid(row, col)) return false;
        const cell = this.cells[row][col];
        return cell !== applicationData.cellTypes.WALL;
    }

    getNeighbors(row, col) {
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
        ];
        const neighbors = [];
        
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (this.isWalkable(newRow, newCol)) {
                neighbors.push({row: newRow, col: newCol});
            }
        }
        return neighbors;
    }

    clearPath() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.cells[row][col] === applicationData.cellTypes.VISITED || 
                    this.cells[row][col] === applicationData.cellTypes.PATH) {
                    this.cells[row][col] = applicationData.cellTypes.EMPTY;
                }
            }
        }
    }

    reset() {
        this.initialize();
    }

    setCell(row, col, type) {
        if (this.isValid(row, col)) {
            this.cells[row][col] = type;
        }
    }

    generateRandomMaze() {
        // Clear grid first
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.cells[row][col] = applicationData.cellTypes.EMPTY;
            }
        }

        // Create border walls
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (row === 0 || row === this.size - 1 || col === 0 || col === this.size - 1) {
                    this.cells[row][col] = applicationData.cellTypes.WALL;
                }
            }
        }

        // Add internal walls with passages
        for (let row = 2; row < this.size - 2; row += 2) {
            for (let col = 1; col < this.size - 1; col++) {
                this.cells[row][col] = applicationData.cellTypes.WALL;
            }
        }

        for (let col = 2; col < this.size - 2; col += 2) {
            for (let row = 1; row < this.size - 1; row++) {
                this.cells[row][col] = applicationData.cellTypes.WALL;
            }
        }

        // Create random passages
        for (let row = 2; row < this.size - 2; row += 2) {
            for (let col = 2; col < this.size - 2; col += 2) {
                if (Math.random() < 0.5) {
                    // Create horizontal passage
                    if (col > 2 && Math.random() < 0.5) {
                        this.cells[row][col - 1] = applicationData.cellTypes.EMPTY;
                    }
                    // Create vertical passage
                    if (row > 2) {
                        this.cells[row - 1][col] = applicationData.cellTypes.EMPTY;
                    }
                }
            }
        }
        
        // Ensure start and end positions are clear and set
        this.cells[this.startPos.row][this.startPos.col] = applicationData.cellTypes.START;
        this.cells[this.endPos.row][this.endPos.col] = applicationData.cellTypes.END;
        
        // Clear path around start and end
        const clearPositions = [
            {row: this.startPos.row + 1, col: this.startPos.col},
            {row: this.startPos.row, col: this.startPos.col + 1},
            {row: this.endPos.row - 1, col: this.endPos.col},
            {row: this.endPos.row, col: this.endPos.col - 1}
        ];
        
        clearPositions.forEach(pos => {
            if (this.isValid(pos.row, pos.col)) {
                this.cells[pos.row][pos.col] = applicationData.cellTypes.EMPTY;
            }
        });
    }

    generateRandomObstacles(density = 0.3) {
        this.initialize();
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if ((row === this.startPos.row && col === this.startPos.col) ||
                    (row === this.endPos.row && col === this.endPos.col)) {
                    continue;
                }
                if (Math.random() < density) {
                    this.cells[row][col] = applicationData.cellTypes.WALL;
                }
            }
        }
    }
}

// Priority Queue for Dijkstra and A*
class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({element, priority});
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift()?.element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

// Pathfinding Visualizer class
class PathfindingVisualizer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.grid = new Grid(25);
        this.cellSize = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.animationSpeed = 50;
        this.currentAlgorithm = null;
        this.metrics = {
            pathLength: 0,
            nodesExplored: 0,
            executionTime: 0,
            startTime: 0
        };
        this.isDragging = false;
        this.dragMode = null;

        this.calculateCellSize();
        this.setupEventListeners();
        this.draw();
        this.updateAlgorithmInfo('bfs');
        this.updateMetrics();
        this.updateStatus('ready');
    }

    calculateCellSize() {
        const padding = 2;
        this.cellSize = (Math.min(this.canvas.width, this.canvas.height) - padding * 2) / this.grid.size;
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleRightClick.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    }

    handleMouseDown(event) {
        event.preventDefault();
        const pos = this.getGridPosition(event);
        if (!pos) return;

        this.isDragging = true;
        const cellType = this.grid.cells[pos.row][pos.col];

        if (event.button === 2) { // Right click - place start
            this.setStartPosition(pos.row, pos.col);
        } else if (event.ctrlKey || event.metaKey) { // Ctrl+click - place end
            this.setEndPosition(pos.row, pos.col);
        } else {
            // Left click - toggle walls
            if (cellType === applicationData.cellTypes.WALL) {
                this.dragMode = 'erase';
                this.grid.setCell(pos.row, pos.col, applicationData.cellTypes.EMPTY);
            } else if (cellType === applicationData.cellTypes.EMPTY) {
                this.dragMode = 'draw';
                this.grid.setCell(pos.row, pos.col, applicationData.cellTypes.WALL);
            }
        }
        this.draw();
    }

    handleMouseMove(event) {
        if (!this.isDragging || !this.dragMode) return;
        
        const pos = this.getGridPosition(event);
        if (!pos) return;

        const cellType = this.grid.cells[pos.row][pos.col];
        if (cellType === applicationData.cellTypes.START || cellType === applicationData.cellTypes.END) {
            return;
        }

        if (this.dragMode === 'draw') {
            this.grid.setCell(pos.row, pos.col, applicationData.cellTypes.WALL);
        } else if (this.dragMode === 'erase') {
            this.grid.setCell(pos.row, pos.col, applicationData.cellTypes.EMPTY);
        }
        this.draw();
    }

    handleMouseUp(event) {
        this.isDragging = false;
        this.dragMode = null;
    }

    handleRightClick(event) {
        event.preventDefault();
        return false;
    }

    getGridPosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        
        if (this.grid.isValid(row, col)) {
            return {row, col};
        }
        return null;
    }

    setStartPosition(row, col) {
        // Clear old start position
        if (this.grid.startPos) {
            this.grid.cells[this.grid.startPos.row][this.grid.startPos.col] = applicationData.cellTypes.EMPTY;
        }
        
        // Set new start position
        this.grid.startPos = {row, col};
        this.grid.cells[row][col] = applicationData.cellTypes.START;
    }

    setEndPosition(row, col) {
        // Clear old end position
        if (this.grid.endPos) {
            this.grid.cells[this.grid.endPos.row][this.grid.endPos.col] = applicationData.cellTypes.EMPTY;
        }
        
        // Set new end position
        this.grid.endPos = {row, col};
        this.grid.cells[row][col] = applicationData.cellTypes.END;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let row = 0; row < this.grid.size; row++) {
            for (let col = 0; col < this.grid.size; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;
                const cellType = this.grid.cells[row][col];
                
                // Fill cell based on type
                this.ctx.fillStyle = this.getCellColor(cellType);
                this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                
                // Draw grid lines
                this.ctx.strokeStyle = applicationData.colors.GRID_LINE;
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
            }
        }
    }

    getCellColor(cellType) {
        switch (cellType) {
            case applicationData.cellTypes.EMPTY: return applicationData.colors.EMPTY;
            case applicationData.cellTypes.WALL: return applicationData.colors.WALL;
            case applicationData.cellTypes.START: return applicationData.colors.START;
            case applicationData.cellTypes.END: return applicationData.colors.END;
            case applicationData.cellTypes.VISITED: return applicationData.colors.VISITED;
            case applicationData.cellTypes.PATH: return applicationData.colors.PATH;
            default: return applicationData.colors.EMPTY;
        }
    }

    // Heuristic functions for A*
    manhattanDistance(pos1, pos2) {
        return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
    }

    euclideanDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.row - pos2.row, 2) + Math.pow(pos1.col - pos2.col, 2));
    }

    // BFS Algorithm
    async bfs() {
        const queue = [{pos: this.grid.startPos, path: [this.grid.startPos]}];
        const visited = new Set();
        visited.add(`${this.grid.startPos.row},${this.grid.startPos.col}`);
        
        while (queue.length > 0 && !this.isPaused && this.isRunning) {
            const {pos, path} = queue.shift();
            
            // Check if we reached the end
            if (pos.row === this.grid.endPos.row && pos.col === this.grid.endPos.col) {
                await this.animatePath(path);
                return path;
            }
            
            const neighbors = this.grid.getNeighbors(pos.row, pos.col);
            
            for (const neighbor of neighbors) {
                const key = `${neighbor.row},${neighbor.col}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    
                    // Mark as visited (but not the end point)
                    if (!(neighbor.row === this.grid.endPos.row && neighbor.col === this.grid.endPos.col)) {
                        this.grid.cells[neighbor.row][neighbor.col] = applicationData.cellTypes.VISITED;
                        this.metrics.nodesExplored++;
                        this.updateMetrics();
                        
                        if (this.animationSpeed > 0) {
                            this.draw();
                            await this.sleep(this.animationSpeed);
                        }
                    }
                    
                    queue.push({pos: neighbor, path: [...path, neighbor]});
                }
            }
        }
        
        if (this.animationSpeed === 0) {
            this.draw();
        }
        return null;
    }

    // Dijkstra's Algorithm
    async dijkstra() {
        const pq = new PriorityQueue();
        const distances = {};
        const previous = {};
        const visited = new Set();
        
        // Initialize distances
        for (let row = 0; row < this.grid.size; row++) {
            for (let col = 0; col < this.grid.size; col++) {
                distances[`${row},${col}`] = Infinity;
            }
        }
        
        const startKey = `${this.grid.startPos.row},${this.grid.startPos.col}`;
        distances[startKey] = 0;
        pq.enqueue(this.grid.startPos, 0);
        
        while (!pq.isEmpty() && !this.isPaused && this.isRunning) {
            const current = pq.dequeue();
            const currentKey = `${current.row},${current.col}`;
            
            if (visited.has(currentKey)) continue;
            visited.add(currentKey);
            
            // Check if we reached the end
            if (current.row === this.grid.endPos.row && current.col === this.grid.endPos.col) {
                const path = this.reconstructPath(previous, this.grid.endPos);
                await this.animatePath(path);
                return path;
            }
            
            // Mark as visited (but not start or end)
            if (!(current.row === this.grid.startPos.row && current.col === this.grid.startPos.col) &&
                !(current.row === this.grid.endPos.row && current.col === this.grid.endPos.col)) {
                this.grid.cells[current.row][current.col] = applicationData.cellTypes.VISITED;
                this.metrics.nodesExplored++;
                this.updateMetrics();
                
                if (this.animationSpeed > 0) {
                    this.draw();
                    await this.sleep(this.animationSpeed);
                }
            }
            
            const neighbors = this.grid.getNeighbors(current.row, current.col);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row},${neighbor.col}`;
                const newDistance = distances[currentKey] + 1;
                
                if (newDistance < distances[neighborKey]) {
                    distances[neighborKey] = newDistance;
                    previous[neighborKey] = current;
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }
        
        if (this.animationSpeed === 0) {
            this.draw();
        }
        return null;
    }

    // A* Algorithm
    async aStar(heuristicType = 'manhattan') {
        const pq = new PriorityQueue();
        const gScore = {};
        const fScore = {};
        const previous = {};
        const visited = new Set();
        
        const heuristic = heuristicType === 'euclidean' ? this.euclideanDistance : this.manhattanDistance;
        
        // Initialize scores
        for (let row = 0; row < this.grid.size; row++) {
            for (let col = 0; col < this.grid.size; col++) {
                gScore[`${row},${col}`] = Infinity;
                fScore[`${row},${col}`] = Infinity;
            }
        }
        
        const startKey = `${this.grid.startPos.row},${this.grid.startPos.col}`;
        gScore[startKey] = 0;
        fScore[startKey] = heuristic(this.grid.startPos, this.grid.endPos);
        pq.enqueue(this.grid.startPos, fScore[startKey]);
        
        while (!pq.isEmpty() && !this.isPaused && this.isRunning) {
            const current = pq.dequeue();
            const currentKey = `${current.row},${current.col}`;
            
            if (visited.has(currentKey)) continue;
            visited.add(currentKey);
            
            // Check if we reached the end
            if (current.row === this.grid.endPos.row && current.col === this.grid.endPos.col) {
                const path = this.reconstructPath(previous, this.grid.endPos);
                await this.animatePath(path);
                return path;
            }
            
            // Mark as visited (but not start or end)
            if (!(current.row === this.grid.startPos.row && current.col === this.grid.startPos.col) &&
                !(current.row === this.grid.endPos.row && current.col === this.grid.endPos.col)) {
                this.grid.cells[current.row][current.col] = applicationData.cellTypes.VISITED;
                this.metrics.nodesExplored++;
                this.updateMetrics();
                
                if (this.animationSpeed > 0) {
                    this.draw();
                    await this.sleep(this.animationSpeed);
                }
            }
            
            const neighbors = this.grid.getNeighbors(current.row, current.col);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row},${neighbor.col}`;
                const tentativeGScore = gScore[currentKey] + 1;
                
                if (tentativeGScore < gScore[neighborKey]) {
                    previous[neighborKey] = current;
                    gScore[neighborKey] = tentativeGScore;
                    fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, this.grid.endPos);
                    pq.enqueue(neighbor, fScore[neighborKey]);
                }
            }
        }
        
        if (this.animationSpeed === 0) {
            this.draw();
        }
        return null;
    }

    reconstructPath(previous, endPos) {
        const path = [];
        let current = endPos;
        
        while (current) {
            path.unshift(current);
            const currentKey = `${current.row},${current.col}`;
            current = previous[currentKey];
        }
        
        return path;
    }

    async animatePath(path) {
        this.metrics.pathLength = path.length;
        
        for (let i = 1; i < path.length - 1; i++) {
            if (!this.isRunning) break;
            
            const pos = path[i];
            this.grid.cells[pos.row][pos.col] = applicationData.cellTypes.PATH;
            
            if (this.animationSpeed > 0) {
                this.draw();
                await this.sleep(this.animationSpeed / 2);
            }
        }
        
        if (this.animationSpeed === 0) {
            this.draw();
        }
    }

    async runAlgorithm(algorithmType, heuristicType = 'manhattan') {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.currentAlgorithm = algorithmType;
        this.metrics = {
            pathLength: 0,
            nodesExplored: 0,
            executionTime: 0,
            startTime: performance.now()
        };
        
        this.grid.clearPath();
        this.draw();
        this.updateStatus('running');
        this.updateMetrics();
        
        let path = null;
        
        try {
            switch (algorithmType) {
                case 'bfs':
                    path = await this.bfs();
                    break;
                case 'dijkstra':
                    path = await this.dijkstra();
                    break;
                case 'astar':
                    path = await this.aStar(heuristicType);
                    break;
            }
            
            this.metrics.executionTime = performance.now() - this.metrics.startTime;
            this.updateMetrics();
            
            if (path && path.length > 0) {
                this.updateStatus('complete');
            } else {
                this.updateStatus('failed');
            }
        } catch (error) {
            console.error('Algorithm error:', error);
            this.updateStatus('failed');
        }
        
        this.isRunning = false;
        this.currentAlgorithm = null;
    }

    pause() {
        this.isPaused = true;
        this.updateStatus('paused');
    }

    resume() {
        this.isPaused = false;
        this.updateStatus('running');
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentAlgorithm = null;
        this.updateStatus('ready');
    }

    reset() {
        this.stop();
        this.grid.reset();
        this.calculateCellSize();
        this.draw();
        this.metrics = {
            pathLength: 0,
            nodesExplored: 0,
            executionTime: 0,
            startTime: 0
        };
        this.updateMetrics();
        this.updateStatus('ready');
    }

    clearPath() {
        this.stop();
        this.grid.clearPath();
        this.draw();
        this.metrics = {
            pathLength: 0,
            nodesExplored: 0,
            executionTime: 0,
            startTime: 0
        };
        this.updateMetrics();
        this.updateStatus('ready');
    }

    changeGridSize(size) {
        this.grid = new Grid(size);
        this.calculateCellSize();
        this.draw();
        this.metrics = {
            pathLength: 0,
            nodesExplored: 0,
            executionTime: 0,
            startTime: 0
        };
        this.updateMetrics();
        this.updateStatus('ready');
    }

    generateMaze() {
        this.stop();
        this.grid.generateRandomMaze();
        this.draw();
    }

    generateObstacles() {
        this.stop();
        this.grid.generateRandomObstacles();
        this.draw();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateMetrics() {
        document.getElementById('pathLength').textContent = this.metrics.pathLength;
        document.getElementById('nodesExplored').textContent = this.metrics.nodesExplored;
        document.getElementById('executionTime').textContent = Math.round(this.metrics.executionTime) + 'ms';
        
        const algorithmName = this.currentAlgorithm ? 
            applicationData.algorithms.find(a => a.id === this.currentAlgorithm)?.name || 'None' : 'None';
        document.getElementById('currentAlgorithm').textContent = algorithmName;
    }

    updateStatus(status) {
        const statusElement = document.getElementById('algorithmStatus');
        const statusMap = {
            'ready': { text: 'Ready', class: 'status--info' },
            'running': { text: 'Running', class: 'status--running' },
            'paused': { text: 'Paused', class: 'status--paused' },
            'complete': { text: 'Complete', class: 'status--complete' },
            'failed': { text: 'No Path Found', class: 'status--failed' }
        };
        
        const statusInfo = statusMap[status] || statusMap['ready'];
        statusElement.textContent = statusInfo.text;
        statusElement.className = `status ${statusInfo.class}`;
    }

    updateAlgorithmInfo(algorithmId) {
        const algorithm = applicationData.algorithms.find(a => a.id === algorithmId);
        if (!algorithm) return;

        const infoElement = document.getElementById('algorithmInfo');
        const titleElement = document.getElementById('infoTitle');
        
        titleElement.textContent = algorithm.name;
        
        infoElement.innerHTML = `
            <p>${algorithm.description}</p>
            
            <div class="complexity-section">
                <h4>Complexity Analysis</h4>
                <div class="complexity-item">
                    <span class="complexity-label">Time:</span>
                    <span class="complexity-value">${algorithm.timeComplexity}</span>
                </div>
                <div class="complexity-item">
                    <span class="complexity-label">Space:</span>
                    <span class="complexity-value">${algorithm.spaceComplexity}</span>
                </div>
            </div>
            
            <div class="pros-cons-container">
                <div class="pros-list">
                    <h5>Advantages</h5>
                    <ul>
                        ${algorithm.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div class="cons-list">
                    <h5>Disadvantages</h5>
                    <ul>
                        ${algorithm.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <h4>Real-world Applications</h4>
            <ul>
                ${algorithm.applications.map(app => `<li>${app}</li>`).join('')}
            </ul>
        `;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gridCanvas');
    const visualizer = new PathfindingVisualizer(canvas);

    // UI Event Listeners
    const algorithmSelect = document.getElementById('algorithmSelect');
    const heuristicGroup = document.getElementById('heuristicGroup');
    const heuristicSelect = document.getElementById('heuristicSelect');
    const speedSelect = document.getElementById('speedSelect');
    const gridSizeSelect = document.getElementById('gridSizeSelect');
    
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const clearBtn = document.getElementById('clearBtn');
    const generateMazeBtn = document.getElementById('generateMazeBtn');
    const generateObstaclesBtn = document.getElementById('generateObstaclesBtn');

    // Algorithm selection
    algorithmSelect.addEventListener('change', (e) => {
        const algorithm = e.target.value;
        heuristicGroup.style.display = algorithm === 'astar' ? 'block' : 'none';
        visualizer.updateAlgorithmInfo(algorithm);
    });

    // Speed selection
    speedSelect.addEventListener('change', (e) => {
        const speed = applicationData.speeds.find(s => s.id === e.target.value);
        visualizer.animationSpeed = speed ? speed.delay : 50;
    });

    // Grid size selection
    gridSizeSelect.addEventListener('change', (e) => {
        visualizer.changeGridSize(parseInt(e.target.value));
    });

    // Control buttons
    startBtn.addEventListener('click', () => {
        const algorithm = algorithmSelect.value;
        const heuristic = heuristicSelect.value;
        
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        visualizer.runAlgorithm(algorithm, heuristic).then(() => {
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            pauseBtn.textContent = 'Pause';
        });
    });

    pauseBtn.addEventListener('click', () => {
        if (visualizer.isPaused) {
            visualizer.resume();
            pauseBtn.textContent = 'Pause';
        } else {
            visualizer.pause();
            pauseBtn.textContent = 'Resume';
        }
    });

    resetBtn.addEventListener('click', () => {
        visualizer.reset();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
    });

    clearBtn.addEventListener('click', () => {
        visualizer.clearPath();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
    });

    generateMazeBtn.addEventListener('click', () => {
        visualizer.generateMaze();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
    });

    generateObstaclesBtn.addEventListener('click', () => {
        visualizer.generateObstacles();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
    });
});