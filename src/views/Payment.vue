<template>
  <div class="container py-5 text-primary">
    <div class="d-flex flex-column align-items-center">
      <router-link :to="{name: 'orders', params: {id: userId}}" class="nav-link text-center">
        <h4>＜ Back to My Orders</h4>
      </router-link>
      <h1 class="display-2" style="color:#c03546">Payment</h1>
      <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
        <h4 class="text-center">Please Confirm Following Information</h4>
        <div class="card w-75 mx-auto text-center">
          <h2 class="mt-2" style="color:#c03546">'{{order.Product.name}}'</h2>
          <h2>NT$ {{order.amount}}</h2>
          <h4>Number of questions</h4>
          <h2>{{order.Product.description}}</h2>
        </div>
        <input type="hidden" name="MerchantID" :value="tradeInfo.MerchantID" />
        <input type="hidden" name="TradeInfo" :value="tradeInfo.TradeInfo" />
        <input type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
        <input type="hidden" name="Version" :value="tradeInfo.Version" />
        <button type="submit" class="btn btn-success mt-3">
          <h6 class="display-4">Go to Payment Page</h6>
        </button>
      </form>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
const dummyData = {
  order: {
    id: 3,
    amount: 2990,
    sn: 1599844705350,
    payment_status: "0",
    UserId: 1,
    ProductId: 2,
    createdAt: "2020-09-11T09:45:43.000Z",
    updatedAt: "2020-09-11T17:18:25.351Z",
    Product: {
      id: 2,
      name: "Become a master",
      description: "66",
      price: 2990,
      createdAt: "2020-09-05T15:28:47.000Z",
      updatedAt: "2020-09-05T15:28:47.000Z",
    },
  },
  tradeInfo: {
    MerchantID: "MS313884947",
    TradeInfo:
      "36a6c090e5cb88ac2ffeb08db0629b2fa5ce96f74b293fc9147a16cac7f65ffe50c0f705950712ae625edb71dea258df15a83862b5f096117e9ac1413ef510e6e39569837fad060016ff0a695ffb1d78abd012b8da7a46ead7b8c6677c3dbc8e1166721e85d777aadcd5aba95daea5221a60f5bcada7662f507ff1e6d140d2585ccf6c5c4c9ddbaffc4f7f279d5198db63ab0a489219ca9a7785cc5eb77f795491357360664581c700befeb7eecba87ce83f49f8035b592d2f91a9b6f0a811342073935ae3f9760386a2ac263688692d72ef2f4110af9d84f30dffad02a6d00f3e4514d91d72580d04fd5bb74ed536fd6a9197ab34b66f9f42553a06a5e3090a091be2571a4c5b75db716faa5cfac69d58a3590beb08fefd667a608a2e2ffc24d51d7772b99447e1d1d14786b7c00e23b9d6484033f7408d9604d96b630aac2777b3a3b365799335549ae0b7844ed19d2a370915765583f777e0ba82f28fab2df2868abfbd50229534729f9275e7ec000e765ba04954422b66bc54a498162f337479f4e62731b6c70874ffe0c75124f8eec0a944c6ffc105c130009c1b2ca3d247c21cae2d50a2035f4639237425d91f",
    TradeSha:
      "A7519BA7B7896D3A22C214D1C91179D3EEA52593EA985EF865D8B33F4C094EB4",
    Version: 1.5,
    PayGateWay: "https://ccore.spgateway.com/MPG/mpg_gateway",
    MerchantOrderNo: 1599844705350,
  },
};

export default {
  name: "User",
  components: {
    NavTabs,
  },
  data() {
    return {
      order: {},
      tradeInfo: {},
      orderId: "",
      userId: "",
    };
  },
  created() {
    const { id: orderId } = this.$route.params;
    this.orderId = orderId;
    this.fetchOrder(orderId);
  },
  methods: {
    fetchOrder(orderId) {
      console.log("fetchUser id: ", orderId);
      this.order = dummyData.order;
      this.tradeInfo = dummyData.tradeInfo;
      this.userId = dummyData.order.UserId;
    },
  },
};
</script>