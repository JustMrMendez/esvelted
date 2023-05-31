import type { FormField } from '$lib/types/form.js';
import { writable } from 'svelte/store';

export const field = writable<FormField>({
	type: 'text',
	attributes: {
		name: 'username',
		placeholder: 'Enter your username',
		label: 'Username',
		autocomplete: 'on',
		pattern: '',
		validationMessage: 'Please enter a valid username',
		required: true,
		autofocus: true,
		readOnly: false,
		disabled: false
	}
});
