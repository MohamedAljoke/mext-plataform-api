import Type from "App/Models/Type";

export default class TypesServices {
  constructor() {}
  public async fetchTypesService() {
    const types = await Type.query();
    return types;
  }
  public async createTypeService(type: Partial<Type>) {
    const addedType = await Type.create(type);
    return addedType;
  }

  public async deleteTypeService(id: number) {
    const data = await Type.query().where({ id }).delete();
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
    return type;
  }
}
