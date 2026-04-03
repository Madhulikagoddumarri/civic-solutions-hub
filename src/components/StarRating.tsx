import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  rating: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
}

export default function StarRating({ rating, onChange, size = "md" }: Props) {
  const s = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.button
          key={i}
          whileHover={onChange ? { scale: 1.2 } : {}}
          whileTap={onChange ? { scale: 0.9 } : {}}
          onClick={() => onChange?.(i)}
          disabled={!onChange}
          className="disabled:cursor-default"
        >
          <Star
            className={`${s} transition-all duration-200 ${
              i <= rating
                ? "text-warning fill-warning drop-shadow-[0_0_6px_hsl(var(--warning)/0.5)]"
                : "text-muted-foreground/20"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}
