'use client';

import { Card as CardType, Player, CardAnimationState } from '@/types/game';

interface CardProps {
  card: CardType;
  isRevealed: boolean;
  onReveal?: () => void;
  currentPlayer?: Player;
  player1Name?: string;
  player2Name?: string;
  animationState?: CardAnimationState;
}

export default function Card({ 
  card, 
  isRevealed, 
  onReveal, 
  currentPlayer = 1,
  player1Name = 'Player 1',
  player2Name = 'Player 2',
  animationState = 'idle'
}: CardProps) {
  const respondingPlayer = currentPlayer === 1 ? player2Name : player1Name;

  // Calculate transform based on animation state
  const getTransform = () => {
    switch (animationState) {
      case 'sliding-to-center':
        return 'translateX(0) scale(1)';
      case 'flipping':
      case 'revealed':
        return 'translateX(0) scale(1)';
      case 'sliding-to-discard':
        return 'translateX(calc(50vw - 20rem)) scale(0.6)';
      default:
        return 'translateX(calc(-50vw + 20rem)) scale(0.6)';
    }
  };

  const getOpacity = () => {
    if (animationState === 'sliding-to-discard') return 0.3;
    if (animationState === 'idle') return 0;
    return 1;
  };

  return (
    <div
      className="relative w-full max-w-[280px] mx-auto aspect-[3/4] cursor-pointer transition-all duration-500 ease-in-out"
      onClick={!isRevealed ? onReveal : undefined}
      style={{ 
        perspective: '1000px',
        transform: getTransform(),
        opacity: getOpacity(),
      }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 shadow-xl flex items-center justify-center transition-transform duration-600 ease-in-out border-2 border-amber-900/30"
          style={{
            backfaceVisibility: 'hidden',
            transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div className="text-center p-4">
            <div className="text-4xl mb-2 animate-bounce-slow">
              🎴
            </div>
            <p className="text-amber-50 text-sm font-semibold drop-shadow-lg">Tap to reveal</p>
          </div>
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 rounded-lg bg-white shadow-xl flex flex-col p-4 transition-transform duration-600 ease-in-out border-2 border-amber-200"
          style={{
            backfaceVisibility: 'hidden',
            transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-2">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                  card.type === 'single'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-orange-100 text-orange-800 border border-orange-300'
                }`}
              >
                {card.type === 'single' ? 'Single Response' : 'Both Respond'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
              {card.prompt}
            </h3>
          </div>
          <div className="pt-2 border-t border-amber-200">
            <p className="text-xs font-semibold text-gray-700 text-center">
              {card.type === 'single'
                ? `${respondingPlayer} responds`
                : 'Both players respond'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
