import Route from "@ioc:Adonis/Core/Route";

export default function usersRoutes() {
  Route.group(() => {
    Route.get("/", "UsersController.fetchUsersList");
  })
    .prefix("/users")
    .middleware(["auth", "role:admin"]);
}
