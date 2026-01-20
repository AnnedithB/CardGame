import { useState, useCallback } from 'react';
import { Game, Player, Card } from '@/types/game';
import { initialDeck } from '@/data/cards';

function shuffleDeck<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useGame() {
  const [game, setGame] = useState<Game>(() => ({
    currentPlayer: 1,
    deck: shuffleDeck(initialDeck),
    discardPile: [],
    currentCard: null,
    state: 'waiting',
    cardAnimation: 'idle',
    player1Name: 'Player 1',
    player2Name: 'Player 2',
  }));

  const pickCard = useCallback(() => {
    setGame((prev) => {
      if (prev.deck.length === 0) {
        return { ...prev, state: 'ended' };
      }

      const newDeck = [...prev.deck];
      const pickedCard = newDeck.pop()!;

      // Start with card at left position
      setGame((p) => ({
        ...p,
        deck: newDeck,
        currentCard: pickedCard,
        cardAnimation: 'idle',
      }));

      // Slide to center
      setTimeout(() => {
        setGame((p) => ({
          ...p,
          cardAnimation: 'sliding-to-center',
        }));

        // Flip and reveal
        setTimeout(() => {
          setGame((p) => ({
            ...p,
            cardAnimation: 'flipping',
          }));

          setTimeout(() => {
            setGame((p) => ({
              ...p,
              cardAnimation: 'revealed',
              state: 'card-revealed',
            }));
          }, 600);
        }, 500);
      }, 50);

      return prev;
    });
  }, []);

  const continueAfterCard = useCallback(() => {
    setGame((prev) => {
      if (!prev.currentCard) return prev;

      // Flip back first
      setGame((p) => ({
        ...p,
        cardAnimation: 'flipping',
      }));

      // Then slide to discard
      setTimeout(() => {
        setGame((p) => ({
          ...p,
          cardAnimation: 'sliding-to-discard',
        }));

        // After animation completes, move to discard and reset
        setTimeout(() => {
          setGame((p) => {
            const newDiscardPile = [...p.discardPile, p.currentCard!];

            if (p.deck.length === 0) {
              return {
                ...p,
                discardPile: newDiscardPile,
                state: 'ended',
                currentCard: null,
                cardAnimation: 'idle',
              };
            }

            return {
              ...p,
              discardPile: newDiscardPile,
              currentPlayer: p.currentPlayer === 1 ? 2 : 1,
              currentCard: null,
              state: 'waiting',
              cardAnimation: 'idle',
            };
          });
        }, 800);
      }, 600);

      return prev;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGame({
      currentPlayer: 1,
      deck: shuffleDeck(initialDeck),
      discardPile: [],
      currentCard: null,
      state: 'waiting',
      cardAnimation: 'idle',
      player1Name: 'Player 1',
      player2Name: 'Player 2',
    });
  }, []);

  return {
    game,
    pickCard,
    continueAfterCard,
    resetGame,
  };
}
