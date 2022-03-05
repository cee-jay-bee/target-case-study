
const STDIN = ['0 292 399 307'];
const STDIN2 = ['48 192 351 207', '48 392 351 407', '120 52 135 547', '260 52 275 547'];
const STDIN3 = ['0 3 9 6'];


const findFertileLand = (givenCornersString) => {
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
    // calls a breadth search that initiates a search of all of the neighbors of that particular plot land and changes them to barren after check
    const calculateFertileLandArea = (xValue, yValue) => {
        for (let y = yValue; y < yTiles; y++) {
            for (let x = xValue; x < xTiles; x++){
                if (grid[x][y] === 1){
                    console.log('x', x, 'y', y);
                    let currentFertileArea = breadthSearch(x, y);
                    fertileLand.push(currentFertileArea);
                    calculateFertileLandArea(x, y);
                }
            }
        }
    }

    const breadthSearch = (x, y) => {
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
    console.log(fertileLand);
} 

findFertileLand(STDIN2);

export default findFertileLand;
