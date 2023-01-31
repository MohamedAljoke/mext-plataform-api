import Route from "@ioc:Adonis/Core/Route";
import subjectRoutes from "./routes/Subjects.routes";
import authRoutes from "./routes/Auth.routes";
import chapterRoutes from "./routes/Chapter.routes";

Route.get("/", async () => {
  return { version: "0.1" };
});

Route.group(() => {
  subjectRoutes();
  authRoutes();
  chapterRoutes();
}).prefix("/api/v1");
