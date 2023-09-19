<script>
    import { start, stop } from '../../game/game';
    import { Nissan } from '../../game/car';
</script>

<button on:click={start}>start</button>
<button on:click={stop}>stop</button>
<button on:click={() => Nissan.gearUp()}>up</button>
<button on:click={() => Nissan.gearDown()}>down</button>
