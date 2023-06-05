<script lang="ts">
	import type { CheckboxOrRadioFieldType } from '../types/form.d.ts';
	import { field } from '../stores/stores.js';

	export let checkField = $field as CheckboxOrRadioFieldType;

	export const extraOptions: string[] = ['multiple'];
	export const extraAttributes: string[] = [];
</script>
