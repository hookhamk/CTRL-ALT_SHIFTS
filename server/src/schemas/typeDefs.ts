import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    job: String!
    company_id: Int!
    access_level: Boolean!
    employer: Employer
  }

  type Employer {
    id: ID!
    first_name: String!
    last_name: String!
    business_name: String!
    admin_id: Int!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
    employers: [Employer]
    employer(id: ID!): Employer
  }

  type Mutation {
    addEmployee(
      email: String!,
      first_name: String!,
      last_name: String!,
      job: String!,
      company_id: Int!,
      access_level: Boolean!,
      password: String!
    ): Employee

    addEmployer(
      first_name: String!,
      last_name: String!,
      business_name: String!,
      admin_id: Int!
    ): Employer

    updateEmployee(
      id: ID!,
      email: String,
      first_name: String,
      last_name: String,
      job: String,
      company_id: Int,
      access_level: Boolean,
      password: String
    ): Employee

    updateEmployer(
      id: ID!,
      first_name: String,
      last_name: String,
      business_name: String,
      admin_id: Int
    ): Employer
  }
`;