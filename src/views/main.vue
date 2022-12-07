<template>
  <div>
    <Menu />
    <div class="content">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Breadscrumb from "@/components/Breadscrumb";

export default {
  name: "Main",
  components: {
    Header,
    Menu,
    Footer,
    Breadscrumb
  }
};
</script>
