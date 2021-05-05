import SelectUI from '../../../common/UI/Select';

export interface IProps {
  handleChange: (value: number) => void;
  perPage: number;
}

const Select = (props: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.handleChange(parseInt(e.target.value, undefined));
  };
  return (
    <>
      <SelectUI
        className="form-control d-inline-block width-auto"
        id="perpage"
        onChange={handleChange}
        value={props.perPage}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="-1">All</option>
        <option></option>
      </SelectUI>
    </>
  );
};

export default Select;
