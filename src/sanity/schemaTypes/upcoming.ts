import { defineField, defineType } from "sanity";

export default defineType({
  name: "upcoming",
  title: "Upcoming Games",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Upcoming Schedule",
    }),
    defineField({
      name: "games",
      title: "Games List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "logo",
              title: "Team Logo",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "date",
              title: "Game Date",
              type: "string",
            },
            {
              name: "week",
              title: "Week Info",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
