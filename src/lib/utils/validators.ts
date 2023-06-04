export function validatePassword(password: string): string {
	// Check for lowercase letter
	if (!/(?=.*[a-z]).*/.test(password)) {
		return 'Password should contain at least one lowercase letter';
	}
	// Check for uppercase letter
	if (!/(?=.*[A-Z]).*/.test(password)) {
		return 'Password should contain at least one uppercase letter';
	}
	// Check for number
	if (!/(?=.*[0-9]).*/.test(password)) {
		return 'Password should contain at least one number';
	}
	// Check for special character
	if (!/(?=.*[!@#$%^&*]).*/.test(password)) {
		return 'Password should contain at least one special character (!@#$%^&*)';
	}
	// Check for minimum length
	if (!/^.{8,}$/.test(password)) {
		return 'Password should be at least 8 characters long';
	}

	return 'valid';
}

export const numberFormat = (value: string, pattern: string | undefined): string => {
	if (pattern === undefined) {
		return value;
	}

	// Remove all non-digit characters from value
	const cleanValue = value.replace(/\D/g, '');

	let formattedNumber = '';
	let valueIndex = 0;
	let isPreviousHash = false;
	let buffer = '';

	// Reverse the cleanValue and pattern
	const reversedCleanValue = cleanValue.split('').reverse().join('');
	const reversedPattern = pattern.split('').reverse().join('');

	for (let i = 0; i < reversedPattern.length; i++) {
		const char = reversedPattern[i];

		if (char === '#') {
			// Replace '#' with the corresponding digit from cleanValue
			if (valueIndex < reversedCleanValue.length) {
				formattedNumber += buffer + reversedCleanValue[valueIndex];
				buffer = '';
				valueIndex++;
			}
			isPreviousHash = true;
		} else if (char === '_' && isPreviousHash) {
			// If the character is '_' and the previous character was a '#', keep adding digits
			while (valueIndex < reversedCleanValue.length && reversedPattern[i + 1] === '#') {
				formattedNumber += reversedCleanValue[valueIndex];
				valueIndex++;
				i++;
			}
			isPreviousHash = false;
		} else {
			// Buffer non-digit characters to be added later
			buffer += char;
			isPreviousHash = false;
		}
	}

	// Reverse the formattedNumber to get the correct order
	formattedNumber = formattedNumber.split('').reverse().join('');

	return formattedNumber;
};
