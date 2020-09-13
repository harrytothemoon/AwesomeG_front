<template>
  <div
    class="modal fade"
    id="product"
    tabindex="-1"
    role="dialog"
    aria-labelledby="signinLabel"
    ria-hidden="true"
  >
    <div class="modal-dialog container py-5" style="max-width:800px">
      <div class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="text-center mb-2">
          <h1 class="h3 mb-3 display-3">Choose Plan</h1>
        </div>
        <div class="row m-3">
          <div v-for="product in products" :key="product.id" class="col-6 text-center">
            <form class="card w-100 rounded" @submit.prevent.stop="handleSubmit">
              <h2 class="mt-2" style="color:#c03546">'{{product.name}}'</h2>
              <h2>Package</h2>
              <h2>NT</h2>
              <h2>$ {{product.price}}</h2>
              <h4>Number of questions</h4>
              <h2>{{product.description}}</h2>
              <input name="amount" type="hidden" :value="product.price" />
              <input name="productId" type="hidden" :value="product.id" />
              <input name="payment_status" type="hidden" value="0" />
              <button
                :disabled="isProcessing"
                class="btn btn-lg btn-primary mb-3 w-75 mx-auto"
                type="submit"
              >
                <h4 class="m-0">Choose</h4>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsAPI from "./../apis/products";
import ordersAPI from "./../apis/orders";
import { Toast } from "./../utils/helpers";
import $ from "jquery";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      products: [],
      isProcessing: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await productsAPI.getProducts();
        this.products = response.data.products;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get products data, please try again later",
        });
      }
    },
    async handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      try {
        const { data } = await ordersAPI.postOrder.create({ formData });
        if (data.status === "success") {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          $("#product").modal("hide");
          this.$router.push(`/users/${this.userId}/orders`);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not post question, please try again later",
        });
      }
    },
  },
};
</script>