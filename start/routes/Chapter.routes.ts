import Route from "@ioc:Adonis/Core/Route";
export default function chapterRoutes() {
  Route.group(() => {
    Route.get("/", "ChaptersController.fetchAllChapters");
    Route.get("/by-subject/:subjectId", "ChaptersController.fetchChapters");
    Route.get("/:id", "ChaptersController.getChapter");
  })
    .prefix("/chapters")
    .middleware(["auth"]);

  Route.group(() => {
    Route.post("/", "ChaptersController.create");
    Route.put("/:id", "ChaptersController.update");
    Route.delete("/:id", "ChaptersController.delete");
  })
    .prefix("/chapters")
    .middleware(["auth", "role:admin"]);
}
