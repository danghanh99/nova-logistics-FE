import CIcon from '@coreui/icons-react';
import { cilSearch } from '../../../../assets/icons';
import SearchUI from '../../UI/Search';
import Input from '../../UI/Input';
import React from 'react';

interface IProps {
  onSearch: (value: string) => void;
}

const Search = (props: IProps) => {
  const onchangeSearch = (even: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(even.target.value);
  };
  return (
    <SearchUI className="col-4">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <CIcon content={cilSearch}></CIcon>
          </div>
          <Input
            type="search"
            className="form-control sticky-top"
            placeholder="Search a name"
            onChange={onchangeSearch}
          />
        </div>
      </div>
    </SearchUI>
  );
};

export default Search;
