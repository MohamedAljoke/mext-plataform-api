import Route from "@ioc:Adonis/Core/Route";

export default function questionRoutes() {
  Route.group(() => {
    Route.post("/", "QuestionsController.addQuestion");
    Route.delete("/:id", "QuestionsController.delete");
  })
    .prefix("/questions")
    .middleware(["auth", "role:admin"]);
  Route.group(() => {
    Route.get("/", "QuestionsController.fetchAllQuestions");
    Route.get("/:id", "QuestionsController.getQuestion");
  })
    .prefix("/questions")
    .middleware(["auth"]);
}
