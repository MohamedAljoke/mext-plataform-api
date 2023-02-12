import User from "App/Models/User";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import { userSerializer } from "App/Serializer/UserSerializer";

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
  public async login(
    { email, password }: { email: string; password: string },
    auth: AuthContract
  ) {
    const token = await auth
      .use("api")
      .attempt(email, password, { expiresIn: "7days" });
    const user = await User.query().where({ email });
    const serializedUser = user[0].serialize(userSerializer);
    return { ...token.toJSON(), ...serializedUser };
  }
  public async loginRefresh(user: User, auth: AuthContract) {
    const serializedUser = user.serialize(userSerializer);
    const tokenJSON = (
      await auth.use("api").generate(user, { expiresIn: "7days" })
    ).toJSON();
    return {
      ...tokenJSON,
      ...serializedUser,
    };
  }
}
