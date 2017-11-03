<template>
	<div class="purchaseIne">
		<!--------------开票查询条件------------>
<el-dialog size="tiny" class="dialogfive1" title="开票查询" :visible.sync="dialogVisible1">
	<div class="formBox">
      <el-form ref="form"  :model="kpForm" label-width="80px">
		  <el-form-item label="往来单位">
		    <el-input v-model="kpForm.name" icon="more" :on-icon-click="dialogShow2"></el-input>
		  </el-form-item>

		  <el-form-item label="时间范围">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择开始日期" v-model="kpForm.date1" style="width: 100%;"></el-date-picker>
		    </el-col>
		    <el-col class="line" :span="2" style="text-align: center;">——</el-col>
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择结束日期" v-model="kpForm.date2" style="width: 100%;"></el-date-picker>
		    </el-col>
		  </el-form-item>

		  <el-form-item label="开票状态">
		    <el-radio-group v-model="kpForm.resource">
		      <el-radio label="所有票据" checked="checked"></el-radio>
		      <el-radio label="未完票据"></el-radio>
		      <el-radio label="已完票据"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		</el-form>
	</div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small">保存</el-button>
  	<el-button size="small" @click="dialogVisible1=false">退出</el-button>
  </div>
</el-dialog>


<el-dialog title="往来单位选择框" :visible.sync="dialogVisible2">
	<el-form label-width="100px" :label-position="labelPosition" :model="wlForm" class="demo-form-inline">
			<el-input placeholder="请输入内容" v-model="wlForm.select">
                <el-select v-model="wlForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按名称查询" value="2"></el-option>
                    <el-option label="按编号查询" value="3"></el-option>
                    <el-option label="按简名过滤" value="4"></el-option>
                    <el-option label="按拼音码查询" value="5"></el-option>
                    <el-option label="按电话查询" value="6"></el-option>
                    <el-option label="按电子邮件查询" value="7"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
          </el-input>

		<!--主要数据表格-->
	  <el-table :data="wlTableData" border height="230" style="width: 100%">
	    <el-table-column prop="wlname" label="单位名称" width="200"></el-table-column>
	    <el-table-column prop="wljm" label="单位简名" width="120"></el-table-column>
	    <el-table-column prop="wltel" label="电话" width="120"></el-table-column>
	    <el-table-column prop="wliphone" label="手机" width="300"></el-table-column>
	    <el-table-column prop="wlemail" label="电子邮件" width="300"></el-table-column>
	    <el-table-column prop="wlysje" label="应收金额" width="300"></el-table-column>
	    <el-table-column prop="wlyfje" label="应付金额" width="300"></el-table-column>
	    <el-table-column prop="wlxyed" label="信用额度" width="120"></el-table-column>
	    <el-table-column prop="wlkyed" label="可用额度" width="120"></el-table-column>
	    <el-table-column label="操作" width="200">
	      <template scope="scope">
	      	<el-button @click.native.prevent="wlchoice(scope.$index, wlTableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
	        <el-button type="primary" size="small" value="查看" title="查看本行" @click="dialogShow3">查看</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, wlTableData)" type="danger" size="small" value="删除" title="删除本行">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	 </el-form>
	  <!--显示记录-->
	  <div class="statistics">
	  	<h4>(<span>0</span>条记录)</h4>
	  </div>
	  <!--操作按钮-->
	  <div slot="footer" class="dialog-footer">
	  	<el-button size="small" @click="dialogVisible2=false">关闭</el-button>
	  </div>
	</el-dialog>

<!-----------往来单位信息框-------------->
<el-dialog  title="往来单位-信息框" :visible.sync="dialogVisible3" >
    <div class="app_form" >
    	<el-form :model="formInline" label-width="100px" style="border: 1px solid #d2d2d2;">
    		<el-row>
    			<el-col>
    				<el-form-item label="所属分类"></el-form-item>
    			</el-col>
    		</el-row>
    		<el-row>
    			<el-col :span="24">
    				<el-form-item label="单位名称"><el-input :disabled="true" size="small" v-model="formInline.unit_name"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		  <el-row>
		  	<el-col :span="12">
		  		<el-form-item label="单位名称编号"><el-input :disabled="true" size="small" v-model="formInline.unit_num"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="2">
		  		<el-form-item >
				    <el-checkbox-group v-model="formInline.unit_value">
				      <el-checkbox disabled label="编号递增" name="type"></el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="简名"><el-input :disabled="true" size="small" v-model="formInline.unit_simple"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="拼音码"><el-input :disabled="true" size="small" v-model="formInline.unit_pinyin"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="类型">
				    <el-select disabled  size="small" v-model="formInline.unit_type" placeholder="未设置">
				      <el-option label="区域一" value="供货商"></el-option>
				      <el-option label="区域二" value="客户"></el-option>
				    </el-select>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="税号"><el-input :disabled="true" size="small" v-model="formInline.unit_duty" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="税率（%）"><el-input :disabled="true" size="small" v-model="formInline.unit_tax" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="联系人"><el-input :disabled="true" size="small" v-model="formInline.unit_contact" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="电话"><el-input :disabled="true" size="small" v-model="formInline.unit_tel" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="手机"><el-input :disabled="true" size="small" v-model="formInline.unit_phone" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="电子邮件"><el-input :disabled="true" size="small" v-model="formInline.unit_email" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="价格等级">
				    <el-select disabled  size="small" v-model="formInline.unit_grade" placeholder="预设售价1">
				      <el-option label="区域一" value="预设售价2"></el-option>
				      <el-option label="区域二" value="预设售价3"></el-option>
				    </el-select>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item label="地址"><el-input :disabled="true" size="small" v-model="formInline.unit_address"></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="16">
		  		<el-form-item label="开户银行"><el-input :disabled="true" size="small" v-model="formInline.unit_bank" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="银行账号"><el-input :disabled="true" size="small" v-model="formInline.unit_number" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item label="备注"><el-input :disabled="true" size="small" v-model="formInline.unit_remark" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="dialogVisible3=false">保存并关闭</el-button>
  	<el-button size="small" @click="dialogVisible3=false">关闭</el-button>
  </div>
</el-dialog>

<el-dialog size="tiny" title="单据" :visible.sync="dialogVisible4">
    <div class="djForm">
    	<el-form :model="djForm" label-width="100px" ref="djForm">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="单位编号" prop="nbzyname"><el-input :disabled=flag size="small" v-model="djForm.dwbh"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				 <el-form-item label="单位名称"><el-input :disabled=flag size="small" v-model="djForm.dwmc"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="商品编号"><el-input :disabled=flag size="small" v-model="djForm.spbh"></el-input></el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="商品名称"><el-input :disabled=flag size="small" v-model="djForm.spmc"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="单位"><el-input :disabled=flag size="small" v-model="djForm.dw"></el-input></el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="单据编号"><el-input :disabled=flag size="small" v-model="djForm.djbh"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col  :span="12">
		    		<el-form-item label="单据类型">
		    			<el-select  :disabled=flag v-model="djForm.djlx" size="small">
					      <el-option label="所有单据" value="1" selected></el-option>
					      <el-option label="已完单据" value="2"></el-option>
					      <el-option label="未完单据" value="3"></el-option>
					    </el-select>
		    		</el-form-item>
		    	</el-col>
		    	<el-col  :span="12">
		    		<el-form-item label="日期">
		    			<el-date-picker :disabled=flag type="date" placeholder="选择日期" v-model="djForm.rq" style="width: 100%;"></el-date-picker>
		    		</el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col  :span="12">
		    		<el-form-item label="数量"><el-input :disabled=flag  size="small" v-model="djForm.sl" ></el-input></el-form-item>
		    	</el-col>
		    	<el-col  :span="12">
		    		<el-form-item label="经手人"><el-input :disabled=flag  size="small" v-model="djForm.jsr" ></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col  :span="12">
		    		<el-form-item label="价税合计"><el-input :disabled=flag  size="small" v-model="djForm.jshj" ></el-input></el-form-item>
		    	</el-col>
		    	<el-col  :span="12">
		    		<el-form-item label="开票金额"><el-input :disabled=flag  size="small" v-model="djForm.kpje" ></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		     <el-row>
		    	<el-col>
		    		<el-form-item label="未开票金额"><el-input :disabled=flag  size="small" v-model="djForm.wkpje" ></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="nbzysubmitForm('nbzyForm')">保存并关闭</el-button>
  	<el-button size="small" @click="dialogVisible4=false">关闭</el-button>
  </div>
</el-dialog>






		<el-form label-width="80px" :model="formLabelAlign">
 			<el-row>
 				<el-col>进货开票查询</el-col>
 			</el-row>
 			<el-row style="line-height: 46px;">
 				<el-col :span="6">查询时间：<span>2017-10-7</span>至<span>2017-10-13</span></el-col>
 				<el-col :span="3" :offset="9"><el-form-item label="开票状态">
				    <el-select v-model="formLabelAlign.name" size="small">
				      <el-option label="所有单据" value="1" selected></el-option>
				      <el-option label="已完单据" value="1"></el-option>
				      <el-option label="未完单据" value="2"></el-option>
				    </el-select>
				  </el-form-item>
 				</el-col>
 				<el-col :span="3"><el-form-item label="过滤红冲">
				    <el-select v-model="formLabelAlign.region">
				      <el-option label="所有单据" value="1"></el-option>
				      <el-option label="不包含红冲单据" value="2"></el-option>
				      <el-option label="只显示红冲单据" value="2"></el-option>
				    </el-select>
				  </el-form-item>
 				</el-col>
 				<el-col :span="3"><el-form-item label="单据类型">
				    <el-select v-model="formLabelAlign.type" >
				      <el-option label="全部" value="1"></el-option>
				      <el-option label="进货入库单" value="2"></el-option>
				      <el-option label="进货退货单" value="3"></el-option>
				      <el-option label="进货退货单" value="4"></el-option>
				    </el-select>
				  </el-form-item>
 				</el-col>
 			</el-row>
 			<el-row>
 				<el-col>往来单位：全部单位</el-col>
 			</el-row>
		</el-form>
       <div class="list_table">
		<el-table :data="tableData" border height="532" style="width: 100%;margin-top: 10px;">
           <el-table-column prop="dwbh" label="单位编号" width="180"></el-table-column>
           <el-table-column prop="dwmc" label="单位名称" width="180"></el-table-column>
           <el-table-column prop="dw" label="单位" width="300"></el-table-column>
           <el-table-column prop="djbh" label="单据编号" width="300"></el-table-column>
           <el-table-column prop="djlx" label="单据类型" width="300"></el-table-column>
           <el-table-column prop="rq" label="日期" width="300"></el-table-column>
           <el-table-column prop="sl" label="数量" width="300"></el-table-column>
           <el-table-column prop="jsr" label="经手人" width="300"></el-table-column>
           <el-table-column prop="jshj" label="价税合计" width="300"></el-table-column>
           <el-table-column prop="kpje" label="开票金额" width="300"></el-table-column>
           <el-table-column prop="wkpje" label="未开票金额" width="300"></el-table-column>
    	   <el-table-column label="操作" width="200">
             <template scope="scope">
               <el-button type="primary" size="small" @click="dialogShow4">查看</el-button>
               <el-button type="primary" size="small" @click="dialogShow5">修改</el-button>
               <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">删除</el-button>
             </template>
           </el-table-column>
        </el-table>
         <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
	  	<div class="button_all">
		  	<el-button size="small" @click="dialogShow1">查询条件</el-button>
		  	<el-button size="small">查看单据</el-button>
		  	<el-button size="small">修改开票金额</el-button>
		  	<el-button size="small">打印</el-button>
		  	<el-button size="small">退出</el-button>
		</div>
	</div>
</template>

<script lang="babel">
	import './less/style.less'
	 let id = 1000;
	 export default{
	 	data:function(){
	 		return{
                labelPosition:'left',
                currentPage:1,
        	 	total: 10,
	 			value1:'',
	 			select1: '',
	 			input1: '',
	 			flag: '',
	 			dialogVisible1: false,
	 			dialogVisible2: false,
	 			dialogVisible3: false,
	 			dialogVisible4: false,
	 			formLabelAlign: {
		          name: '',
		          region: '',
		          type: ''
		        },
		        kpForm: {
		          name: '',
		          date1: '',
		          date2: '',
		          resource: ''
		        },
		        wlForm:{
		          select: '',
		          input: ''
		        },
		        djForm:{
		           dwbh: '',
		           dwmc: '',
		           dw: '',
		           djbh: '',
		           djlx: '',
		           rq: '',
		           sl: '',
		           jsr: '',
		           jshj: '',
		           kpje: '',
		           wkpje: '',
		        },
		        formInline: {
			      unit_name: '111',
			      unit_num: '',
			      unit_value: '',
			      unit_simple: '',
			      unit_pinyin: '',
			      unit_type: '',
			      unit_duty: '',
			      unit_tax: '',
			      unit_contact: '',
			      unit_tel: '',
			      unit_phone: '',
			      unit_email: '',
			      unit_grade: '',
			      unit_address: '',
			      unit_bank: '',
			      unit_number: '',
			      unit_remark: ''
		      	 },
		      	 wlTableData:[{
		      	 	wlname:'diandian',
		      	 	wljm:'',
		      	 	wltel: '',
		      	 	wliphone: '',
		      	 	wlemail: '',
		      	 	wlysje:'',
		      	 	wlyfje: '',
		      	 	wlxyed: '',
		      	 	wlkyed: ''
		      	 }],
		        tableData: [{
		          dwbh: '001',
		          dwmc: '河南天翼直供',
		          dw: '河南天翼直供',
		          djbh: '2017001',
		          djlx: '普通单据',
		          rq: '2017-1025',
		          sl: '11',
		          jsr: '登记人1号',
		          jshj: '',
		          kpje: '1000',
		          wkpje: '1000'
		        },{
		          dwbh: '002',
		          dwmc: '河南天翼直供',
		          dw: '河南天翼直供',
		          djbh: '2017001',
		          djlx: '普通单据',
		          rq: '2017-1025',
		          sl: '11',
		          jsr: '登记人1号',
		          jshj: '',
		          kpje: '1000',
		          wkpje: '1000'
		        },{
		          dwbh: '003',
		          dwmc: '河南翼龙直供',
		          dw: '河南翼龙直供',
		          djbh: '2017001',
		          djlx: '普通单据',
		          rq: '2017-1025',
		          sl: '11',
		          jsr: '登记人1号',
		          jshj: '',
		          kpje: '1000',
		          wkpje: '1000'
		        }]
	 		}
	 	},
	 	methods:{
	 		dialogShow1(){
		  		this.dialogVisible1 = true;
		  	},
		  	dialogShow2(){
		  		this.dialogVisible2 = true;
		  	},
		  	dialogShow3(){
		  		this.dialogVisible3 = true;
		  	},
		  	dialogShow4(){
		  		this.flag=true;
		  		this.dialogVisible4 = true;
		  	},
		  	dialogShow5(){
		  		this.flag=false;
		  		this.dialogVisible4 = true;
		  	},
		  	handleSelectionChange(val) {
			    this.multipleSelection = val;
			  },
			wlchoice(index, rows){
			    this.kpForm.name = rows[index].wlname;
			  },
		 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	 		deleteRow(index, rows) {
    	this.dialogVisible=true;
    	this.$confirm("确认删除？","提示",{
    		confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
    	})
    	.then(_=>{
    		rows.splice(index, 1);
    		this.$message({
            type: 'success',
            message: '删除成功!'
        });
    	})
    	.catch(_=>{
    		this.$message({
                type: 'info',
                message: '已取消删除'
            });
    	})

    }
	 	}
	 }
</script>
