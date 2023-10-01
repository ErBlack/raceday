<script>
    import './styles.css';
    import Invitation from '../components/invitation/invitation.svelte';
    import Game from '../game/game.svelte';
    import { gameOpen } from '../game/store';

    const start = new Date('2023-10-14T14:00:00.000Z');
</script>

<main>
    <Invitation {start} />
    {#if $gameOpen}
        <Game />
    {/if}
</main>
