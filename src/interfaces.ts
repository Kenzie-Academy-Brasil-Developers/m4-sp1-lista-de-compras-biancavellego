export interface IProduct {
  name: string;
  price: number;
  quantity: string;
}

export interface IList {
  listName: string;
  list: IProduct[];
}
