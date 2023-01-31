import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthServices from "App/Services/AuthServices";
import { CreateUserValidator } from "App/Validators/AuthValidator";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
} from "App/utils/http-response";

@inject()
export default class AuthController {
  constructor(private authService: AuthServices) {}
  public async register({ request, response }: HttpContextContract) {
    const { email, name, password } = await request.validate(
      CreateUserValidator
    );
    try {
      const user = await this.authService.createUserService({
        email,
        name,
        password,
      });
      return createdResponse<User>(response, user);
    } catch (e) {
      console.log("create user error", e);
      return serverErrorResponse(response);
    }
  }
  public async login({}: HttpContextContract) {}

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout();
    return successResponse(response, { success: true });
  }
}
