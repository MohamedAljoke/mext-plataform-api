import Route from "@ioc:Adonis/Core/Route";

export default function lectureRoutes() {
  Route.group(() => {
    Route.post("/", "LecturesController.createLecture");
  })
    .prefix("/lectures")
    .middleware(["auth", "role:admin"]);
}
