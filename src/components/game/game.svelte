<script>
    import { onMount } from 'svelte';
    import { start, stop } from '../../game/game';
    import { Nissan } from '../../game/nissan';
    import { RpmBot } from '../../game/rpm-bot';
    import { distance } from '../../game/const';
    import { FuzzyRpmBot } from '../../game/fuzzy-rpm-bot';

    const car1 = new Nissan();
    const car2 = new Nissan();
    const car3 = new Nissan();
    const car4 = new Nissan();

    new RpmBot(car1, 5000);
    new FuzzyRpmBot(car2, 1000, 6000);
    new FuzzyRpmBot(car3, 500, 7000);
    new RpmBot(car4, 8000);

    let car1Distance = 0;
    let car2Distance = 0;
    let car3Distance = 0;
    let car4Distance = 0;

    car1.addEventListener('distanceChange', currentDistance => {
        car1Distance = (currentDistance / distance) * 100;
    });
    car2.addEventListener('distanceChange', currentDistance => {
        car2Distance = (currentDistance / distance) * 100;
    });
    car3.addEventListener('distanceChange', currentDistance => {
        car3Distance = (currentDistance / distance) * 100;
    });
    car4.addEventListener('distanceChange', currentDistance => {
        car4Distance = (currentDistance / distance) * 100;
    });

    onMount(() => {
        car1.debug();
    });
</script>

<div id="game">
    <div id="controls">
        <button
            on:click={() => {
                start([car1, car2, car3, car4]);
            }}>start</button
        >
        <button on:click={stop}>stop</button>
    </div>
    <pre>
speed: <span id="speed" />
rpm:   <span id="rpm" />
    </pre>
    <div class="gear" id="gear1" />
    <div class="gear" id="gear2" />
    <div class="gear" id="gear3" />
    <div class="gear" id="gear4" />
    <div class="gear" id="gear5" />
    <div class="gear" id="gear6" />
    <div class="track">
        <div class="car" id="car1" style="bottom: {car1Distance}%" />
        <div class="car" id="car2" style="bottom: {car2Distance}%" />
        <div class="car" id="car3" style="bottom: {car3Distance}%" />
        <div class="car" id="car4" style="bottom: {car4Distance}%" />
    </div>
</div>

<style>
    #game {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: grid;
        background-color: white;
    }

    .gear {
        position: relative;
        width: 200px;
        height: 200px;
        border: solid 1px black;
    }
    .track {
        position: absolute;
        width: 400px;
        right: 20px;
        top: 20px;
        bottom: 20px;
        background-color: #dedede;
    }

    .car {
        width: 20px;
        height: 20px;
        position: absolute;
        background-color: currentColor;
    }

    #car1 {
        color: crimson;
        left: 10px;
    }

    #car2 {
        color: blue;
        left: 40px;
    }

    #car3 {
        color: green;
        left: 70px;
    }

    #car4 {
        color: orange;
        left: 100px;
    }
</style>
