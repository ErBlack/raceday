import { SIGNS } from './assets';
import { pxPerSantimeter } from './const';

export class Sign {
    width = 638;
    height = 203;
    x = 675;
    /**
     * @param {number} y
     * @param {number} index
     */
    constructor(y, index) {
        this.y = y;
        this.image = SIGNS[index];
    }
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} worldDistance
     */
    render(context, worldDistance) {
        context.drawImage(this.image, this.x, worldDistance / pxPerSantimeter + this.y, this.width, this.height);
    }
}
