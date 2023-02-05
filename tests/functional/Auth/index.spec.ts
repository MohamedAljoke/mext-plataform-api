import { test } from "@japa/runner";
import Database from "@ioc:Adonis/Lucid/Database";
import { loginData, registerUserData } from "./mock";

import User from "App/Models/User";

test.group("Auth index", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });
  test("Should register user and receives user data", async ({
    client,
    assert,
  }) => {
    const response = await client.post("/api/v1/auth/register").form({
      ...registerUserData,
      password_confirmation: registerUserData.password,
    });
    assert.properties(response.body(), [
      "email",
      "name",
      "created_at",
      "id",
      "updated_at",
    ]);
  });
  test("Should login user successfully and receives token", async ({
    client,
    assert,
  }) => {
    await User.create(registerUserData);
    const response = await client.post("/api/v1/auth/login").form(loginData);
    response.assertStatus(200);
    assert.properties(response.body(), [
      "type",
      "token",
      "expires_at",
      "id",
      "email",
      "name",
    ]);
  });
});
