type productRequiredFields = "name" | "quantity";

interface IProduct {
  name: string;
  quantity: string;
}

type listRequiredFields = "listName" | "data";

interface IList {
  id: string;
  listName: string;
  data: IProduct[];
}

export { IProduct, IList, productRequiredFields, listRequiredFields };
