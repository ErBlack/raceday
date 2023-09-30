import { BotFuzzyRpm } from './bot-fuzzy-rpm';
import { Nissan } from './nissan';
import { BotRpm } from './bot-rpm';
import { Sign } from './sign';
import { canvasSize, distance, pxPerCentimeter } from './const';
import { Mitsubishi } from './mitsubishi';
import { Toyota } from './toyota';
import { Mazda } from './mazda';
import { gearStore, rpmStore, speedStore } from './store';
import { Player } from './player';

/**
 * @type {{
 *    objects: {update: (dt: number) => void}[]
 *    bots: import('./bot').Bot[]
 *    cars: import('./car').Car[]
 *    playerCar: import('./car').Car
 *    signs: import('./sign').Sign[]
 *    player: Player
 * }}
 */
export let gameState;

export const init = () => {
    const car1 = new Mitsubishi();
    const car2 = new Toyota();
    const car3 = new Mazda();
    const car4 = new Nissan();

    car4.addEventListener('speedChange', speedStore.set);
    car4.addEventListener('rpmChange', (/** @type {number} */ value) => rpmStore.set(value / car4.maxRpm));
    car4.addEventListener('gearChange', gearStore.set);

    const bot1 = new BotRpm(car1, 5500);
    const bot2 = new BotFuzzyRpm(car2, 1000, 6000);
    const bot3 = new BotFuzzyRpm(car3, 500, 7000);

    const player = new Player(car4);

    gameState = {
        objects: [car1, car2, car3, car4],
        cars: [car1, car2, car3, car4],
        bots: [bot1, bot2, bot3],
        playerCar: car4,
        signs: [new Sign(canvasSize - 525, 0), new Sign(-distance / pxPerCentimeter + canvasSize - 555, 1)],
        player,
    };
};

export const startRace = () => {
    gameState?.playerCar.start();
    gameState?.bots.forEach(bot => bot.start());
};

export const clear = () => {
    gameState?.bots.forEach(bot => bot.kill());
};
