import Route from "@ioc:Adonis/Core/Route";

export default function typesRoutes() {
  Route.group(() => {
    Route.post("/", "TypesController.createType");
    Route.delete("/:id", "TypesController.delete");
    Route.put("/:id", "TypesController.update");
  })
    .prefix("/types")
    .middleware(["auth", "role:admin"]);
  Route.group(() => {
    Route.get("/", "TypesController.fetchAllTypesList");
  })
    .prefix("/types")
    .middleware(["auth"]);
}
