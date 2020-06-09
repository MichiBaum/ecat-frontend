import {Permission} from "./permission";

export interface User {
  id: number;
  name: string;
  password: string;
  permissions: Permission[];
}
