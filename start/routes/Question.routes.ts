import Route from "@ioc:Adonis/Core/Route";

export default function questionRoutes() {
  Route.group(() => {
    Route.post("/", "QuestionsController.addQuestion");
  })
    .prefix("/questions")
    .middleware(["auth", "role:admin"]);
}
