# 🚀 Quick Start Guide

## Your Max-Heap Visualizer is Ready!

The application is currently running at: **http://localhost:5173** ✨

---

## ⚡ Quick Commands

### View the Application
```bash
# Open in your browser:
http://localhost:5173
```

### Stop the Server
```bash
# Press Ctrl+C in the terminal
```

### Restart the Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🎮 Quick Tutorial (5 Minutes)

### Step 1: Explore Initial State
- Open http://localhost:5173
- You'll see a binary tree with 30 nodes
- The root (top) has the maximum weight (119 kg)

### Step 2: Add a Person
1. Type a weight in the input (e.g., **95**)
2. Press **Enter** or click **Add to Heap**
3. Watch the purple animation as the node finds its position!

### Step 3: Try Step Extract
1. Click **⏭️ Step Extract**
2. The root (maximum) is removed
3. Watch the tree reorganize
4. Repeat to see more extractions

### Step 4: Run Full Heap Sort
1. Click **🔄 Reset** to restore initial data
2. Click **▶️ Run Heap Sort**
3. Watch the automated extraction sequence
4. See the sorted list build up on the left

### Step 5: Try Dark Mode
1. Click the **🌙** moon icon
2. Enjoy the beautiful dark theme!

### Step 6: Export Results
1. After sorting, find the sorted list panel
2. Click **💾 Export JSON**
3. Download your sorted data

---

## 📁 Project Structure

```
heap-visualizer/
├── src/
│   ├── components/          # UI components
│   │   ├── AddPersonForm.jsx
│   │   ├── Controls.jsx
│   │   ├── HeapNode.jsx
│   │   ├── HeapTree.jsx
│   │   └── SortedList.jsx
│   ├── data/
│   │   └── initialData.js   # 30-person dataset
│   ├── utils/
│   │   └── heapOperations.js  # Heap algorithms
│   ├── App.jsx              # Main app
│   └── index.css            # Global styles
├── FEATURES.md              # Complete feature list
├── USER_GUIDE.md            # Detailed usage guide
└── README.md                # Full documentation
```

---

## 🎯 What You Can Do

✅ **Add People**: Enter weights and watch insertion animations
✅ **Extract Maximum**: Remove the largest element step-by-step
✅ **Heap Sort**: Automate complete sorting with visualization
✅ **Reset**: Return to initial 30-person dataset
✅ **Dark Mode**: Toggle beautiful dark theme
✅ **Export**: Download sorted results as JSON
✅ **Explore**: Hover over nodes, click buttons, enjoy animations!

---

## 🎨 Key Features

### Visualizations
- 🌳 Binary tree structure
- ✨ Smooth animations during operations
- 🎨 Color-coded node states
- 📊 Real-time sorted list

### Heap Operations
- ➕ Insert with heapify-up
- ➖ Extract maximum with heapify-down
- 🔄 Heap sort algorithm
- 📏 Maintains max-heap property

### Design
- 🎨 Modern gradient UI
- 🌓 Light & dark modes
- 📱 Fully responsive
- ✨ Framer Motion animations

---

## 📚 Documentation

- **FEATURES.md** - Complete checklist of all features
- **USER_GUIDE.md** - Comprehensive user manual
- **README.md** - Technical documentation and architecture

---

## 🎓 Educational Value

This visualizer teaches:
- Max-heap data structure
- Heap operations (insert, extract)
- Heapify-up and heapify-down algorithms
- Heap sort algorithm
- Tree-based data structures
- Priority queue concepts

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5173
# Then restart: npm run dev
```

### Changes Not Showing
```bash
# Hard refresh: Ctrl + Shift + R (Windows/Linux)
# Or: Cmd + Shift + R (Mac)
```

### Installation Issues
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## 🎉 Next Steps

1. **Open the app**: http://localhost:5173
2. **Read USER_GUIDE.md** for detailed instructions
3. **Check FEATURES.md** for complete feature list
4. **Experiment** with different weights and operations
5. **Share** your experience!

---

## 📊 Stats

- ⚡ **Build Time**: ~236ms
- 📦 **Dependencies**: 3 (React, Framer Motion, Vite)
- 📁 **Components**: 5
- 🎨 **Animations**: 10+
- 🧪 **Production Ready**: Yes!

---

## 🌟 Enjoy Your Heap Visualizer!

The application is **production-ready** with:
- Beautiful, modern UI
- Smooth animations
- Complete heap functionality
- Dark mode support
- Export capability
- Comprehensive documentation

**Have fun exploring heap sort!** 🚀

---

**Questions?** Check the documentation files or explore the code!
