<script>
    import Gearbox from '../gearbox/gearbox.svelte';
</script>

<h1>Race Day <Gearbox /></h1>

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

    @media (max-width: 640px) {
        h1 {
            font-size: 48px;
            line-height: 90px;
        }
    }
</style>
