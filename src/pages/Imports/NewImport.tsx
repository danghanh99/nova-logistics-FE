const NewImport = (): JSX.Element => {
  return (
    <div>
      <div className="form-group">
        <label>Product:</label>
        <input type="text" className="form-control" id="usr" />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label>Supplier:</label>
        <input type="text" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label>Number:</label>
        <input type="number" min="0" className="form-control" id="pwd" />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" min="0" className="form-control" id="pwd" />
      </div>
      <label>Description:</label>
      <textarea
        className="form-control"
        rows={5}
        id="comment"
        defaultValue={''}
      />
      <div style={{ textAlign: 'center' }}>
        <button className="btn-success">Submit</button>
        <button className="btn-danger">Cancel</button>
      </div>
    </div>
  );
};

export default NewImport;
