export type CreateCompanyDTO = {
  name: string;
  email: string;
  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};
