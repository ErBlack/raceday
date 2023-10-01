<script>
    import { gameOpen } from '../../game/store';

    /**
     * @type Date
     */
    export let start;

    // @ts-ignore
    let available = start < Date.now() || (typeof window !== 'undefined' && location.search === '?sudo');

    if (!available) {
        setTimeout(
            () => {
                available = true;
            },
            // @ts-ignore
            start - Date.now()
        );
    }

    const offset = 3;
    const row = 41.5;
    /**
     * @type {[number, number, number, number]}
     */
    const columns = [17, 35, 53, 68];
    const top = 33;
    const bottom = 53;

    /**
     * @type {{gearbox: DOMRect, top: number, bottom: number, columns: [number, number, number, number], row: number, xOffset: number, yOffset: number, target: HTMLElement} | undefined}
     */
    let dimensions;
    /**
     * @type {string | number | undefined}
     */
    let prevGear;

    /**
     * @param {number} a
     * @param {number} b
     */
    const inRange = (a, b) => a >= b - offset && a <= b + offset;

    /**
     * @param {boolean} isTop
     * @param {number} columnIndex
     */
    const getGear = (isTop, columnIndex) => {
        switch (columnIndex) {
            case 0:
                return isTop ? 1 : 2;
            case 1:
                return isTop ? 3 : 4;
            case 2:
                return isTop ? 5 : 6;
            case 3:
                return 'R';
        }
    };

    /**
     * @param {HTMLElement | null} target
     * @param {number} x
     * @param {number} y
     */
    const initGearSwitch = (target, x, y) => {
        const parent = target?.parentElement;

        if (!target || !parent) return;

        const gearbox = parent.getBoundingClientRect();

        const knob = target.getBoundingClientRect();

        dimensions = {
            gearbox,
            top: gearbox.y + (gearbox.height * top) / 100,
            bottom: gearbox.y + (gearbox.height * bottom) / 100,
            // @ts-ignore
            columns: columns.map(column => gearbox.x + (gearbox.width * column) / 100),
            row: gearbox.y + (gearbox.height * row) / 100,
            xOffset: x - knob.x,
            yOffset: y - knob.y,
            target,
        };
    };

    /**
     * @param {number} x
     * @param {number} y
     */
    const handleGearSwitch = (x, y) => {
        if (!dimensions) return;

        const { target } = dimensions;

        const knobX = x - dimensions.xOffset;
        const knobY = y - dimensions.yOffset;

        const inRegular =
            knobX <= dimensions.columns[0] + offset ||
            inRange(knobX, dimensions.columns[1]) ||
            inRange(knobX, dimensions.columns[2]);
        const inLast = knobX >= dimensions.columns[3] - offset;

        const maxY = inRegular || inLast ? dimensions.bottom : dimensions.row;
        const minY = inRegular ? dimensions.top : dimensions.row;

        const resultX = Math.min(Math.max(knobX, dimensions.columns[0]), dimensions.columns[3]);

        const resultY = Math.min(Math.max(knobY, minY), maxY);

        target.style.top = `${resultY - dimensions.gearbox.y}px`;
        target.style.left = `${resultX - dimensions.gearbox.x}px`;
    };

    const finishGearSwitch = () => {
        if (!dimensions) return;

        const { target } = dimensions;

        const topP = (parseInt(target.style.top.slice(0, -2)) / dimensions.gearbox.height) * 100;
        const leftP = (parseInt(target.style.left.slice(0, -2)) / dimensions.gearbox.width) * 100;

        const isTop = topP < row;

        const leftOffsets = columns.map(column => Math.abs(column - leftP));

        const columnIndex = leftOffsets.indexOf(Math.min(...leftOffsets));

        target.style.top = `${isTop && columnIndex !== 3 ? top : bottom}%`;
        target.style.left = `${columns[columnIndex]}%`;

        dimensions = undefined;

        const gear = getGear(isTop, columnIndex);

        if (gear === 5 && prevGear === 3) {
            gameOpen.set(true);
        }

        prevGear = gear;
    };

    /**
     * @param {MouseEvent} event
     */
    // @ts-ignore
    const onMouseDown = ({ target, x, y }) => initGearSwitch(target, x, y);
    /**
     * @param {MouseEvent} event
     */
    const onMouseMove = ({ x, y }) => handleGearSwitch(x, y);

    /**
     * @param {TouchEvent} event
     */

    const onTouchStart = ({ target, touches: [{ clientX, clientY }] }) => {
        // @ts-ignore
        initGearSwitch(target, clientX, clientY);
    };
    /**
     * @param {TouchEvent} event
     */
    const onTouchMove = event => {
        const [{ clientX, clientY }] = event.touches;

        event.preventDefault();

        handleGearSwitch(clientX, clientY);
    };
</script>

<div
    id="gearbox"
    role="button"
    tabindex="0"
    on:mousemove={available ? onMouseMove : null}
    on:mouseup={available ? finishGearSwitch : null}
    on:touchmove={available ? onTouchMove : null}
    on:touchend={available ? finishGearSwitch : null}
>
    <button id="knob" on:mousedown={available ? onMouseDown : null} on:touchstart={available ? onTouchStart : null}
        >{prevGear || ''}</button
    >
</div>

<style>
    #gearbox {
        --gearbox-size: 90px;
        display: inline-block;
        width: var(--gearbox-size);
        height: var(--gearbox-size);
        background: no-repeat center/100% url('/raceday/assets/gearbox.png');
        position: relative;
    }

    #knob {
        --knob-size: 18%;
        width: var(--knob-size);
        height: var(--knob-size);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #5a5a5a;
        border-radius: 100%;
        position: absolute;
        border: solid 2px white;
        top: 41.5%;
        left: 18%;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        color: white;
        display: flex;
        font-size: 8px;
    }

    @media (max-width: 640px) {
        #gearbox {
            --gearbox-size: 80px;
        }
    }
</style>
