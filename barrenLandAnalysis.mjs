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

    //transform given string coordinates into arrays of integers
    const barrenLandCoordinates = (cornersString) =>{
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

    console.log(barrenLandCoordinates(givenCornersString));

    
} 

findFertileLand(STDIN);