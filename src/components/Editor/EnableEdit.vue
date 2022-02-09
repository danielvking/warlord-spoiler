<template>
  <header-footer> </header-footer>
</template>

<script>
import HeaderFooter from "@/components/Shared/HeaderFooter.vue";

export default {
  components: { HeaderFooter },
  name: "EnableEdit",
  mounted() {
    this.$store.commit("saveSettings", { isEditMode: true });
    this.$router.replace({ name: "searchPage" });
  },
};
</script>