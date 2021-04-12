import CIcon from '@coreui/icons-react';
import Table from '../../components/Table/Table';
import { freeSet } from '@coreui/icons';
import Import from '../../models/Import';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ImportsService from '../../services/ImportsService';
import { getImports } from './ImportsSlice';
import { plainToClass } from 'class-transformer';
import { BiImport, BiExport } from 'react-icons/bi';

const NewImport = (): JSX.Element => {
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

export default NewImport;
