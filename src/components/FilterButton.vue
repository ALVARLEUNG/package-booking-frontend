<template>
  <div>
    <el-button @click="filterTable('ALL')">ALL</el-button>
    <el-button @click="filterTable('Appointment')">已预约</el-button>
    <el-button @click="filterTable('Completed')">已取件</el-button>
    <el-button @click="filterTable('UnAppointment')">未取件</el-button>
    <el-button @click="showDialog">添加</el-button>
  </div>
</template>

<script>
  export default {
    name: 'FilterButton',
    methods: {
      showDialog () {
        this.$store.commit('changeDialogVisible', true)
      },
      filterTable(status){
        this.$store.commit('filterStatus', status)
      }
    }
  }
</script>

<style scoped>

</style>
