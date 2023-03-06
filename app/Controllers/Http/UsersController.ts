import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";
import UsersServices from "App/Services/UserServices";

@inject()
export default class UsersController {
  constructor(private usersServices: UsersServices) {}

  public async fetchUsersList({ response }: HttpContextContract) {
    try {
      const usersList = await this.usersServices.fetchUsersService();
      return createdResponse(response, usersList);
    } catch (error) {
      console.log("add question error", error);
      return serverErrorResponse(response);
    }
  }
}
