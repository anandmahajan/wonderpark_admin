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
                        <!-- <label>Product Image</label> -->
                        <div class="mb-3">
                          <img
                            :src="
                              product.image
                                ? product.image
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
                      {{ $lang.messages.product_name }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="title"
                      v-model="product.title"
                      v-validate="'required|max:250'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('title') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.product_name"
                    />
                    <i v-show="errors.has('title')"></i>
                    <span v-show="errors.has('title')" class="help is-info">{{
                      $lang.messages.please_enter_product_name
                    }}</span>
                  </div>
                  <div class="col-lg-6 mb-3">
                    <label for>
                      {{ $lang.messages.amount }}
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      name="amount"
                      v-model="product.amount"
                      v-validate="'required|decimal'"
                      maxlength="250"
                      class="form-control"
                      :class="{ input: true, 'is-info': errors.has('amount') }"
                      type="text"
                      v-bind:placeholder="$lang.messages.amount"
                    />
                    <i v-show="errors.has('amount')"></i>
                    <span v-show="errors.has('amount')" class="help is-info">{{
                      $lang.messages.please_enter_valid_amount
                    }}</span>
                  </div>
                </div>

                <div class="row form-style">
                  <div class="col-lg-6 mb-3">
                    <label for> Category</label>
                    <span class="text-danger">*</span>
                    <select
                      class="custom-select"
                      name="category_id"
                      v-model="product.category_id"
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
                      >
                        {{ item.title }}
                      </option>
                    </select>
                    <i v-show="errors.has('category_id')"></i>
                    <span v-show="errors.has('category_id')" class="help is-info"
                      >Please select category</span
                    >
                  </div>
                  <div class="col-lg-3 mb-3">
                    <label for> Type </label>
                    <div class="">
                      <input
                        type="radio"
                        name="is_food"
                        style="width: 50px; height: 14px !important"
                        value="0"
                        id="option1"
                        v-model="product.is_food"
                      />
                      <span>Food</span>
                      <input
                        style="width: 50px; height: 14px !important"
                        type="radio"
                        name="is_food"
                        value="1"
                        id="option2"
                        v-model="product.is_food"
                        autocomplete="off"
                      />
                      <span>Other</span>
                    </div>
                  </div>
                  <div class="col-lg-3 mb-1">
                    <label for>Earn Point</label>
                    <input
                      type="text"
                      v-validate="'numeric'"
                      name="earned_point"
                      :class="{ input: true, 'is-info': errors.has('earned_point') }"
                      class="form-control"
                      v-model="product.earned_point"
                      placeholder="Earn Point"
                    />
                    <i v-show="errors.has('earned_point')"></i>
                    <span v-show="errors.has('earned_point')" class="help is-info">{{
                      $lang.messages.please_enter_valid_earned_point
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
                      v-model="product.description"
                      rows="4"
                      cols="50"
                      class="form-control"
                      type="text"
                      v-bind:placeholder="$lang.messages.description"
                    ></textarea>
                  </div>
                </div>
                <div class="row form-style">
                  <div class="col-lg-6 mb-2">
                    <div class="d-flex flex-row">
                      <input
                        type="checkbox"
                        name="has_flavour"
                        class="form-control"
                        true-value="1"
                        false-value="0"
                        style="width: 50px; height: 14px !important"
                        v-model="product.has_flavour"
                      />
                      Add Flavour
                    </div>
                  </div>

                  <div
                    class="col-lg-6 mb-2 text-md-right"
                    v-show="product.has_flavour == 1"
                  >
                    <button
                      type="button"
                      class="btn btn-brand-01"
                      @click="addItem('FLAVOUR')"
                    >
                      + Add flavour
                    </button>
                  </div>
                </div>

                <div class="card card-body" v-show="product.has_flavour == 1">
                  <div class="table-responsive">
                    <table class="table table-primary table-hover table-striped mg-b-0">
                      <thead>
                        <tr>
                          <th scope="col">Sr. no.</th>
                          <th scope="col">
                            {{ $lang.messages.title }}
                          </th>
                          <th scope="col">
                            {{ $lang.messages.price }}
                          </th>
                          <th scope="col">{{ $lang.messages.action }}</th>
                        </tr>
                      </thead>
                      <tbody v-if="flavourList.length">
                        <tr v-for="(item, i) in flavourList" :key="item.id">
                          <td>{{ i + 1 }}</td>
                          <td>{{ item.title }}</td>
                          <td>{{ item.price }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-info btn-sm"
                              @click="editItem(i, item, 'FLAVOUR')"
                            >
                              {{ $lang.messages.edit }}
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger btn-sm"
                              @click="removeItem(index, 'FLAVOUR')"
                            >
                              {{ $lang.messages.delete }}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="text-center" v-if="flavourList.length == 0">
                      <div class="w-50 d-inline-block pt-5 pb-5 mt-5 mb-5">
                        <h3 class="mb-4">
                          <strong>No Flavour Found</strong>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row form-style mt-2">
                  <div class="col-lg-6 mb-2">
                    <div class="d-flex flex-row">
                      <input
                        type="checkbox"
                        class="form-control"
                        name="has_toppings"
                        v-model="product.has_toppings"
                        true-value="1"
                        false-value="0"
                        style="width: 50px; height: 14px !important"
                      />
                      Add Toppings
                    </div>
                  </div>

                  <div
                    class="col-lg-6 mb-2 text-md-right"
                    v-show="product.has_toppings == 1"
                  >
                    <button
                      type="button"
                      class="btn btn-brand-01"
                      @click="addItem('TOPPING')"
                    >
                      + Add Topping
                    </button>
                  </div>
                </div>

                <div class="card card-body" v-show="product.has_toppings == 1">
                  <div class="table-responsive">
                    <table class="table table-primary table-hover table-striped mg-b-0">
                      <thead>
                        <tr>
                          <th scope="col">Sr. no.</th>
                          <th scope="col">
                            {{ $lang.messages.title }}
                          </th>
                          <th scope="col">
                            {{ $lang.messages.price }}
                          </th>
                          <th scope="col">{{ $lang.messages.action }}</th>
                        </tr>
                      </thead>
                      <tbody v-if="toppingList.length">
                        <tr v-for="(item, i) in toppingList" :key="item.id">
                          <td>{{ i + 1 }}</td>
                          <td>{{ item.title }}</td>
                          <td>{{ item.price }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-info btn-sm"
                              @click="editItem(i, item, 'TOPPING')"
                            >
                              {{ $lang.messages.edit }}
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger btn-sm"
                              @click="removeItem(index, 'TOPPING')"
                            >
                              {{ $lang.messages.delete }}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-center" v-if="toppingList.length == 0">
                      <div class="w-50 d-inline-block pt-5 pb-5 mt-5 mb-5">
                        <h3 class="mb-4">
                          <strong>No Topping Found</strong>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row form-style mt-2">
                  <div class="col-lg-6 mb-2">
                    <div class="d-flex flex-row">
                      <input
                        type="checkbox"
                        name="has_tempratures"
                        v-model="product.has_tempratures"
                        class="form-control"
                        true-value="1"
                        false-value="0"
                        style="width: 50px; height: 14px !important"
                      />
                      Add Temperature
                    </div>
                  </div>

                  <div
                    class="col-lg-6 mb-2 text-md-right"
                    v-show="product.has_tempratures == 1"
                  >
                    <button
                      type="button"
                      class="btn btn-brand-01"
                      @click="addItem('TEMPERATURE')"
                    >
                      + Add Temperature
                    </button>
                  </div>
                </div>

                <div class="card card-body" v-show="product.has_tempratures == 1">
                  <div class="table-responsive">
                    <table class="table table-primary table-hover table-striped mg-b-0">
                      <thead>
                        <tr>
                          <th scope="col">Sr. no.</th>
                          <th scope="col">
                            {{ $lang.messages.title }}
                          </th>
                          <th scope="col">
                            {{ $lang.messages.price }}
                          </th>
                          <th scope="col">{{ $lang.messages.action }}</th>
                        </tr>
                      </thead>
                      <tbody v-if="temperatureList.length">
                        <tr v-for="(item, i) in temperatureList" :key="item.id">
                          <td>{{ i + 1 }}</td>
                          <td>{{ item.title }}</td>
                          <td>{{ item.price }}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-info btn-sm"
                              @click="editItem(i, item, 'TEMPERATURE')"
                            >
                              {{ $lang.messages.edit }}
                            </button>
                            <button
                              type="button"
                              class="btn btn-outline-danger btn-sm"
                              @click="removeItem(index, 'TEMPERATURE')"
                            >
                              {{ $lang.messages.delete }}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="text-center" v-if="temperatureList.length == 0">
                      <div class="w-50 d-inline-block pt-5 pb-5 mt-5 mb-5">
                        <h3 class="mb-4">
                          <strong>No Temperature Found</strong>
                        </h3>
                      </div>
                    </div>
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
      id="addItem"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addItem"
      aria-hidden="true"
      style="pointer-events: none"
    >
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-22" v-if="type == 'FLAVOUR'">
              <span v-if="innerType == 'ADD'"> Add Flavour</span>
              <span v-else> Edit Flavour</span>
            </h5>
            <h5 class="modal-title font-22" v-if="type == 'TOPPING'">
              <span v-if="innerType == 'ADD'">Add Topping</span>
              <span v-else> Edit Topping</span>
            </h5>
            <h5 class="modal-title font-22" v-if="type == 'TEMPERATURE'">
              <span v-if="innerType == 'ADD'">Add Temperature</span>
              <span v-else> Edit Temperature</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="/static/img/close.svg" width="20" />
            </button>
          </div>
          <div class="modal-body form-style pb-0 px-lg-5">
            <form data-vv-scope="item">
              <div class="row">
                <div class="col-lg-12 mb-0 px-2">
                  <label>
                    {{ $lang.messages.title }}
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    name="title"
                    v-model="typeObj.title"
                    v-validate="'required|max:250'"
                    class="form-control"
                    :class="{ input: true, 'is-info': errors.has('item.title') }"
                    type="text"
                    v-bind:placeholder="$lang.messages.title"
                  />
                  <i v-show="errors.has('item.title')"></i>
                  <span v-show="errors.has('item.title')" class="help is-info">{{
                    $lang.messages.please_enter_title
                  }}</span>
                </div>

                <div class="col-lg-12 mb-0 px-2">
                  <label>
                    {{ $lang.messages.price }}
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    name="price"
                    v-model="typeObj.price"
                    v-validate="'required|decimal'"
                    class="form-control"
                    :class="{ input: true, 'is-info': errors.has('item.price') }"
                    type="text"
                    v-bind:placeholder="$lang.messages.price"
                  />
                  <i v-show="errors.has('item.price')"></i>
                  <span v-show="errors.has('item.price')" class="help is-info">{{
                    $lang.messages.please_enter_valid_price
                  }}</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer border-0 justify-content-center">
            <button
              type="button"
              class="btn btn-brand-01"
              @click="validateBeforeTypeSubmit()"
            >
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
import moment from "moment";
import { category } from "../../../lang/en/messages";
export default {
  name: "AddProduct",
  components: { DatePicker },
  data() {
    return {
      action: "",
      cat_select_box: [],
      product: {
        title: "",
        category_id: "",
        is_food: "0",
        earned_point: "0",
        has_flavour: "0",
        has_toppings: "0",
        has_tempratures: "0",
        image: "",
      },
      flavourList: [],
      toppingList: [],
      temperatureList: [],
      typeObj: {},
      type: "",
      index: "",
      innerType: "",
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

    saveItem() {
      if (this.type == "FLAVOUR") {
        if (this.innerType == "ADD") {
          this.flavourList.push(this.typeObj);
        } else {
          this.flavourList[this.index] = this.typeObj;
          this.$set(this.flavourList, this.index, this.flavourList[this.index]);
        }
      }
      if (this.type == "TOPPING") {
        if (this.innerType == "ADD") {
          this.toppingList.push(this.typeObj);
        } else {
          this.toppingList[this.index] = this.typeObj;
          this.$set(this.toppingList, this.index, this.toppingList[this.index]);
        }
      }
      if (this.type == "TEMPERATURE") {
        if (this.innerType == "ADD") {
          this.temperatureList.push(this.typeObj);
        } else {
          this.temperatureList[this.index] = this.typeObj;
          this.$set(this.temperatureList, this.index, this.temperatureList[this.index]);
        }
      }
      $("#addItem").modal("hide");
    },
    removeItem(index, type) {
      this.type = type;
      this.index = index;
      $("#Delete").modal("show");
    },
    removeRecord() {
      if (this.type == "FLAVOUR") {
        this.flavourList.splice(this.index, 1);
      }
      if (this.type == "TOPPING") {
        this.toppingList.splice(this.index, 1);
      }
      if (this.type == "TEMPERATURE") {
        this.temperatureList.splice(this.index, 1);
      }
      $("#Delete").modal("hide");
    },
    save() {
      this.product.flavours = this.flavourList;
      this.product.toppings = this.toppingList;
      this.product.tempratures = this.temperatureList;
      if (this.product.uuid) {
        this.$api
          .putAPI({
            _action: "item/info/" + this.product.uuid,
            _body: this.product,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.product.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/product");
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
            _body: this.product,
            _buttonId: "save-btn",
            _hide_loader: true,
          })
          .then((res) => {
            this.product.uuid = res.uuid;
            if (this.file) {
              this.uploadFile();
            } else {
              router.push("/product");
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
          _action: "/item/image/" + this.product.id,
          _key: "image",
          _file: this.file,
          _body: this.product,
        })
        .then((res) => {
          this.$noty.success("" + "Successfully Uploaded", {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          router.push("/product");
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
          _action: "/items/" + this.product.uuid,
        })
        .then((res) => {
          this.product = res.info;

          for (var i = 0; i < this.product.options.length; i++) {
            if (this.product.options[i].title == "FLAVOUR") {
              this.flavourList = this.product.options[i].values;
            }
            if (this.product.options[i].title == "TOPPINGS") {
              this.toppingList = this.product.options[i].values;
            }
            if (this.product.options[i].title == "TEMPRATURES") {
              this.temperatureList = this.product.options[i].values;
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
        router.push("/product");
      } else {
        this.action = "ADD";
      }
    }

    if (this.$route.params.uuid) {
      this.product.uuid = this.$route.params.uuid;
      this.getDetail();
    }
    this.getSelectBox();

    this.$validator.reset();
    this.errors.clear();
  },
};
</script>
