export type ExampleType = {
  name: string;
};

export type Employee = {
  name: string | null;
  age: number;
};

export type Company = {
  name: string | null;
  address: string | null;
  url: string | null;
  employees: Employee[];
};
