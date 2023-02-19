import Alternative from "App/Models/Alternative";

export default class AlternativasServices {
  constructor() {}
  public async createAlternativeService(alternativa: Partial<Alternative>) {
    const addedAlternative = await Alternative.create(alternativa);

    return addedAlternative;
  }
}
