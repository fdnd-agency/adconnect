<script>
    import { Sun, Cloud, Cat, Landscape, info } from '$lib'
</script>

<svelte:head>
  <title>Grumpy switch</title>
</svelte:head>

<div class="wrapper" id="main">
    <div class="wrapper-switcher">
        <!-- Switch mood -->
        <div class="mood">
            <!-- Switcher -->
            <label for="switch" class="sr-only">Switch the mood of the cat</label>
            <Sun />
            <input id="switch" type="checkbox" switch class="switcher">
            <Cloud />
        </div>

        <!-- Info -->
        <div class="content">
            <img src={info} alt="">
            <p>Switch the mood of the cat with the switcher</p>
        </div>
    </div>

    <!-- Cat -->
    <Cat />
    <!-- Landscape background -->
    <Landscape />
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        width: 100%;

        .wrapper-switcher {
            display: flex;
            flex-direction: row;
            gap: 1em;
            align-items: center;
            position: fixed;
            top: 0;
            /* Wrapper switcher */
            .mood {
                background-color: #F37827;
                padding: .4em 1.5em;
                display: flex;
                align-items: center;
                gap: .5em;

                /* Switcher */
                .switcher {
                    appearance: none;
                    width: 6em;
                    height: 3em;
                    background-color: #612B07;
                    display: inline-grid;
                    position: relative;
                    cursor: pointer;
                    border-radius: 2em;
                }

                .switcher:checked::before {
                    left: 3.15em;
                }

                .switcher:checked {
                    background-color:#612B07;
                }

                .switcher::before {
                    content: "";
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5em;
                    height: 2.5em;
                    background: white;
                    position: absolute;
                    top: .25em;
                    left: .3em;
                    font-weight: 800;
                    transition: 0.3s;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                }

                /* When the browser supports ::thumb this code is displayed */
                @supports selector(::thumb) {
                    .switcher::before {
                        display: none;
                    }

                    .switcher::after {
                        content: '';
                        height: 1.4em;
                        translate: 15% 0;
                        transition: .1s ease;
                    }

                    .switcher:checked::after {
                        translate: 57% 0;
                        transition: .2s ease-out;
                    }

                    .switcher:checked {
                        background-color: #612B07;
                    }

                    .switcher::thumb {
                        width: 2.5em;
                        height: 2.5em;
                        background: white;
                        position: absolute;
                        top: .25em;
                        left: .3em;
                        border-radius: 50%;
                        transition: 0.3s;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                    }

                    .switcher:checked::thumb {
                        translate: 2.8em 0;
                    }

                    .switcher::thumb,
                    .switcher::track {
                        grid-area: 1/1;
                    }
                }
            }

            .content {
                display: none;
            }

            @media (min-width: 768px) {
                .content {
                    border-radius: 2em;
                    gap: 1em;
                    width: 2.1em;
                    overflow: clip;
                    white-space: nowrap; /* voorkomt dat tekst op meerdere regels breekt */
                    transition: width 0.3s ease;
                    background-color: #F37827;
                    height: 2em;
                    padding: .3em .3em .3em .25em;
                    display: flex;
                    align-items:center;
                    position: fixed;
                    top: .5em;
                    right: 1em;

                    &:hover, &:focus {
                        border-radius: 2em;
                        width: calc-size(fit-content, size);
                    }
                    
                    img {
                        width: 1.5em;
                        background-color: #612B07;
                        padding: .3em;
                        border-radius: 100%;
                        color: #fff;
                    }
                
                    p {
                        margin-right: 1em;
                    }
                }
            }
        }
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>