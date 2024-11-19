const EventListenerHandler = (function() {

    const restartBtn = document.createElement("button");
    restartBtn.setAttribute("id", "reset-btn");
    restartBtn.addEventListener("click", () => {
        Game.resetGame();
    });

    const nameForm = document.querySelector("form");
    nameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const player1name = document.querySelector("#player-x-name").value;
        const player2name = document.querySelector("#player-o-name").value;
        Game.setName(player1name, player2name);
        Gameboard.generateBoard();
        const winContainer = document.querySelector("#winner-container");
        restartBtn.textContent = "Restart";
        winContainer.appendChild(restartBtn);
        nameForm.remove();
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
                cell.textContent = currentPlayer.mark;
                board[index] = currentPlayer.mark;
                Game.checkGameStatus();
            });
        });
    }

    return {generateBoard, getBoard, resetBoard};
})();

const Game = (function() {
    const players = [];
    let currentPlayer;

    function setName (name1, name2) {
        players[0] = createPlayer(name1, "X");
        players[1] = createPlayer(name2, "O")
        currentPlayer = players[0];
    }

    const getCurrentPlayer = () => {
        document.querySelector("#winner").textContent = `${currentPlayer.name}'s Turn (${currentPlayer.mark})`;
        if(currentPlayer === players[0]) {
            currentPlayer = players[1];
            return players[1];
        } else {
            currentPlayer = players[0];
            return players[0];
        }
    };

    const checkGameStatus = () => {
        if(checkWinner(Gameboard.getBoard())) {
            document.querySelector("#winner").textContent = `${currentPlayer.name} won the game!`;
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
    
    return {setName, getCurrentPlayer, checkGameStatus, resetGame, checkTie, checkWinner};
})();

function createPlayer (name, mark) {
    return {name, mark};
}





