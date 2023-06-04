//  enables svelte to switch input types dynamically
export function dynamicType(node: HTMLInputElement, type: string) {
	node.type = type;
}

// export const format = (
// 	node: HTMLInputElement,
// 	[pattern, formatFunction]: [string, (value: string, pattern: string) => string]
// ) => {
// 	function updateValue() {
// 		node.value = formatFunction(node.value, pattern);
// 	}

// 	node.addEventListener('input', updateValue);
// 	node.addEventListener('paste', updateValue);

// 	node.value = formatFunction(node.value, pattern);

// 	return {
// 		destroy() {
// 			node.removeEventListener('input', updateValue);
// 			node.removeEventListener('paste', updateValue);
// 		}
// 	};
// };
export const format = (
	node: HTMLInputElement,
	[pattern, formatFunction]: [
		string | undefined,
		(value: string, pattern: string | undefined) => string
	]
) => {
	if (pattern === '') {
		return;
	}

	function updateValue() {
		const previousValue = node.value;
		node.value = formatFunction(node.value, pattern);

		if (
			node.value !== previousValue &&
			node.selectionStart !== null &&
			node.selectionEnd !== null
		) {
			// If the value was changed (formatting was applied), move the cursor to the end
			node.selectionStart = node.selectionEnd = node.value.length;
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Backspace' || event.key === 'Delete') {
			const { selectionStart, selectionEnd } = node;
			if (selectionStart !== null && selectionEnd !== null && selectionStart === selectionEnd) {
				// If there's no text selected and we're not at the start of the input
				if (event.key === 'Backspace' && selectionStart > 0) {
					// If the character before the cursor is a non-digit, move the cursor back
					if (/\D/.test(node.value[selectionStart - 1])) {
						node.selectionStart = node.selectionEnd = selectionStart - 1;
						event.preventDefault();
					}
				} else if (event.key === 'Delete' && selectionEnd < node.value.length) {
					// If the character after the cursor is a non-digit, move the cursor forward
					if (/\D/.test(node.value[selectionEnd])) {
						node.selectionStart = node.selectionEnd = selectionEnd + 1;
						event.preventDefault();
					}
				}
			}
		}
	}

	node.addEventListener('input', updateValue);
	node.addEventListener('paste', updateValue);
	if (node.type === 'tel') {
		node.addEventListener('keydown', handleKeyDown);
	}
	node.value = formatFunction(node.value, pattern);

	return {
		destroy() {
			node.removeEventListener('input', updateValue);
			node.removeEventListener('paste', updateValue);
			if (node.type === 'tel') {
				node.removeEventListener('keydown', handleKeyDown);
			}
		}
	};
};
