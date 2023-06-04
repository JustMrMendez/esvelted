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
				return TextField;
			case 'number':
			case 'tel':
				return NumberField;
			case 'checkbox':
			case 'radio':
			case 'select':
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
	<form class="card p-4 space-y-4 flex flex-col mb-4">
		<div class="grid grid-cols-2 gap-4">
			<label class="label" for="type">
				Field Type
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

			{#if $field.validate}
				<label class="label" for="validationMessage">
					Validation Message
					<input
						type="text"
						id="validationMessage"
						name="validationMessage"
						bind:value={$field.attributes.validationMessage}
						class="input"
					/>
				</label>
			{/if}
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
			<label class="flex items-center space-x-2">
				<input type="checkbox" class="checkbox" bind:checked={$field.validate} />
				<p>Validate</p>
			</label>
			{#if $field.type === 'select'}
				<label class="flex items-center space-x-2">
					<input type="checkbox" class="checkbox" bind:checked={$field.attributes.multiple} />
					<p>Multi-select</p>
				</label>
			{/if}
		</div>
		<button type="submit" class="btn variant-filled-primary">
			<!-- add icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 inline-block mr-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
			Field
		</button>
	</form>
	<pre>{@html JSON.stringify($field, null, 2)}</pre>
</div>
