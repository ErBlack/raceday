<script>
    import Timer from './timer.svelte';
    import Links from './links.svelte';
    import Gearbox from '../gearbox/gearbox.svelte';

    /**
     * @type Date
     */
    export let start;
</script>

<section class="content">
    <h1>Race Day <Gearbox /></h1>

    <p class="text">I invite you to my birthday!</p>
    <p class="text">
        Come on october {start.getDate()} at {start.getHours()}:{String(start.getMinutes()).padStart(2, '0')} in Belgrade
        at <a class="pin" href="https://yandex.ru/maps/-/CCUZIMBlkA"> Rajićeva 3 apt 2a</a>
    </p>
    <p class="text"><Timer {start} /></p>
    <Links />
</section>

<style>
    h1 {
        font-size: 100px;
        margin: 0 0 25px 0;
        font-family: nfs;
        text-transform: uppercase;
        font-weight: normal;
        background-color: #5a5a5a;
        color: #fff;
        position: relative;
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: max-content max-content;
        gap: 0.5em;
    }

    p {
        margin: 0 auto 2em auto;
        padding: 0 2em;
        width: 650px;
        max-width: 100vw;
        font-size: 24px;
        box-sizing: border-box;
    }

    @media (max-width: 580px) {
        h1 {
            font-size: 60px;
        }

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
