import { Button, TableContainer } from "@mui/material";

export default function ScoreTable({ 
  players, 
  roundScores, 
  onScoreChange, 
  onSubmitScores 
}) {
  return (
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
            {players.map((player, index) => (
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
                    value={roundScores[index]}
                    onChange={(e) => onScoreChange(index, e.target.value)}
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
        onClick={onSubmitScores}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 !text-white font-semibold text-lg rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out"
        aria-label="Submit all player scores"
      >
        Submit Scores
      </Button>
    </TableContainer>
  );
} 