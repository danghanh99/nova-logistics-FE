import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className: string;
}

const Table = (props: IProps) => {
  return (
    <div className="table-responsive">
      <table className={props.className}>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default Table;
