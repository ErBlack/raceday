<script>
    /**
     * @type Date
     */
    export let start;
    /**
     * @type string
     */
    export let waitIcon;
    /**
     * @type string
     */
    export let finishedIcon;

    const INTERVALS = [1000, 60, 60, 24, 7];

    /**
     * @param {number} n
     * @param {string[]} f
     */
    function plural(n, f) {
        n %= 100;
        if (n > 10 && n < 20) return f[2];
        n %= 10;
        return f[n > 1 && n < 5 ? 1 : n === 1 ? 0 : 2];
    }

    /**
     * @param {Date} start
     * @param {Date} from
     */
    function offset(start, from = new Date()) {
        let offset = Number(start) - Number(from);
        let direction = offset > 0 ? 1 : offset < 0 ? -1 : 0;

        offset = Math.abs(offset);

        let result = INTERVALS.map(function (value) {
            var result = offset % value;

            offset = (offset - result) / value;

            return result;
        });

        return {
            milliseconds: result[0],
            seconds: result[1],
            minutes: result[2],
            hours: result[3],
            days: result[4],
            weeks: offset,
            direction: direction,
        };
    }

    /**
     * @type string
     */
    let status;

    function iterate() {
        status = render();

        if (offset(start).direction !== 1) {
            return;
        }

        setTimeout(iterate, 1000);
    }
    iterate();

    function render() {
        const { direction, weeks, days, hours, minutes, seconds } = offset(start);

        if (direction === 1) {
            const result = [];

            if (weeks) {
                result.push(weeks + ' ' + plural(weeks, ['week', 'weeks', 'weeks']));
            }
            if (days) {
                result.push(days + ' ' + plural(days, ['day', 'days', 'days']));
            }
            if (hours) {
                result.push(hours + ' ' + plural(hours, ['hour', 'hours', 'hours']));
            }
            if (minutes || hours) {
                result.push(minutes + ' ' + plural(minutes, ['minute', 'minutes', 'minutes']));
            }

            result.push(seconds + ' ' + plural(seconds, ['second', 'seconds', 'seconds']));

            return `${waitIcon} ${result.join(' ')}`;
        } else {
            return finishedIcon;
        }
    }
</script>

{status}
