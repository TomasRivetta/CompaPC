'use client';

interface RatingFilterProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function RatingFilter({ rating, onRatingChange }: RatingFilterProps) {
  return (
    <div className="mb-8">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-3 block">
        Valoración
      </span>
      <div className="flex gap-1 text-primary cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="hover:text-primary-container transition-colors"
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{
                fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              star
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
