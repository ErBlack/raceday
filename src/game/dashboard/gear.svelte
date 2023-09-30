<script>
    import { onDestroy } from 'svelte';
    import { GEAR } from '../assets';
    import { gearStore } from '../store';

    let gear = 0;

    const unsubscribe = gearStore.subscribe(value => {
        gear = value;
    });

    onDestroy(() => {
        gear = 0;
        unsubscribe();
    });
</script>

<img src={GEAR[$gearStore]} alt="" />

<style>
    img {
        position: absolute;
        width: 6%;
        top: 65%;
        right: 17%;
        border: solid 5px black;
        border-radius: 10px;
        padding: 2px;
    }

    @media (max-width: 640px) {
        img {
            border-width: 2px;
        }
    }
</style>
