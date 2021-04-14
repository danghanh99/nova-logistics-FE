import IMeta from '../../types/MetaType';
import './Pagination.scss';

type Props = {
  meta: IMeta;
  hanleOnclick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Pagination = (props: Props): JSX.Element => {
  const { meta, hanleOnclick } = props;
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            onClick={hanleOnclick}
            className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}
          >
            <div className="page-link">Prev</div>
          </li>
          {meta.current_page !== 1 ? (
            <li className="page-item" onClick={hanleOnclick}>
              <div className="page-link">{meta.current_page - 1}</div>
            </li>
          ) : null}

          <li className="page-item active">
            <div className="page-link">{meta.current_page}</div>
          </li>
          {meta.current_page === meta.total_pages ? null : (
            <li className="page-item">
              <div className="page-link" onClick={hanleOnclick}>
                {meta.current_page + 1}
              </div>
            </li>
          )}

          <li
            className={`page-item ${
              meta.current_page === meta.total_pages ? 'disabled' : ''
            }`}
            onClick={hanleOnclick}
          >
            <div className="page-link">Next</div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
