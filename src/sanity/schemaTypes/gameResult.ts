import { defineField, defineType } from "sanity";

export default defineType({
  name: "gameResult",
  title: "Game Result",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "gameImage",
      title: "Game Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "teams",
      title: "Teams",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Team Name", type: "string" },
            { name: "record", title: "Record", type: "string" },
            { name: "quarters", title: "Quarters", type: "array", of: [{ type: "number" }] },
            { name: "total", title: "Total", type: "number" },
            { name: "isWinner", title: "Is Winner?", type: "boolean" },
            {
              name: "logo",
              title: "Team Logo",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
  ],
});
