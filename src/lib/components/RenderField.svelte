<script lang="ts">
	import { field } from '$lib/stores/stores.js';
	import type { FormField, Option } from '../types/form.d.ts';

	let options: Option[] = $field?.options || [
		{ label: 'Option 1', value: 'option-1' },
		{ label: 'Option 2', value: 'option-2' },
		{ label: 'Option 3', value: 'option-3' }
	];
</script>

<label class="label" for={$field.attributes.name}>
	{$field.attributes.label || $field.attributes.name}
	{#if $field.type === 'select'}
		<select id={$field.attributes.name} class="select">
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else if $field.type === 'checkbox' || $field.type === 'radio'}
		<input
			type={$field.type}
			id={$field.attributes.name}
			class={$field.type === 'checkbox' ? 'checkbox' : 'radio'}
		/>
		{$field.attributes.label || $field.attributes.name}
	{:else}
		<input
			type={$field.type}
			id={$field.attributes.name}
			class="input"
			placeholder={$field.attributes.placeholder}
		/>
	{/if}
</label>
