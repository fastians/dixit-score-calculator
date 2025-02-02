import { useState } from "react";
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
import DixitLogo from "/images/dixit.png"; // Adjust the path as needed
import { ImCross } from "react-icons/im";

// Define a set of 10 unique colors
const colorSet = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#F2D51C",
  "#F25C05",
  "#8C54FF",
  "#E87722",
  "#4EECFF",
  "#A2D5C6",
];

const victoryScore = 30;
const minPlayers = 3;
const maxPlayers = 8;

export default function DixitGame() {
  const [players, setPlayers] = useState(
    Array.from({ length: minPlayers }, (_, i) => ({
      name: `Player ${i + 1}`,
      color: colorSet[Math.floor(Math.random() * colorSet.length)], // Select a random color from the set
      scores: [],
      total: 0,
    }))
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false); // Dialog for reset confirmation

  const [roundScores, setRoundScores] = useState(
    Array(players.length).fill("")
  );
  const [winner, setWinner] = useState(null);
  const [openPopup, setOpenPopup] = useState(false); // State for the popup

  const handleClosePopup = () => {
    setOpenPopup(false);
    setShowResetDialog(false); // Close reset dialog
    // Resetting the game to the initial state (go back to first screen)
    setPlayers(
      Array.from({ length: minPlayers }, (_, i) => ({
        name: `Player ${i + 1}`,
        color: colorSet[Math.floor(Math.random() * colorSet.length)], // Select a random color from the set
        scores: [],
        total: 0,
      }))
    );
    setGameStarted(false);
    setWinner(null);
  };

  const handleLogoClick = () => {
    if (gameStarted) {
      setShowResetDialog(true); // Show reset confirmation dialog
    }
  };

  const addPlayer = () => {
    if (players.length < maxPlayers) {
      setPlayers([
        ...players,
        {
          name: `Player ${players.length + 1}`,
          color: colorSet[Math.floor(Math.random() * colorSet.length)], // Select a random color from the set
          scores: [],
          total: 0,
        },
      ]);
    }
  };

  const removePlayer = (index) => {
    if (players.length > minPlayers) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index, key, value) => {
    const newPlayers = [...players];
    newPlayers[index][key] = value;
    setPlayers(newPlayers);
  };

  const startGame = () => {
    setRoundScores(Array(players.length).fill(""));
    setGameStarted(true);
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...roundScores];
    newScores[index] = value;
    setRoundScores(newScores);
  };

  const submitScores = () => {
    const newPlayers = players.map((player, index) => {
      const newScore = parseInt(roundScores[index]) || 0;
      const newTotal = player.total + newScore;
      return {
        ...player,
        scores: [...player.scores, newScore],
        total: newTotal,
      };
    });

    setPlayers(newPlayers);
    setRoundScores(Array(players.length).fill(""));

    const winningPlayer = newPlayers.find(
      (player) => player.total >= victoryScore
    );
    if (winningPlayer) {
      setWinner(winningPlayer.name);
      setOpenPopup(true); // Open the popup when a player wins
    }
  };

  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    // Get the mouse position relative to the window
    const x = (e.clientX / window.innerWidth) * 100; // Percentage of window width
    const y = (e.clientY / window.innerHeight) * 100; // Percentage of window height
    setBgPosition({ x, y });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`, // Dynamic background position
        backgroundAttachment: "fixed", // Keep the background fixed
      }}
      onMouseMove={handleMouseMove} // Add mousemove listener
    >
      {/* Rest of your code */}
      <div className="max-w-lg mx-auto">
        {!gameStarted ? (
          <div>
            <div className="flex justify-center m-4">
              <img src={DixitLogo} alt="Dixit Logo" className="w-42" />
            </div>
            <div className="p-6 max-w-md mx-auto bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg border rounded-lg mt-6">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Dixit Player
              </h1>

              <div className="space-y-4">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow"
                  >
                    <div className="relative w-10 h-10">
                      {/* Round Color Preview */}
                      <div
                        className="w-10 h-10 rounded-full border-2"
                        style={{ backgroundColor: player.color }}
                      ></div>

                      {/* Hidden Color Picker */}
                      <input
                        type="color"
                        value={player.color}
                        onChange={(e) =>
                          updatePlayer(index, "color", e.target.value)
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    <TextField
                      label="Player Name"
                      variant="outlined"
                      value={player.name}
                      onChange={(e) =>
                        updatePlayer(index, "name", e.target.value)
                      }
                      className="flex-grow"
                    />

                    <ImCross
                      onClick={() => {
                        if (players.length > minPlayers) {
                          removePlayer(index);
                        }
                      }}
                      className={` text-2xl cursor-pointer ${
                        players.length === minPlayers
                          ? "opacity-50 cursor-not-allowed text-gray-400"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addPlayer}
                  disabled={players.length >= maxPlayers}
                >
                  Add Player
                </Button>
                <Button variant="contained" color="success" onClick={startGame}>
                  Start Game
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="flex justify-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img src={DixitLogo} alt="Dixit Logo" className="w-42" />
            </div>

            {/* Scoreboard Content */}
            <div className="border p-4 mb-4 rounded-lg shadow-lg bg-white">
              <h1 className="text-2xl font-bold mb-2 text-center">
                Dixit Scoreboard
              </h1>
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white border  font-semibold text-xl mb-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center text-xl w-full font-bold pt-2">
                  Start Line
                </div>
                <div className="relative w-full h-10 flex items-center justify-between ">
                  {/* Player markers */}
                  <div className="absolute w-full h-full flex items-center justify-between px-4">
                    <div className="flex w-full justify-between">
                      {players.map((player, index) => {
                        if (player.total === 0) {
                          let leftCount = 0;
                          let rightCount = 0;
                          if (players.length === 2) {
                            leftCount = 1;
                            rightCount = 1;
                          } else if (players.length === 3) {
                            leftCount = 2;
                            rightCount = 1;
                          } else if (players.length === 4) {
                            leftCount = 2;
                            rightCount = 2;
                          } else if (players.length === 5) {
                            leftCount = 3;
                            rightCount = 2;
                          } else if (players.length === 6) {
                            leftCount = 3;
                            rightCount = 3;
                          }

                          const totalLeft = leftCount;
                          const totalRight = rightCount;

                          const isLeft = index < totalLeft;
                          const isRight = index >= totalLeft;

                          return (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full shadow-xl border border-black/60"
                              style={{
                                backgroundColor: player.color,
                                position: "relative",
                                left: isLeft
                                  ? `${(index / totalLeft) * 0}%`
                                  : null,
                                right: isRight
                                  ? `${((index - totalLeft) / totalRight) * 0}%`
                                  : null,
                              }}
                              title={player.name}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i + 1}
                    className="relative max-w-[75px] h-[75px] flex items-center justify-center border bg-gray-200 hover:bg-gray-300 transition duration-200 ease-in-out rounded-lg shadow-md"
                  >
                    {i + 1}
                    {players.map((player, index) => {
                      if (player.total === i + 1) {
                        const topPosition = Math.floor(index / 2) * 26 + 4;
                        const leftPosition = index % 2 === 0 ? "5%" : "80%";

                        return (
                          <div
                            key={index}
                            className="absolute w-3 h-3 rounded-full shadow-lg border border-black/60"
                            style={{
                              backgroundColor: player.color,
                              top: `${topPosition}%`,
                              left: leftPosition,
                            }}
                            title={player.name}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </div>

            <TableContainer>
              <div className="overflow-x-auto shadow-lg rounded-lg mb-3">
                <table className="min-w-full table-auto">
                  <thead className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                    <tr>
                      <th className="px-4 py-2 text-center text-sm font-semibold ">
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
                    {players.map((player, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100">
                        <td
                          className="px-2 py-4 text-center truncate flex items-center gap-2 "
                          style={{ color: player.color }}
                        >
                          <span
                            key={index}
                            className=" w-3 h-3 rounded-full shadow-lg border border-black/60"
                            style={{
                              backgroundColor: player.color,
                            }}
                          />
                          <span> {player.name}</span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            className="w-14 p-2 text-sm text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={roundScores[index]}
                            onChange={(e) =>
                              handleScoreChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {player.scores.join(", ")}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
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
              >
                Submit Scores
              </Button>
            </TableContainer>

            <Dialog
              open={openPopup}
              onClose={handleClosePopup}
              aria-labelledby="winner-dialog-title"
              aria-describedby="winner-dialog-description"
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle
                id="winner-dialog-title"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center !text-3xl !font-bold py-4"
              >
                Congratulations!
              </DialogTitle>
              <DialogContent className="text-center flex flex-col !pt-4">
                <p className="text-xl text-gray-800 font-semibold">
                  {winner} wins the game!
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  What an exciting match!
                </p>
              </DialogContent>
              <DialogActions className="flex !justify-center mb-4">
                <Button
                  onClick={handleClosePopup}
                  variant="contained"
                  className="ml-4 !bg-green-500 hover:bg-green-600 text-white !font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
                >
                  Play Again
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={showResetDialog}
              onClose={() => setShowResetDialog(false)}
              aria-labelledby="reset-dialog-title"
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle
                id="winner-dialog-title"
                className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center !text-3xl !font-bold py-4"
              >
                Attention!
              </DialogTitle>
              <DialogContent className="text-center flex flex-col !pt-4">
                <p className="text-xl text-gray-800 font-semibold">
                  Are you sure you want to restart the game?
                </p>
              </DialogContent>

              <DialogActions className="flex justify-center mb-4">
                <Button
                  onClick={handleClosePopup}
                  variant="contained"
                  className="ml-4 !bg-red-500 hover:!bg-red-600 text-white !font-semibold rounded-lg shadow-md"
                >
                  Yes, Restart
                </Button>
                <Button
                  onClick={() => setShowResetDialog(false)}
                  variant="contained"
                  className="ml-4 !bg-gray-500 hover:!bg-gray-600 text-white !font-semibold rounded-lg shadow-md"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
