import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

export default function GameDialogs({ 
  showWinnerDialog, 
  showResetDialog, 
  winner, 
  onCloseWinnerDialog, 
  onCloseResetDialog, 
  onResetGame 
}) {
  return (
    <>
      {/* Winner Dialog */}
      <Dialog
        open={showWinnerDialog}
        onClose={onCloseWinnerDialog}
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
            {winner} wins the game!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            What an exciting match! Ready for another round?
          </p>
        </DialogContent>
        <DialogActions className="flex !justify-center mb-4">
          <Button
            onClick={onResetGame}
            variant="contained"
            className="ml-4 !bg-green-500 hover:bg-green-600 text-white !font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={showResetDialog}
        onClose={onCloseResetDialog}
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
            onClick={onResetGame}
            variant="contained"
            className="ml-4 !bg-red-500 hover:!bg-red-600 text-white !font-semibold rounded-lg shadow-md"
          >
            Yes, Restart
          </Button>
          <Button
            onClick={onCloseResetDialog}
            variant="contained"
            className="ml-4 !bg-gray-500 hover:!bg-gray-600 text-white !font-semibold rounded-lg shadow-md"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 