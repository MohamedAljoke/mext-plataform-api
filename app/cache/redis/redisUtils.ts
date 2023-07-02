import { RedisKeys } from "./redisConstants";
import Redis from "@ioc:Adonis/Addons/Redis";

export interface IParseCachedData {
  key: RedisKeys[keyof RedisKeys];
  id?: string;
}
export interface IStringifyCacheData {
  key: string;
  data: any;
  timmer: number;
}
export const parseCachedData = async ({ key, id }: IParseCachedData) => {
  const cachedStringValue = await Redis.get(key(id || ""));
  if (!cachedStringValue) {
    return null;
  }
  const parsedData = JSON.parse(cachedStringValue);
  const isArray = Array.isArray(parsedData);
  if (isArray) {
    const parsedListItems = parsedData.map((stringsItem) => {
      return JSON.parse(stringsItem);
    });
    return parsedListItems;
  } else {
    return parsedData;
  }
};
export const stringifyCacheData = async ({
  key,
  data,
  timmer,
}: IStringifyCacheData) => {
  const stringifyedData = Array.isArray(data)
    ? JSON.stringify(data.map((item) => JSON.stringify(item)))
    : JSON.stringify(data);
  await Redis.set(key, stringifyedData, "EX", timmer);
};
export const removeCache = async ({ keys }: { keys: string[] }) => {
  try {
    await Redis.del(keys);
  } catch (e) {}
};
