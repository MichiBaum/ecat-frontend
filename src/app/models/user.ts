import {Permission} from "./permission";

export class User {
  id: number;
  name: string;
  password: string;
  permissions: Permission[];

  constructor(id: number = 0,
              name: string = '',
              password: string = '',
              permissions: Permission[] = [])
  {
    this.id = id;
    this.name = name;
    this.password = password;
    this.permissions = permissions;
  }


}
