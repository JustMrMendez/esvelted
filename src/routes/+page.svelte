<script lang="ts">
	import FieldBuilder from '$lib/components/FieldBuilder.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FormField } from '$lib/types/form.d.ts';

	export let field: FormField = {
		id: '1',
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Enter your username',
		required: true
	};

	$: console.log(field);
</script>

<FieldBuilder  />
