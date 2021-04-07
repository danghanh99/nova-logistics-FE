import React from 'react';
import './Pagination.scss';

const Pagination = (): JSX.Element => {
  return (
    <React.Fragment>
      <ul className="page">
        <li className="page__btn">
          <span className="material-icons">&laquo;</span>
        </li>
        <li className="page__numbers"> 1</li>
        <li className="page__numbers active">2</li>
        <li className="page__numbers">3</li>
        <li className="page__numbers">4</li>
        <li className="page__numbers">5</li>
        <li className="page__numbers">6</li>
        <li className="page__dots">...</li>
        <li className="page__numbers"> 10</li>
        <li className="page__btn">
          <span className="material-icons">&raquo;</span>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Pagination;
