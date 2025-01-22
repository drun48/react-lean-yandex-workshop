export enum Status {
  created = "created",
  pending = "pending",
  done = "done",
}

export enum StatusRussia {
  created = "Создано",
  pending = "Готовится",
  done = "Выполнен",
}

export type Order = {
  ingredients: string[];
  id: string;
  status: Status;
  number: number;
  createdAt: string;
  name: string;
};
