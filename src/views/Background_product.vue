<template>
  <div class="container py-5 text-primary" style="max-width: 950px">
    <ul class="nav nav-tabs mt-1 mb-4 d-flex justify-content-center">
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link
          to="/admin/background/products"
          class="nav-link text-center"
        >
          <h4>Products</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link
          to="/admin/background/subjects"
          class="nav-link text-center"
        >
          <h4>Subjects</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link to="/admin/background/scopes" class="nav-link text-center">
          <h4>Scopes</h4>
        </router-link>
      </li>
    </ul>
    <div class="mb-3">
      <ProductAdminM @refetch="refetch" />
      <ProductAdminEditM
        :productEdit="productEdit"
        :editIsLoading="editIsLoading"
        @refetchEdit="refetchEdit"
      />
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#productAdmin"
      >
        <h5 class="m-0 text-center">New</h5>
      </button>
    </div>
    <Spinner v-if="isLoading" />
    <div v-else class="overflow-auto" style="height: 500px">
      <table
        class="table table-hover text-center overflow-auto"
        style="max-height: 500px"
      >
        <thead>
          <tr class="table-warning">
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="table-light">
            <td>"{{ product.name }}" Package</td>
            <td>{{ product.description }}</td>
            <td>NT$ {{ product.price }}</td>
            <td>
              <button
                type="button"
                class="btn btn-info"
                data-toggle="modal"
                data-target="#productAdminEdit"
                @click="fetchProduct(product.id)"
              >
                <font-awesome-icon icon="pencil-alt" />
              </button>
            </td>
            <td>
              <button
                @click.stop.prevent="deleteProduct(product.id)"
                type="button"
                class="btn btn-danger"
                :disabled="isProcessing"
              >
                <font-awesome-icon icon="trash-alt" />
              </button>
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
import Spinner from "./../components/Spinner";
import ProductAdminM from "../components/ProductAdminM";
import ProductAdminEditM from "../components/ProductAdminEditM";
import productAPI from "./../apis/products";
import backgroundAPI from "./../apis/background";
import { Toast } from "./../utils/helpers";

export default {
  name: "Background",
  components: {
    NavTabs,
    Spinner,
    ProductAdminM,
    ProductAdminEditM,
  },
  data() {
    return {
      products: [],
      userId: "",
      isLoading: true,
      isProcessing: false,
      editIsLoading: true,
      productEdit: {},
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.userId = userId;
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await productAPI.getProducts();
        this.products = response.data.products;
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get products data, please try again later",
        });
        this.isLoading = false;
      }
    },
    async fetchProduct(productId) {
      try {
        const response = await backgroundAPI.getProduct(productId);
        this.productEdit = response.data.product;
        this.editIsLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get products data, please try again later",
        });
        this.editIsLoading = false;
      }
    },
    async deleteProduct(productId) {
      if (this.products.length > 2) {
        this.isProcessing = true;
        try {
          const { data, statusText } = await backgroundAPI.deleteProduct({
            productId,
          });
          if (statusText !== "OK" || data.status !== "success") {
            this.isProcessing = false;
            throw new Error(statusText);
          }
          if (statusText === "OK" || data.status === "success") {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            this.isProcessing = false;
            this.fetchProducts();
          }
        } catch (error) {
          this.isProcessing = false;
          Toast.fire({
            icon: "error",
            title: "Can't not delete data, please try again later",
          });
        }
      } else {
        Toast.fire({
          icon: "warning",
          title: "Please keep at least two products",
        });
      }
    },
    refetch() {
      this.fetchProducts();
    },
    refetchEdit() {
      this.fetchProducts();
    },
  },
};
</script>

<style >
@media (min-width: 370px) {
  table {
    font-size: 0.6rem;
  }
}
@media (min-width: 576px) {
  table {
    font-size: 0.8rem;
  }
}
@media (min-width: 760px) {
  table {
    font-size: 1rem;
  }
}
@media (min-width: 1200px) {
  table {
    font-size: 1.3rem;
  }
}
</style>