<template>
  <footer class="footer">
    <div class="footer-inner">
      <p>© {{ year }} 智慧房屋租赁系统 · 专业 · 可信赖 · 高效</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #fff;
  border-top: 1px solid #e2e6e6;
  margin-top: auto;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-size: 13px;
  color: #6b7272;
}
</style>
