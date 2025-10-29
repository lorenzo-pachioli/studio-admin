import { JWTPayload } from "jose";

export interface SessionPayload extends JWTPayload {
  uid: string
  expiresAt: Date;
}
export interface IverifySessionPayload {
  isAuth: boolean;
  cookie?: string;
}