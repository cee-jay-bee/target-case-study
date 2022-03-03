import Coordinates from './coordinatesClass.mjs';
const STDIN = ['0 292 399 307'];
const STDIN2 = ['48 192 351 207', '48 392 351 407', '120 52 135 547', '260 52 275 547'];

const findFertileLand = (givenCornersString) => {
    const tileSize = 1;
    const width = 400;
    const length = 600;

    let xTiles = width / tileSize;
    let yTiles = length /tileSize;

    let grid = new Coordinates(xTiles, yTiles);

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
            for (let y = cornersOfBarrenLand[1]; y <= cornersOfBarrenLand[3]; y++) {
                let currentCoordinates = new Coordinates(x, y);
                coveredBarrenLandCoordinates.push(currentCoordinates);
            }
        }
        return coveredBarrenLandCoordinates;
    }
    
    
    let barrenLandCoordinatesArrays = barrenLandCoordinates(givenCornersString);
    let barrenLandRectangles = [];
    
    for (let i = 0; i < barrenLandCoordinatesArrays.length; i++){
        barrenLandRectangles.push(landOfCoveredRectangleFromCoordinates(barrenLandCoordinatesArrays[i]));

    }

    console.log(barrenLandRectangles);
    
} 

findFertileLand(STDIN);