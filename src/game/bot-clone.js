import { Bot } from './bot';
import { stats } from './store';

export class BotClone extends Bot {
    /**
     * @type {NodeJS.Timeout|undefined}
     */
    #startTimeout;
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        super(car);

        stats.subscribe(stats => {
            this.stats = stats;
        });

        this.subscribe('rpmChange', this.#onRpmChange);
    }

    start() {
        this.#startTimeout = setTimeout(() => {
            this.car.gearUp();
            // @ts-ignore
        }, this.stats.startDelay);
    }

    /**
     * @param {number} rpm
     */
    #onRpmChange = rpm => {
        // @ts-ignore
        if (rpm >= this.stats[this.car.gear + 1]) {
            this.car.gearUp();
        }
    };
}
