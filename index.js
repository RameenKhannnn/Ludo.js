Text
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const rollDiceButton = document.getElementById('rollDice');

    const cells = [];
    let currentPlayer = 1;
    let diceValue = 1;

    // Create cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    // Create initial tokens
    const tokens = {
        'player1': [{ position: -1 }, { position: -1 }, { position: -1 }, { position: -1 }],
        'player2': [{ position: -1 }, { position: -1 }, { position: -1 }, { position: -1 }],
        'player3': [{ position: -1 }, { position: -1 }, { position: -1 }, { position: -1 }],
        'player4': [{ position: -1 }, { position: -1 }, { position: -1 }, { position: -1 }]
    };

    function moveToken(player, tokenIndex, steps) {
        const playerTokens = tokens[player];
        const currentPosition = playerTokens[tokenIndex].position;

        if (currentPosition === -1 && steps === 6) {
            playerTokens[tokenIndex].position = 0;
            drawToken(player, tokenIndex);
        } else if (currentPosition !== -1) {
            let newPosition = currentPosition + steps;

            if (newPosition > 15) {
                newPosition = 15;
            }

            playerTokens[tokenIndex].position = newPosition;
            drawToken(player, tokenIndex);
        }
    }

    function drawToken(player, tokenIndex) {
        const playerTokens = tokens[player];
        const token = playerTokens[tokenIndex];
        const cellId = `cell-${Math.floor(token.position / 4)}-${token.position % 4}`;
        const cell = document.getElementById(cellId);

        const existingToken = cell.querySelector(`.${player}`);
        if (existingToken) {
            cell.removeChild(existingToken);
        }

        const newToken = document.createElement('div');
        newToken.className = `token ${player}`;
        cell.appendChild(newToken);
    }

    rollDiceButton.addEventListener('click', function() {
        diceValue = Math.floor(Math.random() * 6) + 1;
        console.log(`Player ${currentPlayer} rolled ${diceValue}`);

        const player = `player${currentPlayer}`;
        const tokensForPlayer = tokens[player];

        for (let i = 0; i < 4; i++) {
            if (tokensForPlayer[i].position === -1 || tokensForPlayer[i].position === 15) {
                moveToken(player, i, diceValue);
                break;
            }
        }

        currentPlayer++;
        if (currentPlayer > 4) {
            currentPlayer = 1;
        }
    });
});
