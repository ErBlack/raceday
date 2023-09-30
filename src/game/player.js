import { Driver } from './driver';

export class Player extends Driver {
    /**
     * @param {import('./car').Car} car
     */
    constructor(car) {
        super(car);

        document.addEventListener('keydown', this.#onKeyDown);
    }

    /**
     * @param {KeyboardEvent} event
     */
    #onKeyDown = event => {
        switch (event.key) {
            case 'ArrowUp':
                this.car.gearUp();
                break;
            case 'ArrowDown':
                this.car.gearDown();
                break;
        }
    };
}
