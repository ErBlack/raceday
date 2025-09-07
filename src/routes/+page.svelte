<script>
    import './styles.css';
    import Game from '../game/game.svelte';
    import { gameOpen } from '../game/store';
    import Header from '../components/header/header.svelte';
    import Start from '../components/start/start.svelte';
    import { preloadAssets } from '../game/assets';
    import { onMount } from 'svelte';

    onMount(() => {
        preloadAssets();
    });
</script>

<main>
    <Header />
    <div class="content">
        <Start />
    </div>
    {#if $gameOpen}
        <Game />
    {/if}
</main>

<style>
    main {
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
    }

    .content {
        margin: 0 auto 2em auto;
        padding: 0 2em;
        width: 650px;
        box-sizing: border-box;
        max-width: 100vw;
    }
</style>
