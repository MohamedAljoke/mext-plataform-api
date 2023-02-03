import Route from "@ioc:Adonis/Core/Route";

export default function pdfsRoutes() {
  Route.group(() => {
    Route.post("/", "PdfsController.registerPdf");
    Route.put("/:id", "PdfsController.update");
    Route.delete("/:id", "PdfsController.delete");
  })
    .prefix("/pdfs")
    .middleware(["auth", "role:admin"]);
}
