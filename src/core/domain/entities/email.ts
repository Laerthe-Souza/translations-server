export class Email {
  private email: string;

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) {
      throw new Error('INVALID_EMAIL');
    }

    this.email = email;
  }

  getValue(): string {
    return this.email;
  }
}
