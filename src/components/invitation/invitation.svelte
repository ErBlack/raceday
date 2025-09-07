<script>
    import Timer from './timer.svelte';
    import Links from './links.svelte';

    /**
     * @type Date
     */
    export let start;
    /**
     * @type Date
     */
    export let easer;
</script>

<p class="text">I invite you to my birthday!</p>
<p class="text">
    Come on october {start.getDate()} at {start.getHours()}:{String(start.getMinutes()).padStart(2, '0')} in Belgrade at
    <a class="pin" href="https://yandex.ru/maps/-/CCUZIMBlkA"> Rajićeva 3 apt 2a</a>
</p>
<p class="text">Celebration <Timer {start} waitIcon="🏁" finishedIcon="🤘" /></p>

<p class="text">
    Easter egg <Timer start={easer} waitIcon="🥚 after" finishedIcon="ready 🐣" />
</p>
<Links />

<style>
    p {
        font-size: 24px;
        box-sizing: border-box;
    }

    @media (max-width: 640px) {
        p {
            font-size: 22px;
        }
    }

    .pin::before {
        content: '📍 ';
    }

    .pin:hover::before {
        content: '🇷🇸 ';
    }
</style>
