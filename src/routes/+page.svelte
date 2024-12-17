<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Grid from './Grid.svelte';

	let { data }: { data: PageData } = $props();
	let loading = $state(false);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<h1>Hi, {data.user.username}!</h1>

<a href="/grid"> Grid </a>
<form
	method="post"
	action="?/logout"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	}}
>
	<button>
		{loading ? 'Logging out...' : 'Logout'}
	</button>
</form>
