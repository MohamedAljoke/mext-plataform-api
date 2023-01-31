import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SubjectsController {
  public create({ response }: HttpContextContract) {
    return response.send("yes");
  }
}
