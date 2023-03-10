import { Task, Project } from "../models/index.js";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const resolvers = {
  Query: {
    books: () => books,
    projects: async () => await Project.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_, { _id }) => await Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      // throw new Error("Se cayo la base de datos");
      const project = new Project({
        name,
        description,
      });
      console.log(name, description, project);
      console.log("-" * 30);
      const savedProject = await project.save();
      console.log("savedProject", savedProject);
      return savedProject;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");

      // delete tasks (huerfanas)
      await Task.deleteMany({ projectId: deletedProject._id });

      return deletedProject;
    },
    updateProject: async (_, args) => {
      const updateProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updateProject) throw new Error("Project not found");
      return updateProject;
    },
    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");

      const newTask = new Task({
        title,
        projectId,
      });

      const task = await newTask.save();
      return task;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true, // return new object updated
      });
      if (!updatedTask) throw new Error("Project not found");
      return updatedTask;
    },
  },

  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
  },
  Task: {
    project: async (parent) => await Project.find({ _id: parent.projectId }),
  },
};
