<script>
	/** @type {{ data: { user: any }, children: import('svelte').Snippet }} */
	let { data, children } = $props()
	import { logo, logowhite } from '$lib'
</script>

	<!-- <div class="user-info">
				<p class="user-email">{data.user?.email ?? ''}</p>
			</div> -->
			  
			  <header class="admin-header">
				<nav class="admin-nav">
				   <div class="header-logo">
				  <a class="logo-admin" href="/admin" aria-label="Home – AdConnect logo">
					<picture>
					  <source srcset={logowhite} media="(prefers-color-scheme: dark)" />
					  <img src={logo} alt="" loading="lazy" width="200" height="150" />
					</picture>
				  </a>
				</div>

				<div class="container-header">
				  {#if data.user}
					<details class="menu">
					  <summary aria-label="Menu openen">
						<span></span>
						<span></span>
						<span></span>
					  </summary>
			  
					  <div class="panel">
						<ul class="mobile-links">
						  <li><a href="/admin" class="nav-link">Dashboard</a></li>
						  <li><a href="/admin/themas" class="nav-link">Thema's</a></li>
						   <li><a href="/admin/nominaties" class="nav-link">Events</a></li>
						  <li><a href="/admin/documenten" class="nav-link">Documenten</a></li>
						  <li><a href="/admin/nominaties" class="nav-link">Nominaties</a></li>
						  <li><a href="/admin/nieuws" class="nav-link">Nieuws</a></li>
						</ul>
			  
						<div class="sidebar-footer">
						  <a href="/admin/logout" class="logout-btn" data-sveltekit-reload>
							Uitloggen
						  </a>
						</div>
					  </div>
					</details>
			  
					<ul class="desktop-nav">
					  <li><a href="/admin" class="nav-link">Dashboard</a></li>
					  <li><a href="/admin/themas" class="nav-link">Thema's</a></li>
					  <li><a href="/admin/documenten" class="nav-link">Documenten</a></li>
					  <li><a href="/admin/nominaties" class="nav-link">Nominaties</a></li>
					  <li><a href="/admin/nieuws" class="nav-link">Nieuws</a></li>
					  <li>
						<a href="/admin/logout" class="logout-btn" data-sveltekit-reload>
						  Uitloggen
						</a>
					  </li>
					</ul>
				  {:else}
					<div class="welcome-section">
					  <h1 class="welcome-text">Welkom Terug!</h1>
					</div>
				  {/if}
				</div>
				</nav>
			  </header>

			  <main class="admin-content">
				{@render children()}
			</main>
			  
			  <style>
				.admin-header {
				  background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
				  width: 100%;
				  position: sticky;
				  top: 0;
				  z-index: 999;
				  display: flex;
				  justify-content: center;

				@media (min-width: 1000px) {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 260px;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
				}
			}
			  
				.admin-nav {
				  width: 100%;
				  display: flex;
				  justify-content: space-between;
				  align-items: center;
				  position: relative;

				@media (min-width: 1000px) {
                  flex-direction: column;
                  align-items: flex-start;
                  height: 100%;
                }
			}

				.header-logo{
	              background-color: var(--background);
	              width: fit-content;
	              padding: 1em;
				@media (min-width: 1000px) {
                  width: 100%;
                  padding: 0;
                  margin-bottom: 2rem;
                }
            }

				.container-header{
					padding: 1em;
					align-self: center;
					margin-bottom: auto;
				}
			  
				.logo-admin img {
				  height: 50px;
				  width: auto;
				@media (min-width: 1000px) {
				  height: 60px;
				}
			}
			  
				summary {
				  display: inline-block;
				  cursor: pointer;
				  list-style: none;
				}
			  
				summary span {
				  display: block;
				  width: 28px;
				  height: 3px;
				  margin: 6px 0;
				  background-color: var(--background);
				  border-radius: 2px;
				  transform-origin: center;
				  transition: all 0.3s ease;
				}
			  
				.menu {
				  display: block;
				  position: relative;
				@media (min-width: 1000px) {
                  display: none;
                 }
				}
			  
				.menu::before {
				  content: "";
				  display: block;
				  position: fixed;
				  inset: 0;
				  z-index: 999;
				  background-color: rgba(0, 0, 0, 0);
				  opacity: 0;
				  pointer-events: none;
				  transition: opacity 0.3s ease;
				}
			  
				.menu[open]::before {
				  background: rgba(0, 0, 0, 0.25);
				  opacity: 1;
				  pointer-events: auto;
				}
			  
				.panel {
				  position: fixed;
				  inset: 0;
				  z-index: 1000;
				  width: 100vw;
				  height: 100vh;
				  background-color: var(--background);
				  display: flex;
				  flex-direction: column;
				  justify-content: space-between;
				  padding: clamp(1rem, 3vw, 2rem);
				  box-sizing: border-box;
				  transform: translateX(100%);
				  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
				}
			  
				.menu[open] .panel {
				  transform: translateX(0);
				  background-color: light-dark(var(--primary-blue), hsl(210, 30%, 8%));
				}
			  
				.menu[open] summary {
				  position: fixed;
				  top: 16px;
				  right: 16px;
				  z-index: 1001;
				  padding: 6px;
				}
			  
				.menu[open] summary span:nth-child(1) {
				  transform: translateY(9px) rotate(45deg);
				}
				.menu[open] summary span:nth-child(2) {
				  transform: scaleX(0);
				  opacity: 0;
				}
				.menu[open] summary span:nth-child(3) {
				  transform: translateY(-9px) rotate(-45deg);
				}
			  
				.mobile-links {
				  list-style: none;
				  margin: 0;
				  display: flex;
				  flex-direction: column;
				  gap: 1em;
				  padding: 1em;
				}
			  
				.nav-link {
				  display: block;
				  text-decoration: none;
				  font-weight: 600;
				  font-size: 1.2rem;
				  color: var(--background);
				  padding: 0.5rem 1rem;
				}

				.sidebar-footer {
				  padding: 1rem 0;
				}
			  
				.logout-btn {
				  display: inline-block;
				  text-decoration: none;
				  font-weight: 600;
				  padding: 1em;
				  border-radius: var(--button-blue-radius);
				  border: 2px solid currentColor;
				  color: var(--background);
				@media (min-width: 1000px) {
                  margin-top: auto;
                  width: 100%;
                  text-align: center;
                 }
				}
		
				.desktop-nav {
				  display: none;
				  list-style: none;
				  gap: 1.2rem;
				  align-items: center;
				  margin: 0;
				  padding: 0;

				@media (min-width: 1000px) {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 1rem;
                  width: 100%;
                 }
				}

				@media (min-width: 1000px) {
                 .desktop-nav .nav-link {
                    color: var(--background);
                    font-size: 1.1rem;
                    padding: 0.6rem 0;
                    width: 100%;
                    display: block;
				}
			}

                @media (min-width: 1000px) {
                 .admin-content {
                    margin-left: 260px;
                    padding: 2rem;
                }
            }
			  </style>
			  
