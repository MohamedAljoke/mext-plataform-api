import User from "App/Models/User";

export default class UsersServices {
  constructor() {}
  public async fetchUsersService() {
    const users = await User.query();

    return users;
  }
}
