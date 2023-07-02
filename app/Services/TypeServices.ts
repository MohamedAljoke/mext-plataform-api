import Type from "App/Models/Type";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class TypesServices {
  constructor() {}
  public async fetchTypesService() {
    const cachedTypes = await parseCachedData({
      key: redisKeys.TYPE_LIST,
    });
    if (cachedTypes) {
      return cachedTypes;
    }
    const types = await Type.query();
    await stringifyCacheData({
      data: types,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.TYPE_LIST(),
    });
    return types;
  }
  public async createTypeService(type: Partial<Type>) {
    const addedType = await Type.create(type);
    await removeCache({
      keys: [redisKeys.TYPE_LIST()],
    });
    return addedType;
  }

  public async deleteTypeService(id: number) {
    const data = await Type.query().where({ id }).delete();
    await removeCache({
      keys: [redisKeys.TYPE_LIST()],
    });
    return data;
  }
  public async updateTypeService({
    id,
    typeName,
  }: {
    id: number;
    typeName?: string;
  }) {
    const type = await Type.findOrFail(id);
    if (typeName) {
      type.typeName = typeName; //
    }

    await type.save();
    await removeCache({
      keys: [redisKeys.TYPE_LIST()],
    });
    return type;
  }
}
