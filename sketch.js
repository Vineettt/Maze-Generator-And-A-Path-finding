let w_h = 600;
let cols = 10;
let rows = 10;
let grid = new Array(cols);
let w, h;

stack = [];

let createMaze = true;


function setup() {
    createCanvas(w_h, w_h);
    w = w_h / cols;
    h = w_h / rows;
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
    current = grid[0][0];

}

function draw() {
    background(51);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255, 0, 0, 50));
        }
    }

    if(createMaze === true){
        current.visited = true;
        current.highlight(color(0, 0, 255, 100));
    
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current.highlight(color(0, 0, 0, 0));
            current = stack.pop();
        }
    }
    if(stack.length === 0){
        current.highlight(color(0, 0, 0, 0));
        createMaze = false;
        noLoop();
    }
}



function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}