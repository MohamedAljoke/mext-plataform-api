import User from "App/Models/User";

export default class AuthServices {
  constructor() {}
  public async createUserService({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    return await User.create({ email, name, password });
  }
}
