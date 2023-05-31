<script lang="ts">
	import { dynamicType } from '$lib/utils/actions.js';
	import type { BooleanAttributes, NumberFieldType } from '../types/form.d.ts';

	export let numberField: NumberFieldType;

	export let showOptions: (keyof NumberFieldType | keyof BooleanAttributes)[] | undefined = [
		'required',
		'min',
		'max',
		'step',
		'readonly',
		'validationMessage',
		'disabled',
		'name',
		'label'
	];
</script>

<label class="label" for="name">
	Name
	<input
		use:dynamicType={numberField.type}
		type=""
		id="name"
		bind:value={numberField.name}
		class="input"
	/>
</label>

<label class="label" for="label" contenteditable="true">
	Label
	<input type="text" id="label" bind:value={numberField.label} class="input" />
</label>

<label class="label" for="min">
	Min
	<input
		type="number"
		id="min"
		bind:value={numberField.min}
		class="input"
		min={numberField.min}
		max={numberField.max}
		step={numberField.step}
	/>
</label>

<label class="label" for="max">
	Max
	<input
		type="number"
		id="max"
		bind:value={numberField.max}
		class="input"
		min={numberField.min}
		max={numberField.max}
		step={numberField.step}
	/>
</label>

<label class="label" for="step">
	Step
	<input
		type="number"
		id="step"
		bind:value={numberField.step}
		class="input"
		min={numberField.min}
		max={numberField.max}
		step={numberField.step}
	/>
</label>
