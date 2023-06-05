<script lang="ts">
	import { TextField, NumberField, SelectField, CheckboxField } from '$lib/index.js';
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
				return CheckboxField;
			case 'select':
				return SelectField;
		}
	}

	let options: string[] = ['required', 'disabled', 'readonly', 'validate'];
	export let defaultAttributes: string[] = ['name', 'id', 'placeholder', 'value'];
	let extraAttributes: string[] = [];
	// extra options passed up from the field component
	let extraOptions: string[] = [];

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
			<svelte:component this={selected} bind:extraAttributes bind:extraOptions />

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
			{#each defaultAttributes as option}
				<label class="label">
					{option}
					<input
						type="text"
						class="input"
						name={$field.attributes.name}
						bind:value={$field.attributes[option]}
					/>
				</label>
			{/each}
			{#each extraAttributes as option}
				<label class="label">
					{option}
					<input
						type="text"
						class="input"
						name={$field.attributes.name}
						bind:value={$field.attributes[option]}
					/>
				</label>
			{/each}
		</div>
		<div class="grid w-full grid-cols-4 gap-4">
			<!-- checkboxes list of boolean attributes -->
			{#each options as option}
				{#if option === 'validate'}
					<label class="flex items-center space-x-2">
						<input type="checkbox" class="checkbox" bind:checked={$field.validate} />
						<p>Validate</p>
					</label>
				{:else if option === 'multiple'}
					<label class="flex items-center space-x-2">
						<input type="checkbox" class="checkbox" bind:checked={$field.attributes.multiple} />
						<p>Multi-select</p>
					</label>
				{:else}
					<label class="flex items-center space-x-2">
						<input type="checkbox" class="checkbox" bind:checked={$field.attributes[option]} />
						<p>{option}</p>
					</label>
				{/if}
				{#if option === 'autocomplete'}
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
				{/if}
			{/each}
			{#each extraOptions as option}
				<label class="flex items-center space-x-2">
					<input type="checkbox" class="checkbox" bind:checked={$field.attributes[option]} />
					<p>{option}</p>
				</label>
			{/each}
		</div>
		<button type="submit" class="btn variant-filled-primary">
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
