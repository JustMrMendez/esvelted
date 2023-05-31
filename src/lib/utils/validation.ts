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
