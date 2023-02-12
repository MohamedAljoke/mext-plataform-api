import Route from "@ioc:Adonis/Core/Route";

export default function authRoutes() {
  Route.group(() => {
    Route.post("/register", "AuthController.register");
    Route.post("/login", "AuthController.login");
    Route.get("/logout", "AuthController.logout");
  }).prefix("/auth");

  Route.group(() => {
    Route.post("/refresh", "AuthController.loginRefresh");
  })
    .prefix("/auth")
    .middleware("auth");
}
