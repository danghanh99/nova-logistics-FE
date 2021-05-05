import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className: string;
}

const Search = (props: IProps): JSX.Element => {
  return <div className={props.className}>{props.children}</div>;
};

export default Search;
