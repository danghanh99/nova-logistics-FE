import React from 'react';
import './Pagination.scss';

const Pagination = (): JSX.Element => {
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link">1</a>
          </li>
          <li className="page-item">
            <a className="page-link">2</a>
          </li>
          <li className="page-item">
            <a className="page-link">3</a>
          </li>
          <li className="page-item">
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Pagination;
