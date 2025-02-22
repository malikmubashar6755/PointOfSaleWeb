import { Routes } from '@angular/router';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { SaleComponent } from './content/sale/sale.component';
import { ProductComponent } from './content/product/product.component';
import { CustomerComponent } from './content/customer/customer.component';
import { CategoriesComponent } from './content/categories/categories.component';
import { ProductCreateComponent } from './content/product-create/product-create.component';
import { CategoryCreateComponent } from './content/category-create/category-create.component';
import { CustomerCreateComponent } from './content/customer-create/customer-create.component';
import { SupplierComponent } from './content/supplier/supplier.component';
import { InventoryComponent } from './content/inventory/inventory.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sales', component: SaleComponent },
    { path: 'suppliers', component: SupplierComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'products', component: ProductComponent },
    { path: 'customers', component: CustomerComponent },
    {path : 'categories', component: CategoriesComponent},
    { path: 'create-new-product', component: ProductCreateComponent },
    { path: 'products/edit/:Id', component: ProductCreateComponent },
    { path: 'create-new-category', component: CategoryCreateComponent },
    { path: 'create-new-customer', component: CustomerCreateComponent },
    { path: 'customers/edit/:Id', component: CustomerCreateComponent },
    { path: 'categoryy/edit/:Id', component: CategoryCreateComponent }
];
