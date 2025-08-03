import { useState, useCallback, useMemo } from "react";
import { GAME_CONFIG, createInitialPlayers, PLAYER_COLORS } from "../constants/gameConfig";

export function useGameState() {
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

  // Event handlers
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
        {
          id: `player-${prev.players.length + 1}`,
          name: `Player ${prev.players.length + 1}`,
          color: PLAYER_COLORS[prev.players.length % PLAYER_COLORS.length],
          scores: [],
          total: 0,
        },
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

  const closeWinnerDialog = useCallback(() => {
    setGameState(prev => ({ ...prev, showWinnerDialog: false }));
  }, []);

  const closeResetDialog = useCallback(() => {
    setGameState(prev => ({ ...prev, showResetDialog: false }));
  }, []);

  return {
    gameState,
    canAddPlayer,
    canRemovePlayer,
    handleScoreChange,
    updatePlayer,
    addPlayer,
    removePlayer,
    startGame,
    submitScores,
    resetGame,
    handleLogoClick,
    handleMouseMove,
    closeWinnerDialog,
    closeResetDialog,
  };
} 