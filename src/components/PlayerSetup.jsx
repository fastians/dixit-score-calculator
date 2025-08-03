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
        <img src={DixitLogo} alt="Dixit Logo" className="w-42" />
      </div>
      <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg border rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Dixit Player Setup
        </h1>

        <div className="space-y-4">
          {players.map((player, index) => (
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
            onClick={onAddPlayer}
            disabled={!canAddPlayer}
            aria-label="Add new player"
          >
            Add Player ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            onClick={onStartGame}
            aria-label="Start the game"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
} 