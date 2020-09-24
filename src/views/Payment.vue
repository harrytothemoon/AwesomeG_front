<template>
  <Spinner v-if="isLoading" />
  <div v-else class="container py-5 text-primary">
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
          <h4 class="text-center">Number of questions</h4>
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
import Spinner from "./../components/Spinner";
import ordersAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";

export default {
  name: "User",
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      order: {},
      tradeInfo: {},
      orderId: "",
      userId: "",
      isLoading: true,
    };
  },
  created() {
    const { id: orderId } = this.$route.params;
    this.orderId = orderId;
    this.fetchOrder(orderId);
  },
  methods: {
    async fetchOrder(orderId) {
      try {
        const response = await ordersAPI.getPayment({ orderId });
        if (response.status === "error") {
          this.isLoading = false;
          throw new Error(response.message);
        }
        this.order = response.data.order;
        this.tradeInfo = response.data.tradeInfo;
        this.userId = response.data.order.UserId;
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get order data, please try again later",
        });
        this.isLoading = false;
      }
    },
  },
};
</script>