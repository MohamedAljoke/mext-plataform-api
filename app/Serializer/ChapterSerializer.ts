import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

export const chapterSerializer: CherryPick = {
  fields: {
    pick: ["id", "chapter_name", "created_at", "updated_at"],
  },
};
