export interface Product{
    
    ProductId: number;
    ProductName: string;
    CategoryName?: string;
    CategoryId: number;
    Description: string;
    Price: number;
    Cost_Price: number;
    Stock_Quantity: number;
    Created_dte?: Date;
    Created_by?: string;
    updatedDate?: Date; 
    updatedBy?: string;
}