'use client';

import { useGame } from '@/hooks/useGame';
import Card from '@/components/Card';
import PlayerIndicator from '@/components/PlayerIndicator';
import GameButton from '@/components/GameButton';
import Deck from '@/components/Deck';
import DiscardPile from '@/components/DiscardPile';
import RemainingCardsScore from '@/components/RemainingCardsScore';

export default function Home() {
  const { game, pickCard, continueAfterCard, resetGame } = useGame();

  const handleDeckClick = () => {
    if (game.state === 'waiting') {
      pickCard();
    }
  };

  const handleContinue = () => {
    continueAfterCard();
  };

  return (
    <main className="h-screen flex flex-col p-2 md:p-3 relative overflow-hidden">
      {/* Ornate Background */}
      <div className="absolute inset-0 game-background opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-orange-950/30 to-amber-950/40" />
      
      {/* Golden Border */}
      <div className="absolute inset-2 border-4 border-amber-700/50 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 border-2 border-amber-500/30 rounded-lg pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-between w-full h-full">
        {/* Remaining Cards Score - Top Left */}
        {game.state !== 'ended' && (
          <RemainingCardsScore remaining={game.deck.length} />
        )}

        {/* Player 2 - Top */}
        <div className="flex-shrink-0 mb-1">
          <PlayerIndicator
            player={2}
            isActive={game.currentPlayer === 2 && game.state === 'waiting'}
            name={game.player2Name}
            position="top"
          />
        </div>

        {/* Main Game Area - Horizontal Layout */}
        <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 min-h-0 px-6 md:px-10">
          {/* Deck - Left */}
          <div className="flex-shrink-0 w-40 md:w-44 ml-4 md:ml-6">
            <Deck
              cardCount={game.deck.length}
              onClick={handleDeckClick}
              disabled={game.state !== 'waiting'}
            />
          </div>

          {/* Center Card Area */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-2 min-w-0">
            {game.state === 'ended' ? (
              <div className="text-center space-y-3 animate-fade-in bg-amber-900/80 backdrop-blur-sm rounded-xl p-4 border-4 border-amber-700">
                <div className="text-4xl mb-2">🎉</div>
                <h2 className="text-xl font-bold text-amber-100">
                  Game Complete!
                </h2>
                <p className="text-amber-200/80 text-sm">
                  You've gone through all the cards. Great game!
                </p>
                <GameButton onClick={resetGame} variant="primary">
                  Play Again
                </GameButton>
              </div>
            ) : game.currentCard ? (
              <div className="w-full max-w-[280px] space-y-2" key={game.currentCard.id}>
                <Card 
                  card={game.currentCard} 
                  isRevealed={game.cardAnimation === 'revealed' || game.cardAnimation === 'flipping'}
                  currentPlayer={game.currentPlayer}
                  player1Name={game.player1Name}
                  player2Name={game.player2Name}
                  animationState={game.cardAnimation}
                />
                {game.cardAnimation === 'revealed' && (
                  <div className="flex justify-center">
                    <GameButton onClick={handleContinue} variant="primary">
                      Continue
                    </GameButton>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full max-w-[280px] space-y-2">
                <div className="text-center">
                  <p className="text-amber-100 text-base md:text-lg font-semibold drop-shadow-lg mb-2 px-4">
                    {game.currentPlayer === 1 ? game.player1Name : game.player2Name}, click the deck to draw a card
                  </p>
                  <p className="text-amber-200/70 text-xs mt-1">
                    {game.deck.length} card{game.deck.length !== 1 ? 's' : ''} left in deck
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Discard Pile - Right */}
          <div className="flex-shrink-0 w-40 md:w-44 mr-4 md:mr-6">
            <DiscardPile cardCount={game.discardPile.length} />
          </div>
        </div>

        {/* Player 1 - Bottom */}
        <div className="flex-shrink-0 mt-1">
          <PlayerIndicator
            player={1}
            isActive={game.currentPlayer === 1 && game.state === 'waiting'}
            name={game.player1Name}
            position="bottom"
          />
        </div>
      </div>
    </main>
  );
}
