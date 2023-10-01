import { random } from '../../lib/random';
import { CARS } from '../assets';
import { Car } from './car';
import { Exhaust } from './exhaust';

export class Mazda extends Car {
    /**
     * @type {Exhaust | undefined}
     */
    #exhaust1;
    /**
     * @type {Exhaust | undefined}
     */
    #exhaust2;
    constructor() {
        super({
            speedRatio: 26.6,
            gearRatio: [2.97, 2.07, 1.43, 1, 0.84, 0.56],
            gearVelocity: [
                [1, 50, 154, 80],
                [1, 6, 140, 65],
                [1, 12, 207, 82],
                [1, 5, 237, 115],
                [1, 0, 50, 210],
                [1, 10, 380, 250],
            ],
            maxRpm: 8000,
            power: 0.0045,
            x: 999,
            sprite: CARS[2],
        });
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        super.update(dt);

        if (this.#exhaust1) {
            this.#exhaust1.update(dt);
            if (this.#exhaust1.done) {
                this.#exhaust1 = undefined;
            }
        }

        if (this.#exhaust2) {
            this.#exhaust2.update(dt);

            if (this.#exhaust2.done) {
                this.#exhaust2 = undefined;
            }
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} worldDistance
     */
    render(context, worldDistance) {
        super.render(context, worldDistance);

        this.#exhaust1 && this.#exhaust1.render(context, this.x + 15, this.y + 202);
        this.#exhaust2 && this.#exhaust2.render(context, this.x + 71, this.y + 203);
    }

    gearUp() {
        const result = super.gearUp();

        if (result) {
            this.#exhaust1 = new Exhaust(13, random(25, 35));
            this.#exhaust2 = new Exhaust(13, random(25, 35));
        }

        return result;
    }
}
