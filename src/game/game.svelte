<script>
    import { onDestroy, onMount } from 'svelte';
    import { initRender } from './render';
    import { preloadAssets } from './assets';
    import { canvasSize } from './const';
    import Dashboard from './dashboard/dashboard.svelte';
    import { startGame, stopGame } from './game';
    import Countdown from './countdown/countdown.svelte';
    import Results from './results/results.svelte';

    let started = true;
    let scale = 1;
    /**
     * @type {any}
     */
    let raceTimeout;

    const updateScale = () => {
        const { innerWidth, innerHeight } = window;

        scale = Math.max(innerWidth, innerHeight) / canvasSize;
    };

    /**
     * @param {KeyboardEvent} event
     */
    const onKeyUp = event => {
        started = true;
    };

    onMount(() => {
        updateScale();
        preloadAssets();
        startGame();
    });

    onDestroy(() => {
        clearTimeout(raceTimeout);
        stopGame();
    });
</script>

<svelte:window on:keyup={onKeyUp} on:resize={updateScale} />
{#if started}
    <div id="game">
        <canvas id="canvas" use:initRender width={canvasSize} height={canvasSize} style="transform: scale({scale});" />
        <Dashboard />
        <Countdown />
        <Results />
    </div>
{/if}

<style>
    #game {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        align-items: center;
        justify-content: center;
        background-color: #dedede;
        overflow: hidden;
    }

    #canvas {
        position: absolute;
        left: calc(50% - 1000px);
        right: 0;
        bottom: 0;
        transform-origin: bottom center;
        background-color: white;
    }
</style>
