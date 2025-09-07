<button on:click {...$$props}><slot /></button>

<style>
    button {
        color: black;
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

    button:focus-visible {
        outline: black 3px dashed;
    }
</style>
