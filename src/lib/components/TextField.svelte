<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import { validatePassword } from '$lib/utils/validation.js';
	import type { BooleanAttributes, CombinedKeys, TextFieldType } from '../types/form.d.ts';

	export let textField: TextFieldType;

	export let showOptions: (keyof TextFieldType | keyof BooleanAttributes)[] | undefined = [
		'required',
		'minLength',
		'maxLength',
		'pattern',
		'readonly',
		'validationMessage',
		'disabled',
		'placeholder',
		'name',
		'label'
	];

	$: {
		switch (textField.type) {
			case 'password':
				textField = {
					...textField,
					minLength: 8,
					maxLength: 32
				};
				// do not show pattern for password
				showOptions = [];
				break;

			case 'email':
				textField = {
					...textField,
					pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
					validationMessage: 'Please enter a valid email address'
				};
				break;

			case 'url':
				textField = {
					...textField,
					pattern: '^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$',
					validationMessage: 'Please enter a valid URL'
				};
				break;
		}
	}
</script>

<label class="label" for="name">
	Name
	<input
		use:dynamicType={textField.type}
		type=""
		id="name"
		bind:value={textField.name}
		class="input"
	/>
</label>

<label class="label" for="label" contenteditable="true">
	Label
	<input type="text" id="label" bind:value={textField.label} class="input" />
</label>

<label class="label" for="placeholder">
	Placeholder
	<input type="text" id="placeholder" bind:value={textField.placeholder} class="input" />
</label>
