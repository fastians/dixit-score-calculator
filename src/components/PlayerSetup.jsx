import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { ImCross } from "react-icons/im";
import DixitLogo from "/images/dixit.png";
import { GAME_CONFIG } from "../constants/gameConfig";

export default function PlayerSetup({ 
  players, 
  onUpdatePlayer, 
  onAddPlayer, 
  onRemovePlayer, 
  onStartGame 
}) {
  const canAddPlayer = players.length < GAME_CONFIG.MAX_PLAYERS;
  const canRemovePlayer = players.length > GAME_CONFIG.MIN_PLAYERS;

  return (
    <div>
      <div className="flex justify-center m-4">
        <img src={DixitLogo} alt="Dixit Logo" className="w-42 drop-shadow-lg" />
      </div>
      <div className="p-6 max-w-md mx-auto bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-xl mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Dixit Player Setup
        </h1>

        <div className="space-y-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="relative w-12 h-12">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: player.color }}
                  role="img"
                  aria-label={`${player.name}'s color`}
                />
                <input
                  type="color"
                  value={player.color}
                  onChange={(e) => onUpdatePlayer(index, "color", e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label={`Change ${player.name}'s color`}
                />
              </div>

              <TextField
                label="Player Name"
                variant="outlined"
                value={player.name}
                onChange={(e) => onUpdatePlayer(index, "name", e.target.value)}
                className="flex-grow"
                inputProps={{ "aria-label": `Player ${index + 1} name` }}
              />

              <button
                onClick={() => onRemovePlayer(index)}
                disabled={!canRemovePlayer}
                className={`text-xl cursor-pointer p-1 rounded-full transition-all duration-200 ${
                  canRemovePlayer
                    ? "text-red-600 hover:text-red-800 hover:bg-red-50 hover:scale-110"
                    : "opacity-50 cursor-not-allowed text-gray-400"
                }`}
                aria-label={`Remove ${player.name}`}
              >
                <ImCross />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            variant="contained"
            onClick={onAddPlayer}
            disabled={!canAddPlayer}
            aria-label="Add new player"
            className="flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            sx={{
              background: canAddPlayer 
                ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(45deg, #ccc 0%, #999 100%)',
              '&:hover': {
                background: canAddPlayer 
                  ? 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)'
                  : 'linear-gradient(45deg, #ccc 0%, #999 100%)',
              }
            }}
          >
            Add Player ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Button>
          <Button 
            variant="contained" 
            onClick={onStartGame}
            aria-label="Start the game"
            className="flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            sx={{
              background: 'linear-gradient(45deg, #11998e 0%, #38ef7d 100%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0f8a7a 0%, #2dd66a 100%)',
              }
            }}
          >
            🎮 Start Game
          </Button>
        </div>
      </div>
    </div>
  );
} 