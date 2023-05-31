<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { TextFieldType } from '../types/form.d.ts';
	import { field } from '../stores/stores.js';

	let textField = $field as TextFieldType;
	$: {
		$field = textField;
	}
	$: {
		switch (textField.type) {
			case 'password':
				textField = {
					...textField,
					attributes: {
						...textField.attributes,
						autocomplete: 'off',
						minLength: 8,
						maxLength: 32
					}
				};
				break;

			case 'email':
				textField = {
					...textField,
					attributes: {
						...textField.attributes,
						pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
						validationMessage: 'Please enter a valid email address'
					}
				};
				break;

			case 'url':
				textField = {
					...textField,
					attributes: {
						...textField.attributes,
						pattern: '^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$',
						validationMessage: 'Please enter a valid URL'
					}
				};
				break;
		}
	}
</script>

<label class="label" for="name">
	Name
	<input use:dynamicType={textField.type} name="name" id="name" class="input" />
</label>

<label class="label" for="label">
	Label
	<input type="text" id="label" bind:value={textField.attributes.label} class="input" />
</label>

<label class="label" for="placeholder">
	Placeholder
	<input type="text" id="placeholder" bind:value={textField.attributes.placeholder} class="input" />
</label>
