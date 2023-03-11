import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  createdResponse,
  serverErrorResponse,
  updatedResponse,
} from "App/utils/http-response";
import UsersServices from "App/Services/UserServices";
import UpdateUserValidator from "App/Validators/UserValidator";

@inject()
export default class UsersController {
  constructor(private usersServices: UsersServices) {}

  public async fetchUsersList({ response }: HttpContextContract) {
    try {
      const usersList = await this.usersServices.fetchUsersService();
      return createdResponse(response, usersList);
    } catch (error) {
      console.log("fetch users error", error);
      return serverErrorResponse(response);
    }
  }
  public async updateUser({ response, request }: HttpContextContract) {
    const { userId } = request.params();
    const { userEmail, userName } = await request.validate(UpdateUserValidator);
    try {
      const usersList = await this.usersServices.updateUserService({
        userId,
        userEmail: userEmail,
        userName: userName,
      });
      return updatedResponse(response, usersList);
    } catch (error) {
      console.log("update user error", error);
      return serverErrorResponse(response);
    }
  }
}
