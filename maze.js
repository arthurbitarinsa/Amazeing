document.addEventListener('DOMContentLoaded', function() {
    const maze = `
    ##############
    #S...........#
    #............#
    #............#
    #......###...#
    #......#.....#
    #......#.....#
    #......#.....#
    #......#.....#
    #......#.....#
    #......#.....#
    #.....T......#
    ##############
    `;

    const mazeContainer = document.getElementById('maze');

    function generateMaze() {
        mazeContainer.innerHTML = '';

        maze.split('\n').forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('maze-row');
            mazeContainer.appendChild(rowElement);

            row.split('').forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('maze-cell');
                cellElement.classList.add(cell === '#' ? 'wall' : 'path');
                if (cell === 'S') {
                    cellElement.classList.add('player');
                } else if (cell === 'T') {
                    cellElement.classList.add('exit');
                }
                rowElement.appendChild(cellElement);
            });
        });
    }

    generateMaze();

    // Player movement
    document.addEventListener('keydown', function(event) {
        const player = document.querySelector('.player');
        let x = parseInt(player.parentElement.dataset.rowIndex);
        let y = parseInt(player.dataset.cellIndex);

        // Arrow key codes
        const LEFT = 37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

        switch(event.keyCode) {
            case LEFT:
                movePlayer(x, y - 1);
                break;
            case UP:
                movePlayer(x - 1, y);
                break;
            case RIGHT:
                movePlayer(x, y + 1);
                break;
            case DOWN:
                movePlayer(x + 1, y);
                break;
        }
    });

    function movePlayer(newX, newY) {
        const player = document.querySelector('.player');
        const targetCell = document.querySelector(`[data-row-index="${newX}"] [data-cell-index="${newY}"]`);

        if (targetCell && !targetCell.classList.contains('wall')) {
            player.classList.remove('player');
            targetCell.classList.add('player');
            checkExit(targetCell);
        }
    }

    function checkExit(cell) {
        if (cell.classList.contains('exit')) {
            alert('Congratulations! You reached the exit!');
            generateMaze();
        }
    }
});
