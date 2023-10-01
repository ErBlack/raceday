<script>
    import { startGame, stopGame } from '../game';
    import { gameOpen, resultsStore } from '../store';

    const players = ['Brian Spilner', 'Caleb Reece', 'Victor Vasquez', 'Player'];
    const cars = ['Mitsubishi eclipse', 'Toyota Supra', 'Mazda RX-7', 'Nissan Skyline'];

    /**
     * @type {{player: string, car: string, time: number}[] | undefined}
     */
    let results;
    let win = false;

    resultsStore.subscribe(
        /**
         * @param {number[]} value
         */
        value => {
            if (!value) {
                results = undefined;
                return;
            }

            results = value
                .map((time, index) => ({
                    player: players[index],
                    time,
                    car: cars[index],
                }))
                .sort(
                    // @ts-ignore
                    (a, b) => {
                        if (a.time === undefined) {
                            return 1;
                        }

                        if (b.time === undefined) {
                            return -1;
                        }

                        return a.time - b.time;
                    }
                );

            win = results[0].player === 'Player';
        }
    );
</script>

{#if results}
    <section class="results">
        <h2>You {win ? 'Win' : 'Lose'}!</h2>
        <div class="table">
            {#each results as results}<pre class="time">{(results.player + ':').padEnd(20, ' ')}{results.time ===
                    undefined
                        ? '--.----'
                        : (results.time / 1000).toFixed(3)}</pre>
                <pre class="car">{results.car.padEnd(33, ' ')}</pre>{/each}
        </div>
        <div class="buttonset">
            <button
                class="button"
                autofocus
                on:click={() => {
                    stopGame();
                    startGame();
                }}>Play Again</button
            >
            <button
                on:click={() => {
                    stopGame();
                    gameOpen.set(false);
                }}>Exit</button
            >
        </div>
    </section>
{/if}

<style>
    .results {
        width: 700px;
        height: 600px;
        max-width: 100%;
        background-color: #fff;
        border-radius: 10px;
        border: solid 4px black;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        display: grid;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-style: italic;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        grid-template-rows: max-content 1fr max-content;
        animation: appear 0.5s ease-in-out 0.2s forwards;
        opacity: 0;
        transform: scale(2);
        max-width: calc(100vw - 20px);
    }

    h2 {
        font-size: 60px;
        margin: 60px 60px 0;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
        color: white;
    }

    .table {
        font-size: 18px;
    }

    .buttonset {
        margin-bottom: 60px;
        display: grid;
        grid-auto-columns: max-content;
        grid-template-columns: repeat(2, max-content);
        justify-content: center;
        gap: 60px;
    }

    button {
        appearance: none;
        border: solid 3px currentColor;
        border-radius: 4px;
        background: none;
        padding: 20px 30px;
        font: inherit;
        cursor: pointer;
    }

    .time {
        margin-bottom: 0;
    }

    .car {
        margin-top: 0;
        font-size: 0.8em;
        margin-left: 0.25em;
    }

    @keyframes appear {
        from {
            opacity: 0;
            transform: scale(2);
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @media (max-width: 640px) {
        @keyframes appear {
            from {
                opacity: 0;
                transform: translate(0, -100%);
            }

            to {
                transform: translate(0);
                opacity: 1;
            }
        }
    }
</style>
