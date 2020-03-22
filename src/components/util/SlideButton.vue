<template>
  <div class="slideButton">
      <span class="switch" :class="{on:isShow}" @click.stop="switchDepartment" style="cursor: pointer;">
					<div class="switch-circle" :class={right:isShow}></div>
				</span>
  </div>
</template>

<script>
  import {AxiosInstance as axios} from "axios";

  export default {
    name: "clientCreate",
    data() {
      return {
        isShow:false
      }
    },
    created: function () {
      // this.$axios.get('/banner/showPictureDetail')
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    mounted: function () {

    },
    methods: {

      switchDepartment:function(){
        this.isShow=!this.isShow;
      },

    }
  }
</script>

<style scoped>

  .switch {
    display: inline-block;
    width: 30px;
    height: 15px;
    background: #DBDBDB;
    border-radius: 15px;
    position: relative;
    #vertical-align: middle;
    margin-left: 0px;
  }
  .switch-circle{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background: #FFFFFF;
  }
  .on{
    background: -webkit-linear-gradient(left, #1823DB, #9CDD97); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #1823DB, #9CDD97 ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #1823DB , #9CDD97); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #1823DB, #9CDD97); /* 标准的语法（必须放在最后） */
  }
  .right{
    transform :translateX(15px)
  }
</style>
