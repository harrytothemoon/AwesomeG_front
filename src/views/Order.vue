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
const dummyData = {
  orders: [
    {
      id: 3,
      amount: 2990,
      sn: null,
      payment_status: "0",
      UserId: 1,
      ProductId: 2,
      createdAt: "2020-09-11T09:45:43.000Z",
      updatedAt: "2020-09-11T09:45:43.000Z",
      Product: {
        id: 2,
        name: "Become a master",
        description: "66",
        price: 2990,
        createdAt: "2020-09-05T15:28:47.000Z",
        updatedAt: "2020-09-05T15:28:47.000Z",
      },
    },
    {
      id: 1,
      amount: 2990,
      sn: "1599817543452",
      payment_status: "1",
      UserId: 1,
      ProductId: 2,
      createdAt: "2020-09-05T15:30:25.000Z",
      updatedAt: "2020-09-11T09:45:43.000Z",
      Product: {
        id: 2,
        name: "Become a master",
        description: "66",
        price: 2990,
        createdAt: "2020-09-05T15:28:47.000Z",
        updatedAt: "2020-09-05T15:28:47.000Z",
      },
    },
    {
      id: 2,
      amount: 990,
      sn: "1599321095229",
      payment_status: "1",
      UserId: 1,
      ProductId: 1,
      createdAt: "2020-09-05T15:30:25.000Z",
      updatedAt: "2020-09-05T15:52:26.000Z",
      Product: {
        id: 1,
        name: "Easy Learning",
        description: "20",
        price: 990,
        createdAt: "2020-09-05T15:28:32.000Z",
        updatedAt: "2020-09-05T15:28:32.000Z",
      },
    },
  ],
};

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
    this.fetchUser(userId);
  },
  methods: {
    fetchUser(userId) {
      console.log("fetchUser id: ", userId);
      this.orders = dummyData.orders;
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

<style>
h3 {
  color: #4f86c6;
}
</style>