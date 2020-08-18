export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, validation) => {
  let isValid = true;
  if (validation) {
    if (validation.required) {
      isValid &= value.trim() !== "";
    }
    if (validation.minLength) {
      isValid &= value.trim().length >= validation.minLength;
    }
    if (validation.maxLength) {
      isValid &= value.trim().length <= validation.maxLength;
    }
  }
  return isValid;
};
