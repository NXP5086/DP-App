export type FlightType = "arrival" | "departure";

export interface Flight {
  id: string;
  type: FlightType;
  airline: string;
  flightNumber: string;
  datetime: string; // ISO
}

export interface Transfer {
  id: string;
  type: string;
  company: string;
  datetime: string;
}