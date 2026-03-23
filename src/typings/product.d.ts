declare namespace Product {
  interface ProductSearchParams {
    page: number;
    limit?: number;
  }

  interface CategoryItem {
    id: number;
    pid: number;
    type: number;
    relation_id: number;
    cate_name: string;
    path: string;
    level: number;
    pic: string;
    big_pic: string;
    adv_pic: string;
    adv_link: string;
    sort: number;
    is_show: number;
    add_time: string;
    children: CategoryItem[];
    loading: boolean;
    _loading: boolean;
  }

  // 数据接口
  interface CategoryData {
    list: CategoryItem[];
    count: number;
  }
}
