import { GAME_CONFIG } from "../constants/gameConfig";

export default function ScoreGrid({ players, gridPositions }) {
  return (
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
  );
} 