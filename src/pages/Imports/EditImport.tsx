import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};

const EditImport = (): JSX.Element => {
  const { id }: Params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {});

  return (
    <div>
      <div className="form-group">
        <label htmlFor="usr">Product:</label>
        <input type="text" className="form-control" id="usr" />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Date:</label>
        <input type="password" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Supplier:</label>
        <input type="password" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Number:</label>
        <input type="password" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Price:</label>
        <input type="password" className="form-control" id="pwd" />
      </div>
      <label htmlFor="comment">Description:</label>
      <textarea
        className="form-control"
        rows={5}
        id="comment"
        defaultValue={''}
      />
    </div>
  );
};

export default EditImport;
