<template>
  <div
    class="modal fade"
    id="productAdminEdit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productAdminEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document">
      <div class="modal-content" style="background-color: #fffbf0">
        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="close m-0 mr-3 mt-3"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1
          class="modal-title"
          id="productAdminEditLabel"
          style="color: #c03546"
        >
          Edit Product
        </h1>
        <div class="modal-body mt-2">
          <Spinner v-if="editIsLoading" />
          <form v-else class="w-100" @submit.prevent.stop="handleEditSubmit">
            <div class="form-label-group mb-2">
              <label for="name">
                <h5>Name</h5>
              </label>
              <input
                id="name"
                v-model="product.name"
                name="name"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="name"
                required
                autofocus
              />
            </div>

            <div class="form-label-group mb-2">
              <label for="price">
                <h5>Price</h5>
              </label>
              <div class="form-group w-75 mx-auto">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    max="10000"
                    step="1"
                    v-model="product.price"
                    name="price"
                    class="form-control"
                    placeholder="price"
                    aria-label="Amount (to the nearest dollar)"
                    required
                  />
                </div>
              </div>
            </div>
            <fieldset class="form-label-group mb-2">
              <h5>Number of Questions</h5>
              <input
                type="range"
                class="custom-range w-75 mx-auto mt-2"
                id="description"
                name="description"
                required
                min="0"
                max="200"
                step="1"
                v-model="product.description"
              />
              <h5 class="m-0" for="description">
                {{ product.description }}
              </h5>
            </fieldset>
            <button
              class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto"
              type="submit"
              :disabled="isProcessing"
            >
              <h5 class="m-0 text-center">Submit</h5>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundAPI from "./../apis/background";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import $ from "jquery";
export default {
  components: {
    Spinner,
  },
  props: {
    productEdit: {
      type: Object,
      default: () => {
        return {
          name: "",
          price: "",
          description: 0,
        };
      },
    },
    editIsLoading: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      product: {
        ...this.productEdit,
      },
      isProcessing: false,
    };
  },
  methods: {
    async handleEditSubmit() {
      try {
        this.isProcessing = true;
        const { data, statusText } = await backgroundAPI.putProduct(
          this.product.id,
          {
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
          }
        );
        if (statusText === "OK" || data.status === "success") {
          this.isProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          $("#productAdminEdit").modal("hide");
          this.$emit("refetchEdit");
        } else if (statusText !== "OK" || data.status === "error") {
          this.isProcessing = false;
          Toast.fire({
            icon: "error",
            title: data.message,
          });
          $("#productAdminEdit").modal("hide");
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not submit, please try again later",
        });
      }
    },
  },
  watch: {
    productEdit(newValue) {
      this.product = {
        ...this.product,
        ...newValue,
      };
    },
  },
};
</script>