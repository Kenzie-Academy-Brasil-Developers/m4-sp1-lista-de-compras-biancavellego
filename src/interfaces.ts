export interface IProduct {
  name: string;
  price: number;
  quantity: string;
}

export interface IList {
  id: string;
  listName: string;
  listArray: IProduct[];
}
