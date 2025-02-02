Dixit Board Game - Scoreboard Implementation

Background:
In the Dixit board game, the game board is lost. As a result, the score calculation needs to be done manually, which slows down the game and causes calculation errors. Please implement a scoreboard that reflects the rules of the Dixit game and automatically calculates the scores. (In the example image above, the scoring differs from the standard rules.)

Evaluation Criteria and Implementation Directions:
	•	(Required) Write code that implements the screen and functionality to meet the user requirements.
	•	(Optional) If possible, implement additional requirements. The difficulty of implementation may vary depending on the scope of the requirements, so please choose an appropriate scope for the target.
	•	In addition to functionality implementation, express the implementation direction in a document considering the entire development process, including requirement analysis, design, development, testing, deployment, and maintenance.
	•	The focus will be on problem-solving abilities considering the entire development process, rather than implementing every case in code.
	•	Feel free to contact me if you have any questions.

(Required) User Requirements:
	•	Apply the Dixit board game rules as they are.
	•	For 4 users.
	•	Design considering a mobile web environment.

Input Requirements:
	•	User name.
	•	Score input for each round.

Output Requirements:
	•	Total score for each user.
	•	End notification when winning conditions are met.

(Optional) Additional Requirements:
	•	Improve usability and scalability.
	•	Add a feature to determine the score for each condition and the winning score.

------------------


1. Requirement Analysis:

The goal is to implement a Dixit game scoreboard that adheres to the game rules and allows for smooth gameplay. 

The key features and functionalitie:
	•	Support 4 players
	•	Allow score entry per round
	•	Display total scores
	•	Announce the winner when a victory condition is met
	•	Be mobile-friendly

2. Design:

The design was aimed to ensure a smooth and intuitive user experience with the following aspects:
	•	Mobile-First Approach: The game has been designed to be responsive, ensuring that the layout adjusts seamlessly across various device sizes, particularly mobile screens.
	•	Scoreboard UI: A table-based layout is used for displaying player names, round scores, and total scores.
	•	Dialogs for Game Actions: Custom popups for announcing the winner.

3. Development:

The development process is broken into several stages:
	•	Initial Setup: Using React.js for UI rendering and state management and Tailwind CSS for styling and responsive design.
	•	Player Management: The useState hook is used to manage the list of players. Functions are implemented to add, remove, and update players. Players’ scores and total scores are stored in the state.
	•	Game State: Game start, round scores, total scores, and winner are managed using React’s state. This ensures that the UI dynamically updates as the game progresses.
	•	Score Submission: When scores are submitted, the scores are parsed, updated in the player data, and a check is performed to see if any player has won. If a player reaches the victory score, a popup is triggered to announce the winner.
	•	Background Effect: Mousemove events capture the mouse position and update the background’s position to create a dynamic, parallax-like effect. The background position is calculated in percentages based on mouse position.
	•	Dialogs and Reset Mechanism:
	•	Winner Popup: A dialog that displays the winner once a player reaches the victory score.
	•	Game Reset Popup: A confirmation dialog to reset the game when clicked on the logo.

4. Testing:

Testing is essential to ensure that the game functions as expected:
	•	Unit Testing:
	•	Use Jest for testing individual functions, particularly for score submission logic and player management.
	•	Mock user input for score changes and check if total scores and winning conditions are updated correctly.
	•	Integration Testing:
	•	Ensure that the state changes (adding/removing players, submitting scores) trigger the correct UI updates (like updating the scoreboard, displaying the winner).
	•	UI Testing:
	•	Perform cross-device testing to ensure the responsiveness and mobile optimization are functioning correctly.
	•	Verify that the background effect responds accurately to mouse movement on various screen sizes.
	•	Edge Case Testing:
	•	Test for edge cases such as trying to add more than the maximum allowed players or inputting non-numeric values for scores.

5. Deployment:
	•	Deployment Platform: Deploy the application on platforms like Vercel or Netlify, which support React-based applications and provide a seamless CI/CD pipeline.
	•	CI/CD Setup: Set up GitHub Actions to automatically build, test, and deploy the application whenever changes are pushed to the repository.
	•	Version Control: Use Git for version control, and maintain a clean branching strategy (e.g., feature branches, main for production-ready code).

6. Maintenance:

After deployment, the game will need to be maintained for any potential issues or future enhancements:
	•	Bug Fixes: Monitor for bugs and errors, particularly with score calculation and the reset mechanism, and resolve them promptly.
	•	Feature Enhancements: Based on user feedback, add new features such as saving high scores, adding more customizable options for players, or incorporating different game modes.

8. Thought process:

    •   Added Visual elements: color-coded circles are placed within a score grid to indicate player positions.
    •   Added Player Management: Adding, removing, and updating player names and colors.
	•	Add Scoreboard Functionality: Showing Score board which shows the visual player progress.
	•	Improved the User Interface: A user-friendly interface featuring dynamic background movements based on user mouse interactions.
	•	Added the Game Flow: The game needs to handle starting the game, submitting scores, notifying the winner, and resetting the game.

9. Further Improvements
    •	Display cards
    •	avoid invalid score input e.g negative input