// Modal state for quick contact / order popup
interface ModalConfig {
	isOpen: boolean;
	serviceTitle?: string;
	serviceCategory?: string;
	calculatedPrice?: number;
}

let modalData = $state<ModalConfig>({
	isOpen: false,
	serviceTitle: '',
	serviceCategory: '',
	calculatedPrice: undefined
});

export const orderModal = {
	get data() {
		return modalData;
	},
	open(options?: { serviceTitle?: string; serviceCategory?: string; calculatedPrice?: number }) {
		modalData = {
			isOpen: true,
			serviceTitle: options?.serviceTitle || '',
			serviceCategory: options?.serviceCategory || '',
			calculatedPrice: options?.calculatedPrice
		};
	},
	close() {
		modalData = {
			isOpen: false,
			serviceTitle: '',
			serviceCategory: '',
			calculatedPrice: undefined
		};
	}
};
