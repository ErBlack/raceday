<script>
    import { countdown } from '../store';
</script>

{#if $countdown}
    <div class="count-{$countdown}">
        {$countdown}
    </div>
{/if}

<style>
    div {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 300px;
        height: 300px;
        font-size: 200px;
        line-height: 200px;
        margin: auto;
        text-align: center;
        font-weight: bold;
        font-style: italic;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, -2px -2px 0 black,
            2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black;
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        pointer-events: none;
    }

    .count-3,
    .count-2,
    .count-1,
    .count-Go {
        animation-duration: 1s;
        animation-timing-function: ease-out;
    }

    .count-3,
    .count-1 {
        animation-name: count;
    }

    .count-2,
    .count-Go {
        animation-name: count2;
    }

    .count-Go {
        animation-direction: reverse;
        animation-timing-function: ease-in;
    }

    @media (max-width: 400px) {
        .count-Go {
            font-size: 150px;
        }
    }

    @keyframes count {
        from {
            transform: scale(2);
        }

        to {
            content: 'Go';
            transform: scale(1);
        }
    }

    @keyframes count2 {
        from {
            transform: scale(2);
        }

        to {
            content: 'Go';
            transform: scale(1);
        }
    }

    @keyframes appear {
        from {
            transform: translate(0, 0, 100%);
            opacity: 0;
        }

        to {
            transform: translate(0);
        }
    }
</style>
