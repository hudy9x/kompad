import passwordValidator from "password-validator";
const pwdSchema = new passwordValidator();

pwdSchema
  .is()
  .min(8)
  .is()
  .max(16)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

export const isValidPassword = (pwd: string): boolean => {
  return pwdSchema.validate(pwd) as boolean;
};

export const isSamePassword = (pwd1: string, pwd2: string): boolean => {
  return pwd1 === pwd2;
};
