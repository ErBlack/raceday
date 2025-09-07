import { Driver } from './driver';
import { random } from '../../lib/random';

export class Bot extends Driver {
    /**
     * @type {{ event: string, callback: Function }[]}
     */
    #subscriptions = [];
    /**
     * @type {NodeJS.Timeout|undefined}
     */
    #startTimeout;
    /**
     * @param {string} event
     * @param {Function} callback
     */
    subscribe(event, callback) {
        this.#subscriptions.push({ event, callback });
        this.car.addEventListener(event, callback);
    }
    start() {
        this.#startTimeout = setTimeout(
            () => {
                this.car.gearUp();
            },
            random(10, 200)
        );
    }
    kill() {
        clearTimeout(this.#startTimeout);

        this.#subscriptions.forEach(({ event, callback }) => {
            this.car.removeEventListener(event, callback);
        });

        this.#subscriptions = [];
    }
}
