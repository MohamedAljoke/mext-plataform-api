import User from "App/Models/User";
import { userSerializer } from "App/Serializer/UserSerializer";

export default class UsersServices {
  constructor() {}
  public async fetchUsersService() {
    const users = await User.query();

    return users;
  }
  public async updateUserService({
    userId,
    userName,
    userEmail,
  }: {
    userId: string;
    userName: string;
    userEmail: string;
  }) {
    const user = await User.findOrFail(userId);
    const updatedChapter = await user
      .merge({ ...{ name: userName, email: userEmail } })
      .save();
    const serialized = updatedChapter.serialize(userSerializer);
    return serialized;
  }
}
