import { useState, useCallback, useRef } from 'react';
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

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const pickCard = useCallback(() => {
    setGame((prev) => {
      if (prev.deck.length === 0) {
        return { ...prev, state: 'ended' };
      }

      if (prev.state !== 'waiting') {
        return prev; // Prevent multiple clicks
      }

      clearTimeouts();

      const newDeck = [...prev.deck];
      const pickedCard = newDeck.pop()!;

      // Start with card at left position
      const updatedState = {
        ...prev,
        deck: newDeck,
        currentCard: pickedCard,
        cardAnimation: 'idle' as const,
        state: 'card-revealed' as const, // Lock state to prevent multiple clicks
      };

      // Slide to center
      const timeout1 = setTimeout(() => {
        setGame((p) => ({
          ...p,
          cardAnimation: 'sliding-to-center',
        }));
      }, 50);
      timeoutRefs.current.push(timeout1);

      // Flip and reveal
      const timeout2 = setTimeout(() => {
        setGame((p) => ({
          ...p,
          cardAnimation: 'flipping',
        }));

        const timeout3 = setTimeout(() => {
          setGame((p) => ({
            ...p,
            cardAnimation: 'revealed',
          }));
        }, 600);
        timeoutRefs.current.push(timeout3);
      }, 550);
      timeoutRefs.current.push(timeout2);

      return updatedState;
    });
  }, [clearTimeouts]);

  const continueAfterCard = useCallback(() => {
    setGame((prev) => {
      if (!prev.currentCard || prev.cardAnimation !== 'revealed') {
        return prev; // Only allow continue when card is revealed
      }

      clearTimeouts();

      // Flip back first
      setGame((p) => ({
        ...p,
        cardAnimation: 'flipping',
      }));

      // Then slide to discard
      const timeout1 = setTimeout(() => {
        setGame((p) => ({
          ...p,
          cardAnimation: 'sliding-to-discard',
        }));

        // After animation completes, move to discard and reset
        const timeout2 = setTimeout(() => {
          setGame((p) => {
            if (!p.currentCard) return p; // Safety check

            const newDiscardPile = [...p.discardPile, p.currentCard];

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
        timeoutRefs.current.push(timeout2);
      }, 600);
      timeoutRefs.current.push(timeout1);

      return prev; // Return unchanged, animations handle state updates
    });
  }, [clearTimeouts]);

  const resetGame = useCallback(() => {
    clearTimeouts();
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
  }, [clearTimeouts]);

  return {
    game,
    pickCard,
    continueAfterCard,
    resetGame,
  };
}
