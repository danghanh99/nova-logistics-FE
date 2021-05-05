import { IRoute } from './types/RouteType';
import Suppliers from './modules/supplier/pages/suppliers/Suppliers';
import Customers from './modules/customer/pages/customers/Customers';
import NewCustomer from './modules/customer/pages/customers/NewCustomer';
import EditCustomer from './modules/customer/pages/customers/EditCustomer';
import EditSupplier from './modules/supplier/pages/suppliers/EditSupplier';
import NewSupplier from './modules/supplier/pages/suppliers/NewSupplier';
import NewProduct from './modules/product/pages/products/NewProduct';
import imports from './modules/import/pages/imports/Imports';
import NewImport from './modules/import/pages/imports/NewImport';
import EditImport from './modules/import/pages/imports/EditImport';
import Exports from './modules/export/pages/exports/Exports';
import NewExport from './modules/export/pages/exports/NewExport';
import Products from './modules/product/pages/products/Products';
import EditProduct from './modules/product/pages/products/EditProduct';

const routes: IRoute[] = [
  {
    path: '/admin/imports',
    name: 'Imports',
    component: imports,
    exact: true,
  },
  {
    path: '/admin/exports',
    name: 'Exports',
    component: Exports,
    exact: true,
  },
  {
    path: '/admin/products',
    name: 'Products',
    component: Products,
    exact: true,
  },
  {
    path: '/admin/suppliers',
    name: 'Suppliers',
    component: Suppliers,
    exact: true,
  },
  {
    path: '/admin/customers',
    name: 'Customers',
    component: Customers,
    exact: true,
  },
  {
    path: '/admin/customers/new',
    name: 'New Customer',
    component: NewCustomer,
    exact: true,
  },
  {
    path: '/admin/imports/new',
    name: 'New Import',
    component: NewImport,
    exact: true,
  },
  {
    path: '/admin/exports/new',
    name: 'New Export',
    component: NewExport,
    exact: true,
  },
  {
    path: '/admin/products/new',
    name: 'New Product',
    component: NewProduct,
    exact: true,
  },
  {
    path: '/admin/imports/edit/:id',
    name: 'Edit Import',
    component: EditImport,
    exact: true,
  },
  {
    path: '/admin/customers/:id',
    name: 'Edit Customer',
    component: EditCustomer,
  },
  {
    path: '/admin/products/edit/:id',
    name: 'Edit Product',
    component: EditProduct,
    exact: true,
  },
  {
    path: '/admin/suppliers/new',
    name: 'New Supplier',
    component: NewSupplier,
    exact: true,
  },
  {
    path: '/admin/suppliers/:id',
    name: 'Edit Supplier',
    component: EditSupplier,
    exact: true,
  },
];

export default routes;
