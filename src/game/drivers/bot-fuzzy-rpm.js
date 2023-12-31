import { Bot } from './bot';
import { random } from '../../lib/random';

export class BotFuzzyRpm extends Bot {
    #rpms;

    /**
     * @param {import('../objects/car').Car} car
     * @param {number} fuzzy
     * @param {number} rpm
     */
    constructor(car, fuzzy, rpm) {
        super(car);

        this.#rpms = new Array(6).fill(0).map(() => random(rpm - fuzzy, rpm + fuzzy));

        this.subscribe('rpmChange', this.#onRpmChange);
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
