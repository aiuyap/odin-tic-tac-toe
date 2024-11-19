const EventListenerHandler = (function() {

    const restartBtn = document.createElement("button");
    restartBtn.setAttribute("id", "reset-btn");
    restartBtn.addEventListener("click", () => {
        Game.resetGame();
    });

    const startBtn = document.querySelector("#start-btn");
    startBtn.addEventListener("click", () => {
        Gameboard.generateBoard();
        const winContainer = document.querySelector("#winner-container");
        restartBtn.textContent = "Restart";
        winContainer.appendChild(restartBtn);
        startBtn.remove();
    });
})();
const Gameboard = (function() {
    let board = ["","","","","","","","",""];

    const getBoard = () => board;

    const resetBoard =() => board = ["","","","","","","","",""];

    const generateBoard = () => {
        document.querySelector("#start-btn").remove();

        const divContainer = document.querySelector("#container");
        const caseContainer = document.createElement("div");
        caseContainer.setAttribute("id", "case");
        const createCell = document.createElement("div");
        createCell.classList.add("cell");
        divContainer.appendChild(caseContainer);
        for (let i = 0; i < 9; i++) {
            caseContainer.appendChild(createCell.cloneNode());
        }
        const allCells = document.querySelectorAll(".cell");
        allCells.forEach((cell, index) => {
            cell.setAttribute("value", index);
            cell.addEventListener("click", () => {
                if (board[index] !== "") {
                    alert("Cell already taken!");
                    return
                }
                const currentPlayer = Game.getCurrentPlayer();
                cell.textContent = currentPlayer;
                board[index] = currentPlayer;
                Game.checkGameStatus();
            });
        });
    }

    return {generateBoard, getBoard, resetBoard};
})();

const Game = (function() {
    let currentPlayer = "X";

    const getCurrentPlayer = () => {
        if(currentPlayer === "X") {
            currentPlayer = "O";
            return currentPlayer;
        } else {
            currentPlayer = "X";
            return currentPlayer;
        }
    };

    const checkGameStatus = () => {
        if(checkWinner(Gameboard.getBoard())) {
            document.querySelector("#winner").textContent = `Player ${currentPlayer} won the game!`;
        }
        if(checkTie(Gameboard.getBoard())) {
            document.querySelector("#winner").textContent = `It's a tie!`;
        }
    }

    function resetGame () {
        Gameboard.resetBoard();
        const allCells = document.querySelectorAll(".cell");
        allCells.forEach(cell => {
            cell.textContent = "";
        });
        document.querySelector("#winner").textContent = "";
    }

    function checkTie(board) {
        return board.every(cell => cell !== "");
    }

    function checkWinner (board) {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4 ,8], [2, 4, 8]];
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }
    
    return {getCurrentPlayer, checkGameStatus, resetGame, checkTie, checkWinner};
})();





