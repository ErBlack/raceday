<script>
    import './styles.css';
    import Invitation from '../components/invitation/invitation.svelte';
    import Game from '../game/game.svelte';
    import { gameOpen } from '../game/store';
    import Win from '../components/win/win.svelte';

    const start = new Date('2023-10-14T14:00:00.000Z');
    const easer = new Date('2023-10-02T16:00:00.000Z');
</script>

<main>
    <Invitation {start} {easer} />
    <Win />
    {#if $gameOpen}
        <Game />
    {/if}
</main>
