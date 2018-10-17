/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let counter = 1;
let moves = 0;


var gameInitialControl = function setGameInitialState() {
    var newValue = 2;
    var gameInfo  = document.getElementById("gameInfo");
    var text = "Player One Turn";
    var swapText = "Player Two Turn";

    var gameInitialControl = {};

    function getNextValue() {
        newValue = newValue == 1 ? 2 : 1;
        if (gameInfo.innerText ==  text)
            gameInfo.innerText = swapText;
        else
            gameInfo.innerText = text;
        return newValue;
    }

    function reset() {
        newValue = 2;
        gameInfo.innerText = "Player One Turn";

    }
    gameInitialControl.getNextValue = getNextValue;
    gameInitialControl.reset = reset;
    return gameInitialControl;
}();

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="zero">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function isSet(val) {
    return val == 1 || val == 2;
}

function resetGame() {
    grid = [];
        counter = 1;
        moves = 0;
        gameInitialControl.reset();
        initializeGrid();
        renderMainGrid();
        addClickHandlers();
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if (isSet(grid[colIdx][rowIdx]))
        return;

    moves += 1;

    var newValue = gameInitialControl.getNextValue();
    grid[colIdx][rowIdx] = newValue;

    counter = (counter+1)%2;
    renderMainGrid();
    addClickHandlers();
    let player = newValue == 1 ? "Player" : "Computer";
    if (gameOver(this)){
        alert("Winner: "+player);
        resetGame();
    } else if(moves == 9){
        alert("Draw");
       resetGame();
    }

}

function gameOver(clicked) {
    return(row(grid) || column(grid) || diagonal(grid));
}

function row(grid) {
    for (i=0;i<3;i++){
        if (grid[i][0] == grid[i][1] &&
                   grid[i][1] == grid[i][2] &&
                   grid[i][0] != 0)
                   return (true);

    }
    return false;
}

function column(grid) {
    for (i=0;i<3;i++){
        if (grid[0][i] == grid[1][i] &&
                   grid[1][i] == grid[2][i] &&
                   grid[0][i] != 0)
                   return (true);

    }
    return false;
}

function diagonal(grid) {
        if (grid[0][0] == grid[1][1] &&
                   grid[1][1] == grid[2][2] &&
                   grid[0][0] != 0)
                   return (true);
        if (grid[0][2] == grid[1][1] &&
                grid[1][1] == grid[2][0] &&
                 grid[0][2] != ' ')
                return(true);
    return false;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();