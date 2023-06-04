<script lang="ts">
	import { field } from '$lib/stores/stores.js';
	import { dynamicType } from '$lib/utils/actions.js';
	import type { Option } from '../types/form.d.ts';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let value: string[];

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

	$: console.log(value);
</script>

<div class="h-fit p-4">
	{#key $field}
		<label class="label" for={$field.attributes.name}>
			<!-- {$field.attributes.label || $field.attributes.name} -->
			{#if $field.type === 'select'}
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
			{:else if $field.type === 'checkbox' || $field.type === 'radio'}
				<input
					use:dynamicType={$field.type}
					id={$field.attributes.name}
					class={$field.type === 'checkbox' ? 'checkbox' : 'radio'}
				/>
				{$field.attributes.label || $field.attributes.name}
			{:else}
				<p>This should be a number</p>
				<input
					use:dynamicType={$field.type}
					id={$field.attributes.name}
					class="input"
					placeholder={$field.attributes.placeholder}
				/>
			{/if}
		</label>
	{/key}
</div>
