<script>
    import { gameStarted } from '../store';
</script>

{#if $gameStarted}
    <div />
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
    }

    div::before {
        content: '';
        animation: count 4s linear 0.5s;
        display: block;
    }

    @keyframes count {
        from {
            content: '3';
            transform: scale(1);
        }

        24.99999999% {
            content: '3';

            transform: scale(2);
        }
        25% {
            content: '2';
            transform: scale(1);
        }

        49.999999999% {
            content: '2';
            transform: scale(2);
        }
        50% {
            content: '1';
            transform: scale(1);
        }

        74.9999999999% {
            content: '1';
            transform: scale(2);
        }
        75% {
            content: 'Go';
            transform: scale(1);
        }

        to {
            content: 'Go';
            transform: scale(1.5);
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
