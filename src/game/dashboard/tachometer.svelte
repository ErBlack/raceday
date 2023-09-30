<script>
    import { onDestroy } from 'svelte';
    import { RPM } from '../assets';
    import { rpmStore } from '../store';

    let stage = 0;

    const unsubscribe = rpmStore.subscribe(value => {
        stage = Math.round(Math.pow(value, 2) * 8);
    });

    onDestroy(() => {
        stage = 0;
        unsubscribe();
    });
</script>

<img src={RPM[Number(stage)]} alt="" />

<style>
    img {
        position: absolute;
        width: 92%;
        height: 82%;
        top: 9%;
        left: 3%;
    }
</style>
