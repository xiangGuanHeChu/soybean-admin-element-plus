import { adminRequest } from '../request';

export function getProductCategroyApi(params?: Product.ProductSearchParams) {
  return adminRequest<Product.CategoryData>({
    url: '/product/category',
    method: 'get',
    params
  });
}
