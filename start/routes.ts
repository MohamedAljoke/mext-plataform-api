import Route from "@ioc:Adonis/Core/Route";
import subjectRoutes from "./routes/Subjects.routes";
import authRoutes from "./routes/Auth.routes";
import chapterRoutes from "./routes/Chapter.routes";
import lectureRoutes from "./routes/Lecture.routes";
import pdfsRoutes from "./routes/Pdf.routes";
import videosRoutes from "./routes/Video.routes";
import typesRoutes from "./routes/Types.routes";
import questionRoutes from "./routes/Question.routes";
import userQuestionsRoutes from "./routes/UserQuestions.routes";
import usersRoutes from "./routes/User.routes";

Route.get("/version", async () => {
  return { version: "0.2" };
});

Route.get("/", async ({ response }) => {
  return response.redirect("/docs");
});

Route.group(() => {
  subjectRoutes();
  authRoutes();
  chapterRoutes();
  lectureRoutes();
  pdfsRoutes();
  videosRoutes();
  typesRoutes();
  questionRoutes();
  userQuestionsRoutes();
  usersRoutes();
}).prefix("/api/v1");
