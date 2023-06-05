type BaseFieldType = {
	type:
		| 'text'
		| 'password'
		| 'tel'
		| 'email'
		| 'url'
		| 'number'
		| 'date'
		| 'checkbox'
		| 'radio'
		| 'select'
		| 'file';
};

// Common attributes for form fields
type SharedProperties = {
	name: string;
	placeholder?: string;
	label?: string;
	autocomplete?: 'on' | 'off';
	pattern?: string;
	validationMessage?: string;
	required?: boolean;
	autofocus?: boolean;
	autocapitalize?: 'on' | 'off';
	readOnly?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	[key: string]: any;
};

type TextFieldAttributes = {
	minLength?: number;
	maxLength?: number;
	value?: string;
};

type NumberFieldAttributes = {
	min?: number | string;
	max?: number | string;
	step?: number | string;
	value?: number;
};

type DateFieldAttributes = {
	min?: string;
	max?: string;
	valueAsDate?: Date;
};

type CheckboxOrRadioFieldAttributes = {
	checked?: boolean;
	defaultChecked?: boolean;
	indeterminate?: boolean;
};

type SelectFieldAttributes = {
	options?: Option[];
	multiple?: boolean;
};

type FileFieldAttributes = {
	accept?: string;
	files?: FileList;
	webkitdirectory?: boolean;
};

// Field Types
type TextFieldType = BaseFieldType & {
	attributes: TextFieldAttributes & Omit<SharedProperties, 'type'>;
};

type NumberFieldType = BaseFieldType & {
	attributes: NumberFieldAttributes & Omit<SharedProperties, 'type'>;
};

type DateFieldType = BaseFieldType & {
	attributes: DateFieldAttributes & Omit<SharedProperties, 'type'>;
};

type CheckboxOrRadioFieldType = BaseFieldType & {
	attributes: CheckboxOrRadioFieldAttributes & Omit<SharedProperties, 'type'>;
};

type SelectFieldType = BaseFieldType & {
	attributes: SelectFieldAttributes & Omit<SharedProperties, 'type'>;
};

type FileFieldType = BaseFieldType & {
	attributes: FileFieldAttributes & Omit<SharedProperties, 'type'>;
};

// Unified FormFieldType
export type FormFieldType =
	| TextFieldType
	| NumberFieldType
	| DateFieldType
	| CheckboxOrRadioFieldType
	| SelectFieldType
	| FileFieldType;

interface Option {
	value: string | number;
	label: string;
}

export interface FormField extends BaseFieldType {
	validate?: boolean;
	attributes: SharedProperties &
		TextFieldAttributes &
		NumberFieldAttributes &
		DateFieldAttributes &
		CheckboxOrRadioFieldAttributes &
		SelectFieldAttributes &
		FileFieldAttributes;
	options?: Option[];
	[key: string]: unknown;
}

export interface Form {
	fields: FormField[];
	action: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	enhance?: boolean;
	[key: string]: unknown;
}
