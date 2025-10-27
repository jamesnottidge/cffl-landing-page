import { defineType, defineField } from "sanity";

export default defineType({
  name: "match",
  title: "Match",
  type: "document",
  fields: [
    defineField({
      name: "division",
      title: "Division",
      type: "string",
      options: {
        list: ["Men", "Women"],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "matchDay",
      title: "Match Day",
      type: "number",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
    }),
    defineField({
      name: "team1",
      title: "Team 1",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "logo", title: "Logo", type: "image" },
      ],
    }),
    defineField({
      name: "team2",
      title: "Team 2",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "logo", title: "Logo", type: "image" },
      ],
    }),
  ],
});
