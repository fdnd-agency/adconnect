<script>
    import { Sun, Cloud, Cat, Landscape } from '$lib'
</script>

<div class="wrapper">
    <div class="mood">
        <Sun />
        <!-- Switcher -->
        <input type="checkbox" switch class="switcher">
        <Cloud />
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
    
        /* Wrapper switcher */
        .mood {
            background-color: #F37827;
            padding: .4em 1.5em;
            display: flex;
            align-items: center;
            gap: .5em;
            position: fixed;
            top: 0;

            /* Switcher */
            .switcher {
                appearance: none;
                width: 6em;
                height: 3em;
                background-color: #612B07;
                display: inline-grid;
                position: relative;
                cursor: pointer;
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
                    background-color: #67e5bf;
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
    }
</style>