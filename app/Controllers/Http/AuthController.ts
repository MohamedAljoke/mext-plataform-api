import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthServices from "App/Services/AuthServices";
import {
  CreateUserValidator,
  LoginUserValidator,
} from "App/Validators/AuthValidator";
import {
  confictResponse,
  createdResponse,
  serverErrorResponse,
  successResponse,
} from "App/utils/http-response";

type TokenResponseType = {
  type: string;
  token: string;
  expires_at?: string;
  expires_in?: number;
};

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
      if (e.code === "ER_DUP_ENTRY") {
        return confictResponse(response, "user already exists");
      } else if (e.code.includes("E_DUPLICATED")) {
        return confictResponse(response, e.message);
      }
      return serverErrorResponse(response);
    }
  }
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator);
    try {
      const token: TokenResponseType = await this.authService.login(
        { email, password },
        auth
      );
      return successResponse<TokenResponseType>(response, token);
    } catch (e) {
      console.error(e);
      if (e.code.includes("E_INVALID_AUTH")) {
        response.unauthorized({ error: "Email e/ou senha inválidos." });
      } else {
        return serverErrorResponse(response);
      }
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout();
    return successResponse(response, { success: true });
  }
}
