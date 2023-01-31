import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

export const subjectSerializer: CherryPick = {
  fields: {
    pick: ["id", "subject_name", "created_at", "updated_at"],
  },
};
