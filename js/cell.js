function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.count;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.previous = undefined;


    this.neighbors = [];

    this.checkNeighbors = function () {
        let activeNeighour = [];

        this.neighbors.forEach(element => {
            if(!element.visited){
                activeNeighour.push(element);
            }
        });

        if (activeNeighour.length > 0) {
            var r = floor(random(0, activeNeighour.length));
            return activeNeighour[r];
        } else {
            return undefined;
        }
    }

    this.addNeighbors = function () {
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    }

    this.highlight = function (col) {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(col);
        rect(x, y, w, w);
    }

    this.show = function (col) {
        if(col){
            fill(col);
            rect(this.i * w, this.j * h, w, h);
        }else{
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
}