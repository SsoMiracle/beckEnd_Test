import http from "http";
// import { handleRequest } from "../app";

export function createServer(requestHandler) {
  return http.createServer(requestHandler);
}
