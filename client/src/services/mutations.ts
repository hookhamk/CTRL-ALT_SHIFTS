import { gql } from '@apollo/client';
export const ADD_JOB = gql`
  mutation AddJob($title: String!, $description: String!, $company_id: Int!) {
    addJob(title: $title, description: $description, company_id: $company_id) {
      _id
      title
      description
      company_id
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $title: String, $description: String, $company_id: Int) {
    updateJob(id: $id, title: $title, description: $description, company_id: $company_id) {
      _id
      title
      description
      company_id
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;


// Authentication
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
        email
        first_name
        last_name
        job
        company_id
        access_level
      }
    }
  }
`;

// Employee mutations
export const ADD_EMPLOYEE = gql`
  mutation addEmployee($email: String!, $password: String!, $first_name: String!, $last_name: String!, $job: String!, $company_id: Int!, $access_level: Boolean!) {
    addEmployee(email: $email, password: $password, first_name: $first_name, last_name: $last_name, job: $job, company_id: $company_id, access_level: $access_level) {
      _id
      email
      first_name
      last_name
      job
      company_id
      access_level
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $email: String
    $first_name: String
    $last_name: String
    $job: String
    $company_id: Int
    $access_level: Boolean
  ) {
    updateEmployee(
      id: $id
      email: $email
      first_name: $first_name
      last_name: $last_name
      job: $job
      company_id: $company_id
      access_level: $access_level
    ) {
      _id
      email
      first_name
      last_name
      job
      company_id
      access_level
    }
  }
`;

// Employer mutations
export const ADD_EMPLOYER = gql`
  mutation AddEmployer($business_name: String!, $company_id: Int!) {
    addEmployer(business_name: $business_name, company_id: $company_id) {
      _id
      business_name
      company_id
    }
  }
`;

export const UPDATE_EMPLOYER = gql`
  mutation UpdateEmployer($id: ID!, $business_name: String, $company_id: Int) {
    updateEmployer(id: $id, business_name: $business_name, company_id: $company_id) {
      _id
      business_name
      company_id
    }
  }
`;

// Schedule mutations
export const ADD_SCHEDULE = gql`
  mutation AddSchedule(
    $job_id: Int!
    $job_title: String!
    $employee_id: Int!
    $employee_name: String!
    $date: String!
    $start_time: String!
    $end_time: String!
  ) {
    addSchedule(
      job_id: $job_id
      job_title: $job_title
      employee_id: $employee_id
      employee_name: $employee_name
      date: $date
      start_time: $start_time
      end_time: $end_time
    ) {
      _id
      job_id
      job_title
      employee_id
      employee_name
      date
      start_time
      end_time
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $id: ID!
    $job_id: Int
    $job_title: String
    $employee_id: Int
    $employee_name: String
    $date: String
    $start_time: String
    $end_time: String
  ) {
    updateSchedule(
      id: $id
      job_id: $job_id
      job_title: $job_title
      employee_id: $employee_id
      employee_name: $employee_name
      date: $date
      start_time: $start_time
      end_time: $end_time
    ) {
      _id
      job_id
      job_title
      employee_id
      employee_name
      date
      start_time
      end_time
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id)
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const DELETE_EMPLOYER = gql`
  mutation DeleteEmployer($id: ID!) {
    deleteEmployer(id: $id)
  }
`;