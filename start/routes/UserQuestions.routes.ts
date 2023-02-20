import Route from "@ioc:Adonis/Core/Route";

export default function userQuestionsRoutes() {
  Route.group(() => {
    Route.post("/", "UserQuestionsController.answerQuestion");
  })
    .prefix("/user-questions")
    .middleware(["auth"]);
}
