import Route from "@ioc:Adonis/Core/Route";

export default function authRoutes() {
  Route.group(() => {
    Route.post("/register", "AuthController.register");
    Route.post("/login", "AuthController.login");
  }).prefix("/auth");
}
