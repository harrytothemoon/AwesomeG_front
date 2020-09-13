<template>
  <div class="container py-5 text-primary" style="max-width:950px">
    <ul class="nav nav-tabs mt-1 mb-4 d-flex justify-content-center">
      <li class="nav-item w-25" style="cursor:pointer">
        <router-link :to="{name: 'user', params: {id: userId}}" class="nav-link text-center">
          <h4>My Information</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor:pointer">
        <router-link :to="{name: 'orders', params: {id: userId}}" class="nav-link text-center">
          <h4>My Orders</h4>
        </router-link>
      </li>
    </ul>
    <div class="overflow-auto" style="height:500px">
      <table class="table table-hover text-center overflow-auto" style="max-height:500px">
        <thead>
          <tr class="table-warning">
            <th scope="col">Order Id</th>
            <th scope="col">Order Date</th>
            <th scope="col">Product Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Get Payment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="table-light">
            <th scope="row">{{order.id}}</th>
            <td>{{order.createdAt | filterDate}}</td>
            <td>"{{order.Product.name}}" Package</td>
            <td>{{order.amount}}</td>
            <td v-if="Number(order.payment_status)">Paid</td>
            <td v-else>Unpaid</td>
            <td>
              <router-link
                v-if="!Number(order.payment_status)"
                :to="{name: 'payment', params: {id: order.id}}"
              >
                <button type="button" class="btn btn-success">Payment</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import ordersAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";

export default {
  name: "User",
  components: {
    NavTabs,
  },
  data() {
    return {
      orders: [],
      userId: "",
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.userId = userId;
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await ordersAPI.getOrders();
        this.orders = response.data.orders;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get orders data, please try again later",
        });
      }
    },
  },
  filters: {
    filterDate(datetime) {
      return new Date(datetime).toLocaleDateString("zh-TW", {
        timeZone: "Asia/Taipei",
      });
    },
  },
};
</script>