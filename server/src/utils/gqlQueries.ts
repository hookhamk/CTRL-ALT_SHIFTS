import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    events {
      id
      title
      start
      end
    }
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $start: String!, $end: String!) {
    addEvent(title: $title, start: $start, end: $end) {
      id
      title
      start
      end
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
