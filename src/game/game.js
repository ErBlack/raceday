import { BotFuzzyRpm } from './drivers/bot-fuzzy-rpm';
import { Nissan } from './objects/nissan';
import { BotRpm } from './drivers/bot-rpm';
import { Sign } from './objects/sign';
import { canvasSize, distance, pxPerCentimeter } from './const';
import { Mitsubishi } from './objects/mitsubishi';
import { Toyota } from './objects/toyota';
import { Mazda } from './objects/mazda';
import { countdown, gameStarted, gearStore, resultsStore, rpmStore, speedStore } from './store';
import { Player } from './drivers/player';
import { startLoop, stopLoop } from './loop';
import { wait } from '../lib/wait';

/**
 * @type {{
 *    objects: {update: (dt: number) => void}[]
 *    bots: import('./drivers/bot').Bot[]
 *    cars: import('./objects/car').Car[]
 *    playerCar: import('./objects/car').Car
 *    signs: import('./objects/sign').Sign[]
 *    player: Player,
 * }}
 */
export let gameState;

/**
 * @type {any}
 */
let raceTimeout;

export const startGame = async () => {
    resultsStore.set(undefined);
    gameStarted.set(true);

    const mitsubishi = new Mitsubishi();
    const toyota = new Toyota();
    const mazda = new Mazda();
    const nissan = new Nissan();

    const bot1 = new BotRpm(mitsubishi, 5500);
    const bot2 = new BotFuzzyRpm(toyota, 1000, 6000);
    const bot3 = new BotFuzzyRpm(mazda, 500, 7000);

    const player = new Player(nissan);

    gameState = {
        objects: [mitsubishi, toyota, mazda, nissan],
        cars: [mitsubishi, toyota, mazda, nissan],
        bots: [bot1, bot2, bot3],
        playerCar: nissan,
        signs: [new Sign(canvasSize - 525, 0), new Sign(canvasSize - distance / pxPerCentimeter - 320, 1)],
        player,
    };

    gameState.playerCar.addEventListener('speedChange', speedStore.set);
    gameState.playerCar.addEventListener('rpmChange', (/** @type {number} */ value) =>
        rpmStore.set(value / gameState.playerCar.maxRpm)
    );
    gameState.playerCar.addEventListener('gearChange', (/** @type {{gear: number}} */ { gear }) => gearStore.set(gear));

    startLoop();

    await wait(500);

    countdown.set(3);
    await wait(1000);
    countdown.set(2);
    await wait(1000);
    countdown.set(1);
    await wait(1000);
    countdown.set('Go');
    gameState?.cars.forEach(car => car.start());
    gameState?.bots.forEach(bot => bot.start());
    await wait(1000);
    countdown.set(undefined);

    let playerFinished = false;

    /**
     * @type {number[]}
     */
    const results = [];

    /**
     * @type {number[]}
     */
    gameState.cars.map((car, index) => {
        car.addEventListener(
            'finish',
            /**
             * @param {number} result
             */
            result => {
                results[index] = result;

                if (playerFinished || index === 3) {
                    playerFinished = true;
                }

                if (playerFinished) {
                    // @ts-ignore
                    resultsStore.set([...results]);
                }
            }
        );
    });

    await Promise.all(gameState.cars.map(car => new Promise(resolve => car.addEventListener('outOfTrack', resolve))));

    stopGame();
};

export const stopGame = () => {
    clearTimeout(raceTimeout);
    gameState?.bots.forEach(bot => bot.kill());
    stopLoop();
    gameStarted.set(false);
    gearStore.set(0);
    rpmStore.set(0);
    speedStore.set(0);
};
