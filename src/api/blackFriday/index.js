import { main, park } from "@/api/index";

//黑五活动页显示商品
export function showProductListApi(params) {
  return park({
    url: `/apphomepage/queryBlackFriday`,
    method: "POST",
    data: params
  });
}
