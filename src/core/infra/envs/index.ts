export function envs() {
  return {
    PORT: process.env.PORT as string,
    HASH_PASSWORD_SALT: process.env.HASH_PASSWORD_SALT,
  };
}
