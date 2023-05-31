<script lang="ts">
	import { TextField, NumberField, SelectField } from '$lib/index.js';
	// import NumberField from './NumberField.svelte';
	// import SelectField from './SelectField.svelte';
	import { field } from '$lib/stores/stores.js';

	function renderField(field: string) {
		switch (field) {
			case 'text':
			case 'password':
			case 'email':
			case 'url':
				console.log('rendering text field');
				return TextField;
			case 'number':
			case 'tel':
				console.log('rendering number field');
				return NumberField;
			case 'checkbox':
			case 'radio':
			case 'select':
				console.log('rendering select field');
				return SelectField;
		}
	}

	let selected = TextField;
	$: {
		// @ts-ignore
		selected = renderField($field.type);
	}
</script>

<div class="">
	<form class="card p-4 space-y-4">
		<div class="grid grid-cols-2 gap-4">
			<label class="label" for="type">
				Type
				<select id="type" bind:value={$field.type} class="select">
					<option value={'text'}>Text</option>
					<option value="password">Password</option>
					<option value="tel">Phone Number</option>
					<option value="email">Email</option>
					<option value="number">Number</option>
					<option value="date">Date</option>
					<option value="checkbox">Checkbox</option>
					<option value="radio">Radio</option>
					<option value="select">Select</option>
				</select>
			</label>
			<svelte:component this={selected} />
		</div>
		<div class="grid w-full grid-cols-4 gap-4">
			<!-- checkboxes list of boolean attributes -->
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="checkbox" bind:checked={$field.attributes.required} />
				<p>Required</p>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="checkbox" bind:checked={$field.attributes.disabled} />
				<p>Disabled</p>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="checkbox" bind:checked={$field.attributes.readonly} />
				<p>Readonly</p>
			</label>
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="checkbox" bind:checked={$field.attributes.autofocus} />
				<p>Autofocus</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					type="checkbox"
					class="checkbox"
					checked={$field.attributes.autocomplete === 'on'}
					on:click={() => {
						$field.attributes.autocomplete === 'on'
							? ($field.attributes.autocomplete = 'off')
							: ($field.attributes.autocomplete = 'on');
					}}
				/>
				<p>Autocomplete</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					type="checkbox"
					class="checkbox"
					checked={$field.attributes.autocapitalize === 'on'}
					on:click={() => {
						$field.attributes.autocapitalize === 'on'
							? ($field.attributes.autocapitalize = 'off')
							: ($field.attributes.autocapitalize = 'on');
					}}
				/>
				<p>Autocapitalize</p>
			</label>
		</div>
		<button type="submit" class="btn variant-filled-primary"> Create Field </button>
	</form>
	<pre>
	{@html JSON.stringify($field, null, 2)}
	</pre>
</div>
