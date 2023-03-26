import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

export const lectureSerializer: CherryPick = {
  fields: {
    pick: ["id", "lecture_name", "created_at", "updated_at"],
  },
};
