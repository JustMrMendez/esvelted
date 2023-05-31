<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { FormField, Option } from '../types/form.d.ts';
	import TextField from './TextField.svelte';

	let field: FormField = {
		type: 'text',
		id: '',
		name: '',
		label: '',
		placeholder: '',
		required: false,
		minLength: 0,
		maxLength: 0,
		pattern: ''
	};

	$: console.log(field);
</script>

<form class="grid grid-cols-2 gap-4">
	<label class="label" for="type">
		Type
		<select id="type" bind:value={field.type} class="select">
			<option value="text">Text</option>
			<option value="password">Password</option>
			<option value="email">Email</option>
			<option value="number">Number</option>
			<option value="date">Date</option>
			<option value="checkbox">Checkbox</option>
			<option value="radio">Radio</option>
			<option value="select">Select</option>
		</select>
	</label>

	<svelte:component this={TextField} bind:textField={field} />


	<!-- {#if field.type === 'text' || field.type === 'password' || field.type === 'email'}
		<label class="label" for="id">
			ID
			<input use:dynamicType={field.type} id="id" bind:value={field.id} class="input" />
		</label>
		<label class="label" for="name">
			Name
			<input use:dynamicType={field.type} id="name" bind:value={field.name} class="input" />
		</label>
		<label class="label" for="label">
			Label
			<input type="text" id="label" bind:value={field.label} class="input" />
		</label>
		<label class="label" for="placeholder">
			Placeholder
			<input type="text" id="placeholder" bind:value={field.placeholder} class="input" />
		</label>
		<label class="flex items-center space-x-2" for="required">
			<p>Required</p>
			<input type="checkbox" id="required" bind:checked={field.required} class="checkbox" />
		</label>
		{#if field.type !== 'email'}
			<label class="label" for="minLength">
				Min Length
				<input type="number" id="minLength" bind:value={field.minLength} class="input" />
			</label>
			<label class="label" for="maxLength">
				Max Length
				<input type="number" id="maxLength" bind:value={field.maxLength} class="input" />
			</label>
		{/if}
		<label class="label" for="pattern">
			Pattern
			<input type="text" id="pattern" bind:value={field.pattern} class="input" />
		</label>
		<label class="label" for="validation-message">
			Validation Message
			<input
				type="text"
				id="validation-message"
				bind:value={field.validationMessage}
				class="input"
			/>
		</label>
	{/if}
	{#if field.type === 'number'}
		<label class="label" for="min">
			Min
			<input type="number" id="min" bind:value={field.min} class="input" />
		</label>
		<label class="label" for="max">
			Max
			<input type="number" id="max" bind:value={field.max} class="input" />
		</label>
	{/if}
	{#if field.type === 'date'}
		<label class="label" for="min">
			Min (YYYY-MM-DD)
			<input type="date" id="min" bind:value={field.min} class="input" />
		</label>
		<label class="label" for="max">
			Max (YYYY-MM-DD)
			<input type="date" id="max" bind:value={field.max} class="input" />
		</label>
	{/if}
	{#if field.type === 'checkbox' || field.type === 'radio'}
		<label class="label" for="value">
			Value
			<input
				use:dynamicType={field.type}
				id="value"
				checked={field.value}
				class="w-4 h-4 ml-2 mt-1 mr-2 border-2 border-blue-500"
			/>
		</label>
	{/if}
	{#if field.type === 'select'}
		<div id="options" class="ml-2">
			<div class="mb-2">
				<label class="label" for="options">
					Options
					<input
						class="w-full px-4 py-2 border-2 border-blue-500 rounded-md"
						bind:value={field.options[0].value}
					/>
				</label>
				{field.options[0].value}
			</div>
		</div>
	{/if} -->
	<button type="submit" class="btn variant-filled-primary"> Create Field </button>
</form>
<pre>
{@html JSON.stringify(field, null, 2)}
</pre>
