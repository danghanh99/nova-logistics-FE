import { ChangeEventHandler, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: number;
  id?: string;
}

const SelectUI = (props: IProps): JSX.Element => {
  return (
    <div className="col-4">
      <div className="form-group">
        <label className="d-inline-block mr-3 ml-2">Items per page</label>
        <select
          className={props.className}
          onChange={props.onChange}
          value={props.value}
        >
          {props.children}
        </select>
      </div>
    </div>
  );
};

export default SelectUI;
