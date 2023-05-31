type SharedProperties = {
	name: string;
	label: string;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	validationMessage?: string;
};

// Field Types
type TextFieldType = {
	type: 'text' | 'password' | 'email' | 'url';
	placeholder?: string;
} & SharedProperties;

type NumberFieldType = { type: 'number'; min?: number; max?: number; step?: number };
type DateFieldType = { type: 'date'; min?: string; max?: string };
type CheckboxOrRadioFieldType = { type: 'checkbox' | 'radio'; value?: boolean };
type SelectFieldType = { type: 'select'; options: Option[] };
type FileFieldType = { type: 'file'; accept?: string };

// Unified FormFieldType
export type FormFieldType =
	| TextFieldType
	| NumberFieldType
	| DateFieldType
	| CheckboxOrRadioFieldType
	| SelectFieldType
	| FileFieldType;

export interface Option {
	value: string | number;
	label: string;
}

export type BooleanAttributes = {
	autofocus?: boolean;
	checked?: boolean;
	disabled?: boolean;
	formnovalidate?: boolean;
	multiple?: boolean;
	readonly?: boolean;
	required?: boolean;
	spellcheck?: boolean;
};

export type InputAttributes = {
	accept?: string;
	alt?: string;
	autocomplete?: 'on' | 'off';
	capture?: string; // often used with file type input
	formaction?: string;
	formenctype?: string;
	formmethod?: 'GET' | 'POST';
	formtarget?: string;
	height?: string;
	width?: string;
	list?: string;
	max?: string;
	min?: string;
	pattern?: string;
	placeholder?: string;
	step?: string;
} & BooleanAttributes;

type FormFieldBase = {
	id: string;
	name: string;
	label: string;
	type: FormFieldType['type'];
} & InputAttributes;

export type FormField = FormFieldBase & FormFieldType;

export type CombinedKeys = keyof FormField;

export interface Form {
	fields: FormField[];
	action: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	enhance?: boolean;
	[key: string]: unknown;
}
