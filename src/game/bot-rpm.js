import { Bot } from './bot';

export class BotRpm extends Bot {
    #rpm;
    /**
     * @param {import('./car').Car} car
     * @param {number} rpm
     */
    constructor(car, rpm) {
        super(car);

        this.#rpm = rpm;

        this.subscribe('rpmChange', this.#onRpmChange);

        this.car.start();
    }

    /**
     * @param {number} rpm
     */
    #onRpmChange = rpm => {
        if (rpm >= this.#rpm) {
            this.car.gearUp();
        }
    };
}
