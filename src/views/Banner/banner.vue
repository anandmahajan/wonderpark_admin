<template>
  <div>
    <div class="content-body">
      <div class="component-section mt-2 mb-4">
        <div class="row mb-3">
          <div class="col-md-3">
            <div>
              <select
                class="custom-select"
                name="placeholder_pos"
                v-model="filterObj.placeholder_pos"
                placeholder="Banner Placeholder POS"
                v-on:change="getList(1)"
              >
                <option value>Select banner position</option>
                <option value="TOP">Top</option>
                <option value="BOTTOM">Bottom</option>
              </select>
            </div>
          </div>
          <div class="col-md-9 text-md-right">
            <button type="button" class="btn btn-brand-01" @click="addbanner()">
              + Add {{ $lang.messages.add_banner }}
            </button>
          </div>
        </div>

        <div class="card card-body">
          <div class="table-responsive">
            <table class="table table-primary table-hover table-striped mg-b-0">
              <thead>
                <tr>
                  <th scope="col">Sr. no.</th>
                  <th scope="col">Banners</th>
                  <th scope="col">Placement</th>
                  <th scope="col">{{ $lang.messages.action }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in list" :key="item.id">
                  <td>{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>

                  <td>
                    <img
                      :src="
                        item.image ? item.image : '/static/img/upload-placeholder.jpg'
                      "
                      width="100"
                    />
                  </td>
                  <td>{{ item.placeholder_pos }}</td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-info btn-sm"
                      @click="editbanner(item.id)"
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
              ref="bannerPagination"
            />
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
  </div>
</template>
<script>
import router from "../../router";
import Pagination from "@/components/Pagination";
import ErrorComponent from "@/components/ErrorComponent";
import Multiselect from "vue-multiselect";
export default {
  name: "City",
  components: {
    Pagination,
    ErrorComponent,
    Multiselect,
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
        sort: "title",
        order: "asc",
        row_per_page: 10,
        placeholder_pos: "",
      },
    };
  },
  methods: {
    pageChange(page) {
      this.getList(page);
    },
    itemsPerPageChange() {
      this.itemsPerPage = this.$refs.bannerPagination.itemsPerPage;
      this.getList(1);
    },

    retry() {
      this.getList(1);
    },
    addbanner() {
      this.$shareService.setMapValue("action", "ADD");
      this.$shareService.setMapValue("banner_search", this.filterObj.keyword);
      this.$shareService.setMapValue("banner_page", this.currentPage);
      router.push("/add-banner");
    },
    editbanner(id) {
      this.$shareService.setMapValue("action", "EDIT");
      this.$shareService.setMapValue("banner_search", this.filterObj.keyword);
      this.$shareService.setMapValue("banner_page", this.currentPage);
      router.push("/edit-banner/" + id);
    },

    viewbanner(id) {
      this.$shareService.setMapValue("action", "EDIT");
      this.$shareService.setMapValue("banner_search", this.filterObj.keyword);
      this.$shareService.setMapValue("banner_page", this.currentPage);
      router.push("/sub-banner/" + id);
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
      this.filterObj.offset = page - 1;
      this.currentPage = page;
      this.filterObj.row_per_page = this.itemsPerPage;

      if (sortBy) {
        this.filterObj.sort = sortBy;
      }
      if (orderBy) {
        this.filterObj.order = orderBy;
      }

      this.list = [];

      this.$api
        .getAPI({
          _action: "banners",
          _body: this.filterObj,
        })
        .then((res) => {
          this.list = res.list;
          if (res.count != null && res.count > 0) {
            if (this.$refs.bannerPagination) {
              this.$refs.bannerPagination.setTotalCount(res.count);
            }
          } else {
            if (this.$refs.bannerPagination) {
              this.$refs.bannerPagination.setTotalCount(0);
            }
          }

          if (!res.list || res.list.length <= 0) {
            if (this.$refs.errorComponent) {
              this.$refs.errorComponent.setTitle(this.$lang.messages.no_banner_found);
            }
          } else {
            if (this.$refs.errorComponent) {
              if (this.$refs.errorComponent.isShowMessage()) {
                this.$refs.errorComponent.setTitle();
              }
            }
          }
          if (this.$refs.bannerPagination) {
            this.$refs.bannerPagination.currentPage = this.currentPage;
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
    if (this.$shareService.getMapValue("banner_search")) {
      this.filterObj.keyword = this.$shareService.getMapValue("banner_search");
      this.$shareService.deleteMapValue("banner_search");
    }

    var tabValue1 = this.$shareService.getMapValue("banner_page");

    setTimeout(() => {
      if (tabValue1 != null && tabValue1 != "") {
        this.getList(this.$shareService.getMapValue("banner_page"));
        this.$shareService.deleteMapValue("banner_page");
      } else {
        this.getList(1);
      }
    }, 200);
  },
};
</script>
