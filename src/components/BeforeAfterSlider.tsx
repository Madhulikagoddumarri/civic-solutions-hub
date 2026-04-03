import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

interface Props {
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({ beforeLabel = "Before", afterLabel = "After" }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, x)));
  }, []);

  const handleStart = () => { isDragging.current = true; };
  const handleEnd = () => { isDragging.current = false; };

  return (
    <div
      ref={containerRef}
      className="glass rounded-2xl overflow-hidden relative h-48 select-none neu-raised cursor-col-resize"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Before side */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="text-center">
          <span className="text-4xl block mb-2">🕳️</span>
          <span className="text-sm font-semibold text-destructive/80">Pothole — Reported</span>
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">
          {beforeLabel}
        </span>
      </div>

      {/* After side */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-success/10 to-success/5 flex items-center justify-center"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <div className="text-center">
          <span className="text-4xl block mb-2">✅</span>
          <span className="text-sm font-semibold text-success/80">Road Repaired</span>
        </div>
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-success/20 text-success">
          {afterLabel}
        </span>
      </div>

      {/* Divider */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-purple via-neon-teal to-neon-purple z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass glow-teal flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-foreground" />
        </div>
      </motion.div>
    </div>
  );
}
