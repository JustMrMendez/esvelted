<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { FormField, NumberFieldType } from '../types/form.d.ts';
	import { field } from '../stores/stores.js';

	let numberField = $field as NumberFieldType;
	// extra options passed to the parent component
	export const extraOptions: string[] = [];
	export const extraAttributes: string[] = ['pattern', 'min', 'max', 'step'];

	$: $field = numberField as FormField;

	$: {
		switch (numberField.type) {
			case 'number':
				numberField = {
					...numberField,
					attributes: {
						...numberField.attributes,
						min: '',
						max: '',
						step: 1
					}
				};
				break;
			case 'tel':
				numberField = {
					...numberField,
					attributes: {
						...numberField.attributes,
						pattern: '*.##',
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
