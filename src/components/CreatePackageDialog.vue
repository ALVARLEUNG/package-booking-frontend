<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="this.$store.state.dialogVisible"
      width="30%"
    >
      <el-form :model="expressPackage" status-icon ref="packageForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="运单号：" prop="id" :rules="[{ required: true, message: '订单号不能为空'}]">
          <el-input v-model="expressPackage.id"></el-input>
        </el-form-item>
        <el-form-item label="收件人：" prop="name" :rules="[{ required: true, message: '收件人不能为空'}]">
          <el-input v-model="expressPackage.name"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phoneNumber"
                      :rules="[{ required: true, message: '电话不能为空'},{ type: 'number', message: '电话必须是数字'}]">
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
    name: 'CreatePackageDialog',
    data () {
      return {
        expressPackage: {
          id: '',
          name: '',
          phoneNumber: '',
          status: ''
        }
      }
    },
    methods: {
      cancel (formName) {
        this.$refs[formName].resetFields()
        this.$store.commit('changeDialogVisible', false)
      },
      addPackage (formName) {
        this.postPackAge(formName)
      },
      postPackAge (formName) {
        axios.post('http://localhost:8099/expressPackage', {
          id: this.expressPackage.id,
          name: this.expressPackage.name,
          phoneNumber: this.expressPackage.phoneNumber,
          status: 'UnAppointment'
        }).then(response => {
          this.$message.success('提交成功')
          this.$refs[formName].resetFields()
          this.$store.commit('changeDialogVisible', false)
          this.$emit('initTable')
        })
      }
    }
  }
</script>

<style scoped>

</style>
