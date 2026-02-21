export default {
  UsernameCharacterRegex: /^[a-z0-9_]+$/,
  EmailValidRegex: /^[^\s@]+@[^\s@]+$/,
  PasswordRequirementRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_\-+=?])/,
};
