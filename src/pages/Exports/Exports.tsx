import Export from '../../models/Export';
import { plainToClass } from 'class-transformer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ExportsService from '../../services/ExportsService';
import { getExports } from './ExportsSlice';
export interface IState {
  exports: Export[];
}

const Exports = (): JSX.Element => {
  const listExports = plainToClass(
    Export,
    useSelector((state: IState) => state.exports)
  );

  const nameCol = [
    'Product',
    'Customer',
    'Quantity ',
    'Price',
    'Export Date',
    'Description',
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    ExportsService.getExports()
      .then((res) => {
        dispatch(getExports(res.data));
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <>
      {/* <Table
        headers={headers()}
        modelName="Export"
        children={children()}
        pagination={pagination()}
      ></Table> */}
    </>
  );
};

export default Exports;
