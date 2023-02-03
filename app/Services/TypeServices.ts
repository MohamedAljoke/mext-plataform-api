import Type from "App/Models/Type";

export default class TypesServices {
  constructor() {}
  public async createTypeService(type: Partial<Type>) {
    const addedType = await Type.create(type);

    return addedType;
  }
}
