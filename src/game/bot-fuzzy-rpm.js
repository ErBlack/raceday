import { Bot } from './bot';
import { random } from './random';

export class BotFuzzyRpm extends Bot {
    #rpms;

    /**
     * @param {import('./car').Car} car
     * @param {number} fuzzy
     * @param {number} rpm
     */
    constructor(car, fuzzy, rpm) {
        super(car);

        this.#rpms = new Array(6).fill(0).map(() => random(rpm - fuzzy, rpm + fuzzy));

        this.subscribe('rpmChange', this.#onRpmChange);

        this.car.start();
        this.car.gearUp();
    }

    /**
     * @param {number} rpm
     */
    #onRpmChange = rpm => {
        if (rpm >= this.#rpms[0]) {
            this.car.gearUp();
            this.rpms = this.#rpms.slice(1);
        }
    };
}
