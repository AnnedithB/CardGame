export type Player = 1 | 2;

export type CardType = 'single' | 'both';

export interface Card {
  id: string;
  prompt: string;
  type: CardType;
}

export type GameState = 'waiting' | 'card-revealed' | 'ended';
export type CardAnimationState = 'idle' | 'sliding-to-center' | 'flipping' | 'revealed' | 'sliding-to-discard';

export interface Game {
  currentPlayer: Player;
  deck: Card[];
  discardPile: Card[];
  currentCard: Card | null;
  state: GameState;
  cardAnimation: CardAnimationState;
  player1Name: string;
  player2Name: string;
}
