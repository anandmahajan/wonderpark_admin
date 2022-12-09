<template>
  <div>
    <div class="content-body">
      <div class="component-section no-code mt-2">
        <div class="row row-sm">
          <div class="col-lg-12">
            <div class="card rounded-5">
              <div class="card-body p-4 p-lg-5">
                <div class="row form-style">
                  <div class="col-lg-12 mb-3">
                    <div class="row">
                      <div class="col-lg-4 col-md-5 mb-2 mx-auto">
                        <!-- <label>voucher Image</label> -->
                        <div class="mb-3">
                          <img
                            :src="
                              voucher.image
                                ? voucher.image
                                : '/static/img/upload-placeholder.jpg'
                            "
                            id="img_hoder_1"
                            width="280"
                            height="150"
                            @click="openImages()"
                          />
                        </div>

                        <input
                          type="file"
                          class="btn upload-img"
                          id="AddPhoto"
                          accept="logo/*"
                          @change="onChange($event)"
                          hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.voucher_name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="buy_points"
                      v-model="voucher.buy_points"
                      v-validate="'required|numeric'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('buy_points') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.voucher_name"
                    />
                    <i v-show="errors.has('buy_points')"></i>
                    <span v-show="errors.has('buy_points')" class="help is-info">{{
                      $lang.messages.please_enter_voucher_name
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label>Discount Type </label>
                    <div class="">
                      <input
                        type="radio"
                        name="discount_type"
                        style="width: 50px; height: 14px !important"
                        value="PERCENTAGE"
                        id="option1"
                        v-model="voucher.discount_type"
                      />
                      <span>PERCENTAGE</span>
                      <input
                        style="width: 50px; height: 14px !important"
                        type="radio"
                        name="discount_type"
                        value="FIXED"
                        id="option2"
                        v-model="voucher.discount_type"
                      />
                      <span>FIXED</span>
                    </div>
                  </div>
                </div>

                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.discount_amount }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="discount"
                      v-model="voucher.discount"
                      v-validate="'required|decimal'"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('discount') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.discount_amount"
                    />
                    <i v-show="errors.has('discount')"></i>
                    <span v-show="errors.has('discount')" class="help is-info">{{
                      $lang.messages.please_enter_valid_discount_amount
                    }}</span>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-12 mb-3">
                    <label for>
                      {{ $lang.messages.description }}
                    </label>
                    <textarea
                      name="description"
                      v-model="voucher.description"
                      rows="4"
                      cols="50"
                      class="form-control"
                      type="text"
                      v-bind:placeholder="$lang.messages.description"
                    ></textarea>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label> Type </label>
                    <div class="">
                      <input
                        type="radio"
                        name="type"
                        style="width: 50px; height: 14px !important"
                        value="CATEGORY"
                        id="CATEGORY"
                        v-model="voucher.type"
                      />
                      <span>Product</span>
                      <input
                        style="width: 50px; height: 14px !important"
                        type="radio"
                        name="type"
                        value="VISIT"
                        id="CATEGORY"
                        v-model="voucher.type"
                      />
                      <span>VISIT</span>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-3" v-if="(voucher.type = 'CATEGORY')">
                    <label for> Category</label>
                    <span class="text-danger">*</span>
                    <select
                      class="custom-select"
                      name="category_id"
                      v-model="voucher.category_id"
                      v-validate="'required'"
                      placeholder="category"
                      :class="{
                        input: true,
                        'is-info': errors.has('category_id'),
                      }"
                    >
                      <option value>Select Category</option>
                      <option
                        v-for="item in cat_select_box"
                        :key="item.id"
                        :value="item.id"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                      >
                        {{ item.title }}
                      </option>
                    </select>
                    <i v-show="errors.has('category_id')"></i>
                    <span v-show="errors.has('category_id')" class="help is-info"
                      >Please select category</span
                    >
                  </div>
                </div>
              </div>

              <div class="row mt-5 mb-3" v-if="action == 'ADD' || action == 'EDIT'">
                <div class="col-12 text-center">
                  <button
                    type="button"
                    class="btn btn-outline-info mr-lg-3 mr-2 btn-lg"
                    @click="$router.go(-1)"
                  >
                    {{ $lang.messages.cancel }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-info btn-lg"
                    id="save-btn"
                    @click="validateBeforeSubmit()"
                  >
                    {{ $lang.messages.save }}
                  </button>
                </div>
              </div>

              <div class="row mt-5" v-else>
                <div class="col-12 text-right">
                  <button
                    type="button"
                    class="btn btn-outline-info mr-lg-3 mr-2 btn-lg"
                    @click="$router.go(-1)"
                  >
                    {{ $lang.messages.back }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="Delete"
      tabindex="-1"
      role="dialog"
      aria-labelledby="Delete"
      aria-hidden="true"
      style="pointer-events: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-22">Delete</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/static/img/close.svg" width="20" />
            </button>
          </div>
          <div class="modal-body form-style pb-0 px-lg-5">
            <div class="row justify-content-center">
              <div class="col-lg-12 mb-0 text-center">
                <img src="/static/img/reject.png" width="50" class="mb-4" />
                <h3>Are you Sure, You want to delete ?</h3>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-center">
            <button type="button" class="btn btn-brand-01" @click="removeRecord()">
              Save
            </button>
            <button
              type="button"
              data-dismiss="modal"
              class="btn btn-outline-primary"
              hidden="true"
              id="delete-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Multiselect from "vue-multiselect";
import moment from "moment";
import { category } from "../../../lang/en/messages";
export default {
  name: "AddVoucher",
  components: { DatePicker, Multiselect },
  data() {
    return {
      action: "",
      cat_select_box: [],
      voucher: {
        buy_points: "",
        description: "",
        discount_type: "PERCENTAGE",
        type: "CATEGORY",
        category_id: "",
        image: "",
      },
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.save();
          return;
        }
      });
    },

    validateBeforeTypeSubmit() {
      this.$validator.validateAll("item").then((result) => {
        if (result) {
          this.saveItem();
          return;
        }
      });
    },

    // saveItem() {
    //   if (this.type == "FLAVOUR") {
    //     if (this.innerType == "ADD") {
    //       this.flavourList.push(this.typeObj);
    //     } else {
    //       this.flavourList[this.index] = this.typeObj;
    //       this.$set(this.flavourList, this.index, this.flavourList[this.index]);
    //     }
    //   }
    //   if (this.type == "TOPPING") {
    //     if (this.innerType == "ADD") {
    //       this.toppingList.push(this.typeObj);
    //     } else {
    //       this.toppingList[this.index] = this.typeObj;
    //       this.$set(this.toppingList, this.index, this.toppingList[this.index]);
    //     }
    //   }
    //   if (this.type == "TEMPERATURE") {
    //     if (this.innerType == "ADD") {
    //       this.temperatureList.push(this.typeObj);
    //     } else {
    //       this.temperatureList[this.index] = this.typeObj;
    //       this.$set(this.temperatureList, this.index, this.temperatureList[this.index]);
    //     }
    //   }
    //   $("#addItem").modal("hide");
    // },
    // removeItem(index, type) {
    //   this.type = type;
    //   this.index = index;
    //   $("#Delete").modal("show");
    // },
    // removeRecord() {
    //   if (this.type == "FLAVOUR") {
    //     this.flavourList.splice(this.index, 1);
    //   }
    //   if (this.type == "TOPPING") {
    //     this.toppingList.splice(this.index, 1);
    //   }
    //   if (this.type == "TEMPERATURE") {
    //     this.temperatureList.splice(this.index, 1);
    //   }
    //   $("#Delete").modal("hide");
    // },
    save() {
      this.voucher.flavours = this.flavourList;
      this.voucher.toppings = this.toppingList;
      this.voucher.tempratures = this.temperatureList;
      if (this.voucher.uuid) {
        this.$api
          .putAPI({
            _action: "item/info/" + this.voucher.uuid,
            _body: this.voucher,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.voucher.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/voucher");
            }
          })
          .catch((e) => {
            this.$noty.error("" + e.message, {
              timeout: 2000,
              layout: "topCenter",
              theme: "semanticui",
            });
          });
      } else {
        this.$api
          .postAPI({
            _action: "item",
            _body: this.voucher,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.voucher.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/voucher");
            }
          })
          .catch((e) => {
            this.$noty.error("" + e.message, {
              timeout: 2000,
              layout: "topCenter",
              theme: "semanticui",
            });
          });
      }
    },

    openImages() {
      document.getElementById("AddPhoto").click();
    },

    onChange(e) {
      let files = e.target.files;
      this.file = files[0];
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#img_hoder_1").attr("src", e.target.result);
        };
      }
      reader.readAsDataURL(e.target.files[0]);
    },

    uploadFile() {
      this.$api
        .uploadImageAPI({
          _action: "/item/image/" + this.voucher.id,
          _key: "image",
          _file: this.file,
          _body: this.voucher,
        })
        .then((res) => {
          this.$noty.success("" + "Successfully Uploaded", {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          router.push("/voucher");
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },

    getDetail() {
      this.$api
        .getAPI({
          _action: "/items/" + this.voucher.uuid,
        })
        .then((res) => {
          this.voucher = res.info;

          for (var i = 0; i < this.voucher.options.length; i++) {
            if (this.voucher.options[i].title == "FLAVOUR") {
              this.flavourList = this.voucher.options[i].values;
            }
            if (this.voucher.options[i].title == "TOPPINGS") {
              this.toppingList = this.voucher.options[i].values;
            }
            if (this.voucher.options[i].title == "TEMPRATURES") {
              this.temperatureList = this.voucher.options[i].values;
            }
          }
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },
    getSelectBox() {
      this.$api
        .getAPI({
          _action: "category/list/",
        })
        .then((res) => {
          this.cat_select_box = res.list;
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },

    editItem(index, data, type) {
      this.innerType = "EDIT";
      this.type = type;
      this.index = index;
      var temp = JSON.stringify(data);
      var parse_data = JSON.parse(temp);
      this.typeObj = {};
      this.typeObj.title = parse_data.title;
      this.typeObj.price = parse_data.price;
      $("#addItem").modal("show");
    },

    addItem(type) {
      this.innerType = "ADD";
      this.type = type;
      this.typeObj = {};
      $("#addItem").modal("show");
    },
  },
  mounted() {
    var tabValue = this.$shareService.getMapValue("action");
    if (tabValue != null && tabValue != "") {
      this.action = tabValue;
      this.$shareService.deleteMapValue("action");
    } else {
      if (this.$route.params.id) {
        router.push("/voucher");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.uuid) {
      this.voucher.uuid = this.$route.params.uuid;
      this.getDetail();
    }
    this.getSelectBox();

    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
