import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    projects: [Project]
    project(_id: ID!): Project # ! required
    task(_id: ID!): Task

    tasks: [Task]
  }

  type Mutation {
    createProject(name: String, description: String): Project
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    createTask(title: String, projectId: ID): Task
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, title: String!,projectId: ID!): Task

    
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    projectId: ID
    createdAt: String
    updatedAt: String
    project: [Project]
  }
`;
