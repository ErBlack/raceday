export class Car {
    #speedRatio = 26.6;
    #gear = 0;
    #gearRatio = [2.97, 2.07, 1.43, 1, 0.84, 0.56];
    #rpm = 0;
    #maxRpm = 8000;
    #distance = 0;

    constructor() {}
    /**
     * @param {number} dt;
     */
    update(dt) {
        if (this.#gear === 0) return;

        this.#rpm = Math.min(this.#maxRpm, this.#rpm + dt);

        const speed = this.#getSpeed();

        const distance = (dt / 1000 / 60) * speed;

        this.#distance += distance;

        console.log(this.#distance);

        if (this.#distance > 1.60934) {
            this.#gear = 0;
        }
    }
    #getSpeed() {
        return this.#rpm / this.#gearRatio[this.#gear - 1] / this.#speedRatio;
    }
    /**
     * @param {number} newGear
     */
    #changeGear(newGear) {
        const newGearRatio = this.#gearRatio[newGear - 1];

        if (newGearRatio === undefined) return;

        const currentRatio = this.#gearRatio[this.#gear - 1];

        if (currentRatio !== undefined) {
            this.#rpm = (this.#rpm / currentRatio) * newGearRatio;
        }

        this.#gear = newGear;
    }
    gearUp() {
        this.#changeGear(this.#gear + 1);
    }
    gearDown() {
        this.#changeGear(this.#gear - 1);
    }
}

export const Nissan = new Car();
