<script>
    import Gear from './gear.svelte';
    import Speedometer from './speedometer.svelte';
    import Tachometer from './tachometer.svelte';
</script>

<section>
    <Speedometer />
    <Tachometer />
    <Gear />
</section>

<style>
    section {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 600px;
        height: 200px;
        border: solid 4px black;
        border-radius: 10px;
        background-color: white;
        transform: translate(10%, -110%);
        animation: appear 0.5s ease-in-out 3s forwards;
    }

    @media (max-width: 640px) {
        section {
            right: 0;
            top: 0;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            border-top: none;
            border-right: none;
            width: 100vw;
            height: calc(100vw / 3);
        }
    }

    @keyframes appear {
        from {
            transform: translate(10%, -110%);
        }

        to {
            transform: translate(0);
        }
    }
</style>
