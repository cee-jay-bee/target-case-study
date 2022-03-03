class Coordinates {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    xValue() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    yValue() {
        return this.y;
    }
    
    setBarren(barren) {
        this.barren = barren;
    }

    getBarren() {
        return this.barren;
    }

    setVisited(visited) {
        this.visited = visited;
        if(visited) {
            text = "#";
        }
    }

    getVisited() {
        return this.visited;
    }

    setText(text) {
        this.text=text;
    }

    getText() {
        return this.text;
    }
}