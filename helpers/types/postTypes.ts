export interface single_admin_post_schema {
  post: {
    id: number;
    title: string;
    des: string;
  };
}

export interface admin_post_schema {
  post: {
    id: number;
    title: string;
    des: string;
  }[];
}
