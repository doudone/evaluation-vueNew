<template>
  <div id="base" class="">

    <!-- Unnamed (后台管理页) -->

    <!-- Unnamed (矩形) -->
    <div id="u1254" class="ax_default box_2">
      <div id="u1254_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1255" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u1256" class="ax_default box_2">
      <div id="u1256_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1257" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (图片) -->
    <div id="u1258" class="ax_default _图片">
      <img id="u1258_img" class="img " src="/static/images/banner___/u1018.png"/>
      <!-- Unnamed () -->
      <div id="u1259" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u1260" class="ax_default link_button">
      <div id="u1260_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1261" class="text" style="visibility: visible;">
        <p><span>admin</span></p>
      </div>
    </div>

    <!-- Unnamed (图片) -->
    <div id="u1262" class="ax_default _图片">
      <img id="u1262_img" class="img " src="/static/images/banner___/u1022.png"/>
      <!-- Unnamed () -->
      <div id="u1263" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div id="u1264" class="ax_default">

      <!-- Unnamed (矩形) -->
      <div id="u1265" class="ax_default box_2">
        <div id="u1265_div" class=""></div>
        <!-- Unnamed () -->
        <div id="u1266" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u1267" class="ax_default _三级标题">
        <div id="u1267_div" class=""></div>
        <!-- Unnamed () -->
        <div id="u1268" class="text" style="visibility: visible;">
          <p><span>企业管理</span></p>
        </div>
      </div>

      <!-- Unnamed (图片) -->
      <div id="u1269" class="ax_default _图片">
        <img id="u1269_img" class="img " src="/static/images/banner___/u1029.png"/>
        <!-- Unnamed () -->
        <div id="u1270" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>

      <!-- Unnamed (图片) -->
      <div id="u1271" class="ax_default _图片">
        <img id="u1271_img" class="img " src="/static/images/banner___/u1031.png"/>
        <!-- Unnamed () -->
        <div id="u1272" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (图片) -->
    <div id="u1273" class="ax_default _图片">
      <img id="u1273_img" class="img " src="/static/images/banner___/u1033.png"/>
      <!-- Unnamed () -->
      <div id="u1274" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u1275" class="ax_default box_2">
      <div id="u1275_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1276" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u1277" class="ax_default box_2">
      <div id="u1277_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1278" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
    <div id="u1279" class="ax_default _三级标题">
      <div id="u1279_div" class=""></div>
      <!-- Unnamed () -->
      <div id="u1280" class="text" style="visibility: visible;">
        <p><span>企业管理 / 企业咨询</span></p>
      </div>
    </div>

    <!-- Unnamed (组合) -->
    <div id="u1281" class="ax_default">

      <!-- Unnamed (矩形) -->
      <div id="u1282" class="ax_default label">
        <div id="u1282_div" class=""></div>
        <!-- Unnamed () -->
        <div id="u1283" class="text" style="visibility: visible;">
          <p><span>企业咨询</span></p>
        </div>
      </div>

      <!-- Unnamed (图片) -->
      <div id="u1284" class="ax_default _图片">
        <img id="u1284_img" class="img " src="/static/images/banner___/u1044.png"/>
        <!-- Unnamed () -->
        <div id="u1285" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>
    </div>
    <div id="u1041" class="ax_default">

      <!-- Unnamed (矩形) -->
      <div id="u1042" class="ax_default label">
        <div id="u1042_div" class=""></div>
        <!-- Unnamed () -->
        <div id="u1043" class="text" style="visibility: visible;" s>
          <a href="/banner" style="text-decoration:none"  tyle="cursor: pointer;">
            <p><span>Banner页设置</span></p>
          </a>
        </div>
      </div>

      <!-- Unnamed (图片) -->
      <div id="u1044" class="ax_default _图片">
        <img id="u1044_img" class="img " src="/static/images/banner___/u1044.png"/>
        <!-- Unnamed () -->
        <div id="u1045" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>
    </div>


    <!-- Unnamed (下拉列表框) -->
    <div id="u1286" class="ax_default droplist">
      <select id="u1286_input"v-model="BusinessConsulting.prodId">
        <option value="0">未选择您想了解的产品</option>
        <option v-for='item in Prod' :key="item.prodId" :value="item.prodId" style="color: black">
          {{item.name}}
        </option>
      </select>
    </div>

    <!-- Unnamed (下拉列表框) [footnote] -->
    <div id="u1286_ann" class="annotation"></div>

    <!-- Unnamed (组合) -->
    <div id="u1287" class="ax_default">

      <!-- Unnamed (文本框) -->
      <div id="u1288" class="ax_default text_field">
        <input id="u1288_input" type="text" v-model="BusinessConsulting.businessName" placeholder="请输入想要查询的公司"/>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u1289" class="ax_default box_2" v-on:click="getTotal()" style="cursor: pointer;">
        <div id="u1289_div" class=""></div>
        <!-- Unnamed () -->
        <div id="u1290" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>

      <!-- Unnamed (图片) -->
      <div id="u1291" class="ax_default _图片">
        <img id="u1291_img" class="img " src="/static/images/banner___/u1051.png"/>
        <!-- Unnamed () -->
        <div id="u1292" class="text" style="display: none; visibility: hidden">
          <p><span></span></p>
        </div>
      </div>
    </div>

    <!-- Unnamed (矩形) -->
<!--    <div id="u1293" class="ax_default box_2">-->
<!--      <div id="u1293_div" class=""></div>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1294" class="text" style="visibility: visible;">-->
<!--        <p><span>&nbsp;</span></p>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--    <div id="u1295" class="ax_default box_2">-->
<!--      <div id="u1295_div" class=""></div>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1296" class="text" style="display: none; visibility: hidden">-->
<!--        <p><span></span></p>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Unnamed (水平线) -->
<!--    <div id="u1297" class="ax_default line">-->
<!--      <img id="u1297_img" class="img " src="/static/images/banner___/u1061.png"/>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1298" class="text" style="display: none; visibility: hidden">-->
<!--        <p><span></span></p>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Unnamed (水平线) -->
<!--    <div id="u1299" class="ax_default line">-->
<!--      <img id="u1299_img" class="img " src="/static/images/banner___/u1063.png"/>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1300" class="text" style="display: none; visibility: hidden">-->
<!--        <p><span></span></p>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Unnamed (水平线) -->
<!--    <div id="u1301" class="ax_default line">-->
<!--      <img id="u1301_img" class="img " src="/static/images/banner___/u1063.png"/>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1302" class="text" style="display: none; visibility: hidden">-->
<!--        <p><span></span></p>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Unnamed (水平线) -->
<!--    <div id="u1303" class="ax_default line">-->
<!--      <img id="u1303_img" class="img " src="/static/images/banner___/u1063.png"/>-->
<!--      &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--      <div id="u1304" class="text" style="display: none; visibility: hidden">-->
<!--        <p><span></span></p>-->
<!--      </div>-->
<!--    </div>-->

    <!-- Unnamed (图片) -->
    <div id="u1305" class="ax_default _图片">
      <v-pagination :total="page.total" :display="page.display" :current="page.current" @pagechange="changePage()" ref="pageUtil">
      </v-pagination>
      <!-- Unnamed () -->
      <div id="u1306" class="text" style="display: none; visibility: hidden">
        <p><span></span></p>
      </div>
    </div>

    <!-- Unnamed (下拉列表框) -->
    <div id="u1307" class="ax_default droplist">
      <select id="u1307_input" v-model="BusinessConsulting.companySizeId">
        <option value="0">未选择公司规模</option>
        <option v-for='item in CompanySize' :key="item.companySizeId" :value="item.companySizeId" style="color: black">
          {{item.companySize}}
        </option>
      </select>
    </div>

    <div class="table-b">
      <table width="1000px" border="0" cellspacing="20" cellpadding="0" >
        <tr class="text" style="visibility: visible;height:17px;">
          <td width="5%" class="text">序号</td>
          <td width="10%" class="text">公司名称</td>
          <td width="10%" class="text">公司规模</td>
          <td width="5%" class="text">姓名</td>
          <td width="10%" class="text">电话</td>
          <td width="15%" class="text">邮箱</td>
          <td width="10%" class="text">公司职务</td>
          <td width="15%" class="text">想了解的产品</td>
          <td width="10%" class="text">备注</td>
        </tr>
        <tr class="text" style="visibility: visible;height:17px;" v-for="(p,index) in businessConsultings">
          <td width="29">{{(page.current-1)*page.limit+index+1}}</td>
          <td width="57">{{p.businessName}}</td>
          <td width="57">{{p.companySize}}&nbsp;</td>
          <td width="29">{{p.name}}&nbsp; &nbsp;</td>
          <td width="29"> {{p.phone}}</td>
          <td width="29">{{p.email}}</td>
          <td width="29"> {{p.positionName}}</td>
          <td width="57"> {{p.prodName}}</td>
          <td width="29">{{p.node}}</td>
        </tr>
      </table>
    </div>

<!--    &lt;!&ndash; Unnamed (组合) &ndash;&gt;-->
<!--    <div id="u1345" class="ax_default">-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1346" class="ax_default label">-->
<!--        <div id="u1346_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1347" class="text" style="visibility: visible;">-->
<!--          <p><span>1</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1348" class="ax_default label">-->
<!--        <div id="u1348_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1349" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1350" class="ax_default label">-->
<!--        <div id="u1350_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1351" class="text" style="visibility: visible;">-->
<!--          <p><span>50人</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1352" class="ax_default label">-->
<!--        <div id="u1352_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1353" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1354" class="ax_default label">-->
<!--        <div id="u1354_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1355" class="text" style="visibility: visible;">-->
<!--          <p><span>13383838</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1356" class="ax_default label">-->
<!--        <div id="u1356_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1357" class="text" style="visibility: visible;">-->
<!--          <p><span>543773@qq.com</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1358" class="ax_default label">-->
<!--        <div id="u1358_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1359" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1360" class="ax_default label">-->
<!--        <div id="u1360_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1361" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1362" class="ax_default label">-->
<!--        <div id="u1362_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1363" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Unnamed (组合) &ndash;&gt;-->
<!--    <div id="u1364" class="ax_default">-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1365" class="ax_default label">-->
<!--        <div id="u1365_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1366" class="text" style="visibility: visible;">-->
<!--          <p><span>1</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1367" class="ax_default label">-->
<!--        <div id="u1367_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1368" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1369" class="ax_default label">-->
<!--        <div id="u1369_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1370" class="text" style="visibility: visible;">-->
<!--          <p><span>50人</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1371" class="ax_default label">-->
<!--        <div id="u1371_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1372" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1373" class="ax_default label">-->
<!--        <div id="u1373_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1374" class="text" style="visibility: visible;">-->
<!--          <p><span>13383838</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1375" class="ax_default label">-->
<!--        <div id="u1375_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1376" class="text" style="visibility: visible;">-->
<!--          <p><span>543773@qq.com</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1377" class="ax_default label">-->
<!--        <div id="u1377_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1378" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1379" class="ax_default label">-->
<!--        <div id="u1379_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1380" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1381" class="ax_default label">-->
<!--        <div id="u1381_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1382" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; Unnamed (组合) &ndash;&gt;-->
<!--    <div id="u1383" class="ax_default">-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1384" class="ax_default label">-->
<!--        <div id="u1384_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1385" class="text" style="visibility: visible;">-->
<!--          <p><span>1</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1386" class="ax_default label">-->
<!--        <div id="u1386_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1387" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1388" class="ax_default label">-->
<!--        <div id="u1388_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1389" class="text" style="visibility: visible;">-->
<!--          <p><span>50人</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1390" class="ax_default label">-->
<!--        <div id="u1390_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1391" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1392" class="ax_default label">-->
<!--        <div id="u1392_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1393" class="text" style="visibility: visible;">-->
<!--          <p><span>13383838</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1394" class="ax_default label">-->
<!--        <div id="u1394_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1395" class="text" style="visibility: visible;">-->
<!--          <p><span>543773@qq.com</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1396" class="ax_default label">-->
<!--        <div id="u1396_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1397" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1398" class="ax_default label">-->
<!--        <div id="u1398_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1399" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Unnamed (矩形) &ndash;&gt;-->
<!--      <div id="u1400" class="ax_default label">-->
<!--        <div id="u1400_div" class=""></div>-->
<!--        &lt;!&ndash; Unnamed () &ndash;&gt;-->
<!--        <div id="u1401" class="text" style="visibility: visible;">-->
<!--          <p><span>XXXXXX</span></p>-->
<!--        </div>-->
<!--      </div>-->
    </div>

</template>

<script>
    import Page from '../util/Page'
    export default {
      name: "businessConsulting",
      components: {
        'v-pagination': Page,
      },
      data(){
          return{
            page: {
              total: '',
              //每页显示多少条数据
              display: 5,
              current: 1,
              limit:5
            },
            BusinessConsulting:{
              prodId:'0',
              companySizeId:'0',
              businessName:''
            },
            businessConsultings:{},
            CompanySize:{},
            Prod:{},
          }
      },
      methods:{
        getTotal(){
          let mybody = this;
          this.$axios({
            method:'post',
            url:'/banner/businessConsulting/getRows',
            data:{
              businessConsulting:{
                prodId:mybody.BusinessConsulting.prodId,
                businessName:mybody.BusinessConsulting.businessName,
                companySizeId: mybody.BusinessConsulting.companySizeId
              }
            }
          }).then( (response)=>{
            mybody.page.total = response.data;
            mybody.page.current=1;
            this.showDetail()
            console.log(response);
          })
        },showDetail(){
          let mybody = this;
          this.$axios({
            method:'post',
            url:'/banner/businessConsulting/findDetail',
            data:{
                businessConsulting:mybody.BusinessConsulting
                ,page: {
                  rows: mybody.page.total,
                  current: mybody.page.current,
                  limit:mybody.page.limit,
                },
            }
          }).then( (response)=>{
            mybody.businessConsultings = response.data;
            console.log(response);
          })
        },
        findAllSize(){
          let mybody = this;
          this.$axios.get('/orderDemo/findAllSize')
            .then( (response)=>{
              mybody.CompanySize = response.data;
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        findAllProd(){
          let mybody = this;
          this.$axios.get('/banner/businessConsulting/findAllProd')
            .then( (response)=>{
              mybody.Prod = response.data;
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        changePage(){
          this.page.current=this.$refs.pageUtil.current
          this.showDetail()
        }
      },created () {
        this.findAllProd()
        this.findAllSize()
        this.getTotal()
      }
    }
</script>

<style scoped>
  body {
    margin:0px;
    background-image:none;
    position:static;
    left:auto;
    width:1204px;
    margin-left:0;
    margin-right:0;
    text-align:left;
  }
   .table-b table td{
     position:relative;
     left:190px;
     top:175px;
   }

    #base {
    position:absolute;
    z-index:0;
  }
  #u1254_div {
    position:absolute;
    left:0px;
    top:0px;
    width:1040px;
    height:59px;
    background:inherit;
    background-color:rgba(56, 136, 229, 1);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1254 {
    position:absolute;
    left:164px;
    top:-5px;
    width:1040px;
    height:59px;
  }
  #u1255 {
    position:absolute;
    left:2px;
    top:22px;
    width:1036px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1256_div {
    position:absolute;
    left:0px;
    top:0px;
    width:151px;
    height:708px;
    background:inherit;
    background-color:rgba(0, 32, 64, 1);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    color:#002F5E;
  }
  #u1256 {
    position:absolute;
    left:13px;
    top:-5px;
    width:151px;
    height:708px;
    color:#002F5E;
  }
  #u1257 {
    position:absolute;
    left:2px;
    top:346px;
    width:147px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1258_img {
    position:absolute;
    left:0px;
    top:0px;
    width:30px;
    height:30px;
  }
  #u1258 {
    position:absolute;
    left:1093px;
    top:11px;
    width:30px;
    height:30px;
  }
  #u1259 {
    position:absolute;
    left:2px;
    top:7px;
    width:26px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1260_div {
    position:absolute;
    left:0px;
    top:0px;
    width:40px;
    height:20px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    color:#FFFFFF;
  }
  #u1260 {
    position:absolute;
    left:1128px;
    top:17px;
    width:40px;
    height:20px;
    color:#FFFFFF;
  }
  #u1261 {
    position:absolute;
    left:2px;
    top:2px;
    width:36px;
    white-space:nowrap;
  }
  #u1262_img {
    position:absolute;
    left:0px;
    top:0px;
    width:20px;
    height:20px;
  }
  #u1262 {
    position:absolute;
    left:1168px;
    top:18px;
    width:20px;
    height:20px;
  }
  #u1263 {
    position:absolute;
    left:2px;
    top:2px;
    width:16px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1264 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1265_div {
    position:absolute;
    left:0px;
    top:0px;
    width:151px;
    height:44px;
    background:inherit;
    background-color:rgba(56, 136, 229, 1);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1265 {
    position:absolute;
    left:13px;
    top:66px;
    width:151px;
    height:44px;
  }
  #u1266 {
    position:absolute;
    left:2px;
    top:14px;
    width:147px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1267_div {
    position:absolute;
    left:0px;
    top:0px;
    width:82px;
    height:22px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    font-family:'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight:700;
    font-style:normal;
    color:#FFFFFF;
  }
  #u1267 {
    position:absolute;
    left:52px;
    top:77px;
    width:82px;
    height:22px;
    font-family:'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight:700;
    font-style:normal;
    color:#FFFFFF;
  }
  #u1268 {
    position:absolute;
    left:0px;
    top:0px;
    width:82px;
    word-wrap:break-word;
  }
  #u1269_img {
    position:absolute;
    left:0px;
    top:0px;
    width:25px;
    height:25px;
  }
  #u1269 {
    position:absolute;
    left:134px;
    top:74px;
    width:25px;
    height:25px;
  }
  #u1270 {
    position:absolute;
    left:2px;
    top:4px;
    width:21px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1271_img {
    position:absolute;
    left:0px;
    top:0px;
    width:20px;
    height:20px;
  }
  #u1271 {
    position:absolute;
    left:22px;
    top:78px;
    width:20px;
    height:20px;
  }
  #u1272 {
    position:absolute;
    left:2px;
    top:2px;
    width:16px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1273_img {
    position:absolute;
    left:0px;
    top:0px;
    width:76px;
    height:33px;
  }
  #u1273 {
    position:absolute;
    left:48px;
    top:8px;
    width:76px;
    height:33px;
  }
  #u1274 {
    position:absolute;
    left:2px;
    top:8px;
    width:72px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1275_div {
    position:absolute;
    left:0px;
    top:0px;
    width:1038px;
    height:653px;
    background:inherit;
    background-color:rgba(242, 242, 242, 1);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1275 {
    position:absolute;
    left:166px;
    top:55px;
    width:1038px;
    height:653px;
  }
  #u1276 {
    position:absolute;
    left:2px;
    top:318px;
    width:1034px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1277_div {
    position:absolute;
    left:0px;
    top:0px;
    width:1014px;
    height:562px;
    background:inherit;
    background-color:rgba(255, 255, 255, 1);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    color:#D7D7D7;
  }
  #u1277 {
    position:absolute;
    left:175px;
    top:96px;
    width:1014px;
    height:562px;
    color:#D7D7D7;
  }
  #u1278 {
    position:absolute;
    left:2px;
    top:273px;
    width:1010px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1279_div {
    position:absolute;
    left:0px;
    top:0px;
    width:269px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    font-family:'Arial Normal', 'Arial';
    font-weight:400;
    font-style:normal;
    font-size:14px;
  }
  #u1279 {
    position:absolute;
    left:177px;
    top:69px;
    width:269px;
    height:17px;
    font-family:'Arial Normal', 'Arial';
    font-weight:400;
    font-style:normal;
    font-size:14px;
  }
  #u1280 {
    position:absolute;
    left:0px;
    top:0px;
    width:269px;
    word-wrap:break-word;
  }
  #u1281 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1282_div {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
    color:#0099FF;
  }
  #u1282 {
    position:absolute;
    left:66px;
    top:131px;
    width:57px;
    height:17px;
    color:#0099FF;
  }
  #u1283 {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    white-space:nowrap;
  }
  #u1284_img {
    position:absolute;
    left:0px;
    top:0px;
    width:20px;
    height:20px;
  }
  #u1284 {
    position:absolute;
    left:42px;
    top:129px;
    width:20px;
    height:20px;
    color:#0099FF;
  }
  #u1285 {
    position:absolute;
    left:2px;
    top:2px;
    width:16px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1286 {
    position:absolute;
    left:189px;
    top:114px;
    width:112px;
    height:35px;
  }
  #u1286_input {
    position:absolute;
    left:0px;
    top:0px;
    width:112px;
    height:35px;
    font-family:'Arial Normal', 'Arial';
    font-weight:400;
    font-style:normal;
    font-size:13px;
    text-decoration:none;
    color:#000000;
  }
  #u1286_input:disabled {
    color:grayText;
  }
  #u1286_ann {
    position:absolute;
    left:294px;
    top:110px;
    width:1px;
    height:1px;
  }
  #u1287 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1288 {
    position:absolute;
    left:979px;
    top:118px;
    width:195px;
    height:35px;
  }
  #u1288_input {
    position:absolute;
    left:0px;
    top:0px;
    width:195px;
    height:35px;
    font-family:'Arial Normal', 'Arial';
    font-weight:400;
    font-style:normal;
    font-size:12px;
    text-decoration:none;
    color:#999999;
    text-align:left;
  }
  #u1289_div {
    position:absolute;
    left:0px;
    top:0px;
    width:44px;
    height:34px;
    background:inherit;
    background-color:rgba(153, 204, 255, 0.407843137254902);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1289 {
    position:absolute;
    left:1129px;
    top:119px;
    width:44px;
    height:34px;
  }
  #u1290 {
    position:absolute;
    left:2px;
    top:9px;
    width:40px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1291_img {
    position:absolute;
    left:0px;
    top:0px;
    width:30px;
    height:30px;
  }
  #u1291 {
    position:absolute;
    left:1144px;
    top:118px;
    width:30px;
    height:30px;
  }
  #u1292 {
    position:absolute;
    left:2px;
    top:7px;
    width:26px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1293_div {
    position:absolute;
    left:0px;
    top:0px;
    width:990px;
    height:50px;
    background:inherit;
    background-color:rgba(242, 242, 242, 1);
    box-sizing:border-box;
    border-width:1px;
    border-style:solid;
    border-color:rgba(228, 228, 228, 1);
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1293 {
    position:absolute;
    left:189px;
    top:176px;
    width:990px;
    height:50px;
  }
  #u1294 {
    position:absolute;
    left:2px;
    top:17px;
    width:986px;
    word-wrap:break-word;
  }
  #u1295_div {
    position:absolute;
    left:0px;
    top:0px;
    width:990px;
    height:341px;
    background:inherit;
    background-color:rgba(255, 255, 255, 1);
    box-sizing:border-box;
    border-width:1px;
    border-style:solid;
    border-color:rgba(228, 228, 228, 1);
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1295 {
    position:absolute;
    left:189px;
    top:226px;
    width:990px;
    height:341px;
  }
  #u1296 {
    position:absolute;
    left:2px;
    top:162px;
    width:986px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1297_img {
    position:absolute;
    left:0px;
    top:0px;
    width:991px;
    height:2px;
  }
  #u1297 {
    position:absolute;
    left:189px;
    top:279px;
    width:990px;
    height:1px;
  }
  #u1298 {
    position:absolute;
    left:2px;
    top:-8px;
    width:986px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1299_img {
    position:absolute;
    left:0px;
    top:0px;
    width:986px;
    height:2px;
  }
  #u1299 {
    position:absolute;
    left:189px;
    top:344px;
    width:985px;
    height:1px;
  }
  #u1300 {
    position:absolute;
    left:2px;
    top:-8px;
    width:981px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1301_img {
    position:absolute;
    left:0px;
    top:0px;
    width:986px;
    height:2px;
  }
  #u1301 {
    position:absolute;
    left:189px;
    top:413px;
    width:985px;
    height:1px;
  }
  #u1302 {
    position:absolute;
    left:2px;
    top:-8px;
    width:981px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1303_img {
    position:absolute;
    left:0px;
    top:0px;
    width:986px;
    height:2px;
  }
  #u1303 {
    position:absolute;
    left:189px;
    top:480px;
    width:985px;
    height:1px;
  }
  #u1304 {
    position:absolute;
    left:2px;
    top:-8px;
    width:981px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1305_img {
    position:absolute;
    left:0px;
    top:0px;
    width:423px;
    height:31px;
  }
  #u1305 {
    position:absolute;
    left:756px;
    top:601px;
    width:423px;
    height:31px;
  }
  #u1306 {
    position:absolute;
    left:2px;
    top:8px;
    width:419px;
    visibility:hidden;
    word-wrap:break-word;
  }
  #u1307 {
    position:absolute;
    left:317px;
    top:112px;
    width:79px;
    height:35px;
  }
  #u1307_input {
    position:absolute;
    left:0px;
    top:0px;
    width:79px;
    height:35px;
    font-family:'Arial Normal', 'Arial';
    font-weight:400;
    font-style:normal;
    font-size:13px;
    text-decoration:none;
    color:#000000;
  }
  #u1307_input:disabled {
    color:grayText;
  }
  #u1308_div {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1308 {
    position:absolute;
    left:292px;
    top:194px;
    width:57px;
    height:17px;
  }
  #u1309 {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    white-space:nowrap;
  }
  #u1310_div {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1310 {
    position:absolute;
    left:393px;
    top:194px;
    width:57px;
    height:17px;
  }
  #u1311 {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    white-space:nowrap;
  }
  #u1312_div {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1312 {
    position:absolute;
    left:502px;
    top:194px;
    width:29px;
    height:17px;
  }
  #u1313 {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    white-space:nowrap;
  }
  #u1314_div {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1314 {
    position:absolute;
    left:609px;
    top:194px;
    width:29px;
    height:17px;
  }
  #u1315 {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    white-space:nowrap;
  }
  #u1316_div {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1316 {
    position:absolute;
    left:744px;
    top:194px;
    width:29px;
    height:17px;
  }
  #u1317 {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    white-space:nowrap;
  }
  #u1318_div {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1318 {
    position:absolute;
    left:837px;
    top:194px;
    width:57px;
    height:17px;
  }
  #u1319 {
    position:absolute;
    left:0px;
    top:0px;
    width:57px;
    white-space:nowrap;
  }
  #u1320_div {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1320 {
    position:absolute;
    left:1104px;
    top:194px;
    width:29px;
    height:17px;
  }
  #u1321 {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    white-space:nowrap;
  }
  #u1322_div {
    position:absolute;
    left:0px;
    top:0px;
    width:71px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1322 {
    position:absolute;
    left:949px;
    top:194px;
    width:71px;
    height:17px;
  }
  #u1323 {
    position:absolute;
    left:0px;
    top:0px;
    width:71px;
    white-space:nowrap;
  }
  #u1324_div {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1324 {
    position:absolute;
    left:207px;
    top:194px;
    width:29px;
    height:17px;
  }
  #u1325 {
    position:absolute;
    left:0px;
    top:0px;
    width:29px;
    white-space:nowrap;
  }
  #u1326 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1327_div {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1327 {
    position:absolute;
    left:207px;
    top:245px;
    width:9px;
    height:17px;
  }
  #u1328 {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    white-space:nowrap;
  }
  #u1329_div {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1329 {
    position:absolute;
    left:296px;
    top:245px;
    width:53px;
    height:17px;
  }
  #u1330 {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    word-wrap:break-word;
  }
  #u1331_div {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1331 {
    position:absolute;
    left:405px;
    top:245px;
    width:35px;
    height:17px;
  }
  #u1332 {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    word-wrap:break-word;
  }
  #u1333_div {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1333 {
    position:absolute;
    left:496px;
    top:245px;
    width:62px;
    height:17px;
  }
  #u1334 {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    word-wrap:break-word;
  }
  #u1335_div {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1335 {
    position:absolute;
    left:593px;
    top:245px;
    width:100px;
    height:17px;
  }
  #u1336 {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    word-wrap:break-word;
  }
  #u1337_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1337 {
    position:absolute;
    left:703px;
    top:245px;
    width:135px;
    height:17px;
  }
  #u1338 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1339_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1339 {
    position:absolute;
    left:838px;
    top:245px;
    width:135px;
    height:17px;
  }
  #u1340 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1341_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1341 {
    position:absolute;
    left:949px;
    top:245px;
    width:93px;
    height:17px;
  }
  #u1342 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1343_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1343 {
    position:absolute;
    left:1081px;
    top:245px;
    width:93px;
    height:17px;
  }
  #u1344 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1345 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1346_div {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1346 {
    position:absolute;
    left:207px;
    top:304px;
    width:9px;
    height:17px;
  }
  #u1347 {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    white-space:nowrap;
  }
  #u1348_div {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1348 {
    position:absolute;
    left:296px;
    top:304px;
    width:53px;
    height:17px;
  }
  #u1349 {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    word-wrap:break-word;
  }
  #u1350_div {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1350 {
    position:absolute;
    left:405px;
    top:304px;
    width:35px;
    height:17px;
  }
  #u1351 {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    word-wrap:break-word;
  }
  #u1352_div {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1352 {
    position:absolute;
    left:496px;
    top:304px;
    width:62px;
    height:17px;
  }
  #u1353 {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    word-wrap:break-word;
  }
  #u1354_div {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1354 {
    position:absolute;
    left:593px;
    top:304px;
    width:100px;
    height:17px;
  }
  #u1355 {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    word-wrap:break-word;
  }
  #u1356_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1356 {
    position:absolute;
    left:703px;
    top:304px;
    width:135px;
    height:17px;
  }
  #u1357 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1358_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1358 {
    position:absolute;
    left:838px;
    top:304px;
    width:135px;
    height:17px;
  }
  #u1359 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1360_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1360 {
    position:absolute;
    left:949px;
    top:304px;
    width:93px;
    height:17px;
  }
  #u1361 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1362_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1362 {
    position:absolute;
    left:1081px;
    top:304px;
    width:93px;
    height:17px;
  }
  #u1363 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1364 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1365_div {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1365 {
    position:absolute;
    left:207px;
    top:373px;
    width:9px;
    height:17px;
  }
  #u1366 {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    white-space:nowrap;
  }
  #u1367_div {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1367 {
    position:absolute;
    left:296px;
    top:373px;
    width:53px;
    height:17px;
  }
  #u1368 {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    word-wrap:break-word;
  }
  #u1369_div {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1369 {
    position:absolute;
    left:405px;
    top:373px;
    width:35px;
    height:17px;
  }
  #u1370 {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    word-wrap:break-word;
  }
  #u1371_div {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1371 {
    position:absolute;
    left:496px;
    top:373px;
    width:62px;
    height:17px;
  }
  #u1372 {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    word-wrap:break-word;
  }
  #u1373_div {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1373 {
    position:absolute;
    left:593px;
    top:373px;
    width:100px;
    height:17px;
  }
  #u1374 {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    word-wrap:break-word;
  }
  #u1375_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1375 {
    position:absolute;
    left:703px;
    top:373px;
    width:135px;
    height:17px;
  }
  #u1376 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1377_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1377 {
    position:absolute;
    left:838px;
    top:373px;
    width:135px;
    height:17px;
  }
  #u1378 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1379_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1379 {
    position:absolute;
    left:949px;
    top:373px;
    width:93px;
    height:17px;
  }
  #u1380 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1381_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1381 {
    position:absolute;
    left:1081px;
    top:373px;
    width:93px;
    height:17px;
  }
  #u1382 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1383 {
    position:absolute;
    left:0px;
    top:0px;
    width:0px;
    height:0px;
  }
  #u1384_div {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1384 {
    position:absolute;
    left:207px;
    top:433px;
    width:9px;
    height:17px;
  }
  #u1385 {
    position:absolute;
    left:0px;
    top:0px;
    width:9px;
    white-space:nowrap;
  }
  #u1386_div {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1386 {
    position:absolute;
    left:296px;
    top:433px;
    width:53px;
    height:17px;
  }
  #u1387 {
    position:absolute;
    left:0px;
    top:0px;
    width:53px;
    word-wrap:break-word;
  }
  #u1388_div {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1388 {
    position:absolute;
    left:405px;
    top:433px;
    width:35px;
    height:17px;
  }
  #u1389 {
    position:absolute;
    left:0px;
    top:0px;
    width:35px;
    word-wrap:break-word;
  }
  #u1390_div {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1390 {
    position:absolute;
    left:496px;
    top:433px;
    width:62px;
    height:17px;
  }
  #u1391 {
    position:absolute;
    left:0px;
    top:0px;
    width:62px;
    word-wrap:break-word;
  }
  #u1392_div {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1392 {
    position:absolute;
    left:593px;
    top:433px;
    width:100px;
    height:17px;
  }
  #u1393 {
    position:absolute;
    left:0px;
    top:0px;
    width:100px;
    word-wrap:break-word;
  }
  #u1394_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1394 {
    position:absolute;
    left:703px;
    top:433px;
    width:135px;
    height:17px;
  }
  #u1395 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1396_div {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1396 {
    position:absolute;
    left:838px;
    top:433px;
    width:135px;
    height:17px;
  }
  #u1397 {
    position:absolute;
    left:0px;
    top:0px;
    width:135px;
    word-wrap:break-word;
  }
  #u1398_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1398 {
    position:absolute;
    left:949px;
    top:433px;
    width:93px;
    height:17px;
  }
  #u1399 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1400_div {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    height:17px;
    background:inherit;
    background-color:rgba(255, 255, 255, 0);
    border:none;
    border-radius:0px;
    -moz-box-shadow:none;
    -webkit-box-shadow:none;
    box-shadow:none;
  }
  #u1400 {
    position:absolute;
    left:1081px;
    top:433px;
    width:93px;
    height:17px;
  }
  #u1401 {
    position:absolute;
    left:0px;
    top:0px;
    width:93px;
    word-wrap:break-word;
  }
  #u1041 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 0px;
    height: 0px;
  }

  #u1042_div {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 88px;
    height: 17px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #0099FF;
  }

  #u1042 {
    position: absolute;
    left: 66px;
    top: 170px;
    width: 88px;
    height: 17px;
    color: #0099FF;
  }

  #u1043 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 88px;
    white-space: nowrap;
  }

  #u1044_img {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
  }

  #u1044 {
    position: absolute;
    left: 42px;
    top: 168px;
    width: 20px;
    height: 20px;
    color: #0099FF;
  }

  #u1045 {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 16px;
    visibility: hidden;
    word-wrap: break-word;
  }
</style>
