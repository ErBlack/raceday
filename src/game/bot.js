export class Bot {
    /**
     * @type {import('./car').Car}
     */
    car;
    /**
     * @type {{ event: string, callback: Function }[]}
     */
    #subscriptions = [];
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        this.car = car;
    }
    /**
     * @param {string} event
     * @param {Function} callback
     */
    subscribe(event, callback) {
        this.#subscriptions.push({ event, callback });
        this.car.addEventListener(event, callback);
    }
    kill() {
        this.#subscriptions.forEach(({ event, callback }) => {
            this.car.removeEventListener(event, callback);
        });

        this.#subscriptions = [];
    }
}
