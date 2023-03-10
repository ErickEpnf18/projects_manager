import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project', // as fk
      required: true
  },
}, {
    timestamps: true
});

export default model("Task", TaskSchema);
