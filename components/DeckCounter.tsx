'use client';

interface DeckCounterProps {
  remaining: number;
  total: number;
}

export default function DeckCounter({ remaining, total }: DeckCounterProps) {
  const percentage = (remaining / total) * 100;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-amber-100 font-semibold drop-shadow-lg">
        {remaining} card{remaining !== 1 ? 's' : ''} remaining
      </div>
      <div className="w-40 h-2 bg-amber-900/60 rounded-full overflow-hidden border border-amber-700/50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
