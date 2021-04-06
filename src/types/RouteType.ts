export interface IRoute {
  path: string;
  name: string;
  exact: boolean | undefined;
  component: () => JSX.Element;
}
