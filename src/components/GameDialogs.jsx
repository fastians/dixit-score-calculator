import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { SparkleContainer } from "./Sparkle";

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
        PaperProps={{
          style: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle
          id="winner-dialog-title"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center !text-2xl !font-bold py-4 relative"
        >
          <SparkleContainer sparkleCount={6}>
            🎉 Congratulations! 🎉
          </SparkleContainer>
        </DialogTitle>
        <DialogContent className="text-center !pt-6 !pb-4">
          <div className="mb-4">
            <SparkleContainer sparkleCount={4}>
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4 relative">
                👑
              </div>
            </SparkleContainer>
            <p className="text-xl text-gray-800 font-bold mb-2">
              {winner} wins the game!
            </p>
            <p className="text-gray-600">
              What an exciting match! Ready for another round?
            </p>
          </div>
        </DialogContent>
        <DialogActions className="flex !justify-center !pb-4">
          <Button
            onClick={onResetGame}
            variant="contained"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 !text-white !font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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
        PaperProps={{
          style: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle
          id="reset-dialog-title"
          className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center !text-2xl !font-bold py-4"
        >
          ⚠️ Attention!
        </DialogTitle>
        <DialogContent className="text-center !pt-6 !pb-4">
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-2xl mb-4">
              ⚠️
            </div>
            <p className="text-lg text-gray-800 font-bold mb-2">
              Are you sure you want to restart the game?
            </p>
            <p className="text-gray-600 text-sm">
              All current progress will be lost.
            </p>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center !pb-4 gap-3">
          <Button
            onClick={onResetGame}
            variant="contained"
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 !text-white !font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Yes, Restart
          </Button>
          <Button
            onClick={onCloseResetDialog}
            variant="contained"
            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 !text-white !font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 