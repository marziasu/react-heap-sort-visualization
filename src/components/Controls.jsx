import { motion } from 'framer-motion';
import './Controls.css';

const Controls = ({
    onAddPerson,
    onHeapSort,
    onReset,
    onStepSort,
    onToggleDarkMode,
    onTogglePause,
    onNextStep,
    onPreviousStep,
    onSpeedChange,
    onShowImmediateSortedList,
    isSorting,
    isPaused,
    heapSize,
    darkMode,
    animationSpeed,
    showImmediateSortedList,
    currentStep,
    totalSteps
}) => {
    return (
        <div className="controls-container">
            <div className="control-section">
                <h3 className="section-title">
                    <span className="title-icon">🎮</span>
                    Heap Controls
                </h3>

                <div className="control-buttons">
                    <motion.button
                        className="control-button primary"
                        onClick={onAddPerson}
                        disabled={isSorting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="button-icon">➕</span>
                        Add Person
                    </motion.button>

                    <motion.button
                        className="control-button secondary"
                        onClick={onHeapSort}
                        disabled={isSorting || heapSize === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="button-icon">▶️</span>
                        Run Heap Sort
                    </motion.button>

                    <motion.button
                        className={`control-button preview ${showImmediateSortedList ? 'active' : ''}`}
                        onClick={onShowImmediateSortedList}
                        disabled={heapSize === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={showImmediateSortedList ? "Hide sorted list" : "Show sorted list immediately without animation"}
                    >
                        <span className="button-icon">{showImmediateSortedList ? '🙈' : '👁️'}</span>
                        {showImmediateSortedList ? 'Hide Preview' : 'Preview Sorted'}
                    </motion.button>

                    <motion.button
                        className="control-button tertiary"
                        onClick={onStepSort}
                        disabled={isSorting || heapSize === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="button-icon">⏭️</span>
                        Step Extract
                    </motion.button>

                    <motion.button
                        className="control-button reset"
                        onClick={onReset}
                        disabled={false}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="button-icon">🔄</span>
                        Reset
                    </motion.button>
                </div>

                {/* Animation Controls - Only visible during sorting */}
                {isSorting && (
                    <motion.div
                        className="animation-controls"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h4 className="animation-title">
                            <span className="animation-icon">⚡</span>
                            Animation Controls
                        </h4>

                        <div className="playback-controls">
                            <motion.button
                                className="playback-button"
                                onClick={onPreviousStep}
                                disabled={currentStep <= 0}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Previous step"
                            >
                                ⏮️
                            </motion.button>

                            <motion.button
                                className={`playback-button play-pause ${isPaused ? 'paused' : 'playing'}`}
                                onClick={onTogglePause}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title={isPaused ? 'Resume' : 'Pause'}
                            >
                                {isPaused ? '▶️' : '⏸️'}
                            </motion.button>

                            <motion.button
                                className="playback-button"
                                onClick={onNextStep}
                                disabled={currentStep >= totalSteps - 1}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Next step"
                            >
                                ⏭️
                            </motion.button>
                        </div>

                        <div className="progress-info">
                            <span className="step-counter">
                                Step {currentStep + 1} / {totalSteps}
                            </span>
                        </div>

                        <div className="speed-control">
                            <label className="speed-label">Speed:</label>
                            <div className="speed-buttons">
                                <motion.button
                                    className={`speed-button ${animationSpeed === 400 ? 'active' : ''}`}
                                    onClick={() => onSpeedChange(400)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    2x
                                </motion.button>
                                <motion.button
                                    className={`speed-button ${animationSpeed === 800 ? 'active' : ''}`}
                                    onClick={() => onSpeedChange(800)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    1x
                                </motion.button>
                                <motion.button
                                    className={`speed-button ${animationSpeed === 1200 ? 'active' : ''}`}
                                    onClick={() => onSpeedChange(1200)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    0.5x
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="info-section">
                <div className="info-card">
                    <div className="info-label">Heap Size</div>
                    <motion.div
                        className="info-value"
                        key={heapSize}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {heapSize}
                    </motion.div>
                </div>

                <motion.button
                    className="dark-mode-toggle"
                    onClick={onToggleDarkMode}
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {darkMode ? '☀️' : '🌙'}
                </motion.button>
            </div>
        </div>
    );
};

export default Controls;
