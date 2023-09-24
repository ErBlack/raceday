import { Car } from './car';

export class Nissan extends Car {
    constructor() {
        super({
            speedRatio: 26.6,
            gearRatio: [2.97, 2.07, 1.43, 1, 0.84, 0.56],
            gearVelocity: [
                [1, 4.9, 154, 80],
                [1, 6, 140, 65],
                [1, 12, 207, 82],
                [1, 5, 237, 115],
                [1, 0, 50, 210],
                [1, 10, 380, 250],
            ],
            maxRpm: 8000,
            power: 0.01,
        });
    }
}
