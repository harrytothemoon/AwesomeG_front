<template>
  <div
    class="modal fade"
    id="productAdmin"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productAdminLabel"
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
        <h1 class="modal-title" id="productAdminLabel" style="color: #c03546">
          Create Product
        </h1>
        <div class="modal-body mt-2">
          <form class="w-100" @submit.prevent.stop="handlePostSubmit">
            <div class="form-label-group mb-2">
              <label for="name">
                <h5>Name</h5>
              </label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="name"
                autocomplete="username"
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
                    v-model="price"
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
                v-model="description"
              />
              <h5 class="m-0" for="description">{{ description }}</h5>
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
import $ from "jquery";
export default {
  data() {
    return {
      name: "",
      price: "",
      description: 0,
      isProcessing: false,
    };
  },
  methods: {
    async handlePostSubmit() {
      try {
        this.isProcessing = true;
        const { data, statusText } = await backgroundAPI.postProduct({
          name: this.name,
          description: this.description,
          price: this.price,
        });
        if (statusText === "OK" || data.status === "success") {
          this.isProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          $("#productAdmin").modal("hide");
          this.name = "";
          this.price = "";
          this.description = 0;
          this.$emit("refetch");
        } else if (statusText !== "OK" || data.status === "error") {
          this.isProcessing = false;
          Toast.fire({
            icon: "error",
            title: data.message,
          });
          $("#productAdmin").modal("hide");
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not submit, please try again later",
        });
        this.name = "";
        this.price = "";
        this.description = 0;
      }
    },
  },
};
</script>