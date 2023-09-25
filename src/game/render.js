import { CARS, CITY } from './assets';
import { canvasSize, distance, pxPerSantimeter, tilePhysicalSize } from './const';
import { gameState } from './game-state';

const carWidth = 100;
const carHeight = 220;

// const finishSign = new Sign(pxPerSantimeter, 1);

/**
 * @type {HTMLCanvasElement}
 */
let canvas;
/**
 * @type {CanvasRenderingContext2D}
 */
let context;

/**
 * @param {HTMLCanvasElement} node
 */
export const initRender = node => {
    canvas = node;
    // @ts-ignore
    context = canvas.getContext('2d');
};

/**
 * @param {number} offset
 */
const renderWorld = offset => {
    const currentTileIndex = Math.floor(offset / tilePhysicalSize) % 4;
    const nextTileIndex = (currentTileIndex + 1) % 4;

    const tileOffset = (offset % tilePhysicalSize) / pxPerSantimeter;

    const currentTile = CITY[currentTileIndex];
    const nextTile = CITY[nextTileIndex];

    context.drawImage(currentTile, 0, tileOffset, canvasSize, canvasSize);
    context.drawImage(nextTile, 0, tileOffset - canvasSize + 1, canvasSize, canvasSize);
};

const carPositions = [750, 878, 999, 1121];

/**
 * @param {number} distance
 * @param {number} index
 */
const renderCar = (distance, index) => {
    const car = CARS[index];

    const position = canvasSize - distance / pxPerSantimeter - carHeight - 100;

    context.drawImage(car, carPositions[index], position, carWidth, carHeight);
};

export const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const worldDistance = Math.min(gameState.playerCar.distance, distance);

    renderWorld(worldDistance);

    gameState.cars.forEach((car, index) => {
        renderCar(car.distance - worldDistance, index);
    });

    gameState.signs.forEach(sign => sign.render(context, worldDistance));
};
