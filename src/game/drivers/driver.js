export class Driver {
    /**
     * @type {import('../objects/car').Car}
     */
    car;
    /**
     * @param {import('../objects/car').Car} car
     */
    constructor(car) {
        this.car = car;
    }
}
