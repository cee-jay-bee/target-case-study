
const STDIN = ['0 292 399 307'];
const STDIN2 = ['48 192 351 207', '48 392 351 407', '120 52 135 547', '260 52 275 547'];
const STDIN3 = ['0 0 0 599', '0 0 399 0', '10 0 10 599', '0 250 399 250'];
const STDIN4 = ["0 0 0 599", "2 0 2 599", "3 2 399 3", "5 0 5 1", "10 4 12 599"]

const barrenLandAnalysis = (givenCornersString) => {
    const tileSize = 1;
    const width = 400;
    const length = 600;

    let xTiles = width / tileSize;
    let yTiles = length / tileSize;

    // transform given string coordinates into arrays of integers
    // input of provided strings in arrays
    // outputs array of arrays of integers for rectangles
    const barrenLandCoordinates = cornersString =>{
        let integerCornersArray = [];

        for ( let i=0; i < cornersString.length; i++) {
            let cornersArray = cornersString[i].split(' ');
            let cornersIntegerArray = [];
            for (let j = 0; j < cornersArray.length; j++) {
                cornersIntegerArray[j] = parseInt(cornersArray[j]);
            }
            integerCornersArray.push(cornersIntegerArray);
        }
        return integerCornersArray;
    }

    // calculates each coordinate that falls within barren rectangles
    // takes in the array of arrays of given barren land parameters
    // outputs every x,y coordinate that falls into those rectangles
    const landOfCoveredRectangleFromCoordinates = cornersOfBarrenLand => {
        let coveredBarrenLandCoordinates = [];

        for (let x = cornersOfBarrenLand[0]; x <= cornersOfBarrenLand[2]; x++) {
            for (let y = cornersOfBarrenLand[1]; y <= cornersOfBarrenLand[3]; y++) {;
                coveredBarrenLandCoordinates.push([x,y]);
            }
        }
        return coveredBarrenLandCoordinates;
    }

    //creates grid based on decided size and sets as fertile (1)
    const createGrid = () => {
        let newGrid = []
        for(let i = 0; i < xTiles; i++){
            newGrid[i] = [];
            for (let j = 0; j < yTiles; j++){
                newGrid[i][j] = 1;         
            }
        }
        return newGrid;
    }
    
    // recursive function to calculate the Fertile Land Area based on checking to see which piece of land is fertile and rechecking each neighbor
    // calls a search that initiates a search of all of the neighbors of that particular plot land and changes them to barren after check
    // starts the calculation over after finishing the search.
    const calculateFertileLandArea = (xValue, yValue) => {
        for (let y = yValue; y < yTiles; y++) {
            for (let x = xValue; x < xTiles; x++){
                if (grid[x][y] === 1){
                    let currentFertileArea = neighboringPlotSearch(x, y);
                    fertileLand.push(currentFertileArea);
                    calculateFertileLandArea(x, y);
                }
            }
        }
    }

    // starts with current plot of land and adds that plot to a queue to check. 
    // checks to confirm it's fertile. If fertile, it checks that all surrounding plots (non diagonal) are bot
    // in bounds and if so and also fertile it adds those to the queue. It turns the current plot to barren
    // and continues checking until there are no fertile plots adjacent to this plot and returns the size of that area.  
    const neighboringPlotSearch = (x, y) => {
        let countOfArea = 0;
        let queueToCheck = [[x, y]];

        while(queueToCheck.length){
            let currentCoord = queueToCheck.pop();
            if(grid[currentCoord[0]][currentCoord[1]] === 1) {
                countOfArea += 1;
                grid[currentCoord[0]][currentCoord[1]] = 0;
                if( currentCoord[0] - 1 >= 0 && grid[currentCoord[0] - 1][currentCoord[1]] === 1){
                    queueToCheck.push([currentCoord[0]- 1, currentCoord[1]]);
                } 
                if( currentCoord[0] + 1 < xTiles && grid[currentCoord[0] + 1][currentCoord[1]] === 1){
                    queueToCheck.push([currentCoord[0] + 1, currentCoord[1]]);
                }
                if( currentCoord[1] - 1 >= 0 && grid[currentCoord[0]][currentCoord[1] - 1] === 1){
                    queueToCheck.push([currentCoord[0], currentCoord[1] - 1]);
                }
                if( currentCoord[1] + 1 < yTiles && grid[currentCoord[0]][currentCoord[1] + 1] === 1){
                    queueToCheck.push([currentCoord[0], currentCoord[1] + 1]);
                }

            }
        }
        return countOfArea;
    }
    
    // create array to store answers to fertile land calculations
    let fertileLand = [];

    // create base grid with all fertile land
    let grid = createGrid();
    
    // change incoming string of barren land coordinates to arrays of integers
    let barrenLandCoordinatesArrays = barrenLandCoordinates(givenCornersString);
    
    // set array to contain barren land coordinate squares
    let barrenLandRectangles = [];
    
    // loop through barren land coordinates and store all barren land in array
    for (let i = 0; i < barrenLandCoordinatesArrays.length; i++) {
        barrenLandRectangles.push(landOfCoveredRectangleFromCoordinates(barrenLandCoordinatesArrays[i]));
    }
    
    // create the barren grid by looping through the barrengrids and changing fertile (1) to barren (0)

    for (let i = 0; i < barrenLandRectangles.length; i++){
        for (let j = 0; j < barrenLandRectangles[i].length; j++){
            grid[barrenLandRectangles[i][j][0]][barrenLandRectangles[i][j][1]] = 0;
        }
    }

    // calculate the total fertile land
    calculateFertileLandArea(0, 0);
    fertileLand.sort(function(a, b) {
        return a - b;
    });

    let STDOUT = '';

    if (fertileLand.length) {
        for(let area of fertileLand){
            STDOUT += area.toString() + ' ';
        }
    } else {
        STDOUT = 'No fertile land.';
    }
    
    return STDOUT;
    
} 

console.log(barrenLandAnalysis(STDIN4));

module.exports = barrenLandAnalysis;
