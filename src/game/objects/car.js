import { applyBezier } from '../../lib/apply-bezier';
import { canvasSize, distance, pxPerCentimeter, visibleTrack } from '../const';
import { PubSub } from '../../lib/pubsub';
import { random } from '../../lib/random';

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
    #started = false;
    #rpm = 1;
    gear = 0;
    #startTime = 0;
    #raceTime = 0;
    #width = 100;
    #height = 220;
    #bottomOffset = 100;

    #xOffset = 0;
    /**
     * @type {number}
     */
    #xDirection = 0;
    /**
     * @type {number}
     */
    #xLimit = 0;
    #xSpeedFactor = 0.00002;
    /**
     * @type {number}
     */
    #initialX;

    /**
     * @type {number}
     */
    x = Infinity;
    /**
     * @type {number}
     */
    y = Infinity;

    /**
     * @type {HTMLImageElement}
     */
    #sprite;

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
    maxRpm;
    /**
     * Distance in meters
     * @type {number}
     */
    distance = 0;
    /**
     * @type {number}
     */
    #power;

    /**
     * @type {number}
     */
    #offTrackDistance;

    /**
     * @param {{ speedRatio: number, gearRatio: number[], gearVelocity: [number, number, number, number][], maxRpm: number, power: number, x: number, sprite: HTMLImageElement }} options
     */
    constructor({ speedRatio, gearRatio, gearVelocity, maxRpm, power, x, sprite }) {
        super();

        this.#sprite = sprite;
        this.#initialX = x;
        this.#speedRatio = speedRatio;
        this.#gearRatio = gearRatio;
        this.#gearVelocity = gearVelocity;
        this.maxRpm = maxRpm;
        this.#power = power;

        this.#offTrackDistance = visibleTrack + this.#height * pxPerCentimeter;
    }
    start() {
        this.gear = 0;
        this.#rpm = 3000;
        this.#startTime = Date.now();
        this.#started = true;
        this.distance = 0;

        this.#xOffset = 0;
        this.#generateX();

        this.emit('start');
    }
    #finish() {
        this.#started = false;
        this.#raceTime = Date.now() - this.#startTime;
        this.#startTime = 0;

        this.emit('finish', this.#raceTime);
    }
    /**
     * @param {number} dt;
     */
    update(dt) {
        if (this.gear === 0) return;

        if (this.#started) {
            this.#rpm = Math.min(this.maxRpm, this.#rpm + this.#getRpmIncrement(dt));
            this.emit('rpmChange', this.#rpm);
        }

        const speed = this.#getSpeed();

        if (speed) {
            this.#updateX(dt, speed);
        }

        if (this.#started) {
            this.emit('speedChange', speed);
        }

        const distanceIncrement = (dt / 60 / 60) * speed * 100;

        this.distance += distanceIncrement;
        this.emit('distanceChange', this.distance);

        if (this.#started && this.distance >= distance) {
            this.#finish();
        }

        if (this.distance >= this.#offTrackDistance) {
            this.emit('outOfTrack');
        }
    }
    #generateX() {
        this.#xLimit = random(1, 5) * (Math.random() > 0.5 ? 1 : -1);
        this.#xDirection = Math.sign(this.#xOffset + this.#xLimit);
    }
    /**
     * @param {number} dt
     * @param {number} speed
     */
    #updateX(dt, speed) {
        const newOffset = this.#xOffset + this.#xSpeedFactor * this.#xDirection * dt * speed;

        if (Math.abs(newOffset) >= this.#xLimit && this.#xDirection === Math.sign(newOffset)) {
            this.#generateX();
        } else {
            this.#xOffset = newOffset;
        }
    }

    /**
     * @param {number} dt;
     */
    #getRpmIncrement(dt) {
        const incrementCoefficient = applyBezier(this.#gearVelocity[this.gear - 1], this.#rpm / this.maxRpm);

        return dt * incrementCoefficient * this.#power * this.#gearRatio[this.gear - 1];
    }
    #getSpeed() {
        return this.#rpm / this.#gearRatio[this.gear - 1] / this.#speedRatio;
    }
    /**
     * @param {number} newGear
     */
    #changeGear(newGear) {
        if (!this.#started) return false;

        const newGearRatio = this.#gearRatio[newGear - 1];

        if (newGearRatio === undefined) return false;

        const currentRatio = this.#gearRatio[this.gear - 1];

        if (currentRatio !== undefined) {
            this.#rpm = (this.#rpm / currentRatio) * newGearRatio;
        }

        this.gear = newGear;
        this.emit('gearChange', {
            gear: this.gear,
            rpm: this.#rpm,
        });

        return true;
    }
    gearUp() {
        return this.#changeGear(this.gear + 1);
    }
    gearDown() {
        return this.#changeGear(this.gear - 1);
    }
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} worldDistance
     */
    render(context, worldDistance) {
        this.x = this.#initialX + this.#xOffset;
        this.y = canvasSize - worldDistance / pxPerCentimeter - this.#height - this.#bottomOffset;

        context.drawImage(this.#sprite, this.x, this.y, this.#width, this.#height);
    }
}
