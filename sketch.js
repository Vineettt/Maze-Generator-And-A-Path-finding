let w_h = 600;
let cols = 25;
let rows = 25;
let grid = new Array(cols);
let w, h;

let stack = [];

let createMaze = true;
let startAStarAlog = false;

let openSet = [];
let closedSet = [];

let start;
let end;

let started = false;

function startMaze() {
    let temp =  parseInt(document.getElementById("range").value)
    cols = temp;
    rows = temp;
    stack = [];
    openSet = [];
    closedSet = []; 
    started = true;
    createMaze = true;
    startAStarAlog = false;
    this.setup();
    loop();
}


function setup() {
    createCanvas(w_h, w_h);
    noLoop();
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

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors();
        }
    }

    current = grid[0][0];

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start);
}

function draw() {
    if (started) {
        background(51);
        // frameRate(5);    
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
        if (createMaze === true) {
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
        if (stack.length === 0 && createMaze === true) {
            console.log("Maze completed!");
            current.highlight(color(0, 0, 0, 0));
            createMaze = false;
            startAStarAlog = true;
        }
        if (startAStarAlog === true) {
            if (openSet.length > 0) {
                var winner = 0;
                for (var i = 0; i < openSet.length; i++) {
                    if (openSet[i].f < openSet[winner].f) {
                        winner = i;
                    }
                }
                current = openSet[winner];
                if (current === end) {
                    noLoop();
                    console.log("DONE!");
                }
                removeFromArray(openSet, current);
                closedSet.push(current);
                var neighbors = current.neighbors;
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    if (!closedSet.includes(neighbor) && !this.current.walls[this.getWallIndex(current, neighbor)]) {
                        var tempG = current.g + heuristic(neighbor, current);
                        var newPath = false;
                        if (openSet.includes(neighbor)) {
                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                                newPath = true;
                            }
                        } else {
                            neighbor.g = tempG;
                            newPath = true;
                            openSet.push(neighbor);
                        }
                        if (newPath) {
                            neighbor.h = heuristic(neighbor, end);
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.previous = current;
                        }
                    }

                }
            } else {
                console.log('no solution');
                noLoop();
                return;
            }

            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    grid[i][j].show();
                }
            }

            for (var i = 0; i < closedSet.length; i++) {
                closedSet[i].show(color(255, 0, 0, 60));
            }

            for (var i = 0; i < openSet.length; i++) {
                openSet[i].show(color(0, 255, 50, 50));
            }

            path = [];
            var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            noFill();
            stroke(26, 44, 51);
            beginShape();
            for (var i = 0; i < path.length; i++) {
                vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
            }
            endShape();
        }
    }
}

function getWallIndex(a, b) {
    if (a.i - b.i === -1) {
        return 1;
    }
    if (a.j - b.j === 1) {
        return 0;
    }
    if (a.i - b.i === 1) {
        return 3;
    }
    if (a.j - b.j === -1) {
        return 2;
    }
    return ""
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

function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    // var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}
