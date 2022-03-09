declare type AuthFrom = {
  username: string;
  password: string;
};

declare interface Result<D> {
  status: ResultEnum;
  data: D | null;
  msg: string;
}

declare interface User {
  id: string;
  username: string;
  avatar: string;
  createAt: string;
}

declare interface ListResult<D> {
  total: number;
  records: D[];
}
