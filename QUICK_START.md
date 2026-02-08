# 🚀 Max-Heap Visualizer Quick Start

Welcome to the ultimate Heap Sort visualization tool! This guide will help you master the application in less than 2 minutes.

---

## ⚡ 1. Launching the App
If you haven't started yet, run these commands in your terminal:
```bash
npm install
npm run dev
```
Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🎮 2. Interactive Features

### ➕ Add a Person
- **Manual**: Type a weight (1-500) in the input box and press **Enter**.
- **Random**: Press the **"Add Random"** button in the control panel.
- *Watch the node "Heapify-Up" into its correct position!*

### 🔄 Sorting the Heap
- Press **"▶️ Run Heap Sort"** to watch the automated process.
- **Pause** at any time to inspect the comparisons.
- Use **"⏮️ Prev"** and **"⏭️ Next"** buttons while paused for manual step-by-step control.

### ⚡ Speed Adjustment
- Move the **"Animation Speed"** slider.
- **Slow (2.0s)** is perfect for learning the algorithm.
- **Fast (0.5s)** is great for small heaps or quick reviews.

---

## 🏆 3. Pro Tips

- **Check Results Early**: Click **"👁️ Preview"** to show or hide the final sorted list without running the full animation.
- **Detailed Inspection**: Click on any node in the tree or the sorted list to open a **Detail Modal** with more information.
- **Dark Mode**: Click the **🌙** moon icon in the header for a premium dark experience that saves your eyes!
- **Data Export**: Once sorting is done, use the **"💾 Export"** button to save a JSON report of the results.

---

## 📁 4. Project Roadmap
- `src/utils/heapOperations.js` - The brain (Max-Heap logic).
- `src/components/HeapTree.jsx` - The heart (Tree visualization).
- `src/App.jsx` - The nervous system (State management).

---

## 🛑 5. Troubleshooting
- **Animations stuck?** Click the **"🔄 Reset"** button to instantly restore the initial system state.
- **Port Busy?** If `5173` is taken, check your terminal for the new URL or kill the existing process.

---

**Ready to start? Let's Sort! 🚀**
