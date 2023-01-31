import Route from "@ioc:Adonis/Core/Route";

export default function authRoutes() {
  Route.group(() => {
    Route.get("/", "SubjectController.fetchSubjects");
    Route.get("/:id", "SubjectController.getSubject");
    Route.post("/", "SubjectController.create");
    Route.patch("/:id", "SubjectController.update");
    Route.delete("/:id", "SubjectController.delete");
  }).prefix("/subject");
}
