import { BotFuzzyRpm } from './bot-fuzzy-rpm';
import { Nissan } from './nissan';
import { BotRpm } from './bot-rpm';
import { Sign } from './sign';
import { canvasSize, distance, pxPerSantimeter } from './const';

/**
 * @type {{
 *    objects: {update: (dt: number) => void}[]
 *    bots: import('./bot').Bot[]
 *    cars: import('./car').Car[]
 *    playerCar: import('./car').Car
 *    signs: import('./sign').Sign[]
 * }}
 */
export let gameState;

export const init = () => {
    const car1 = new Nissan();
    const car2 = new Nissan();
    const car3 = new Nissan();
    const car4 = new Nissan();

    const bot1 = new BotRpm(car1, 5500);
    const bot2 = new BotFuzzyRpm(car2, 1000, 6000);
    const bot3 = new BotFuzzyRpm(car3, 500, 7000);
    const bot4 = new BotRpm(car4, 8000);

    gameState = {
        objects: [car1, car2, car3, car4],
        cars: [car1, car2, car3, car4],
        bots: [bot1, bot2, bot3, bot4],
        playerCar: car4,
        signs: [new Sign(canvasSize - 525, 0), new Sign(-distance / pxPerSantimeter + canvasSize - 525, 1)],
    };
};

export const clear = () => {
    gameState.bots.forEach(bot => bot.kill());
};
