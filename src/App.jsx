import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeapTree from './components/HeapTree';
import Controls from './components/Controls';
import AddPersonForm from './components/AddPersonForm';
import SortedList from './components/SortedList';
import { MaxHeap, heapSort } from './utils/heapOperations';
import { initialPeople } from './data/initialData';
import './App.css';

function App() {
  const [heap, setHeap] = useState(null);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [sortedPeople, setSortedPeople] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [sortSteps, setSortSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [nextPersonId, setNextPersonId] = useState(31);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showImmediateSortedList, setShowImmediateSortedList] = useState(false);

  // Initialize heap on mount
  useEffect(() => {
    const newHeap = new MaxHeap(initialPeople);
    setHeap(newHeap);
  }, []);

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add new person to heap
  const handleAddPerson = async (weight) => {
    if (!heap || isSorting) return;

    const newPerson = {
      personId: nextPersonId,
      weight: weight,
    };

    const steps = heap.insertWithSteps(newPerson);
    setNextPersonId(nextPersonId + 1);

    setIsSorting(true); // Treat add animation as a sorting-like locked state
    for (const step of steps) {
      setHeap(new MaxHeap(step.heap));
      setHighlightedIndices(step.highlighted);
      showNotification(step.description, 'info');
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    setIsSorting(false);
    setHighlightedIndices([]);
    showNotification(`Added Person ${newPerson.personId} successfully`, 'success');
  };

  // Perform complete heap sort with step-by-step intuition
  const handleHeapSort = async () => {
    if (!heap || heap.size() === 0 || isSorting) return;

    setIsSorting(true);
    setIsPaused(false);
    isPausedRef.current = false;
    setSortedPeople([]);
    setShowImmediateSortedList(false);
    showNotification('Starting heap sort steps...', 'info');

    const { allSteps, sorted } = heapSortWithIntuitionSteps(heap.getHeap());
    setSortSteps(allSteps);

    for (let i = 0; i < allSteps.length; i++) {
      while (isPausedRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const step = allSteps[i];
      setCurrentStepIndex(i);
      setHeap(new MaxHeap(step.heap));
      setHighlightedIndices(step.highlighted);
      setSortedPeople(step.sortedSoFar || []);

      if (step.description) {
        showNotification(step.description, 'info');
      }

      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    setHighlightedIndices([]);
    setIsSorting(false);
    setSortSteps([]);
    showNotification(`Heap sort complete!`, 'success');
  };

  // Extract one person (step-by-step intuition)
  const handleStepSort = async () => {
    if (!heap || heap.size() === 0 || isSorting) return;

    setIsSorting(true);
    const steps = heap.extractMaxWithSteps();

    for (const step of steps) {
      setHeap(new MaxHeap(step.heap));
      setHighlightedIndices(step.highlighted);
      if (step.extracted) {
        setSortedPeople([...sortedPeople, step.extracted]);
      }
      showNotification(step.description || 'Extracting...', 'info');
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    setHighlightedIndices([]);
    setIsSorting(false);
  };

  // Show full sorted list immediately (preview)
  const handleShowImmediateSortedList = () => {
    if (!heap || heap.size() === 0) return;

    const tempHeap = new MaxHeap(heap.getHeap());
    const { sorted } = heapSortWithIntuitionSteps(tempHeap.getHeap());
    setSortedPeople(sorted);
    setShowImmediateSortedList(true);
    showNotification(`Preview: ${sorted.length} people sorted by weight`, 'info');
  };

  // Toggle pause/resume
  const handleTogglePause = () => {
    const newPauseState = !isPausedRef.current;
    isPausedRef.current = newPauseState;
    setIsPaused(newPauseState);
    showNotification(newPauseState ? 'Paused' : 'Resumed', 'info');
  };

  // Go to next step manually
  const handleNextStep = () => {
    if (!isSorting || currentStepIndex >= sortSteps.length - 1) return;

    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);
    const step = sortSteps[nextIndex];

    setHeap(new MaxHeap(step.heap));
    setHighlightedIndices(step.highlighted);
    setSortedPeople(step.sortedSoFar || []);
  };

  // Go to previous step manually
  const handlePreviousStep = () => {
    if (!isSorting || currentStepIndex <= 0) return;

    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);
    const step = sortSteps[prevIndex];

    setHeap(new MaxHeap(step.heap));
    setHighlightedIndices(step.highlighted);
    setSortedPeople(step.sortedSoFar || []);
  };

  // Change animation speed
  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    showNotification(`Speed: ${speed}ms per step`, 'info');
  };

  // Reset to initial state
  const handleReset = () => {
    if (isSorting) return;

    const newHeap = new MaxHeap(initialPeople);
    setHeap(newHeap);
    setHighlightedIndices([]);
    setSortedPeople([]);
    setNextPersonId(31);
    showNotification('Reset to initial dataset', 'info');
  };

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  if (!heap) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          🌀
        </motion.div>
        <p>Loading Heap Visualizer...</p>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">
        <motion.header
          className="app-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">🎯</span>
              Max-Heap Visualizer
            </h1>
            <p className="app-subtitle">
              Interactive heap sort visualization with 30-person dataset
            </p>
          </div>
        </motion.header>

        <AnimatePresence>
          {notification && (
            <motion.div
              className={`notification ${notification.type}`}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <span className="notification-icon">
                {notification.type === 'success' ? '✅' :
                  notification.type === 'error' ? '❌' : 'ℹ️'}
              </span>
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="app-content">
          <div className="left-panel">
            <AddPersonForm
              onAddPerson={handleAddPerson}
              nextPersonId={nextPersonId}
              disabled={isSorting}
            />

            <Controls
              onAddPerson={() => handleAddPerson(Math.floor(Math.random() * 100) + 50)}
              onHeapSort={handleHeapSort}
              onReset={handleReset}
              onStepSort={handleStepSort}
              onToggleDarkMode={handleToggleDarkMode}
              onTogglePause={handleTogglePause}
              onNextStep={handleNextStep}
              onPreviousStep={handlePreviousStep}
              onSpeedChange={handleSpeedChange}
              onShowImmediateSortedList={handleShowImmediateSortedList}
              isSorting={isSorting}
              isPaused={isPaused}
              heapSize={heap.size()}
              darkMode={darkMode}
              animationSpeed={animationSpeed}
              currentStep={currentStepIndex}
              totalSteps={sortSteps.length}
            />
          </div>

          <div className="right-panel">
            <motion.div
              className="tree-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="tree-header">
                <h2 className="tree-title">
                  <span className="tree-icon">🌲</span>
                  Binary Heap Tree
                </h2>
                {isSorting && (
                  <motion.div
                    className="sorting-badge"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚡ Sorting...
                  </motion.div>
                )}
              </div>

              <HeapTree
                heap={heap.getHeap()}
                highlightedIndices={highlightedIndices}
                isPaused={isPaused}
              />
            </motion.div>

            {/* Sorted List Moved Here (Below Tree) */}
            {sortedPeople.length > 0 && (
              <SortedList sortedPeople={sortedPeople} />
            )}
          </div>
        </div>

        <motion.footer
          className="app-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Built with React + Framer Motion | Max-Heap Data Structure</p>
          <p className="footer-info">
            Production-level heap sort visualization with step-by-step animations
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
