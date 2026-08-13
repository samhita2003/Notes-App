function validate(data) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return emailRegex.test(data.mail) && passwordRegex.test(data.pwd) && nameRegex.test(data.name);
}

export const profileName = (name) => {
  const words = name.trim().split(/\s+/);

  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join("")
      .toUpperCase();
  }

  return words[0].slice(0, 2).toUpperCase();
};

export default validate;