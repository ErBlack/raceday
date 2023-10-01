import { CITY } from './assets';
import { canvasSize, distance, pxPerCentimeter, tilePhysicalSize } from './const';
import { gameState } from './game';

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

const finishOffset = distance;

/**
 * @param {number} offset
 */
const renderWorld = offset => {
    const currentTileIndex = Math.floor(offset / tilePhysicalSize) % 4;
    const nextTileIndex = (currentTileIndex + 1) % 4;

    const tileOffset = (offset % tilePhysicalSize) / pxPerCentimeter;

    const currentTile = CITY[currentTileIndex];
    const nextTile = CITY[nextTileIndex];

    context.drawImage(currentTile, 0, tileOffset, canvasSize, canvasSize);
    context.drawImage(nextTile, 0, tileOffset - canvasSize + 1, canvasSize, canvasSize);
};

export const render = () => {
    const worldDistance = Math.min(gameState.playerCar.distance, finishOffset);

    renderWorld(worldDistance);

    gameState.cars.forEach(car => {
        car.render(context, car.distance - worldDistance);
    });

    gameState.signs.forEach(sign => sign.render(context, worldDistance));
};
