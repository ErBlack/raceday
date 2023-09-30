import { Driver } from './driver';
import { stats } from './store';

export class Player extends Driver {
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        super(car);

        document.addEventListener('keydown', this.#onKeyDown);

        /**
         * @type {{[key: number]: number}}
         */
        this.gearSwitchMap = {};

        this.car.addEventListener('start', this.#onStart);
        this.car.addEventListener('gearChange', this.#onGearChange);
        this.car.addEventListener('finish', this.#onFinish);
    }

    #onStart = () => {
        /**
         * @type {number}
         */
        this.startTime = Date.now();
    };

    /**
     * @param {{gear: number, rpm: number}} param0
     */
    #onGearChange = ({ gear, rpm }) => {
        this.gearSwitchMap[gear] = rpm;

        if (gear === 1 && this.startTime) {
            this.startDelay = Date.now() - this.startTime;
        }
    };

    /**
     * @param {number} time
     */
    #onFinish = time => {
        document.removeEventListener('keydown', this.#onKeyDown);

        const raceStats = {
            ...this.gearSwitchMap,
            time,
            delay: this.startDelay,
        };

        stats.update(stats => {
            if (raceStats.time < stats.time || !stats.time) {
                return raceStats;
            }
            return stats;
        });
    };

    /**
     * @param {KeyboardEvent} event
     */
    #onKeyDown = event => {
        switch (event.key) {
            case 'ArrowUp':
                this.car.gearUp();
                break;
            case 'ArrowDown':
                this.car.gearDown();
                break;
        }
    };
}
