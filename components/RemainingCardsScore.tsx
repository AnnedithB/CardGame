'use client';

interface RemainingCardsScoreProps {
  remaining: number;
}

export default function RemainingCardsScore({ remaining }: RemainingCardsScoreProps) {
  return (
    <div className="absolute top-4 right-4 z-20">
      <div className="bg-amber-900/90 backdrop-blur-sm rounded-xl px-6 py-3 border-2 border-amber-700 shadow-xl">
        <div className="text-amber-200 text-xs font-semibold mb-1 uppercase tracking-wider">
          Cards Remaining
        </div>
        <div className="text-4xl md:text-5xl font-bold text-amber-100 drop-shadow-lg">
          {remaining}
        </div>
      </div>
    </div>
  );
}
