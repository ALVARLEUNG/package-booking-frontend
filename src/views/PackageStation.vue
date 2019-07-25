<template>
  <div>
    <div style="text-align: left;float: left"><h3><strong>菜鸟驿站</strong></h3></div>
    <div style="text-align: right">
    <el-button @click="initTable">ALL</el-button>
    <el-button @click="filterTable('Appointment')">已预约</el-button>
    <el-button @click="filterTable('Completed')">已取件</el-button>
    <el-button @click="filterTable('UnAppointment')">未取件</el-button>
      <el-button @click="showDialog">添加</el-button>
    </div>
    <el-table
      :data="expressPackage"
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
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="expressPackage" status-icon  ref="packageForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="运单号：" prop="id" :rules="[{ required: true, message: '订单号不能为空'}]">
          <el-input v-model="expressPackage.id"></el-input>
        </el-form-item>
        <el-form-item label="收件人：" prop="name" :rules="[{ required: true, message: '收件人不能为空'}]">
          <el-input v-model="expressPackage.name"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phoneNumber" :rules="[{ required: true, message: '电话不能为空'},{ type: 'number', message: '电话必须是数字'}]">
          <el-input v-model.number="expressPackage.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="重量：" prop="weight">
          <el-input v-model.number="expressPackage.weight"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel('packageForm')">取 消</el-button>
    <el-button type="primary" @click="addPackage('packageForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PackageStation',
  data () {
    return {
      expressPackage: {
        id: '',
        name: '',
        phoneNumber: '',
        status: '',
        time: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    },
    addPackage (formName) {
      this.postPackAge(formName)
    },
    initTable () {
      axios.get('http://localhost:8099/expressPackage')
        .then(response=> {
          // handle success
          this.$store.commit('initPackageList', response.data)
          this.expressPackage = this.$store.state.packageList;
        })
    },
    async postPackAge (formName) {
      axios.post('http://localhost:8099/expressPackage',{id: this.expressPackage.id,
        name: this.expressPackage.name,
        phoneNumber: this.expressPackage.phoneNumber,
        status: 'UnAppointment',
        time: new Date().getUTCDate() })
        .then(response=> {
          this.$message.success('提交成功')
          this.$refs[formName].resetFields()
          this.dialogVisible = false
          this.initTable()
        })
    },
    filterTable(status) {
      this.expressPackage = this.$store.state.packageList.filter(item => item.status === status);
    },
    confirm(item) {
      axios.post('http://localhost:8099/expressPackage',{id: item.id,
        name: item.name,
        phoneNumber: item.phoneNumber,
        status: 'Completed',
        time: new Date().getUTCDate() })
        .then(response=> {
          this.$message.success('确认成功！')
          this.initTable()
        })
    }
  },
  mounted () {
    this.initTable()
  }
}
</script>

<style scoped>

</style>
