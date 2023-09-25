import { applyBezier } from './apply-bezier';
import { distance } from './const';
import { PubSub } from './pubsub';

// const drawChart = (dots, chartElement) => {
//     const step = 1;
//     const total = 100;

//     for (let i = 0; i <= total; i += step) {
//         const bi = applyBezier(dots, i / total);

//         const dot = document.createElement('div');

//         dot.style.position = 'absolute';
//         dot.style.width = '2px';
//         dot.style.height = '2px';
//         dot.style.borderRadius = '50%';
//         dot.style.backgroundColor = 'black';
//         dot.style.left = `${i}%`;
//         dot.style.top = `${100 - bi}%`;

//         chartElement.appendChild(dot);
//     }
// };

// debug() {
//     this.#gearVelocity.forEach((dots, index) => {
//         const chartElement = document.getElementById(`gear${index + 1}`);

//         if (!chartElement) return;

//         drawChart(dots, chartElement);
//     });
// }

/**
 * @abstract
 */
export class Car extends PubSub {
    #racing = false;
    #rpm = 1;
    #gear = 0;
    #startTime = 0;
    #raceTime = 0;
    /**
     * @type {number}
     */
    #speedRatio;
    /**
     * @type {number[]}
     */
    #gearRatio;
    /**
     * @type {[number, number, number, number][]}
     */
    #gearVelocity;
    /**
     * @type {number}
     */
    #maxRpm;
    /**
     * Distance in meters
     * @type {number}
     */
    distance = 0;
    /**
     * @type {number}
     */
    #power = 0.01;

    /**
     * @param {{ speedRatio: number, gearRatio: number[], gearVelocity: [number, number, number, number][], maxRpm: number, power: number }} options
     */
    constructor({ speedRatio, gearRatio, gearVelocity, maxRpm, power }) {
        super();

        this.#speedRatio = speedRatio;
        this.#gearRatio = gearRatio;
        this.#gearVelocity = gearVelocity;
        this.#maxRpm = maxRpm;
        this.#power = power;
    }
    start() {
        this.#gear = 0;
        this.#rpm = 3000;
        this.#startTime = Date.now();
        this.#racing = true;
        this.distance = 0;
        this.emit('start');
    }
    #finish() {
        this.#racing = false;
        this.#raceTime = Date.now() - this.#startTime;
        this.#startTime = 0;

        console.log({
            result: this.#raceTime / 1000,
        });

        this.emit('finish', this.#raceTime);
    }
    /**
     * @param {number} dt;
     */
    update(dt) {
        if (this.#gear === 0) return;

        if (this.#racing) {
            this.#rpm = Math.min(this.#maxRpm, this.#rpm + this.#getRpmIncrement(dt));
            this.emit('rpmChange', this.#rpm);
        }

        const speed = this.#getSpeed();

        if (this.#racing) {
            this.emit('speedChange', speed);
        }

        const distanceIncrement = (dt / 60 / 60) * speed * 100;

        this.distance += distanceIncrement;
        this.emit('distanceChange', this.distance);

        if (this.#racing && this.distance >= distance) {
            this.#finish();
        }
    }
    /**
     * @param {number} dt;
     */
    #getRpmIncrement(dt) {
        const incrementCoefficient = applyBezier(this.#gearVelocity[this.#gear - 1], this.#rpm / this.#maxRpm);

        return dt * incrementCoefficient * this.#power * this.#gearRatio[this.#gear - 1];
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
        this.emit('gearChange', newGear);
    }
    gearUp() {
        this.#changeGear(this.#gear + 1);
    }
    gearDown() {
        this.#changeGear(this.#gear - 1);
    }
}
