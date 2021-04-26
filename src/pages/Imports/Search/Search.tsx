type Props = {
  onsearch: (value: string) => void;
};

const Search = (props: Props) => {
  const onchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onsearch(e.target.value);
  };

  return (
    <>
      <input
        type="search"
        className="form-control sticky-top"
        placeholder="Search a name"
        onChange={onchangeSearch}
      />
    </>
  );
};

export default Search;
