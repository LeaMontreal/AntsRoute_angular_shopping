export class Product {
  public id: string = '1';
  public sku: string = '';
  public name: string = 'product';
  public description: string = 'unknown';
  public unitPrice: number = 99;
  public imageUrl: string = 'unknown';
  public active: boolean = true;
  public unitsInStock: number = 0;
  public dateCreated: Date = new Date();
  public lastUpdate: Date = new Date();

  constructor() {}
}
