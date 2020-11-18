export type catalogInfo = {
  product_name: string;
  mass_g: number;
  product_id:number
} 

export type requestType = {
  body:catalogInfo[]
}