function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function () {
        var neighbors = [], top, right, left, bottom;

        if (i < cols - 1) {
            right = grid[i + 1][j];
        }
        if (i > 0) {
            left = grid[i - 1][j];
        }
        if (j < rows - 1) {
            bottom = grid[i][j + 1];
        }
        if (j > 0) {
            top = grid[i][j - 1];
        }

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.addNeighbors = function() {

    }

    this.highlight = function (col) {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(col);
        rect(x, y, w, w);

    }

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }
}