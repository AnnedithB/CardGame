'use client';

import { Player } from '@/types/game';

interface PlayerIndicatorProps {
  player: Player;
  isActive: boolean;
  name: string;
  position: 'top' | 'bottom';
}

export default function PlayerIndicator({ player, isActive, name, position }: PlayerIndicatorProps) {
  const playerNumber = player;
  const playerInitial = name.charAt(0).toUpperCase();
  
  return (
    <div className={`flex items-center justify-center gap-2 ${position === 'top' ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Player Badge */}
      <div
        className={`relative transition-all duration-300 ${
          isActive ? 'scale-110' : 'scale-100 opacity-70'
        }`}
      >
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl transition-all duration-300 border-4 ${
            isActive
              ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-400 shadow-lg shadow-amber-500/50'
              : 'bg-amber-900/60 text-amber-300 border-amber-800/50'
          }`}
        >
          {playerNumber}
        </div>
        {isActive && (
          <>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-amber-600 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-pulse" />
          </>
        )}
      </div>
      
      {/* Player Name */}
      <div className="text-center">
        <div
          className={`text-base md:text-lg font-bold transition-all duration-300 ${
            isActive
              ? 'text-amber-200 drop-shadow-lg'
              : 'text-amber-700/70'
          }`}
        >
          {name}
        </div>
        {isActive && (
          <div className="text-xs text-amber-300 font-semibold animate-pulse mt-0.5">
            Your Turn
          </div>
        )}
      </div>
    </div>
  );
}
