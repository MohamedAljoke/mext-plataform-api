import Route from "@ioc:Adonis/Core/Route";

export default function subjectRoutes() {
  Route.group(() => {
    Route.get("/", "SubjectsController.fetchSubjects");
    Route.get("/:id", "SubjectsController.getSubject");
    Route.post("/", "SubjectsController.create");
    Route.patch("/:id", "SubjectsController.update");
    Route.delete("/:id", "SubjectsController.delete");
  }).prefix("/subjects");
}
