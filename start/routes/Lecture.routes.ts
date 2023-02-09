import Route from "@ioc:Adonis/Core/Route";

export default function lectureRoutes() {
  Route.group(() => {
    Route.post("/", "LecturesController.createLecture");
    Route.get("/", "LecturesController.fetchLectuers");
  })
    .prefix("/lectuers")
    .middleware(["auth", "role:admin"]);
}
