//  enables svelte to switch input types dynamically
export function dynamicType(node: HTMLInputElement, type: string) {
	node.type = type;
}

