import Route from "@ioc:Adonis/Core/Route";

export default function lectureRoutes() {
  Route.group(() => {
    Route.post("/", "LecturesController.createLecture");
  })
    .prefix("/lectuers")
    .middleware(["auth", "role:admin"]);
  Route.group(() => {
    Route.get("/", "LecturesController.fetchLectuers");
    Route.get("/:id", "LecturesController.getLectuer");
  })
    .prefix("/lectuers")
    .middleware(["auth"]);
}
