<template>
  <div>
    <div style="text-align: left;float: left"><h3><strong>菜鸟驿站</strong></h3></div>
    <div style="text-align: right">
      <FilterButton></FilterButton>
    </div>
    <el-table
      :data="packageList"
      stripe
      style="width: 100%;text-align: center">
      <el-table-column
        prop="id"
        label="运单号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="收件人"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="电话">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==='Completed'">已取件</span>
          <span v-if="scope.row.status==='Appointment'">已预约</span>
          <span v-if="scope.row.status==='UnAppointment'">未预约</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间">
      </el-table-column>
      <el-table-column
        label="确认收货">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!=='Completed'" @click="confirm(scope.row)">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <CreatePackageDialog @initTable="initTable"></CreatePackageDialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import FilterButton from '@/components/FilterButton.vue'
  import CreatePackageDialog from '@/components/CreatePackageDialog.vue'
  export default {
    name: 'PackageStation',
    components: {
      FilterButton,
      CreatePackageDialog
    },
    data () {
      return {
        packageList: []
      }
    },
    methods: {
      initTable () {
        axios.get('http://localhost:8099/expressPackage')
          .then(response => {
            this.$store.commit('initPackageList', response.data)
            this.packageList = this.$store.state.packageList
          })
      },
      filterTable (status) {
        if(status === 'ALL') this.initTable()
        this.packageList = this.$store.state.packageList.filter(item => item.status === status)
      },
      confirm (item) {
        axios.post('http://localhost:8099/expressPackage', {
          id: item.id,
          name: item.name,
          phoneNumber: item.phoneNumber,
          status: 'Completed'
        })
          .then(response => {
            this.initTable();
            this.$message.success('确认成功！')
          })
      }
    },
    mounted () {
      this.initTable()
    },
    watch: {
      '$store.state.status'(newValue){
        this.filterTable(newValue)
      }
    }
  }
</script>

<style scoped>

</style>
