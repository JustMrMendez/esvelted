<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { SelectFieldType } from '../types/form.d.ts';
	import { field } from '../stores/stores.js';

	export let selectField = $field as SelectFieldType;

	export const extraOptions: string[] = ['multiple'];
	export const extraAttributes: string[] = [];
</script>

<label class="label" for="name">
	Name
	<input use:dynamicType={selectField.type} name="name" id="name" class="input" />
</label>

<label class="label" for="label" contenteditable="true">
	Label
	<input
		type="text"
		id="label"
		name="label"
		bind:value={selectField.attributes.label}
		class="input"
	/>
</label>

{#if selectField.type === 'select'}
	<label class="label" for="options">
		Options
		<input
			type="text"
			id="options"
			bind:value={selectField.attributes.options}
			name="options"
			class="input"
		/>
	</label>
{/if}
