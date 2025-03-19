import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Job {
    _id: ID!
    job_title: String!
    company_id: Int!
  }

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
    business_name: String!
    company_id: Int!
    employees: [Employee!]!
  }

  type Schedule {
    _id: ID!
    job_id: Int!
    job_title: String!
    employee_id: ID!
    employee_name: String!
    date: String!
    start_time: String!
    end_time: String!
  }

  type Auth {
    token: String!
    employee: Employee
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
    employers: [Employer]
    employer(id: ID!): Employer
    schedules(employee_id: ID): [Schedule]
    schedule(id: ID!): Schedule
    employeeSchedules(employee_id: ID): [Schedule]
    me: Employee
  }

  type Mutation {
    login(email: String!, password: String!): Auth

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
      business_name: String!
      company_id: Int!
    ): Employer

    addSchedule(
      job_id: Int!
      job_title: String!
      employee_id: ID! 
      employee_name: String!
      date: String!
      start_time: String!
      end_time: String!
    ): Schedule

    addJob(
      job_title: String!
      company_id: Int!
    ): Job

    updateJob(
      id: ID!
      job_title: String
      company_id: Int
    ): Job

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
      business_name: String
      company_id: Int
    ): Employer

    updateSchedule(
      id: ID!
      job_id: Int
      job_title: String
      employee_id: ID
      employee_name: String
      date: String
      start_time: String
      end_time: String
    ): Schedule

    deleteEmployee(id: ID!): Boolean
    deleteEmployer(id: ID!): Boolean
    deleteSchedule(id: ID!): Boolean
    deleteJob(id: ID!): Boolean
  }
`;

export { typeDefs };

