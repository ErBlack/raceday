export class RpmBot {
    #car;
    #rpm;

    constructor(car, rpm) {
        this.#car = car;
        this.#rpm = rpm;

        this.#car.addEventListener('rpmChange', this.#onRpmChange.bind(this));

        this.#car.start();
        this.#car.gearUp();
    }

    #onRpmChange(rpm) {
        if (rpm >= this.#rpm) {
            this.#car.gearUp();
        }
    }
}
