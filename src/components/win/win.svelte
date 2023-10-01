<script>
    import { winner, dashboard } from '../../game/store';

    /**
     * @param {Event} event
     */
    const copyCode = ({ target }) => {
        // @ts-ignore
        navigator.clipboard.writeText(target.innerText);
    };
</script>

{#if $winner && !$dashboard}
    <pre><span>Win! Send to <a href="https://t.me/erblack">@ErBlack</a>: </span><button on:click={copyCode}
            >{$winner}</button
        ></pre>
{/if}

<style>
    pre {
        font-size: 18px;
        position: absolute;
        left: 5px;
        top: 5px;
        background-color: white;
        padding: 5px 8px;
        border: dashed 2px black;
        border-radius: 4px;
        box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
        animation: appear 0.5s ease-in-out forwards;
        transform-origin: 0 50%;
        background-clip: padding-box;
        z-index: 1;
    }

    button {
        display: inline;
        appearance: none;
        font: inherit;
        border: none;
        background: transparent;
        user-select: all;
        transition: transform 0.2s ease-in-out;
    }

    button:hover {
        transform: scale(1.1);
    }

    @media (max-width: 640px) {
        span {
            display: none;
        }
    }

    @keyframes appear {
        from {
            opacity: 0;
            transform: translate(50%, -50%) scale(5) rotate(-60deg);
        }

        to {
            transform: scale(1) rotate(3deg);
            opacity: 1;
        }
    }
</style>
