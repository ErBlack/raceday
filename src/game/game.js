import { BotFuzzyRpm } from './bot-fuzzy-rpm';
import { Nissan } from './nissan';
import { BotRpm } from './bot-rpm';
import { Sign } from './sign';
import { canvasSize, distance, pxPerCentimeter } from './const';
import { Mitsubishi } from './mitsubishi';
import { Toyota } from './toyota';
import { Mazda } from './mazda';
import { gameStarted, gearStore, resultsStore, rpmStore, speedStore } from './store';
import { Player } from './player';
import { startLoop, stopLoop } from './loop';

/**
 * @type {{
 *    objects: {update: (dt: number) => void}[]
 *    bots: import('./bot').Bot[]
 *    cars: import('./car').Car[]
 *    playerCar: import('./car').Car
 *    signs: import('./sign').Sign[]
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

    nissan.addEventListener('speedChange', speedStore.set);
    nissan.addEventListener('rpmChange', (/** @type {number} */ value) => rpmStore.set(value / nissan.maxRpm));
    nissan.addEventListener('gearChange', gearStore.set);

    const bot1 = new BotRpm(mitsubishi, 5500);
    const bot2 = new BotFuzzyRpm(toyota, 1000, 6000);
    const bot3 = new BotFuzzyRpm(mazda, 500, 7000);

    const player = new Player(nissan);

    gameState = {
        objects: [mitsubishi, toyota, mazda, nissan],
        cars: [mitsubishi, toyota, mazda, nissan],
        bots: [bot1, bot2, bot3],
        playerCar: nissan,
        signs: [new Sign(canvasSize - 525, 0), new Sign(-distance / pxPerCentimeter, 1)],
        player,
    };

    startLoop();

    await new Promise(resolve => {
        raceTimeout = setTimeout(() => {
            gameState?.cars.forEach(car => car.start());
            gameState?.bots.forEach(bot => bot.start());
            resolve(undefined);
        }, 3490);
    });

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
};
