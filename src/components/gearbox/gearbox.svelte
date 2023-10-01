<script>
    // @ts-nocheck
    import { gameOpen } from '../../game/store';

    const offset = 3;
    const row = 41.5;
    const columns = [18, 36, 54, 68];
    const top = 32;
    const bottom = 52;

    let dimensions;
    let prevGear;

    const inRange = (a, b) => a >= b - offset && a <= b + offset;

    const getGear = (isTop, columnIndex) => {
        switch (columnIndex) {
            case 0:
                return isTop ? 1 : 2;
            case 1:
                return isTop ? 3 : 4;
            case 2:
                return isTop ? 5 : 6;
            case 3:
                return 'r';
        }
    };

    const onMouseDown = ({ target, x, y }) => {
        const parent = target.parentElement;
        const gearbox = parent.getBoundingClientRect();

        const knob = target.getBoundingClientRect();

        dimensions = {
            gearbox,
            top: gearbox.y + (gearbox.height * top) / 100,
            bottom: gearbox.y + (gearbox.height * bottom) / 100,
            columns: columns.map(column => gearbox.x + (gearbox.width * column) / 100),
            row: gearbox.y + (gearbox.height * row) / 100,
            xOffset: x - knob.x,
            yOffset: y - knob.y,
            target,
        };
    };

    const onMouseMove = ({ x, y }) => {
        if (!dimensions) return;

        const { target } = dimensions;

        const knobX = x - dimensions.xOffset;
        const knobY = y - dimensions.yOffset;

        const inRegular =
            (knobX <= dimensions.columns[0] + offset) |
            inRange(knobX, dimensions.columns[1]) |
            inRange(knobX, dimensions.columns[2]);
        const inLast = knobX >= dimensions.columns[3] - offset;

        const maxY = inRegular || inLast ? dimensions.bottom : dimensions.row;
        const minY = inRegular ? dimensions.top : dimensions.row;

        const resultX = Math.min(Math.max(knobX, dimensions.columns[0]), dimensions.columns[3]);

        const resultY = Math.min(Math.max(knobY, minY), maxY);

        target.style.top = `${resultY - dimensions.gearbox.y}px`;
        target.style.left = `${resultX - dimensions.gearbox.x}px`;
    };

    const onMouseUp = () => {
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
</script>

<div id="gearbox" role="button" tabindex="0" on:mousemove={onMouseMove} on:mouseup={onMouseUp}>
    <button id="knob" on:mousedown={onMouseDown} />
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
        background: no-repeat center/100% url('/raceday/assets/knob.png');
        position: absolute;
        border: none;
        top: 41.5%;
        left: 18%;
        cursor: pointer;
    }
</style>
