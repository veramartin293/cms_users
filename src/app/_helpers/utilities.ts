function formatPhoneNumber (phone: string): string {
  let unformatedPhone = phone;
  unformatedPhone = unformatedPhone.replace(/\s/g, ""); // Remove spaces (in case they exist)
  let formatedPhone = '';
  for (let i = 0; i < unformatedPhone.length; i++) {
    const needsSpace = i === 3 || i === 6;
    if (needsSpace) {
      formatedPhone += ' ';
    }
    formatedPhone += unformatedPhone[i];
  }
  return formatedPhone;
}

export { formatPhoneNumber };
