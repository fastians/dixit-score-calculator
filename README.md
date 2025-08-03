# Dixit Scoreboard Calculator

A web-based scoreboard application for the **Dixit** board game. This project addresses the common problem of lost game boards by providing a digital solution for manual score calculation, eliminating calculation errors and speeding up gameplay.

## 🎯 Project Overview

The Dixit Scoreboard Calculator is designed to replace the physical game board with a digital interface that automatically calculates scores according to Dixit game rules. It supports 3-8 players and provides a mobile-friendly interface for seamless gameplay.

## ✨ Features

### Core Gameplay
- **Player Management**: Support for 3-8 players with customizable names and colors
- **Score Tracking**: Round-by-round score input with automatic total calculation
- **Visual Progress Board**: Interactive 30-point grid showing player positions with colored markers
- **Victory Detection**: Automatic winner announcement when a player reaches 30 points
- **Game Reset**: Easy game restart with confirmation dialog

### User Interface
- **Mobile-First Design**: Fully responsive interface optimized for mobile devices
- **Interactive Background**: Dynamic parallax background effect responding to mouse movement
- **Color-Coded Players**: Each player has a unique color that appears throughout the interface
- **Visual Scoreboard**: Grid-based layout showing player progress from 1-30 points
- **Start Line Visualization**: Special display showing player starting positions

### Technical Features
- **Real-time Updates**: Instant score calculation and UI updates
- **Input Validation**: Score input handling with proper number parsing
- **State Management**: React hooks for efficient game state management
- **Responsive Layout**: Tailwind CSS for adaptive design across all devices
- **Component Architecture**: Modular, reusable components for maintainability
- **Custom Hooks**: Separated business logic for better code organization

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 18.3.1
- **Styling**: Tailwind CSS 3.4.10
- **UI Components**: Material-UI (TextField, Button, Dialog)
- **Icons**: React Icons
- **Build Tool**: Vite 5.4.1
- **Package Manager**: npm

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/fastians/dixit-score-calculator.git
   cd dixit-score-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production
```bash
npm run build
```

## 🎮 How to Use

### Setting Up Players
1. **Default Setup**: The game starts with 3 players
2. **Add Players**: Click "Add Player" to increase up to 8 players
3. **Remove Players**: Click the red X icon to remove players (minimum 3)
4. **Customize**: 
   - Click on player color circles to change colors
   - Edit player names in the text fields
5. **Start Game**: Click "Start Game" when ready

### During Gameplay
1. **Score Input**: Enter round scores for each player in the number fields
2. **Submit Scores**: Click "Submit Scores" to add round scores to totals
3. **Track Progress**: Watch colored markers move across the 30-point grid
4. **Victory**: When a player reaches 30 points, a winner popup appears
5. **Reset**: Click the Dixit logo to restart the game

### Game Rules Implementation
- **Scoring**: Standard Dixit scoring system
- **Victory Condition**: First player to reach 30 points wins
- **Player Limits**: 3-8 players supported
- **Score Validation**: Handles empty inputs as 0 points

## 📱 Mobile Experience

The application is optimized for mobile devices with:
- Touch-friendly interface elements
- Responsive grid layouts
- Optimized button sizes
- Mobile-appropriate spacing and typography

## 🎨 Visual Features

### Interactive Elements
- **Dynamic Background**: Parallax effect following mouse movement
- **Color-Coded Players**: Unique colors for easy player identification
- **Progress Visualization**: Visual grid showing player advancement
- **Smooth Animations**: Hover effects and transitions

### Scoreboard Design
- **30-Point Grid**: Visual representation of game progress
- **Player Markers**: Colored circles showing current positions
- **Start Line**: Special display for player starting positions
- **Score History**: Round-by-round score tracking

## 🔧 Development

### Project Structure
```
src/
├── constants/
│   └── gameConfig.js              # Game constants and configuration
├── hooks/
│   └── useGameState.js            # Custom hook for game state management
├── utils/
│   └── gameUtils.js               # Utility functions for positioning
├── components/
│   ├── DixitScoreCalculator.jsx   # Main component (orchestrator)
│   ├── PlayerSetup.jsx            # Player setup screen
│   ├── GameScreen.jsx             # Main game screen
│   ├── ScoreGrid.jsx              # Score grid component
│   ├── ScoreTable.jsx             # Score table component
│   └── GameDialogs.jsx            # Winner and reset dialogs
├── App.jsx                        # Root application component
├── main.jsx                       # Application entry point
└── index.css                      # Global styles
```

### Architecture Overview

#### **Component Architecture**
- **Modular Design**: Each component has a single responsibility
- **Reusable Components**: Components can be tested and maintained independently
- **Clean Separation**: UI, logic, and state management are properly separated

#### **State Management**
- **Custom Hook**: `useGameState` manages all game state and logic
- **Memoized Values**: Performance optimizations with `useMemo` and `useCallback`
- **Centralized Logic**: All game operations are handled in one place

#### **Constants & Configuration**
- **Centralized Config**: All game settings in `gameConfig.js`
- **Easy Maintenance**: Game rules and limits can be modified in one place
- **Type Safety**: Clear structure for game configuration

#### **Utility Functions**
- **Positioning Logic**: Separated player positioning calculations
- **Reusable Functions**: Common operations extracted for reuse
- **Performance Optimized**: Memoized calculations for smooth gameplay

### Key Components

#### **DixitScoreCalculator.jsx**
- Main orchestrator component
- Handles routing between setup and game screens
- Manages background effects and layout

#### **PlayerSetup.jsx**
- Player configuration interface
- Add/remove player functionality
- Color and name customization

#### **GameScreen.jsx**
- Main game interface
- Coordinates scoreboard, grid, and table components
- Handles game flow and interactions

#### **ScoreGrid.jsx**
- Visual 30-point progress grid
- Player marker positioning
- Interactive grid cells

#### **ScoreTable.jsx**
- Score input interface
- Player score history display
- Submit scores functionality

#### **GameDialogs.jsx**
- Winner announcement dialog
- Game reset confirmation
- Consistent dialog styling

### Code Quality Features

#### **Performance Optimizations**
- Memoized calculations for player positions
- Optimized re-renders with `useCallback`
- Efficient state updates

#### **Accessibility**
- ARIA labels for screen readers
- Keyboard navigation support
- Semantic HTML structure

#### **Error Handling**
- Input validation for scores
- Graceful handling of edge cases
- User-friendly error messages


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.


