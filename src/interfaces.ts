type productRequiredFields = "name" | "quantity";

interface IProduct {
  name: string;
  quantity: string;
}

type listRequiredFields = "listName" | "data";

interface IList {
  id: number;
  listName: string;
  data: IProduct[];
}

interface IProductUpdate {
  name?: string;
  quantity?: string;
}

export {
  IProductUpdate,
  IProduct,
  IList,
  productRequiredFields,
  listRequiredFields,
};
