import { CherryPick } from "@ioc:Adonis/Lucid/Orm";

export const userSerializer: CherryPick = {
  fields: {
    pick: ["name", "email", "id"],
  },
};
