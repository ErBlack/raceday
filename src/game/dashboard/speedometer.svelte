<script>
    import { onDestroy } from 'svelte';
    import { SPEED } from '../assets';
    import { speedStore } from '../store';

    let s0 = 0;
    let s1 = 0;
    let s2 = 0;

    const unsubscribe = speedStore.subscribe(value => {
        [s0, s1, s2] = value.toFixed(0).padStart(3, '0').split('').map(Number);
    });

    onDestroy(() => {
        s0 = 0;
        s1 = 0;
        s2 = 0;
        unsubscribe();
    });
</script>

<div>
    <img src={SPEED[Number(s0)]} alt={String(s0)} />
    <img src={SPEED[Number(s1)]} alt={String(s1)} />
    <img src={SPEED[Number(s2)]} alt={String(s2)} />
</div>

<style>
    div {
        position: absolute;
        width: 37%;
        height: 40%;
        left: 24%;
        top: 48%;
        display: flex;
    }

    img {
        position: absolute;
        height: 100%;
    }

    img:first-child {
        left: 5%;
    }

    img:nth-child(2) {
        left: 50%;
        transform: translateX(-50%);
    }

    img:last-child {
        right: 5%;
    }
</style>
