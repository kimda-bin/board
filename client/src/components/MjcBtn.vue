<template>
  <div
    class="mjc-btn"
    :style="{
      background: background || '#eee',
      color: fontcolor || '#000',
    }"
    @click="btnClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["label", "background", "fontcolor"],
  mounted() {
    console.log(this.label);
  },
  methods: {
    btnClick() {
      this.$emit("click", this.background);
      this.$emit("changeBackground", "#ffff00");
    },
  },
};
</script>

<style scoped>
.mjc-btn {
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
</style>