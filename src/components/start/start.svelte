<script>
    import { gameActivated, gameOpen } from '../../game/store';
    import Button from '../button/button.svelte';
</script>

<div>
    {#if $gameActivated}
        <Button type="button" on:click={() => gameOpen.set(true)}>Start game</Button>
    {:else}
        Yo gotta find a way to start game
    {/if}
</div>

<style>
    div {
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
    }
</style>
