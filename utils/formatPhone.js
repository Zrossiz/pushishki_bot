exports.formatPhoneNumber = (phone) => {
    if (!phone.startsWith("8") && !phone.startsWith("+7")) {
        return phone;
    }


    let cleaned = phone.replace(/[^\d]/g, "");
  
    if (cleaned.startsWith("8")) {
      cleaned = "+7" + cleaned.slice(1);
    }
  
    return cleaned;
}