import { CIcon } from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { Redirect } from 'react-router-dom';
interface IProps {
  modelName: string;
  children: React.ReactNode;
  headers: JSX.Element;
  pagination: JSX.Element;
  select: JSX.Element;
  search: JSX.Element;
}

const Table = (props: IProps) => {
  const { modelName, children, headers, pagination, select, search } = props;
  const handleClickNewIteam = () => {
    return <Redirect to="/imports/new" />;
  };
  return (
    <>
      <div className="row mb-4">
        <div className="col-4">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <CIcon content={freeSet.cilSearch}></CIcon>
              </div>
              {search}
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label className="d-inline-block mr-3 ml-2">Items per page</label>
            {select}
          </div>
        </div>
        <div className="col-4 text-right">
          <button
            onClick={() => handleClickNewIteam()}
            type="button"
            className="btn btn-info"
          >
            <CIcon
              content={freeSet.cilPlaylistAdd}
              className="btn-icon mr-2"
            ></CIcon>
            New {modelName}
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>{headers}</thead>
          <tbody>{children}</tbody>
        </table>
        <div className="col-12 pr-0">{pagination}</div>
      </div>
    </>
  );
};
export default Table;
