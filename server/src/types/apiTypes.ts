import { Event } from "./eventTypes";

export interface GetEventsResponse {
  events: Event[];
}

export interface AddEventResponse {
  addEvent: Event;
}

export interface DeleteEventResponse {
  deleteEvent: string;
}
