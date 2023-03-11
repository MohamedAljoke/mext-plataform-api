import Route from "@ioc:Adonis/Core/Route";

export default function usersRoutes() {
  Route.group(() => {
    Route.get("/", "UsersController.fetchUsersList");
    Route.post("/:userId", "UsersController.updateUser");
  })
    .prefix("/users")
    .middleware(["auth", "role:admin"]);
}
