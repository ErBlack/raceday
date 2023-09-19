<script>
    import Timer from './timer.svelte';
    import Links from './links.svelte';

    /**
     * @type Date
     */
    export let start;
</script>

<section class="content">
    <h1>Race Day</h1>
    <p class="text">
        I invite you to my birthday!
        <br /><br />
        Come on october {start.getDate()} at {start.getHours()}:{String(start.getMinutes()).padStart(2, '0')} in Belgrade
        at <a class="pin" href="https://yandex.ru/maps/-/CCUZIMBlkA"> Rajićeva 3 apt 2a</a>
        <br /><br />
        <Timer {start} />
    </p>
    <Links />
</section>

<style>
    h1 {
        text-align: center;
        font-size: 100px;
        margin: 0 0 25px 0;
        font-family: nfs;
        text-transform: uppercase;
        font-weight: normal;
        background-color: #5a5a5a;
        color: #fff;
    }

    p {
        margin: 0 auto 2em auto;
        padding: 0 2em;
        width: 600px;
        max-width: 100vw;
        font-size: 24px;
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 32px;
        }
    }

    .pin::before {
        content: '📍 ';
    }

    .pin:hover::before {
        content: '🇷🇸 ';
    }
</style>
