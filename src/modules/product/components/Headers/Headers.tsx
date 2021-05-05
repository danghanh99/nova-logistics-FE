const Headers = () => {
  const nameCol = ['Name', 'Quantity', 'Available ', 'Description'];
  return (
    <>
      <th className="width-50  text-right ">ID</th>
      {nameCol.map((value, index) => {
        return (
          <th key={index} className="text-center" scope="col">
            {value}
          </th>
        );
      })}
      <th className="width-200">Action</th>
    </>
  );
};

export default Headers;
