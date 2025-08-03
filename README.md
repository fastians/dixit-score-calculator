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
   git clone <repository_url>
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
├── components/
│   └── DixitScoreCalculator.jsx  # Main game component
├── App.jsx                       # Root application component
├── main.jsx                      # Application entry point
└── index.css                     # Global styles
```

### Key Components
- **DixitScoreCalculator**: Main game logic and UI
- **Player Management**: Add/remove players, customize names/colors
- **Score Tracking**: Round score input and total calculation
- **Visual Scoreboard**: Interactive progress grid
- **Game State**: Victory detection and game reset functionality

## 🚧 Future Improvements

### Planned Enhancements
- [ ] **Input Validation**: Prevent negative score inputs
- [ ] **shadcn-ui Integration**: Replace Material-UI with shadcn-ui components
- [ ] **Card Display**: Show Dixit cards during gameplay
- [ ] **Score History**: Detailed round-by-round history
- [ ] **Game Statistics**: Player performance analytics
- [ ] **Sound Effects**: Audio feedback for game events
- [ ] **Local Storage**: Save game state for session persistence

### Technical Improvements
- [ ] **TypeScript**: Add type safety
- [ ] **Testing**: Unit and integration tests
- [ ] **Performance**: Optimize for larger player counts
- [ ] **Accessibility**: Improve screen reader support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Note**: This application is designed to enhance the Dixit board game experience by providing a digital alternative to the physical scoreboard, making gameplay faster and more accurate.
