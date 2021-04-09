export interface IRoute {
  path: string;
  name: string;
  exact?: boolean;
  component: () => JSX.Element;
}
