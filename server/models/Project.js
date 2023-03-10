import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Project", ProjectSchema);
// module.exports = model("Project", { ProjectSchema }); // not working cause' in packajson.json is type: module
