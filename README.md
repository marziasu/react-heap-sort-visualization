# 🎯 Max-Heap Visualizer

An interactive, production-level React application that visualizes max-heap data structures and heap sort operations with beautiful animations.

![Heap Visualizer](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-purple?logo=framer)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Functionality
- 🌳 **Binary Tree Visualization**: Real-time visualization of heap as a binary tree structure
- ➕ **Dynamic Insertion**: Add people with custom weights and watch heapify-up animation
- 📊 **Heap Sort**: Step-by-step visualization of complete heap sort algorithm
- ⏭️ **Step Extract**: Extract maximum element one at a time with heapify-down
- 🔄 **Reset**: Return to initial 30-person dataset
- 💾 **Export**: Download sorted results as JSON

### Visual Excellence
- 🎨 **Modern Design**: Gradient backgrounds, glassmorphism, and premium aesthetics
- ✨ **Smooth Animations**: Powered by Framer Motion for fluid transitions
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎭 **Interactive Nodes**: Hover effects and click interactions
- 💡 **Real-time Highlights**: Visual feedback during heap operations

### Technical Features
- ⚡ **Pure Frontend**: No backend required, all logic in JavaScript
- 🔧 **Custom Heap Implementation**: Manual heap operations without external libraries
- 🎯 **Auto ID Generation**: Sequential person IDs (31, 32, 33...)
- ✅ **Input Validation**: Comprehensive error handling
- 🔔 **Notifications**: Toast-style feedback for all actions
- 📏 **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone or navigate to the project directory:
```bash
cd heap-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

### Adding People
1. Enter a weight (1-500 kg) in the input field
2. Click "Add to Heap" or press Enter
3. Watch the new node insert and bubble up to maintain max-heap property

### Heap Sort
1. Click "Run Heap Sort" to automatically extract all elements
2. Watch step-by-step animations as each maximum is extracted
3. See the sorted list build up in descending order by weight

### Step-by-Step Extraction
1. Click "Step Extract" to extract one person at a time
2. Observe heapify-down operation maintaining heap property
3. Build sorted list gradually

### Reset
- Click "Reset" to restore the initial 30-person dataset

### Dark Mode
- Click the sun/moon icon to toggle dark mode

## 🏗️ Architecture

### Project Structure
```
heap-visualizer/
├── src/
│   ├── components/
│   │   ├── AddPersonForm.jsx      # Form for adding new people
│   │   ├── AddPersonForm.css
│   │   ├── Controls.jsx            # Control panel with buttons
│   │   ├── Controls.css
│   │   ├── HeapNode.jsx            # Individual heap node component
│   │   ├── HeapNode.css
│   │   ├── HeapTree.jsx            # Tree visualization component
│   │   ├── HeapTree.css
│   │   ├── SortedList.jsx          # Sorted results display
│   │   └── SortedList.css
│   ├── data/
│   │   └── initialData.js          # 30-person initial dataset
│   ├── utils/
│   │   └── heapOperations.js       # Max-heap implementation
│   ├── App.jsx                     # Main application component
│   ├── App.css
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
└── README.md
```

### Data Structure

#### Person Object
```javascript
{
  personId: number,  // Unique identifier
  weight: number     // Weight in kg (1-500)
}
```

### Heap Operations

#### MaxHeap Class
- `buildHeap(arr)` - Build heap from array using bottom-up approach
- `insert(person)` - Insert person and heapify-up
- `extractMax()` - Remove and return maximum element
- `heapifyUp(idx)` - Bubble up element to maintain heap property
- `heapifyDown(idx)` - Bubble down element after extraction
- `getHeap()` - Get current heap array
- `size()` - Get heap size
- `peek()` - View maximum without extraction

#### Heap Sort Function
- `heapSort(heap)` - Extract all elements in sorted order with steps

## 🎨 Design System

### Color Palette
- **Primary**: Indigo gradient (#6366f1 → #4f46e5)
- **Secondary**: Purple gradient (#8b5cf6 → #7c3aed)
- **Success**: Green gradient (#10b981 → #059669)
- **Accent**: Pink gradient (#ec4899 → #db2777)
- **Warning**: Amber gradient (#f59e0b → #d97706)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Animations
- Node highlights during operations
- Smooth transitions on state changes
- Staggered list animations
- Spring physics for natural movement

## 🧪 Algorithm Details

### Max-Heap Property
For every node i (except root):
```
heap[parent(i)].weight >= heap[i].weight
```

### Heapify-Up (Bubble Up)
1. Compare new node with parent
2. If child > parent, swap
3. Repeat until heap property restored

### Heapify-Down (Bubble Down)
1. Compare node with both children
2. Swap with larger child if needed
3. Repeat until heap property restored

### Heap Sort Complexity
- **Time**: O(n log n)
- **Space**: O(1) (in-place after initial build)

## 🔧 Technologies Used

- **React 18.3** - UI framework
- **Framer Motion 11.11** - Animation library
- **Vite 7.3** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with modern features
- **Google Fonts (Inter)** - Typography

## 📊 Initial Dataset

The application starts with 30 people with predefined weights. This ensures consistent testing and demonstration of heap operations.

```javascript
[
  { personId: 1, weight: 64 },
  { personId: 2, weight: 53 },
  // ... 28 more people
  { personId: 30, weight: 77 }
]
```

## 🎯 Production Features

✅ **Performance Optimized**: Efficient rendering with React hooks
✅ **Error Handling**: Comprehensive validation and user feedback
✅ **Responsive Design**: Works on all screen sizes
✅ **Accessibility**: Semantic HTML and keyboard navigation
✅ **SEO Ready**: Meta tags and proper structure
✅ **Modern Browser Support**: ES6+ with Vite compilation
✅ **No External API**: Fully self-contained application

## 📝 License

MIT License - Feel free to use this project for learning and production!

## 👨‍💻 Developer Notes

This project demonstrates:
- Advanced React patterns (hooks, state management)
- Algorithm visualization techniques
- Animation orchestration with Framer Motion
- Custom data structure implementation
- Production-level UI/UX design
- Responsive and accessible web development

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌟 Acknowledgments

- Heap algorithm implementation based on classic CS principles
- UI/UX inspired by modern design trends
- Built as a comprehensive educational tool for data structure visualization

---

**Built with ❤️ using React + Framer Motion**
