export interface Users {
  uuid: string;
  name: string;
  email: string;
  username: string;
  role: string;
  token?: any;
  createdAt: Date;
  updatedAt: Date;
}
