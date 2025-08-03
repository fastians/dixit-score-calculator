import { useCallback } from "react";
import { GAME_CONFIG } from "../constants/gameConfig";

// Memoized player positioning logic
export const usePlayerPositions = () => {
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

  return {
    getPlayerStartPositions,
    getGridPositions,
  };
}; 