import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Employee {
    _id: ID!
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    job: String!
    company_id: Int!
    access_level: Boolean!
    employer: Employer
  }

  type Employer {
    _id: ID!
    first_name: String!
    last_name: String!
    business_name: String!
    admin_id: Int!
    employees: [Employee]
  }

  type Schedule {
    _id: ID!
    job_id: Int!
    job_title: String!
    employee_id: Int!
    employee_name: String!
    date: String!
    start_time: String!
    end_time: String!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
    employers: [Employer]
    employer(id: ID!): Employer
    schedules: [Schedule]
    schedule(id: ID!): Schedule
  }

  type Mutation {
    addEmployee(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      job: String!
      company_id: Int!
      access_level: Boolean!
    ): Employee

    addEmployer(
      first_name: String!
      last_name: String!
      business_name: String!
      admin_id: Int!
    ): Employer

    addSchedule(
      job_id: Int!
      job_title: String!
      employee_id: Int!
      employee_name: String!
      date: String!
      start_time: String!
      end_time: String!
    ): Schedule

    updateEmployee(
      id: ID!
      email: String
      first_name: String
      last_name: String
      job: String
      company_id: Int
      access_level: Boolean
    ): Employee

    updateEmployer(
      id: ID!
      first_name: String
      last_name: String
      business_name: String
      admin_id: Int
    ): Employer

    updateSchedule(
      id: ID!
      job_id: Int
      job_title: String
      employee_id: Int
      employee_name: String
      date: String
      start_time: String
      end_time: String
    ): Schedule

    deleteEmployee(id: ID!): Boolean
    deleteEmployer(id: ID!): Boolean
    deleteSchedule(id: ID!): Boolean
  }
`;

export { typeDefs };
