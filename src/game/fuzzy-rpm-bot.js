import { random } from './random';

export class FuzzyRpmBot {
    #car;
    #rpms;

    constructor(car, fuzzy, rpm) {
        this.#car = car;
        this.#rpms = new Array(6).fill(0).map((_, i) => random(rpm - fuzzy, rpm + fuzzy));

        this.#car.addEventListener('rpmChange', this.#onRpmChange.bind(this));

        this.#car.start();
        this.#car.gearUp();
    }

    #onRpmChange(rpm) {
        if (rpm >= this.#rpms[0]) {
            this.#car.gearUp();
            this.#rpms = this.#rpms.slice(1);
        }
    }
}
