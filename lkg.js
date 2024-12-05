// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========  @VuGiaBao ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "bu cac";

var giabao = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-05-26T09:45:00Z",
  purchase_date: "2009-05-26T09:45:00Z",
  store: "app_store"
};

var giabao_subscription = {
  grace_period_expires_date: null,
  purchase_date: "2009-05-26T09:45:00Z",
  product_identifier: "com.giabao.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [entitlement, product] = mapping[match];
  if (product) {
    giabao_subscription.product_identifier = product;
    obj.subscriber.subscriptions[product] = giabao;
  } else {
    obj.subscriber.subscriptions["com.giabao.premium.yearly"] = giabao;
  }
  obj.subscriber.entitlements[entitlement] = giabao_subscription;
} else {
  obj.subscriber.subscriptions["com.giabao.premium.yearly"] = giabao;
  obj.subscriber.entitlements.pro = giabao_subscription;
}

$done({ body: JSON.stringify(obj) });