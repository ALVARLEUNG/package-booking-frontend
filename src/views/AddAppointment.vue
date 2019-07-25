<template>
  <div style="margin-top: 20px;width: 500px; text-align: center">
    <h1>预约取件</h1>
    <el-form :model="appointmentDto" ref="appointmentDto" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="订单号"
        prop="id"
        :rules="[
      { required: true, message: '订单号不能为空'},
      { type: 'number', message: '订单号必须是数字'}
    ]"
      >
        <el-input v-model.number="appointmentDto.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="时间"
        prop="time"
        :rules="[
      { required: true, message: '时间不能为空'},
    ]"
      >
        <el-date-picker
          v-model="appointmentDto.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('appointmentDto')">提交</el-button>
        <el-button @click="resetForm('appointmentDto')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'AddAppointment',
    data () {
      return {
        appointmentDto: {
          id: '',
          time: ''
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addAppointment(formName)
          } else {
            this.$message.error('提交失败')
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      async addAppointment (formName) {
        let _this = this;
        axios.put('http://localhost:8099/expressPackage/appointment',{id: this.appointmentDto.id, time: this.appointmentDto.time})
          .then(function (response) {
            // handle success
            if (response.status === 200) {
              _this.$message.success('提交成功')
              _this.$refs[formName].resetFields()
            }
          })
      }
    }
  }
</script>

<style scoped>
 >>>.el-input__inner {
   width: 220px;
 }
</style>
