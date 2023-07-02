import User from "App/Models/User";
import { userSerializer } from "App/Serializer/UserSerializer";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class UsersServices {
  constructor() {}
  public async fetchUsersService() {
    const cachedUsers = await parseCachedData({
      key: redisKeys.USERS_LIST,
    });
    if (cachedUsers) {
      return cachedUsers;
    }
    const users = await User.query();
    await stringifyCacheData({
      data: users,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.USERS_LIST,
    });
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
    await removeCache({
      keys: [redisKeys.USERS_LIST()],
    });
    const serialized = updatedChapter.serialize(userSerializer);
    return serialized;
  }
}
