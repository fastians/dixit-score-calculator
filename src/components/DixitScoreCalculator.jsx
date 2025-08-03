import { useState, useCallback, useMemo } from "react";
import {
  TextField,
  Button,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "tailwindcss/tailwind.css";
import DixitLogo from "/images/dixit.png";
import { ImCross } from "react-icons/im";

// Constants - moved to top for better maintainability
const GAME_CONFIG = {
  VICTORY_SCORE: 30,
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 8,
  DEFAULT_PLAYER_COUNT: 3,
};

// Color palette - using more accessible colors
const PLAYER_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Gold
];

// Types for better code clarity
const createInitialPlayer = (index) => ({
  id: `player-${index + 1}`,
  name: `Player ${index + 1}`,
  color: PLAYER_COLORS[index % PLAYER_COLORS.length],
  scores: [],
  total: 0,
});

const createInitialPlayers = () =>
  Array.from({ length: GAME_CONFIG.DEFAULT_PLAYER_COUNT }, (_, i) =>
    createInitialPlayer(i)
  );

export default function DixitScoreCalculator() {
  // Consolidated state management
  const [gameState, setGameState] = useState({
    players: createInitialPlayers(),
    gameStarted: false,
    roundScores: Array(GAME_CONFIG.DEFAULT_PLAYER_COUNT).fill(""),
    winner: null,
    showWinnerDialog: false,
    showResetDialog: false,
    bgPosition: { x: 50, y: 50 },
  });

  // Memoized values for performance

  const canAddPlayer = useMemo(
    () => gameState.players.length < GAME_CONFIG.MAX_PLAYERS,
    [gameState.players.length]
  );

  const canRemovePlayer = useMemo(
    () => gameState.players.length > GAME_CONFIG.MIN_PLAYERS,
    [gameState.players.length]
  );

  // Input validation function
  const validateScore = useCallback((value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return 0;
    if (numValue < 0) return 0; // Prevent negative scores
    return numValue;
  }, []);

  // Event handlers with proper error handling
  const handleScoreChange = useCallback((index, value) => {
    setGameState(prev => ({
      ...prev,
      roundScores: prev.roundScores.map((score, i) => 
        i === index ? value : score
      ),
    }));
  }, []);

  const updatePlayer = useCallback((index, key, value) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === index ? { ...player, [key]: value } : player
      ),
    }));
  }, []);

  const addPlayer = useCallback(() => {
    if (!canAddPlayer) return;

    setGameState(prev => ({
      ...prev,
      players: [
        ...prev.players,
        createInitialPlayer(prev.players.length),
      ],
      roundScores: [...prev.roundScores, ""],
    }));
  }, [canAddPlayer]);

  const removePlayer = useCallback((index) => {
    if (!canRemovePlayer) return;

    setGameState(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index),
      roundScores: prev.roundScores.filter((_, i) => i !== index),
    }));
  }, [canRemovePlayer]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      roundScores: Array(prev.players.length).fill(""),
    }));
  }, []);

  const submitScores = useCallback(() => {
    setGameState(prev => {
      const newPlayers = prev.players.map((player, index) => {
        const newScore = validateScore(prev.roundScores[index]);
        const newTotal = player.total + newScore;
        
        return {
          ...player,
          scores: [...player.scores, newScore],
          total: newTotal,
        };
      });

      const winningPlayer = newPlayers.find(
        player => player.total >= GAME_CONFIG.VICTORY_SCORE
      );

      return {
        ...prev,
        players: newPlayers,
        roundScores: Array(newPlayers.length).fill(""),
        winner: winningPlayer?.name || null,
        showWinnerDialog: !!winningPlayer,
      };
    });
  }, [validateScore]);

  const resetGame = useCallback(() => {
    setGameState({
      players: createInitialPlayers(),
      gameStarted: false,
      roundScores: Array(GAME_CONFIG.DEFAULT_PLAYER_COUNT).fill(""),
      winner: null,
      showWinnerDialog: false,
      showResetDialog: false,
      bgPosition: { x: 50, y: 50 },
    });
  }, []);

  const handleLogoClick = useCallback(() => {
    if (gameState.gameStarted) {
      setGameState(prev => ({ ...prev, showResetDialog: true }));
    }
  }, [gameState.gameStarted]);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setGameState(prev => ({ ...prev, bgPosition: { x, y } }));
  }, []);

  // Memoized player positioning logic
  const getPlayerStartPositions = useCallback((players) => {
    const positions = [];
    const playerCount = players.length;
    
    // Calculate positions based on player count
    const leftCount = Math.ceil(playerCount / 2);

    players.forEach((player, index) => {
      if (player.total === 0) {
        const isLeft = index < leftCount;
        positions.push({
          player,
          index,
          isLeft,
          position: isLeft ? index : index - leftCount,
        });
      }
    });

    return positions;
  }, []);

  // Memoized grid positions
  const getGridPositions = useCallback((players) => {
    const positions = [];
    
    players.forEach((player, playerIndex) => {
      if (player.total > 0 && player.total <= GAME_CONFIG.VICTORY_SCORE) {
        const topPosition = Math.floor(playerIndex / 2) * 26 + 4;
        const leftPosition = playerIndex % 2 === 0 ? "5%" : "80%";
        
        positions.push({
          player,
          playerIndex,
          topPosition,
          leftPosition,
          score: player.total,
        });
      }
    });

    return positions;
  }, []);

  // Render player setup screen
  const renderPlayerSetup = () => (
    <div>
      <div className="flex justify-center m-4">
        <img src={DixitLogo} alt="Dixit Logo" className="w-42" />
      </div>
      <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg border rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Dixit Player Setup
        </h1>

        <div className="space-y-4">
          {gameState.players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow"
            >
              <div className="relative w-10 h-10">
                <div
                  className="w-10 h-10 rounded-full border-2"
                  style={{ backgroundColor: player.color }}
                  role="img"
                  aria-label={`${player.name}'s color`}
                />
                <input
                  type="color"
                  value={player.color}
                  onChange={(e) => updatePlayer(index, "color", e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label={`Change ${player.name}'s color`}
                />
              </div>

              <TextField
                label="Player Name"
                variant="outlined"
                value={player.name}
                onChange={(e) => updatePlayer(index, "name", e.target.value)}
                className="flex-grow"
                inputProps={{ "aria-label": `Player ${index + 1} name` }}
              />

              <button
                onClick={() => removePlayer(index)}
                disabled={!canRemovePlayer}
                className={`text-2xl cursor-pointer ${
                  canRemovePlayer
                    ? "text-red-600 hover:text-red-800"
                    : "opacity-50 cursor-not-allowed text-gray-400"
                }`}
                aria-label={`Remove ${player.name}`}
              >
                <ImCross />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          <Button
            variant="contained"
            color="primary"
            onClick={addPlayer}
            disabled={!canAddPlayer}
            aria-label="Add new player"
          >
            Add Player ({gameState.players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            onClick={startGame}
            aria-label="Start the game"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );

  // Render game screen
  const renderGameScreen = () => {
    const startPositions = getPlayerStartPositions(gameState.players);
    const gridPositions = getGridPositions(gameState.players);

    return (
      <div>
        <div
          className="flex justify-center cursor-pointer"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
          aria-label="Click to reset game"
        >
          <img src={DixitLogo} alt="Dixit Logo" className="w-42" />
        </div>

        {/* Scoreboard */}
        <div className="border p-4 mb-4 rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Dixit Scoreboard
          </h1>
          
          {/* Start Line */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white border font-semibold text-xl mb-4 rounded-lg shadow-md">
            <div className="flex items-center justify-center text-xl w-full font-bold pt-2">
              Start Line
            </div>
            <div className="relative w-full h-10 flex items-center justify-between">
              <div className="absolute w-full h-full flex items-center justify-between px-4">
                                 <div className="flex w-full justify-between">
                   {startPositions.map(({ player }) => (
                     <div
                       key={player.id}
                       className="w-4 h-4 rounded-full shadow-xl border border-black/60"
                       style={{ backgroundColor: player.color }}
                       title={player.name}
                       role="img"
                       aria-label={`${player.name} at start position`}
                     />
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Score Grid */}
          <div className="grid grid-cols-5 gap-2 p-4 bg-gray-50 rounded-lg shadow-inner">
            {Array.from({ length: GAME_CONFIG.VICTORY_SCORE }, (_, i) => (
              <div
                key={i + 1}
                className="relative max-w-[75px] h-[75px] flex items-center justify-center border bg-gray-200 hover:bg-gray-300 transition duration-200 ease-in-out rounded-lg shadow-md"
              >
                {i + 1}
                {gridPositions
                  .filter(pos => pos.score === i + 1)
                  .map(({ player, topPosition, leftPosition }) => (
                    <div
                      key={player.id}
                      className="absolute w-3 h-3 rounded-full shadow-lg border border-black/60"
                      style={{
                        backgroundColor: player.color,
                        top: `${topPosition}%`,
                        left: leftPosition,
                      }}
                      title={player.name}
                      role="img"
                      aria-label={`${player.name} at position ${i + 1}`}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Score Table */}
        <TableContainer>
          <div className="overflow-x-auto shadow-lg rounded-lg mb-3">
            <table className="min-w-full table-auto" role="table" aria-label="Player scores">
              <thead className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-center text-sm font-semibold">
                    Player
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">
                    Score
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">
                    Round Scores
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold">
                    Total Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {gameState.players.map((player, index) => (
                  <tr key={player.id} className="border-b hover:bg-gray-100">
                    <td
                      className="px-2 py-4 text-center truncate flex items-center gap-2"
                      style={{ color: player.color }}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-lg border border-black/60"
                        style={{ backgroundColor: player.color }}
                        role="img"
                        aria-label={`${player.name}'s color`}
                      />
                      <span>{player.name}</span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        min="0"
                        className="w-14 p-2 text-sm text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={gameState.roundScores[index]}
                        onChange={(e) => handleScoreChange(index, e.target.value)}
                        aria-label={`Enter score for ${player.name}`}
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      {player.scores.join(", ") || "No scores yet"}
                    </td>
                    <td className="px-4 py-2 text-sm text-center font-semibold">
                      {player.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            onClick={submitScores}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 !text-white font-semibold text-lg rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out"
            aria-label="Submit all player scores"
          >
            Submit Scores
          </Button>
        </TableContainer>

        {/* Winner Dialog */}
        <Dialog
          open={gameState.showWinnerDialog}
          onClose={() => setGameState(prev => ({ ...prev, showWinnerDialog: false }))}
          aria-labelledby="winner-dialog-title"
          aria-describedby="winner-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            id="winner-dialog-title"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center !text-3xl !font-bold py-4"
          >
            🎉 Congratulations! 🎉
          </DialogTitle>
          <DialogContent className="text-center flex flex-col !pt-4">
            <p className="text-xl text-gray-800 font-semibold">
              {gameState.winner} wins the game!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              What an exciting match! Ready for another round?
            </p>
          </DialogContent>
          <DialogActions className="flex !justify-center mb-4">
            <Button
              onClick={resetGame}
              variant="contained"
              className="ml-4 !bg-green-500 hover:bg-green-600 text-white !font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
            >
              Play Again
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reset Confirmation Dialog */}
        <Dialog
          open={gameState.showResetDialog}
          onClose={() => setGameState(prev => ({ ...prev, showResetDialog: false }))}
          aria-labelledby="reset-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            id="reset-dialog-title"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center !text-3xl !font-bold py-4"
          >
            ⚠️ Attention!
          </DialogTitle>
          <DialogContent className="text-center flex flex-col !pt-4">
            <p className="text-xl text-gray-800 font-semibold">
              Are you sure you want to restart the game?
            </p>
            <p className="text-sm text-gray-600 mt-2">
              All current progress will be lost.
            </p>
          </DialogContent>
          <DialogActions className="flex justify-center mb-4">
            <Button
              onClick={resetGame}
              variant="contained"
              className="ml-4 !bg-red-500 hover:!bg-red-600 text-white !font-semibold rounded-lg shadow-md"
            >
              Yes, Restart
            </Button>
            <Button
              onClick={() => setGameState(prev => ({ ...prev, showResetDialog: false }))}
              variant="contained"
              className="ml-4 !bg-gray-500 hover:!bg-gray-600 text-white !font-semibold rounded-lg shadow-md"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundPosition: `${gameState.bgPosition.x}% ${gameState.bgPosition.y}%`,
        backgroundAttachment: "fixed",
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-lg mx-auto">
        {!gameState.gameStarted ? renderPlayerSetup() : renderGameScreen()}
      </div>
    </div>
  );
}
