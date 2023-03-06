import Route from "@ioc:Adonis/Core/Route";

export default function videosRoutes() {
  Route.group(() => {
    Route.get("/", "VideosController.fetchVideosList");
    Route.post("/", "VideosController.registerVideo");
    Route.put("/:id", "VideosController.update");
    Route.delete("/:id", "VideosController.delete");
  })
    .prefix("/videos")
    .middleware(["auth", "role:admin"]);
}
