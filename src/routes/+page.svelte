<script lang="ts">
	import RenderField from './../lib/components/RenderField.svelte';
	import FieldBuilder from '$lib/components/FieldBuilder.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FormField } from '$lib/types/form.d.ts';

</script>

<div class="flex justify-around w-full">
	<FieldBuilder />
	<RenderField />
</div>
