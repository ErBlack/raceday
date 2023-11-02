<button on:click {...$$props}><slot /></button>

<style>
    button {
        font-style: italic;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        appearance: none;
        border: solid 3px currentColor;
        border-radius: 4px;
        background: none;
        padding: 20px 30px;
        cursor: pointer;
        font-size: 16px;
    }

    button:focus {
        outline: black 3px dashed;
    }
</style>
