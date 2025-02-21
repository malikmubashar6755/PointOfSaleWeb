export interface Customer{
    
    CustomerId: number;
    CustomerName: string;
    PhoneNumber: string;
    CustomerEmail?: string;
    CustomerAddress?: string;
    IsActive: boolean;
    Created_dte?: Date;
    Created_by?: string;
    UpdatedDate?: Date;
    UpdatedBy?: string;
}