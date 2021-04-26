import React from 'react';

type Props = {
  handleChange: (value: string) => void;
  perPage: number;
};

const Select = (props: Props) => {
  const { perPage } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.handleChange(e.target.value);
  };
  return (
    <>
      <select
        className="form-control d-inline-block width-auto"
        id="perpage"
        onChange={handleChange}
        value={perPage}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="-1">All</option>
        <option></option>
      </select>
    </>
  );
};

export default Select;
