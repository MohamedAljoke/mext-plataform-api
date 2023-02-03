import Route from "@ioc:Adonis/Core/Route";

export default function typesRoutes() {
  Route.group(() => {
    Route.post("/", "TypesController.createType");
  })
    .prefix("/types")
    .middleware(["auth", "role:admin"]);
}
