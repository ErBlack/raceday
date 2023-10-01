import { Driver } from './driver';
import { stats } from './store';

export class Player extends Driver {
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        super(car);

        document.addEventListener('keydown', this.#onKeyDown);
        document.addEventListener('touchstart', this.#onTouchStart);
        document.addEventListener('touchend', this.#onTouchEnd);

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
        document.removeEventListener('touchstart', this.#onTouchStart);
        document.removeEventListener('touchend', this.#onTouchEnd);

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

    /**
     * @param {TouchEvent} event
     */
    #onTouchStart = event => {
        this.touchStartY = event.touches[0].clientY;
    };

    /**
     * @param {TouchEvent} event
     */
    #onTouchEnd = event => {
        if (this.touchStartY === undefined) return;

        if (this.touchStartY > event.changedTouches[0].clientY) {
            this.car.gearUp();
        } else {
            this.car.gearDown();
        }

        this.touchStartY = undefined;
    };
}
