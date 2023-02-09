import Route from "@ioc:Adonis/Core/Route";
// MTk.TBsjj5_2LX48eYT0m37QgzxEpeIO8CYa6716iY7O6LlDbI8Kcu18g5PWfy0b;
export default function chapterRoutes() {
  Route.group(() => {
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
