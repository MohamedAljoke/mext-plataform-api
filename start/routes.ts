import Route from "@ioc:Adonis/Core/Route";
import subjectRoutes from "./routes/Subjects.routes";
import authRoutes from "./routes/Auth.routes";
import chapterRoutes from "./routes/Chapter.routes";
import lectureRoutes from "./routes/Lecture.routes";
import pdfsRoutes from "./routes/Pdf.routes";

Route.get("/", async () => {
  return { version: "0.1" };
});

Route.group(() => {
  subjectRoutes();
  authRoutes();
  chapterRoutes();
  lectureRoutes();
  pdfsRoutes();
}).prefix("/api/v1");
