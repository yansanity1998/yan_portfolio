import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface PullToScanProps {
    onScan: () => void;
}

const PullToScan: React.FC<PullToScanProps> = ({ onScan }) => {
    const [completed, setCompleted] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [maxDrag, setMaxDrag] = useState(0);
    const x = useMotionValue(0);

    // Update drag constraints on mount and resize
    React.useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                // 48px is the handle width
                setMaxDrag(containerRef.current.offsetWidth - 52);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Transform opacity/scale based on drag progress
    const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
    const slideTextOpacity = useTransform(x, [0, maxDrag * 0.5], [0, 1]);
    const iconScale = useTransform(x, [0, maxDrag], [1, 1.2]);
    const progressWidth = useTransform(x, [0, maxDrag], [48, maxDrag + 48]);

    // Handle drag end
    const handleDragEnd = () => {
        if (x.get() > maxDrag * 0.9) { // Increased threshold slightly for better feel
            // Dragged far enough
            setCompleted(true);
            animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 });
            setTimeout(() => {
                onScan();
                // Reset after a delay
                setTimeout(() => {
                    setCompleted(false);
                    x.set(0);
                }, 1000);
            }, 300);
        } else {
            // Snap back
            animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-14 bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-700/50 overflow-hidden shadow-lg shadow-black/20 group">
            {/* Progress Background */}
            <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-600/20 to-rose-500/20"
                style={{ width: progressWidth }}
            />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />

            {/* Instruction Text */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-center text-sm font-medium text-zinc-400 pointer-events-none uppercase tracking-wider pl-[52px]"
                style={{ opacity: textOpacity }}
            >
                Pull to scan my CV
                <svg className="w-4 h-4 ml-2 animate-bounce-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </motion.div>

            {/* Sliding Text (Appears when dragging) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-center text-sm font-medium text-rose-200 pointer-events-none uppercase tracking-wider"
                style={{ opacity: slideTextOpacity }}
            >
                Release to view
            </motion.div>

            {/* Draggable Handle */}
            <motion.div
                className="absolute top-1 left-1 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 border border-zinc-700 group-hover:border-rose-500/50 shadow-md"
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div style={{ scale: iconScale }} className="text-rose-500">
                    {completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 2h3v2h-3v-2zm3 2h3v2h-3v-2zm-3 2h3v2h-3v-2zm3 2h3v2h-3v-2zM8 8h2v2H8V8zm2 2h2v2h-2v-2zm-2 2h2v2H8v-2zm2 2h2v2h-2v-2zm-2-6h2v2H8V6zm6 0h2v2h-2V6zm2 2h2v2h-2V8zm-2 2h2v2h-2v-2z" />
                        </svg>
                    )}
                </motion.div>
            </motion.div>

            {/* Success Flash */}
            <motion.div
                className="absolute inset-0 bg-rose-500/20 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: completed ? 1 : 0 }}
            />
        </div>
    );
};

export default PullToScan;
