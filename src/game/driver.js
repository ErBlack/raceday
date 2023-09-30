export class Driver {
    /**
     * @type {import('./car').Car}
     */
    car;
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        this.car = car;
    }
}
