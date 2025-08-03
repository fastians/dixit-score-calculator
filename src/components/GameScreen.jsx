import DixitLogo from "/images/dixit.png";
import ScoreGrid from "./ScoreGrid";
import ScoreTable from "./ScoreTable";
import GameDialogs from "./GameDialogs";
import { usePlayerPositions } from "../utils/gameUtils";

export default function GameScreen({ 
  gameState, 
  onLogoClick, 
  onScoreChange, 
  onSubmitScores,
  onCloseWinnerDialog,
  onCloseResetDialog,
  onResetGame
}) {
  const { getPlayerStartPositions, getGridPositions } = usePlayerPositions();
  const startPositions = getPlayerStartPositions(gameState.players);
  const gridPositions = getGridPositions(gameState.players);

  return (
    <div>
      <div
        className="flex justify-center cursor-pointer"
        onClick={onLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onLogoClick()}
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
        <ScoreGrid players={gameState.players} gridPositions={gridPositions} />
      </div>

      {/* Score Table */}
      <ScoreTable 
        players={gameState.players}
        roundScores={gameState.roundScores}
        onScoreChange={onScoreChange}
        onSubmitScores={onSubmitScores}
      />

      {/* Game Dialogs */}
      <GameDialogs
        showWinnerDialog={gameState.showWinnerDialog}
        showResetDialog={gameState.showResetDialog}
        winner={gameState.winner}
        onCloseWinnerDialog={onCloseWinnerDialog}
        onCloseResetDialog={onCloseResetDialog}
        onResetGame={onResetGame}
      />
    </div>
  );
} 