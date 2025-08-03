// Game configuration constants
export const GAME_CONFIG = {
  VICTORY_SCORE: 30,
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 8,
  DEFAULT_PLAYER_COUNT: 3,
};

// Color palette for players - using accessible colors
export const PLAYER_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Gold
];

// Helper functions
export const createInitialPlayer = (index) => ({
  id: `player-${index + 1}`,
  name: `Player ${index + 1}`,
  color: PLAYER_COLORS[index % PLAYER_COLORS.length],
  scores: [],
  total: 0,
});

export const createInitialPlayers = () =>
  Array.from({ length: GAME_CONFIG.DEFAULT_PLAYER_COUNT }, (_, i) =>
    createInitialPlayer(i)
  ); 