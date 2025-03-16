import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employer {
    id: ID!
    first_name: String!
    last_name: String!
    business_name: String!
    admin_id: Int!
    employees: [Employee!]  # List of employees associated with the employer
  }

  type Employee {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    job: String!
    company_id: Int!
    access_level: Boolean!
    employer: Employer  # Linking to the employer
  }

  type Query {
    employers: [Employer]
    employer(id: ID!): Employer
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployer(
      first_name: String!,
      last_name: String!,
      business_name: String!,
      admin_id: Int!
    ): Employer
    addEmployee(
      email: String!,
      first_name: String!,
      last_name: String!,
      job: String!,
      company_id: Int!,
      access_level: Boolean!,
      password: String!
    ): Employee
  }
`;