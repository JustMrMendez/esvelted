<script lang="ts">
	import RenderField from './../lib/components/RenderField.svelte';
	import FieldBuilder from '$lib/components/FieldBuilder.svelte';

	let value: any;
</script>

<div class="flex justify-around w-full">
	<div class="w-1/3">
		<FieldBuilder />
	</div>
	<div class="space-y-4 card h-fit w-1/3">
		<RenderField bind:value />
		{#if value}
			<pre class="w-full p-4">{JSON.stringify(value, null, 2)}
 {value}
			</pre>
			{:else}
			<pre class="w-full p-4">No value</pre>

		{/if}
	</div>
</div>
