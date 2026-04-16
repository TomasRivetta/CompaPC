'use client';

interface RatingFilterProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function RatingFilter({ rating, onRatingChange }: RatingFilterProps) {
  return (
    <div className="mb-8">
      <span className="text-[10px] text-white/40 uppercase tracking-widest mb-3 block">Valoración</span>
      <div className="flex gap-1 text-primary cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            onClick={() => onRatingChange(star)}
            className="material-symbols-outlined text-sm transition-all hover:scale-110" 
            style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
          >
            {star <= rating ? 'star' : 'star'}
          </span>
        ))}
        {rating < 5 && (
          <div className="flex gap-1">
            {[...Array(5 - rating)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-sm text-white/20">star</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

