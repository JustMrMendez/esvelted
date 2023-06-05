<script lang="ts">
	import { field } from '$lib/stores/stores.js';
	import { dynamicType, format } from '$lib/utils/actions.js';
	import { numberFormat } from '$lib/utils/validators.js';
	import type { Option } from '../types/form.d.ts';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let value: string[] = [];

	let options: Option[] = $field?.options || [
		{ label: 'Option 1', value: 'option-1' },
		{ label: 'Option 2', value: 'option-2' },
		{ label: 'Option 3', value: 'option-3' }
	];

	let selected: string[] | string = [];

	function dynamicMultiple(node: HTMLDivElement) {
		const type = node.dataset.type;
		let lastSelected;

		if (Array.isArray(selected) && selected.length > 0) {
			lastSelected = selected[selected.length - 1]; // get the last selected item
		} else if (typeof selected === 'string' && selected !== '') {
			lastSelected = selected; // get the whole string
		}

		if (type === 'multiple') {
			selected = lastSelected ? [lastSelected] : []; // use the last selected item as the first value of the array or empty array
		} else {
			selected = lastSelected || ''; // use the string or empty string
		}
	}

	function toArray(value: string | string[]) {
		if (Array.isArray(value)) {
			return value;
		}
		return [value];
	}

	$: value = toArray(selected);
</script>

<div class="h-fit p-4 w-full">
	{#key $field}
		{#if $field.type === 'select'}
			<label class="label" for={$field.attributes.name}>
				{$field.attributes.label || $field.attributes.name}
				{#if $field.attributes.multiple}
					<div data-type="multiple" use:dynamicMultiple>
						<ListBox multiple class="card !rounded-md p-4 w-full">
							{#each options as option (option.value)}
								<ListBoxItem
									bind:group={selected}
									value={option.value}
									name={$field.attributes.name}>{option.label}</ListBoxItem
								>
							{/each}
						</ListBox>
					</div>
				{:else}
					<div data-type="single" use:dynamicMultiple>
						<ListBox class="card !rounded-md p-4 w-full">
							{#each options as option (option.value)}
								<ListBoxItem
									bind:group={selected}
									value={option.value}
									name={$field.attributes.name}
								>
									{option.label}
								</ListBoxItem>
							{/each}
						</ListBox>
					</div>
				{/if}
			</label>
		{:else if $field.type === 'checkbox'}
			{#each options as option}
				<label
					for={option.label}
					class="hover:variant-soft flex items-center space-x-2 hover:cursor-pointer py-2 px-4"
				>
					<input
						type="checkbox"
						id={option.label}
						class="checkbox"
						value={option.value}
						bind:group={selected}
					/>
					<span>{option.label}</span>
				</label>
			{/each}
		{:else if $field.type === 'tel'}
			<input
				use:dynamicType={$field.type}
				id={$field.attributes.name}
				class="input"
				bind:value
				use:format={[$field.attributes.format, numberFormat]}
				name={$field.attributes.name}
				placeholder={$field.attributes.placeholder}
				autocomplete={$field.attributes.autocomplete}
				minlength={$field.attributes.minLength}
				maxlength={$field.attributes.maxLength}
				required={$field.attributes.required}
				readonly={$field.attributes.readonly}
				disabled={$field.attributes.disabled}
			/>
		{:else if $field.type === 'number'}
			<input
				use:dynamicType={$field.type}
				id={$field.attributes.name}
				class="input"
				bind:value
				use:format={[$field.attributes.pattern, numberFormat]}
				name={$field.attributes.name}
				placeholder={$field.attributes.placeholder}
				autocomplete={$field.attributes.autocomplete}
				min={$field.attributes.min}
				max={$field.attributes.max}
				step={$field.attributes.step}
				required={$field.attributes.required}
				readonly={$field.attributes.readonly}
				disabled={$field.attributes.disabled}
			/>
		{:else}
			<input
				use:dynamicType={$field.type}
				id={$field.attributes.name}
				class="input"
				bind:value
				name={$field.attributes.name}
				placeholder={$field.attributes.placeholder}
				autocomplete={$field.attributes.autocomplete}
				pattern={$field.attributes.pattern}
				minlength={$field.attributes.minLength}
				maxlength={$field.attributes.maxLength}
				required={$field.attributes.required}
				readonly={$field.attributes.readonly}
				disabled={$field.attributes.disabled}
			/>
		{/if}
	{/key}
</div>
