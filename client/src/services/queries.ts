import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      access
    }
  }
`;

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
employee(id: ID!) {
  employee(id: $id) {
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

export const GET_EMPLOYERS = gql`
query GetEmployers {
  employer {
  _id
  business_name
  company_id
  employees {
    _id
    first_name
    last_name
    }
  }
}
`;

export const GET_EMPLOYER = gql `
query GetEmployer($id: ID!) {
  employer(id: $id) {
  _id
  business_name
  company_id
  employees {
    _id
    first_name
    last_name
    }
  }
}
`;

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

