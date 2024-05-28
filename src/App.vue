<template>
  <div id="app">
    <h1 style="text-align: left; margin-left: 40px">预测</h1>
    <el-divider></el-divider>
    <div class="form-container">
<!--      需要非空校验-->
      <el-form ref="form" :model="formData" label-width="80px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="性别：" style="font-weight: bold;">
              <el-radio-group v-model="formData.gender">
                <el-radio label="Male">男</el-radio>
                <el-radio label="Female">女</el-radio>
                <el-radio label="Other">其他</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="年龄：" style="font-weight: bold;">
              <el-input type="number" v-model="formData.age" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="高血压：" style="font-weight: bold;">
              <el-radio-group v-model="formData.hypertension">
                <el-radio label="0">没有</el-radio>
                <el-radio label="1">有</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="心脏病：" style="font-weight: bold;">
              <el-radio-group v-model="formData.heard_disease">
                <el-radio label="0">没有</el-radio>
                <el-radio label="1">有</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="婚否：" style="font-weight: bold;">
              <el-radio-group v-model="formData.ever_married">
                <el-radio label="Yes">是</el-radio>
                <el-radio label="No">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="工作类型：" style="font-weight: bold;">
              <!--              童工、公务员、未工作、自营职业或私营职业-->
              <el-select v-model="formData.work_type" placeholder="请选择">
                <el-option label="童工" value="children"></el-option>
                <el-option label="公务员" value="Govt_job"></el-option>
                <el-option label="未工作" value="Never_worked"></el-option>
                <el-option label="自营职业" value="Private"></el-option>
                <el-option label="私营职业" value="Self-employed"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="4">
            <el-form-item label="住宅类型：" style="font-weight: bold;">
              <el-select v-model="formData.residence_type">
                <el-option label="农村" value="Rural"></el-option>
                <el-option label="城市" value="Urban"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="血液中的平均葡萄糖水平：" style="font-weight: bold;">
              <el-input type="number" v-model="formData.avg_glucose_level" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="体重指数：" style="font-weight: bold;">
              <el-input type="number" v-model="formData.bmi" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="吸烟史：" style="font-weight: bold;">
              <el-select v-model="formData.smoking_status">
                <el-option label="以前吸烟过" value="formerly smoked"></el-option>
                <el-option label="从未吸烟" value="never smoked"></el-option>
                <el-option label="吸烟" value="smokes"></el-option>
                <el-option label="未知" value="Unknown"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display: flex; align-items: center;">
            <span style="margin-left: 40px">模型选择：</span>
            <el-select v-model="formData.mode">
              <el-option label="逻辑回归" value="lg"></el-option>
              <el-option label="决策树" value="dt"></el-option>
              <el-option label="KNN" value="knn"></el-option>
              <el-option label="贝叶斯算法建模" value="by"></el-option>
              <el-option label="支持向量机" value="svn"></el-option>
              <el-option label="随机森林" value="rf"></el-option>
            </el-select>
            <el-button type="primary" @click="predictButtonHandler" style="margin-left: 40px">预测</el-button>

            <div style="margin-left: 40px">
              <span v-if="res == 1" style="color: red">中风</span>
              <span v-else-if="res == 0">不中风</span>
            </div>

          </el-col>
        </el-row>
      </el-form>
    </div>


    <!--  ==============================================-->

    <h1 style="text-align: left; margin-left: 40px">模型训练</h1>
    <el-divider></el-divider>
    <!--    文件上传组件-->
    <!--    模型选择-->
    <el-row>
      <el-col :span="24" style="display: flex; align-items: center;">
        <span style="margin-left: 40px">模型选择：</span>
        <el-select v-model="mode">
          <el-option label="逻辑回归" value="lg"></el-option>
          <el-option label="决策树" value="dt"></el-option>
          <el-option label="KNN" value="knn"></el-option>
          <el-option label="贝叶斯算法建模" value="by"></el-option>
          <el-option label="支持向量机" value="svn"></el-option>
          <el-option label="随机森林" value="rf"></el-option>
        </el-select>


        <el-button type="warning" style="margin-left: 40px"
                   v-loading.fullscreen.lock="fullscreenLoading"
                   element-loading-text="拼命加载中"
                   @click="trainButtonHandler">训练</el-button>

      </el-col>
      <el-col :span="24" style="display: flex; align-items: center;">
        <span style="margin-left: 40px">上传数据集:</span>
        <el-upload style="margin-left: 20px;margin-top: 20px"
          class="upload-demo"
          drag
          action="http://localhost:8008/uploadFile"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传csv文件（我这边演示的是解析csv文件）</div>
        </el-upload>

      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data () {
    return {
      // 表单数据
      formData: {
        gender: '',
        age: 18,
        hypertension: 2,
        heard_disease: 2,
        ever_married: '',
        work_type: '',
        residence_type: '',
        avg_glucose_level: 0,
        bmi: 0,
        smoking_status: '',
        mode: ''
      },
      //预测结果
      res: 2,
      mode: '',
      fullscreenLoading: false

    }
  },
  methods: {
    // 预测按钮事件
    predictButtonHandler () {
      console.log(this.formData)

      this.$http({
        method: 'post',
        url: '/predict',
        data: this.formData
      })
        .then(response => {

          if (response.data.code == 200){
            this.res = response.data.data
          }

        })
        .catch(error => {
          console.log(error.message)
        })

    },
    //训练按钮事件
    async trainButtonHandler () {
      console.log(this.mode)
      this.fullscreenLoading = true
      await this.$http({
        method: 'get',
        url: '/train',
        params: {
          mode: this.mode
        }
      })
        .then(response => {
          if (response.status == 200) {

            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 2000);

          }

        })
        .catch(error => {
          this.fullscreenLoading = false
          console.log(error.message)
        })
    }

  }
}
</script>

<style>
.form-container {
  display: flex;
  flex-wrap: wrap;
}

.el-row {
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


</style>
