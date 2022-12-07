<template>
  
      <div  role="document">
        <div class="modal-dialog modal-dialog-centered modal-md">
        
        <div class="modal-content px-lg-4 py-lg-4">
          <div class="modal-header border-0">
            <h5 class="modal-title font-22">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeBtn">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body form-style">
            <div class="row">
              <div class="col-lg-12">
                <p>{{message}}</p>
               
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 justify-content-center">
            <button type="button"  v-bind:class="{ disabled: showLoader }"   v-if="rightButton"
          @click="onClick()"  class="btn btn-primary mr-3">{{rightButton}}</button>
            <button  v-if="leftButton" class="btn btn-outline-primary" data-dismiss="modal" @click="onLeftButtonClick()" >{{leftButton}}</button>
          </div>
        </div>
        </div>
      </div>
   


</template>
<script>
export default {
  name: "Alert",
  data() {
    return {

      message: "",
      value: null,
      showLoader:false
    };
  },
  props: {
    leftButton: {
      type: String,
      default: this.$lang.messages.no
    },
    rightButton: {
      type: String,
      default: this.$lang.messages.yes
    },
    title: {
      title: String,
      default: this.$lang.messages.alert
    }
  },
  methods: {
    onClick() {
      this.showLoader = true;
      this.$emit("rightButtonEvent", this.value);
     
    },
    onLeftButtonClick(){
 this.$emit("leftButtonEvent");
    },
    setValue(value) {
      this.removeLoader();
      this.value = value;
    },

    close() {
      this.removeLoader();
      var elem =   this.$refs.closeBtn
      elem.click()
    },
    removeLoader() {
      this.showLoader = false;
    }
  }
};
</script>