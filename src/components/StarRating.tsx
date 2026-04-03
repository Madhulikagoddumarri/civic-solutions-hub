import { Star } from "lucide-react";

interface Props {
  rating: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
}

export default function StarRating({ rating, onChange, size = "md" }: Props) {
  const s = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onClick={() => onChange?.(i)}
          disabled={!onChange}
          className="disabled:cursor-default"
        >
          <Star
            className={`${s} transition-colors ${
              i <= rating ? "text-warning fill-warning" : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
