Briefly explain:

- How you interpreted the game rules
 so the instructions suggested that its a card game where you pick cards from a deck . my mind instantly went to uno 2 players . will have a flanned deck 2 players play and each respond to each other depending on the card

- Any design or UX decisions you made
we intially had a basic card and we had to select player 1 and player 2 boxes individually. it wasnt givign a pvp experiencce so i tried implemented how we play card games in real life and that is across each other. moved player 2 above and player 1 below . 

also humans have a habit of looking at the top right initially or when looking for something so i moved the remaining cards counter to the right. each turn indicates who responds so the attention span of a human is catered to as well .

animations were added so it felt like card is getting drawn from the dect and then gets revealed and goes to the right to get dicarded

- What you would improve with more time
well need to make it more personalized where each player feels like they are both in the game. a better pvp experience . a score system since humans like to win against each other and then a reward system . from a frontend point of view i would want it to be more aligned so like when the continue pops up te card moves abit up and minor stuff like that 



# 2-Player Card Game

A polished, interactive 2-player card game built with Next.js, TypeScript, and Tailwind CSS.

## 🎮 How It Works

### Game Rules (As Implemented)

- **2 Players**: Player 1 and Player 2 take turns
- **Deck of 20 Cards**: Each card contains a unique prompt or instruction
- **Turn-Based Flow**: 
  - Active player picks a card from the deck
  - Card reveals with a smooth flip animation
  - Card type determines who responds:
    - **Single Response**: The other player responds
    - **Both Respond**: Both players respond
- **No Answer Evaluation**: The app manages game flow only, no scoring or validation
- **Game End**: When the deck is empty, the game ends with a completion screen

## 🎨 Key UI/UX Decisions

### Visual Design
- **Dark Theme**: Deep black background with vibrant gradient accents (blue to purple)
- **Card Design**: 
  - Animated 3D flip effect on reveal
  - Clear visual distinction between card back (gradient) and front (white with content)
  - Card type badges (Single Response / Both Respond) for immediate clarity
- **Player Indicators**: 
  - Active player highlighted with gradient background and pulse animation
  - Inactive players dimmed for clear hierarchy
- **Deck Counter**: Progress bar showing remaining cards

### Interaction Flow
- **Immediate Clarity**: 
  - Active player clearly highlighted with "Your turn" indicator
  - Card back shows "Tap to reveal" instruction
  - Card front shows who should respond
- **Smooth Transitions**: 
  - 600ms card flip animation
  - Fade-in for revealed cards and end state
  - Hover effects on buttons
- **Mobile-First**: Responsive design that works seamlessly on desktop and mobile devices

### Code Architecture
- **Component-Driven**: Separated concerns into reusable components (Card, PlayerIndicator, GameButton, DeckCounter)
- **Custom Hook**: `useGame` manages all game state logic
- **Type Safety**: Full TypeScript coverage with clear type definitions
- **Simple State**: Local React state (no external state management needed)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🔮 Future Improvements

If I had more time, I would:

1. **Player Name Customization**: Allow players to enter their names at game start
2. **Card Categories**: Add different card categories (fun, serious, creative) with filtering
3. **Card History**: Show a history of revealed cards during the game
4. **Sound Effects**: Subtle audio feedback for card flips and transitions
5. **Animations**: More sophisticated card shuffle animation when starting a new game
6. **Accessibility**: Enhanced keyboard navigation and screen reader support
7. **Local Storage**: Save game progress to resume later
8. **Card Customization**: Allow users to add their own cards to the deck

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useCallback)

## 📝 Notes

- The deck is shuffled randomly at game start
- Cards are drawn from the end of the array (LIFO)
- Game state is reset completely when starting a new game
- All animations use CSS transitions for performance

---

Built with attention to detail, clarity, and user experience. 🎯
