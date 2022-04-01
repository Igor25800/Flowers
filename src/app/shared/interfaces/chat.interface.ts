export interface IChat {
  id: number;
  messages: Array<IMessages>;
  user: {id: number}
}

export interface IMessages {
  id: number;
  message: string;
  sender: {id: number}
}
