export function createControl(config, validation) {
    return {
        ...config,
        validation,
        value: '',
        touched: false,
        valid: !validation
    }
}

export function validate(value, validation) {
    if (!validation) {
        return true
    }
    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== ''
    }
    return isValid
}

export function validateForm(formControls) {
    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = isFormValid && formControls[name].valid
    });
    return isFormValid
}