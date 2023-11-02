<script>
    import './styles.css';
    import Game from '../game/game.svelte';
    import { gameOpen } from '../game/store';
    import Header from '../components/header/header.svelte';
    import Start from '../components/start/start.svelte';
</script>

<main>
    <Header />
    <section class="content">
        <Start />
    </section>
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
        max-width: 100vw;
    }
</style>
