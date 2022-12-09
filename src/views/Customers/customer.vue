<template>
  <div>
    <div class="content-body">
      <div class="component-section mt-2 mb-4">
        <div class="row mb-3">
          <div class="col-md-3">
            <div class="search-form">
              <input
                type="text"
                class="form-control"
                v-model="filterObj.keyword"
                v-bind:placeholder="$lang.messages.search_enter"
                v-on:keyup.enter="getList(1)"
              />
              <div class="input-group-prepend">
                <button
                  class="btn bg-white"
                  type="button"
                  id="button-addon1"
                  @click="getList(1)"
                >
                  <img src="/static/img/search.svg" width="15" />
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-9 text-md-right">
            <button type="button" class="btn btn-brand-01" @click="addCustomer()">
              + {{ $lang.messages.add_customer }}
            </button>
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
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
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
                <button type="button" class="btn btn-brand-01" @click="deletebanner()">
                  Delete
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-outline-primary"
                  id="delete-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-body">
          <div class="table-responsive">
            <table class="table table-primary table-hover table-striped mg-b-0">
              <thead>
                <tr>
                  <th scope="col">Sr. no.</th>
                  <th scope="col">
                    {{ $lang.messages.name }}
                  </th>
                  <th scope="col">
                    {{ $lang.messages.email }}
                  </th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">{{ $lang.messages.action }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in list" :key="item.id">
                  <td>{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                  <td>{{ item.full_name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.mobile_number }}</td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-info btn-sm"
                      @click="editCustomer(item.id)"
                    >
                      {{ $lang.messages.edit }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      data-toggle="modal"
                      data-target="#Delete"
                      @click="setId(item.id)"
                    >
                      {{ $lang.messages.delete }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- table-responsive -->
        </div>
      </div>
      <!-- component-section -->

      <ErrorComponent @retry="getList(1)" ref="errorComponent" />
      <div class="row">
        <div class="col-lg-12 mt-5 text-center">
          <div class="page-bottom-pagination text-right">
            <Pagination
              @page-change="pageChange"
              @items-per-page-change="itemsPerPageChange"
              ref="CategoryPagination"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import Pagination from "@/components/Pagination";
import ErrorComponent from "@/components/ErrorComponent";
export default {
  name: "Category",
  components: {
    Pagination,
    ErrorComponent,
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 0,
      itemsPerPage: 10,
      list: [],
      filterObj: {
        keyword: "",
        offset: 1,
        sort: "name",
        order: "asc",
        row_per_page: 10,
      },
    };
  },
  methods: {
    pageChange(page) {
      this.getList(page);
    },
    itemsPerPageChange() {
      this.itemsPerPage = this.$refs.CategoryPagination.itemsPerPage;
      this.getList(1);
    },

    retry() {
      this.getList(1);
    },
    addCustomer() {
      this.$shareService.setMapValue("action", "ADD");
      this.$shareService.setMapValue("customer_search", this.filterObj.keyword);
      this.$shareService.setMapValue("customer_page", this.currentPage);
      router.push("/add-customer");
    },
    editCustomer(id) {
      this.$shareService.setMapValue("action", "EDIT");
      this.$shareService.setMapValue("customer_search", this.filterObj.keyword);
      this.$shareService.setMapValue("customer_page", this.currentPage);
      router.push("/edit-customer/" + id);
    },
    setId(id) {
      this.delete_id = id;
    },
    deletebanner() {
      this.$api
        .deleteAPI({
          _action: "banner/" + this.delete_id,
        })
        .then((res) => {
          this.delete_id = "";
          this.getList(1);
          document.getElementById("delete-btn").click();
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
        });
    },

    getList(page, sortBy, orderBy) {
      if (sortBy) {
        this.filterObj.sort = sortBy;
      }
      if (orderBy) {
        this.filterObj.order = orderBy;
      }

      this.filterObj.offset = page - 1;
      this.currentPage = page;
      this.filterObj.row_per_page = this.itemsPerPage;

      this.filterObj.parent_id = 0;

      this.list = [];

      this.$api
        .getAPI({
          _action: "customers",
          _body: this.filterObj,
        })
        .then((res) => {
          this.list = res.list;
          if (res.count != null && res.count > 0) {
            if (this.$refs.CategoryPagination) {
              this.$refs.CategoryPagination.setTotalCount(res.count);
            }
          } else {
            if (this.$refs.CategoryPagination) {
              this.$refs.CategoryPagination.setTotalCount(0);
            }
          }

          if (!res.list || res.list.length <= 0) {
            if (this.$refs.errorComponent) {
              this.$refs.errorComponent.setTitle(this.$lang.messages.no_category_found);
            }
          } else {
            if (this.$refs.errorComponent) {
              if (this.$refs.errorComponent.isShowMessage()) {
                this.$refs.errorComponent.setTitle();
              }
            }
          }
          if (this.$refs.CategoryPagination) {
            this.$refs.CategoryPagination.currentPage = this.currentPage;
          }
        })
        .catch((e) => {
          this.$noty.error("" + e.message, {
            timeout: 2000,
            layout: "topCenter",
            theme: "semanticui",
          });
          if (this.$refs.errorComponent) {
            this.$refs.errorComponent.setTitle();
          }
        });
    },
  },
  mounted() {
    if (this.$shareService.getMapValue("customer_search")) {
      this.filterObj.keyword = this.$shareService.getMapValue("customer_search");
      this.$shareService.deleteMapValue("customer_search");
    }

    var tabValue1 = this.$shareService.getMapValue("customer_page");

    setTimeout(() => {
      if (tabValue1 != null && tabValue1 != "") {
        this.getList(this.$shareService.getMapValue("customer_page"));
        this.$shareService.deleteMapValue("customer_page");
      } else {
        this.getList(1);
      }
    }, 200);
  },
};
</script>
