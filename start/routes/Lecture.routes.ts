import Route from "@ioc:Adonis/Core/Route";

export default function lectureRoutes() {
  Route.group(() => {
    Route.get("/", "LecturesController.fetchLectuers");
    Route.get(
      "/by-chapter/:chapterId",
      "LecturesController.fetchChapterLectuers"
    );
    Route.get("/:id", "LecturesController.getLectuer");
  })
    .prefix("/lectuers")
    .middleware(["auth"]);

  Route.group(() => {
    Route.post("/", "LecturesController.createLecture");
    Route.delete("/:id", "LecturesController.delete");
    Route.put("/:id", "LecturesController.update");
  })
    .prefix("/lectuers")
    .middleware(["auth", "role:admin"]);
}
