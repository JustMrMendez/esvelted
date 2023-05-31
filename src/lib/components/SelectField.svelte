<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { SelectFieldType } from '../types/form.d.ts';

	export let field: SelectFieldType;

	$: {
		if (field.type === 'select') {
			field = {
				...field,
				attributes: {
					...field.attributes,
					options: field.attributes.options || []
				}
			};
		}
	}
</script>

<label class="label" for="name">
	Name
	<input use:dynamicType={field.type} name="name" id="name" class="input" />
</label>

<label class="label" for="label" contenteditable="true">
	Label
	<input type="text" id="label" name="label" bind:value={field.attributes.label} class="input" />
</label>

{#if field.type === 'select'}
	<div>
		<label class="label" for="options">
			Options
			<input
				type="text"
				id="options"
				bind:value={field.attributes.options}
				name="options"
				class="input"
			/>
		</label>
		<label class="label" for="multiple">
			Multiple
			<input
				type="checkbox"
				id="multiple"
				bind:checked={field.attributes.multiple}
				name="multiple"
				class="input"
			/>
		</label>
	</div>
{/if}
