# AI Pathfinding Visualizer 🤖🗺️

An interactive web-based application that visualizes and compares different pathfinding algorithms including Breadth-First Search (BFS), Dijkstra's Algorithm, and A* Search. This project demonstrates algorithmic thinking, interactive visualization, and modern web development skills.

## 🚀 Live Demo

**[View Live Application](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/fd2a82ebc9e782a8c69638ae85fd0c8f/659f029b-b258-4a60-ba3f-4675877d1390/index.html)**

## 📋 Table of Contents

- [Features](#features)
- [Algorithms Implemented](#algorithms-implemented)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Algorithm Explanations](#algorithm-explanations)
- [Performance Metrics](#performance-metrics)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Portfolio Impact](#portfolio-impact)

## ✨ Features

### Core Functionality
- **Interactive Grid**: 25x25 customizable grid with click-and-drag wall creation
- **Multiple Algorithms**: BFS, Dijkstra's Algorithm, and A* Search implementations
- **Real-time Visualization**: Animated algorithm execution with adjustable speed
- **Performance Analytics**: Live metrics including path length, nodes explored, and execution time
- **Maze Generation**: Random maze creation and obstacle placement tools

### Advanced Features
- **Heuristic Options**: Manhattan and Euclidean distance heuristics for A*
- **Algorithm Comparison**: Side-by-side performance analysis
- **Interactive Controls**: Play, pause, step-through, and reset functionality
- **Responsive Design**: Mobile-friendly interface with touch controls
- **Educational Content**: Detailed algorithm explanations and complexity analysis

### User Interface
- **Clean Design**: Modern, professional interface suitable for portfolio presentation
- **Intuitive Controls**: Easy-to-use toolbar with clear visual feedback
- **Color-coded Visualization**: Distinct colors for different cell types and algorithm states
- **Real-time Metrics**: Live performance dashboard with comparative statistics

## 🧠 Algorithms Implemented

### 1. Breadth-First Search (BFS)
- **Purpose**: Finds shortest path in unweighted graphs
- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V)
- **Guarantees**: Optimal solution for unweighted graphs
- **Visualization**: Level-by-level exploration pattern

### 2. Dijkstra's Algorithm
- **Purpose**: Single-source shortest path for weighted graphs
- **Time Complexity**: O((V + E) log V)
- **Space Complexity**: O(V)
- **Guarantees**: Optimal solution for non-negative weights
- **Visualization**: Uniform expansion from source

### 3. A* Search Algorithm
- **Purpose**: Heuristic-guided pathfinding
- **Time Complexity**: O(b^d) where b is branching factor, d is depth
- **Space Complexity**: O(b^d)
- **Guarantees**: Optimal with admissible heuristic
- **Heuristics**:
  - **Manhattan Distance**: |x₁-x₂| + |y₁-y₂| (grid-based movement)
  - **Euclidean Distance**: √((x₁-x₂)² + (y₁-y₂)²) (diagonal movement)

## 💻 Technologies Used

### Frontend
- **HTML5**: Semantic markup and canvas element
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript ES6+**: Clean, modular code with classes and modern syntax
- **Canvas API**: High-performance grid rendering and animation

### Data Structures & Algorithms
- **Priority Queues**: Efficient implementation for Dijkstra and A*
- **Graph Representation**: Adjacency-based grid structure
- **Pathfinding Logic**: Optimized algorithm implementations

### Development Tools
- **Modular Architecture**: Separation of concerns with distinct classes
- **Event-Driven Design**: Responsive user interaction handling
- **Performance Optimization**: Efficient rendering and memory management

## 🛠️ Installation

### Option 1: Direct Access
Visit the live demo at: [Pathfinding Visualizer](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/fd2a82ebc9e782a8c69638ae85fd0c8f/659f029b-b258-4a60-ba3f-4675877d1390/index.html)

### Option 2: Local Development
1. **Clone or download** the project files
2. **Extract** the files to a local directory
3. **Open** `index.html` in a modern web browser
4. **No build process required** - works with pure HTML/CSS/JavaScript

### Option 3: Deploy to Your Platform
Deploy to any static hosting service:

#### GitHub Pages
```bash
# Upload files to GitHub repository
# Enable GitHub Pages in repository settings
# Access via: https://yourusername.github.io/repository-name
```

#### Netlify
```bash
# Drag and drop the files to Netlify dashboard
# Or connect GitHub repository for continuous deployment
```

#### Vercel
```bash
# Install Vercel CLI: npm i -g vercel
# Run: vercel
# Follow prompts to deploy
```

## 📖 Usage

### Getting Started
1. **Open the application** in your web browser
2. **Default setup**: 25x25 grid with start point (green) at top-left and end point (red) at bottom-right
3. **Create obstacles**: Click and drag on empty cells to create walls
4. **Choose algorithm**: Select BFS, Dijkstra, or A* from the dropdown
5. **Start visualization**: Click "Start Algorithm" to begin

### Interactive Controls

#### Grid Manipulation
- **Left Click + Drag**: Create/remove walls
- **Right Click**: Place start point (green)
- **Ctrl + Click**: Place end point (red)
- **Clear Grid**: Remove all obstacles
- **Generate Maze**: Create random maze pattern

#### Algorithm Controls
- **Algorithm Selection**: Choose between BFS, Dijkstra, A*
- **Heuristic Selection**: For A*, choose Manhattan or Euclidean distance
- **Speed Control**: Adjust animation speed (slow, medium, fast, instant)
- **Play/Pause**: Control algorithm execution
- **Step Mode**: Execute one step at a time
- **Reset**: Clear algorithm state, keep obstacles

#### Visualization Features
- **Color Coding**:
  - 🟢 Green: Start point
  - 🔴 Red: End point
  - ⚫ Black: Walls/obstacles
  - 🔵 Blue: Explored nodes
  - 🟡 Yellow: Final path
  - ⚪ White: Unvisited nodes

### Advanced Usage

#### Algorithm Comparison
1. **Run first algorithm** on a maze
2. **Note the metrics** (path length, nodes explored, time)
3. **Reset** without clearing the maze
4. **Run different algorithm** on same maze
5. **Compare results** using the metrics dashboard

#### Performance Analysis
- **Path Length**: Number of nodes in the shortest path
- **Nodes Explored**: Total nodes visited during search
- **Execution Time**: Algorithm running time in milliseconds
- **Efficiency Ratio**: Nodes explored vs path length

## 🔬 Algorithm Explanations

### Breadth-First Search (BFS)
BFS explores the graph level by level, guaranteeing the shortest path in unweighted graphs. It uses a queue (FIFO) data structure to maintain the frontier of nodes to explore.

**When to use**: 
- Unweighted graphs
- Finding shortest path in terms of number of edges
- When you need to explore all nodes at a given distance

**Advantages**:
- Guarantees optimal solution
- Simple to implement and understand
- Works well for unweighted scenarios

**Disadvantages**:
- Can be slow for large search spaces
- Uses significant memory
- Explores unnecessarily in all directions

### Dijkstra's Algorithm
Dijkstra's algorithm finds the shortest path from a source to all other nodes in a weighted graph. It maintains a priority queue of nodes ordered by their distance from the source.

**When to use**:
- Weighted graphs with non-negative weights
- Single-source shortest path problems
- Network routing protocols

**Advantages**:
- Guarantees optimal solution
- Works with weighted edges
- Efficient for dense graphs

**Disadvantages**:
- Slower than A* for goal-directed search
- Explores nodes in all directions
- Cannot handle negative edge weights

### A* Search Algorithm
A* combines the best features of Dijkstra's algorithm and Greedy Best-First Search. It uses a heuristic function to guide the search toward the goal, making it more efficient than uninformed search algorithms.

**Cost Function**: f(n) = g(n) + h(n)
- **g(n)**: Actual cost from start to node n
- **h(n)**: Heuristic estimate from node n to goal
- **f(n)**: Total estimated cost of path through node n

**Heuristic Functions**:

#### Manhattan Distance
- **Formula**: |x₁-x₂| + |y₁-y₂|
- **Use case**: Grid-based movement (no diagonals)
- **Properties**: Admissible for 4-directional movement

#### Euclidean Distance
- **Formula**: √((x₁-x₂)² + (y₁-y₂)²)
- **Use case**: Continuous space or diagonal movement allowed
- **Properties**: Admissible for 8-directional movement

**When to use**:
- Goal-directed pathfinding
- Game AI and robotics
- When you have a good heuristic function

**Advantages**:
- Very efficient with good heuristics
- Optimal with admissible heuristics
- Balances optimality and efficiency

**Disadvantages**:
- Requires domain knowledge for heuristics
- More complex to implement
- Performance depends on heuristic quality

## 📊 Performance Metrics

The application tracks and displays several key performance indicators:

### Core Metrics
- **Path Length**: Number of nodes in the final path
- **Nodes Explored**: Total nodes visited during algorithm execution
- **Execution Time**: Algorithm running time in milliseconds
- **Success Rate**: Whether a path was found

### Efficiency Metrics
- **Exploration Efficiency**: Path length / Nodes explored
- **Time Efficiency**: Path length / Execution time
- **Search Efficiency**: Goal distance / Nodes explored

### Comparative Analysis
The metrics dashboard allows for easy comparison between algorithms:
- **A*** typically explores fewer nodes than BFS/Dijkstra
- **BFS** guarantees shortest path but explores more nodes
- **Dijkstra** performs similarly to BFS in unweighted grids
- **Heuristic choice** significantly impacts A* performance

## 📁 Project Structure

```
pathfinding-visualizer/
├── index.html              # Main HTML structure
├── style.css               # CSS styling and responsive design
├── app.js                  # Main application logic
├── README.md               # This documentation
└── assets/                 # Additional resources
    ├── screenshots/        # Application screenshots
    └── examples/           # Example maze patterns
```

### Key Components

#### HTML Structure
- **Header**: Application title and description
- **Control Panel**: Algorithm selection and settings
- **Grid Container**: Interactive pathfinding grid
- **Metrics Dashboard**: Real-time performance data
- **Info Panel**: Algorithm explanations and help

#### CSS Architecture
- **CSS Variables**: Consistent color scheme and theming
- **Responsive Design**: Mobile-friendly layout
- **Grid System**: Flexible grid rendering
- **Animations**: Smooth transitions and visual feedback

#### JavaScript Modules
- **PathfindingVisualizer**: Main application class
- **Grid**: Grid management and rendering
- **Algorithms**: BFS, Dijkstra, and A* implementations
- **UI**: User interface event handling
- **Utils**: Helper functions and data structures

## 🎯 Portfolio Impact

### Technical Skills Demonstrated

#### Algorithm Implementation
- **Data Structures**: Priority queues, graphs, sets
- **Algorithm Design**: Pathfinding, graph traversal, heuristic search
- **Complexity Analysis**: Time and space complexity understanding
- **Optimization**: Efficient algorithm implementations

#### Frontend Development
- **Modern JavaScript**: ES6+ features, modular design
- **Canvas Programming**: High-performance rendering
- **Responsive Design**: Mobile-first, accessible interface
- **User Experience**: Intuitive controls and visual feedback

#### Software Engineering
- **Clean Code**: Well-structured, documented codebase
- **Modular Architecture**: Separation of concerns
- **Performance Optimization**: Efficient rendering and memory usage
- **Testing**: Edge case handling and error management

### Real-World Applications

#### Game Development
- **NPC Pathfinding**: AI characters navigating game worlds
- **Strategy Games**: Unit movement and tactical planning
- **Puzzle Games**: Automated solver systems

#### Robotics and AI
- **Robot Navigation**: Autonomous vehicle pathfinding
- **Motion Planning**: Robotic arm movement optimization
- **Swarm Intelligence**: Multi-agent coordination

#### Geographic Information Systems (GIS)
- **Route Planning**: GPS navigation systems
- **Traffic Optimization**: Dynamic route calculation
- **Emergency Services**: Optimal resource allocation

### Industry Relevance
This project demonstrates skills highly valued by tech companies:
- **Algorithmic Thinking**: Problem-solving with optimal solutions
- **Interactive Visualization**: Data presentation and user engagement
- **Performance Optimization**: Efficient code for real-time applications
- **Educational Communication**: Explaining complex concepts clearly

## 🤝 Contributing

### Development Setup
1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Contribution Ideas
- **Additional Algorithms**: Implement DFS, Greedy Best-First Search
- **Advanced Heuristics**: Custom heuristic functions
- **3D Visualization**: Three-dimensional pathfinding
- **Performance Benchmarks**: Automated algorithm comparison
- **Educational Content**: Interactive tutorials and guides

## 📈 Future Enhancements

### Algorithm Extensions
- **Bidirectional Search**: Search from both start and end
- **Jump Point Search**: Optimized A* for uniform grids
- **Hierarchical Pathfinding**: Multi-level pathfinding for large maps
- **Dynamic Pathfinding**: Real-time obstacle updates

### Visualization Improvements
- **3D Grid**: Three-dimensional pathfinding visualization
- **Weighted Cells**: Variable movement costs
- **Multiple Agents**: Multi-agent pathfinding scenarios
- **Path Smoothing**: Post-processing for natural movement

### Interactive Features
- **Custom Heuristics**: User-defined heuristic functions
- **Maze Import/Export**: Save and load maze configurations
- **Algorithm Racing**: Real-time algorithm comparison
- **Performance Profiling**: Detailed execution analysis

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Algorithm Resources**: GeeksforGeeks, Stanford AI Course Materials
- **Visualization Inspiration**: Pathfinding Visualizer by Clement Mihailescu
- **Educational Content**: Introduction to Algorithms (CLRS)
- **Web Technologies**: MDN Web Docs, HTML5 Canvas tutorials

---

**Built with ❤️ for learning and demonstrating algorithmic thinking in interactive web applications.**

For questions or suggestions, please create an issue or reach out through the repository.