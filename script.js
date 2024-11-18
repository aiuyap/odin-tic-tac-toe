const gameBoard = (function() {
    const board = [[1,2,3], [4,5,6], [7,8,9]];

    const getBoard = () => board;
    const addInput = (choice, currentPlayer) => {
        const row = choice[0];
        const col = choice[1];
        board[row][col] = currentPlayer;
        return board;
    };

    const checkInput = (choice) => {
        const row = choice[0];
        const col = choice[1];
        if (board[row][col] === "x" || board[row][col] === "o") {
            return true;
        }
        return false;
    }
    
    const checkGameStatus = (player) => {
        for (let i = 0; i < 3; i++) {
            if(board[i][0] === player && board[i][1] === player && board[i][2] === player) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if(board[0][i] === player && board[1][i] === player && board[2][i] === player) {
                return true;
            }
        }

        if(board[0][0] === player && board[1][1] === player && board[2][2]) {
            return true;
        }

        if(board[0][2] === player && board[1][1] === player && board[2][0]) {
            return true;
        }
        return false;
    }

    return {getBoard, addInput, checkInput, checkGameStatus};
})();

function createPlayer (playerType) {
    const player = playerType;

    return {player};
}

function startGame () {
    let gameStatus = false;
    console.log(gameBoard.getBoard());
    let currentPlayer = "x";
    while(!gameStatus) {
        let userInput = getUserInput(currentPlayer);
        if (gameBoard.checkInput(userInput)) {
            alert("Invalid Input");
        } else {
            gameBoard.addInput(userInput, currentPlayer);
        }
        console.log(gameBoard.getBoard());
        gameStatus = gameBoard.checkGameStatus(currentPlayer);
        currentPlayer = switchPlayer(currentPlayer);
    }
}


function getUserInput(player) {
    const input = [];
    input[0] = prompt(`Player ${player}'s turn. Enter row: `);
    input[1] = prompt(`Player ${player}'s turn. Enter column: `);

    return input;
}

function switchPlayer (player) {
    return player === "x" ? "o" : "x";
}