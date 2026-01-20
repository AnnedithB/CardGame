'use client';

interface DiscardPileProps {
  cardCount: number;
}

export default function DiscardPile({ cardCount }: DiscardPileProps) {
  const visibleCards = Math.min(cardCount, 7); // Show max 7 cards fanned out
  
  if (cardCount === 0) {
    return (
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center" style={{ transform: 'rotate(-90deg)' }}>
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
      <div className="relative w-36 h-52" style={{ transform: 'rotate(-90deg)' }}>
        {Array.from({ length: visibleCards }).map((_, index) => {
          const rotation = (index - (visibleCards - 1) / 2) * 12; // Fan spread
          const zIndex = index + 1;
          const offsetX = (index - (visibleCards - 1) / 2) * 5;
          
          return (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotation}deg) translateX(${offsetX}px)`,
                zIndex,
                transformOrigin: 'center bottom',
              }}
            >
              <div className="w-full h-full rounded-lg bg-white border-2 border-amber-200 shadow-lg opacity-75">
                {/* Show a small indicator that it's a used card */}
                <div className="absolute top-1 right-1 w-3 h-3 bg-amber-500 rounded-full border border-amber-600" />
                {/* Subtle pattern to show it's been used */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0, 0, 0, 0.1) 5px, rgba(0, 0, 0, 0.1) 10px)`
                }} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Card Count */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-amber-100 drop-shadow-lg whitespace-nowrap">
        {cardCount} cards
      </div>
    </div>
  );
}
