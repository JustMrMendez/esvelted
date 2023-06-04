<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { FormField, NumberFieldType } from '../types/form.d.ts';
	import { field } from '../stores/stores.js';

	let numberField = $field as NumberFieldType;

	$: $field = numberField as FormField;

	$: {
		switch (numberField.type) {
			case 'number':
				numberField = {
					...numberField,
					attributes: {
						...numberField.attributes,
						min: 0,
						max: 100,
						step: 1
					}
				};
				break;
			case 'tel':
				numberField = {
					...numberField,
					attributes: {
						...numberField.attributes,
						pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
						validationMessage: 'Please enter a valid phone number'
					}
				};
				break;
		}
	}
</script>

<label class="label" for="name">
	Name
	<input
		use:dynamicType={numberField.type}
		bind:value={numberField.attributes.name}
		name="name"
		id="name"
		class="input"
	/>
</label>

<label class="label" for="label">
	Label
	<input
		type="text"
		id="label"
		name="label"
		bind:value={numberField.attributes.label}
		class="input"
	/>
</label>

{#if numberField.type === 'number'}
	<label class="label" for="min">
		Min
		<input
			type="number"
			id="min"
			bind:value={numberField.attributes.min}
			name="min"
			class="input"
		/>
	</label>

	<label class="label" for="max">
		Max
		<input
			type="number"
			id="max"
			bind:value={numberField.attributes.max}
			name="max"
			class="input"
		/>
	</label>

	<label class="label" for="step">
		Step
		<input
			type="number"
			id="step"
			bind:value={numberField.attributes.step}
			name="step"
			class="input"
		/>
	</label>
{/if}
