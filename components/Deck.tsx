'use client';

interface DeckProps {
  cardCount: number;
  onClick: () => void;
  disabled?: boolean;
}

export default function Deck({ cardCount, onClick, disabled }: DeckProps) {
  const visibleCards = Math.min(cardCount, 7); // Show max 7 cards fanned out
  
  if (cardCount === 0) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center" style={{ transform: 'rotate(90deg)' }}>
          <div className="w-32 h-52 rounded-lg border-2 border-dashed border-amber-700/30 flex items-center justify-center">
            <span className="text-amber-700/50 text-xs">Empty</span>
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-amber-100/50 drop-shadow-lg whitespace-nowrap">
            0 cards
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-full flex items-center justify-center">
      <button
        onClick={onClick}
        disabled={disabled || cardCount === 0}
        className={`relative group transition-all duration-300 ${
          disabled || cardCount === 0
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:scale-105'
        } ${!disabled && cardCount > 0 ? 'animate-pulse-slow' : ''}`}
        aria-label={disabled ? 'Not your turn' : 'Draw a card'}
      >
        {/* Fanned Cards */}
        <div className="relative w-36 h-52" style={{ transform: 'rotate(90deg)' }}>
          {Array.from({ length: visibleCards }).map((_, index) => {
            const rotation = (index - (visibleCards - 1) / 2) * 12; // Fan spread
            const zIndex = visibleCards - index;
            const offsetX = (index - (visibleCards - 1) / 2) * 5;
            
            return (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
                style={{
                  transform: `rotate(${rotation}deg) translateX(${offsetX}px)`,
                  zIndex,
                  transformOrigin: 'center bottom',
                }}
              >
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-rose-300 via-pink-200 to-rose-200 border-2 border-rose-400 shadow-lg relative overflow-hidden">
                  {/* Ornate pattern background */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(185, 28, 28, 0.1) 10px, rgba(185, 28, 28, 0.1) 20px)`
                  }} />
                  
                  {/* Card center illustration area */}
                  <div className="absolute inset-2 rounded bg-rose-100/50 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 border-2 border-amber-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🎴</span>
                    </div>
                  </div>
                  
                  {/* Ornate corner patterns */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-rose-500/40 rounded-tl" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-rose-500/40 rounded-tr" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-rose-500/40 rounded-bl" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-rose-500/40 rounded-br" />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Card Count */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-amber-100 drop-shadow-lg whitespace-nowrap">
          {cardCount} cards
        </div>
      </button>
    </div>
  );
}
