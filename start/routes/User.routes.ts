import Route from "@ioc:Adonis/Core/Route";

export default function usersRoutes() {
  Route.group(() => {
    Route.get("/", "UsersController.fetchUsersList");
    Route.put("/:userId", "UsersController.updateUser");
  }).prefix("/users");
}
