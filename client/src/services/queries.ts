import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      _id
      title
      description
      company_id
    }
  }
`;

export const GET_JOB = gql`
  query GetJob($id: ID!) {
    job(id: $id) {
      _id
      title
      description
      company_id
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
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

// Employee queries
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
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

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      _id
      email
      first_name
      last_name
      job
      company_id
      access_level
      employer {
        business_name
      }
    }
  }
`;

export const GET_EMPLOYEE_SCHEDULES = gql`
  query GetEmployeeSchedules($employee_id: ID) {
    employeeSchedules(employee_id: $employee_id) {
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

// Employer queries
export const GET_EMPLOYERS = gql`
  query GetEmployers {
    employers {
      _id
      business_name
      company_id
    }
  }
`;

export const GET_EMPLOYER = gql`
  query GetEmployer($id: ID!) {
    employer(id: $id) {
      _id
      business_name
      company_id
      employees {
        _id
        email
        first_name
        last_name
        job
      }
    }
  }
`;

// Schedule queries
export const GET_SCHEDULES = gql`
  query GetSchedules {
    schedules {
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

export const GET_SCHEDULE = gql`
  query GetSchedule($id: ID!) {
    schedule(id: $id) {
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

export const GET_TABLES = gql`
  query GetTables($id: ID!) {
    table(id: $id) {
      id
      title
      description
      fields {
        id
        label
        type
        placeholder
        rows
      }
    }
  }
`;