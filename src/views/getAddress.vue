<template>
<div style="background-color: orange;
    position: absolute;
    width: 400px;
    height: 350px;
    margin-left:38%;
    margin-top: 8%;
    top: auto;
    left: auto;
    box-shadow:inset 2px 2px 5px #000;
    background: #FFFFFF;
    border-radius: 20px;
">
<!--  width: 400px;-->
<!--  height: 300px;-->
<!--  background-color: white;-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  margin: auto;-->

  <el-form :model="ruleForm" style="margin-top: 80px;margin-left:10px;height: 500px;width: 300px" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="IP" prop="ip">
      <el-input type="text" v-model="ruleForm.ip" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口" prop="port">
      <el-input type="text" v-model="ruleForm.port" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">跳转</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
</template>
<script>

</script>
<script>
export default {
  name: "getAddress",
  data() {
    return {
      ruleForm: {
        ip: '',
        port: '',
      },
      rules: {
        // ip: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // port: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ]
      }
    };

  },

  methods: {
    goToPage(){
      this.$router.push({
        path:'/page4',
        query: {
          ip:this.ruleForm.ip,
          port:this.ruleForm.port
      }});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功');
          //跳转到数据展示页面
          this.goToPage();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style scoped>

</style>