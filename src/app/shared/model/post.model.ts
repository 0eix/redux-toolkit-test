export interface IPost {
  id: string;
  title: string;
  content: string;
}

export const defaultValue: Readonly<IPost> = {
  id: "0",
  title: "",
  content: ""
};
