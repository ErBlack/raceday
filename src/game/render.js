import { CITY } from './assets';
import { canvasSize, distance, pxPerSantimeter, tilePhysicalSize } from './const';
import { gameState } from './game-state';

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

export const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const worldDistance = Math.min(gameState.playerCar.distance, distance);

    renderWorld(worldDistance);

    gameState.cars.forEach(car => {
        car.render(context, car.distance - worldDistance);
    });

    gameState.signs.forEach(sign => sign.render(context, worldDistance));
};
