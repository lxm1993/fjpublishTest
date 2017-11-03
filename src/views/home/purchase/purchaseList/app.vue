<template>
<div class="purchaseList">
	<!--模态框-->
	<el-dialog v-drag title="往来单位[供应商]选择框" :visible.sync="dialogOneVisible1">
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
	  <el-table :data="wltableData" border height="230" style="width: 100%">
		<el-table-column  prop="wl_num" label="单位编号" width="150"></el-table-column>
	    <el-table-column property="wl_name" label="单位名称" width="200"></el-table-column>
	    <el-table-column prop="wl_sipmeName" label="单位简名" width="120"></el-table-column>
	    <el-table-column prop="wl_tel" label="电话" width="120"></el-table-column>
	    <el-table-column prop="wl_iphone" label="手机" width="300"></el-table-column>
	    <el-table-column prop="wl_email" label="电子邮件" width="300"></el-table-column>
	    <el-table-column prop="wl_money" label="应收金额" width="300"></el-table-column>
	    <el-table-column prop="wl_amount" label="应付金额" width="300"></el-table-column>
	    <el-table-column prop="wl_credit" label="信用额度" width="120"></el-table-column>
	    <el-table-column prop="wl_avai" label="可用额度" width="200"></el-table-column>
	    <el-table-column label="操作" width="200">
	      <template scope="scope">
	      	<el-button @click.native.prevent="choiceRow(scope.$index, wltableData)" type="text" size="small">选中</el-button>
	        <el-button @click="dialogOneShow2"  type="primary" size="small" value="查看" title="查看本行">查看</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, wltableData)" type="danger" size="small" value="选中" title="删除本行">删除</el-button>
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
	  	<el-button size="small" @click="dialogOneShow2">添加</el-button>
	  	<el-button size="small" @click="dialogOneShow">确定</el-button>
	  	<el-button size="small" @click="dialogOneVisible1=false">关闭</el-button>
	  </div>
	</el-dialog>

<!-----------往来单位信息框-------------->
<el-dialog  title="往来单位-信息框" :visible.sync="dialogOneVisible2" >
    <div class="app_form">
    	<el-form :model="formInline" label-width="108px" :rules="wldw" ref="formInline">
    		<el-row>
    			<el-col>
    				<el-form-item label="所属分类"></el-form-item>
    			</el-col>
    		</el-row>
    		<el-row>
    			<el-col :span="24">
    				<el-form-item label="单位名称" prop="unit_name"><el-input size="small" v-model="formInline.unit_name"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		  <el-row>
		  	<el-col :span="12">
		  		<el-form-item label="单位名称编号" prop="unit_num"><el-input size="small" v-model="formInline.unit_num"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="2">
		  		<el-form-item >
				    <el-checkbox-group v-model="formInline.unit_value">
				      <el-checkbox label="编号递增" name="type"></el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="简名"><el-input size="small" v-model="formInline.unit_simple"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="拼音码"><el-input size="small" v-model="formInline.unit_pinyin"></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="类型">
				    <el-select size="small" v-model="formInline.unit_type" placeholder="未设置">
				      <el-option label="区域一" value="供货商"></el-option>
				      <el-option label="区域二" value="客户"></el-option>
				    </el-select>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="税号"><el-input size="small" v-model="formInline.unit_duty" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="税率（%）"><el-input size="small" v-model="formInline.unit_tax" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="联系人"><el-input size="small" v-model="formInline.unit_contact" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="电话"><el-input size="small" v-model="formInline.unit_tel" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="手机"><el-input size="small" v-model="formInline.unit_phone" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="电子邮件"><el-input size="small" v-model="formInline.unit_email" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="价格等级">
				    <el-select size="small" v-model="formInline.unit_grade" placeholder="预设售价1">
				      <el-option label="区域一" value="预设售价2"></el-option>
				      <el-option label="区域二" value="预设售价3"></el-option>
				    </el-select>
				</el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item label="地址"><el-input size="small" v-model="formInline.unit_address" icon="more" :on-icon-click="dialogOneShow3"></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col :span="16">
		  		<el-form-item label="开户银行"><el-input size="small" v-model="formInline.unit_bank" ></el-input></el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="银行账号"><el-input size="small" v-model="formInline.unit_number" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item label="备注"><el-input size="small" v-model="formInline.unit_remark" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="submitForm('formInline')">保存</el-button>
  	<el-button size="small" @click="dialogOneVisible2=false">关闭</el-button>
  </div>
</el-dialog>

<!------------新增收获地址模态框------------>


<el-dialog title="地址" :visible.sync="dialogOneVisible3">
	<el-form label-width="100px" :label-position="labelPosition" :model="addressForm" class="demo-form-inline">
		<el-input placeholder="请输入内容" v-model="addressForm.select">
            <el-select v-model="addressForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="快速查询" value="1"></el-option>
                <el-option label="收货人" value="2"></el-option>
                <el-option label="手机号码" value="3"></el-option>
                <el-option label="电话号码" value="4"></el-option>
                <el-option label="邮政编码" value="3"></el-option>
                <el-option label="收货地址" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
      </el-input>

	<!--主要数据表格-->
  <el-table :data="addressTableData" border height="230" style="width: 100%">
	<el-table-column  prop="name" label="收货人" width="150"></el-table-column>
    <el-table-column prop="iphone" label="手机号码" width="200"></el-table-column>
    <el-table-column  prop="tel" label="电话号码" width="150"></el-table-column>
    <el-table-column prop="code" label="邮政编码" width="200"></el-table-column>
    <el-table-column  prop="city" label="省市区" width="200"></el-table-column>
    <el-table-column prop="address" label="收货地址" width="200"></el-table-column>
    <el-table-column label="操作" width="150">
	      <template scope="scope">
	      	<el-button @click.native.prevent="addresschoice(scope.$index, addressTableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
	        <el-button @click="dialogOneShow4"  type="text" size="small" title="修改本行">修改</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, addressTableData)" type="text" size="small" value="选中" title="删除本行">删除</el-button>
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
  	<el-button size="small" @click="dialogOneShow4">新增</el-button>
  	<el-button size="small" @click="dialogOneVisible3=false">关闭</el-button>
  </div>
</el-dialog>




<!---------新增详细地址的模态框-------------->
<el-dialog size="tiny" title="地址" :visible.sync="dialogOneVisible4">
    <div class="app_form">
    	<el-form :model="dizhiForm" label-width="100px" :rules="xzdz" ref="dizhiForm">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="收货人" prop="dzname"><el-input size="small" v-model="dizhiForm.dzname"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				<el-form-item label="手机号码" prop="dziphone"><el-input size="small" v-model="dizhiForm.dziphone"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		   <el-row>
		   	  <el-col :span="12">
		   	  	<el-form-item label="电话号码"><el-input size="small" v-model="dizhiForm.dztel"></el-input></el-form-item>
		   	  </el-col>
		   	  <el-col :span="12">
		   	  	 <el-form-item label="邮政编码"><el-input size="small" v-model="dizhiForm.dzcode"></el-input></el-form-item>
		   	  </el-col>
		   </el-row>
		   <el-row>
		   	<el-col >
		   	  <el-form-item label="所在省市区">
			    <el-cascader :options="cityOptions" v-model="dizhiForm.selectedOptions" @change="handleChange"></el-cascader>*必填不可为空
			  </el-form-item>
		   	</el-col>
		   </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item class="addRem"  label="收货地址" prop="dzaddress"><el-input size="small" v-model="dizhiForm.dzaddress" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="dizhisubmitForm('dizhiForm')">保存并关闭</el-button>
  	<el-button size="small" @click="dialogOneVisible4=false">关闭</el-button>
  </div>
</el-dialog>



<el-dialog size="tiny" title="业务员选择框" :visible.sync="dialogTwoVisible1">
	<el-form label-width="100px" :label-position="labelPosition" :model="ywyForm" class="demo-form-inline">
			<el-input placeholder="请输入内容" v-model="ywyForm.sales_select" >
                <el-select v-model="ywyForm.sales_input1" slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号查询" value="2"></el-option>
                    <el-option label="按全名过滤" value="3"></el-option>
                    <el-option label="按拼音码查询" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
          </el-input>

		<!--主要数据表格-->
	  <el-table :data="ywytableData" border height="230" style="width: 100%">
		<el-table-column  prop="ywycode" label="职员编号" width="150"></el-table-column>
	    <el-table-column prop="ywyname" label="职员名称" width="200"></el-table-column>
	    <el-table-column prop="ywysector" label="所属部门" width="120"></el-table-column>
	    <el-table-column label="操作" width="150">
	      <template scope="scope">
	      	<el-button @click.native.prevent="ywychoice(scope.$index, ywytableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, ywytableData)" type="danger" size="small" value="选中" title="选中本行">删除</el-button>
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
	  	<el-button size="small" @click="dialogTwoShow2">添加</el-button>
	  	<el-button size="small" @click="dialogTwoVisible1=false">关闭</el-button>
	  </div>
	</el-dialog>

<!--------------内部职员-信息框---------------->
<el-dialog size="tiny" title="内部职员-信息框" :visible.sync="dialogTwoVisible2">
    <div class="app_form">
    	<el-form :model="nbzyForm" label-width="80px" :rules="nbzy" ref="nbzyForm">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="职员名称" prop="nbzyname"><el-input size="small" v-model="nbzyForm.nbzyname"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				 <el-form-item label="职员简名"><el-input size="small" v-model="nbzyForm.nbzyjian"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="所属部门">
					    <el-select size="small" v-model="nbzyForm.nbzysector" >
					      <el-option label="维修部" value="1"></el-option>
					      <el-option label="后勤部" value="2"></el-option>
					    </el-select>
					</el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="职员编号"><el-input size="small" v-model="nbzyForm.nbzycode"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="手机"><el-input size="small" v-model="nbzyForm.nbzyiphone"></el-input></el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="拼音码"><el-input size="small" v-model="nbzyForm.nbzypinyin"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col>
		    		<el-form-item label="备注"><el-input type="textarea"  size="small" v-model="nbzyForm.nbzyremark" ></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="nbzysubmitForm('nbzyForm')">保存并关闭</el-button>
  	<el-button size="small" @click="dialogTwoVisible2=false">关闭</el-button>
  </div>
</el-dialog>


<el-dialog size="tiny" title="仓库选择框" :visible.sync="dialogThreeVisible1">
	<el-form label-width="100px" :label-position="labelPosition" :model="ckForm" class="demo-form-inline">
		<el-input placeholder="请输入内容" v-model="ckForm.select">
            <el-select v-model="ckForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="快速查询" value="1"></el-option>
                <el-option label="按编号查询" value="2"></el-option>
                <el-option label="按全名过滤" value="3"></el-option>
                <el-option label="按拼音码查询" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
      </el-input>

	<!--主要数据表格-->
  <el-table :data="cktableData" border height="230" style="width: 100%">
	<el-table-column  prop="ckcode" label="仓库编号" width="150"></el-table-column>
    <el-table-column prop="ckname" label="仓库名称" width="200"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
      	<el-button @click.native.prevent="ckchoice(scope.$index, cktableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
        <el-button  @click.native.prevent="deleteRow(scope.$index, cktableData)" type="danger" size="small" value="选中" title="选中本行">删除</el-button>
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
  	<el-button size="small" @click="dialogThreeShow2">添加</el-button>
  	<el-button size="small" @click="dialogThreeVisible1=false">关闭</el-button>
  </div>
</el-dialog>


<!------------仓库的新增仓库信息-------------->
<el-dialog  title="仓库信息-信息框" :visible.sync="dialogThreeVisible2">
    <div class="app_form">
    	<el-form :model="addckForm" label-width="100px" :rules="addck" ref="addckForm">
    		<el-row style="background: #eff3f6;">
    			<el-col class="dot">
    				<el-form-item size="small" label="基本信息"></el-form-item>
    			</el-col>
    		</el-row>
    		<el-row>
    			<el-col :span="8">
    			  <el-form-item size="small" label="仓库类型">
				    <el-select v-model="addckForm.cktype1" >
				      <el-option label="自有仓" value="1" selected="selected" ></el-option>
				      <el-option label="公有仓" value="2"></el-option>
				    </el-select>
				  </el-form-item>
    			</el-col>
    			<el-col :span="16">
    				<el-form-item size="small" label="仓库名称" prop="ckname"><el-input v-model="addckForm.ckname"></el-input></el-form-item>
    			</el-col>
    		</el-row>
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="仓库编号"><el-input size="small" v-model="addckForm.ckcode"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="2">
    			  <el-form-item >
				    <el-checkbox-group v-model="addckForm.ckbianhao">
				      <el-checkbox label="编号递增" name="type"></el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
    			</el-col>
    		</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item class="addNum" label="仓库简名"><el-input size="small" v-model="addckForm.ckjm"></el-input></el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item class="addNum" label="拼音码"><el-input size="small" v-model="addckForm.ckpym"></el-input></el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item class="addRem" label="备注"><el-input size="small" v-model="addckForm.ckbz"></el-input></el-form-item>
				</el-col>
			</el-row>
			<el-row style="background: #eff3f6;">
				<el-col class="dot">
					<el-form-item label="联系信息[将作为您物流单上的寄件人信息打印出来，请确保信息准确]" label-width="450px"></el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item class="addCont" label="联系人" prop="cklxr"><el-input size="small" v-model="addckForm.cklxr"></el-input></el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item class="addCont" label="联系电话" prop="cklxdh"><el-input size="small" v-model="addckForm.cklxdh"></el-input></el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item class="addCont" label="邮政编码" prop="ckyzbm"><el-input size="small" v-model="addckForm.ckyzbm"></el-input></el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item label="所在省市区">
					    <el-cascader :options="cityOptions" v-model="addckForm.selectedOptions" @change="handleChange"></el-cascader>*必填不可为空
					</el-form-item>
				</el-col>
			</el-row>
		    <el-row>
		    	<el-col>
		    		<el-form-item class="addRem" label="发货地址" prop="ckfhdz"><el-input size="small" v-model="addckForm.ckfhdz"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small" @click="addcksubmitForm('addckForm')">保存并关闭</el-button>
  	<el-button size="small" @click="dialogThreeVisible2=false">关闭</el-button>
  </div>
</el-dialog>




<!---------常用说明------------>
<el-dialog size="tiny" title="常用说明" :visible.sync="dialogFourVisible1">
	<el-form label-width="100px" :label-position="labelPosition" :model="cyForm" class="demo-form-inline">
		<el-input placeholder="请输入内容" v-model="cyForm.select">
            <el-select v-model="cyForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="快速查询" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
      </el-input>

	<!--主要数据表格-->
  <el-table :data="cytableData" border height="230" style="width: 100%">
	<el-table-column  prop="cycode" label="编号" width="150"></el-table-column>
    <el-table-column prop="cycontent" label="内容" width="200"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
      	<el-button @click.native.prevent="cychoice(scope.$index, cytableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
        <el-button  @click.native.prevent="deleteRow(scope.$index, cytableData)" type="text" size="small" value="选中" title="选中本行">删除</el-button>
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
  	<el-button size="small" @click="dialogFourShow2">新增</el-button>
  	<el-button size="small" @click="dialogFourVisible1=false">关闭</el-button>
  </div>
</el-dialog>


<!------------新增的常用说明-------------->
<el-dialog size="tiny" class="dialogFour2" title="常用说明" :visible.sync="dialogFourVisible2">
    <div class="app_form ">
    	<el-form :inline="true" :model="addcyForm" :rules="addcy" ref="addcyForm">
    		<el-row>
    			<el-col :span="24" style="background: #eff3f6;">
    				<el-form-item label="常用说明" ></el-form-item>
    			</el-col>
    			<el-col :span="24">
    				<el-form-item label="编号" prop="addcybh"><el-input size="small" v-model="addcyForm.addcybh"></el-input></el-form-item>
    			</el-col>
    			<el-col>
    				<el-form-item label="内容" prop="addcynr"><el-input type="textarea" size="small" v-model="addcyForm.addcynr"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		</el-form>
    </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<!--<el-button size="small">保存并新增</el-button>-->
  	<el-button size="small" @click="addcysubmitForm('addcyForm')">保存并关闭</el-button>
  	<el-button size="small" @click="dialogFourVisible2=false">关闭</el-button>
  </div>
</el-dialog>


<!--------------录单配置选择模态框------------>
<el-dialog size="tiny" class="dialogfive1" title="录单配置" :visible.sync="dialogFiveVisible1">
    <el-table ref="multipleTable" :data="ldtableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" label="允许"></el-table-column>
    <el-table-column prop="lm" label="配置类名"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
        <el-button  @click.native.prevent="deleteRow(scope.$index, multipleTable)" type="danger" size="small" value="删除" title="删除本行">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small">保存</el-button>
  	<el-button size="small" @click="dialogFiveVisible1=false">退出</el-button>
  </div>
</el-dialog>




<!------------套餐选择-------------->
<el-dialog title="商品套餐选择框" :visible.sync="dialogSixVisible1">
	<el-form label-width="100px" :label-position="labelPosition" :model="sptcForm" class="demo-form-inline">
		<el-input placeholder="请输入内容" v-model="sptcForm.select">
            <el-select v-model="sptcForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                <el-option label="按套餐编码查询" value="1"></el-option>
                <el-option label="按套餐名称查询" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
      </el-input>

	<!--主要数据表格-->
  <el-table :data="sptctableData" border height="230" style="width: 100%">
	<el-table-column  prop="sptccode" label="套餐编码" ></el-table-column>
    <el-table-column prop="sptcname" label="套餐名称"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
      	<el-button @click.native.prevent="sptcchoice(scope.$index, sptctableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
        <el-button  @click.native.prevent="deleteRow(scope.$index, sptctableData)" type="text" size="small" value="选中" title="选中本行">删除</el-button>
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
  	<el-button size="small" @click="dialogSixShow2">添加</el-button>
  	<el-button size="small" @click="dialogSixVisible1=false">关闭</el-button>
  </div>
</el-dialog>



<!------------新增套餐-------------->
<el-dialog title="商品套餐选择框" :visible.sync="dialogSixVisible2">
    <div class="diaTop" >
    	<el-form :model="addtcForm" class="demo-form-inline" label-width="100px">
    		<el-row>
    			<el-col :span="6">
    				<el-form-item label="套餐名称">
					   <el-input size="small" v-model="addtcForm.tcname" ></el-input>
					</el-form-item>
    			</el-col>
    			<el-col :span="6">
    				<el-form-item label="套餐编码">
					    <el-input size="small" v-model="addtcForm.tcbm" ></el-input>
					  </el-form-item>
    			</el-col>
    			<el-col :span="6">
    				<el-form-item label="套餐条码">
		    <el-input size="small" v-model="addtcForm.tctm" ></el-input>
		  </el-form-item>
    			</el-col>
    			<el-col :span="6">
    				 <el-form-item label="套餐打印方式">
		    <el-select  size="small" v-model="addtcForm.tcdyfs" >
		      <el-option label="按套餐明细打印" value="shanghai"></el-option>
		      <el-option label="按套餐名打印" value="beijing"></el-option>
		    </el-select>
	      </el-form-item>
    			</el-col>
    		</el-row>
		 <el-row>
		 	<el-col :span="24">
		 		<el-form-item class="sixRem" label="备注">
			    	<el-input size="small" v-model="addtcForm.tcbz" ></el-input>
			  	</el-form-item>
		 	</el-col>
		 </el-row>

		</el-form>
	</div>

	<!--主要数据表格-->
  <el-table :data="addcttableData" border height="230" style="width: 100%" @selection-change="handleSelectionChange">
  	<el-table-column type="selection" width="55"></el-table-column>
	<el-table-column  prop="ctcode" label="套餐商品编号" width="150"></el-table-column>
    <el-table-column prop="ctname" label="套餐商品名称" width="200"></el-table-column>
    <el-table-column  prop="ctdw" label="单位" width="150"></el-table-column>
    <el-table-column prop="ctnum" label="数量" width="200"></el-table-column>
    <el-table-column  prop="ctdj" label="单价" width="150"></el-table-column>
    <el-table-column prop="ctje" label="金额" width="200"></el-table-column>
    <el-table-column  prop="ctzt" label="状态" width="150"></el-table-column>
    <el-table-column label="操作" width="150">
		      <template scope="scope">
		        <el-button  @click.native.prevent="deleteRow(scope.$index, addcttableData)" type="text" size="small" value="删除" title="删除本行">删除</el-button>
		      </template>
    </el-table-column>
  </el-table>
  <!--显示记录-->
  <div class="statistics">
  	<h4>(<span>0</span>条记录)</h4>
  </div>
  <!--操作按钮-->
  <div slot="footer" class="dialog-footer">
  	<el-button size="small">保存</el-button>
  	<el-button size="small" @click="dialogSixVisible2=false">关闭</el-button>
  </div>
</el-dialog>

<!----------商品明细导入---------->
<el-dialog size="tiny" title="录单配置" :visible.sync="dialogSevenVisible1">
    <div class="detailGoods">
    	<h4 style="line-height: 28px;background: #eff3f6;margin: 0;padding: 0 5px;font-weight: 100;">商品明细导入规则</h4>
    	<h5>请先下载导入商品明细模板</h5>
    	<h5>使用说明</h5>
    	<p>1 文件格式必须与模板完全一致！</p>
    	<p>2 填写了商品条码，可不填写商品编号、全名！</p>
    	<p>3 没填写商品条码，商品编号为空时，商品全名不允许为空！！</p>
    	<p>4 录入的商品条码、商品全名、商品编号等信息必须与系统中一致</p>
    	<p>5 EXCEL中商品明细不能超过800行</p>
    </div>
    <div class="shangchuan">
    	<el-row>
    		<el-col>
    			<p>请选择要上传的商品明细文件(.xls/.xlsx/.et)</p>
    		</el-col>
    	</el-row>
    	<el-row>
    		<el-col>
    			<input type="file" />
    		</el-col>
    	</el-row>
    	<el-row style="margin-top:10px">
    		<el-col>
    			<el-button size="small">导入文件</el-button>
    			<el-button size="small" @click="dialogSevenVisible1=false">取消</el-button>
    		</el-col>
    	</el-row>

    </div>
</el-dialog>


<el-dialog v-drag title="库存商品选择框" :visible.sync="kcdialogVisible1">
		<el-form label-width="100px" :label-position="labelPosition" :model="wlForm" class="demo-form-inline">
			<el-input placeholder="请输入内容" v-model="wlForm.select">
                <el-select v-model="wlForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号过滤" value="2"></el-option>
                    <el-option label="按名称过滤" value="3"></el-option>
                    <el-option label="按简名过滤" value="4"></el-option>
                    <el-option label="按品牌过滤" value="5"></el-option>
                    <el-option label="按规格过滤" value="6"></el-option>
                    <el-option label="按型号过滤" value="7"></el-option>
                    <el-option label="按产地过滤" value="8"></el-option>
                    <el-option label="按条码过滤" value="9"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
          </el-input>
		<!--主要数据表格-->
	  <el-table :data="kctableData" border height="230" style="width: 100%">
		<el-table-column  prop="kc_num" label="商品编号" width="150"></el-table-column>
	    <el-table-column property="kc_name" label="商品名称" width="200"></el-table-column>
	    <el-table-column prop="kc_sipmeName" label="单位简名" width="120"></el-table-column>
	    <el-table-column prop="kc_tel" label="库存余量" width="120"></el-table-column>
	    <el-table-column prop="kc_iphone" label="单位" width="300"></el-table-column>
	    <el-table-column prop="kc_email" label="产地" width="300"></el-table-column>
	    <el-table-column prop="kc_money" label="规格" width="300"></el-table-column>
	    <el-table-column prop="kc_amount" label="型号" width="300"></el-table-column>
	    <el-table-column prop="kc_credit" label="重量" width="120"></el-table-column>
	    <el-table-column prop="kc_avai" label="品牌" width="200"></el-table-column>
	    <el-table-column label="操作" width="200">
	      <template scope="scope">
	      	<el-button @click.native.prevent="kcchoiceRow(scope.$index, kctableData)" type="text" size="small">选中</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, kctableData)" type="danger" size="small" value="选中" title="删除本行">删除</el-button>
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
	  	<el-button size="small" @click="editdialog">添加</el-button>
	  	<el-button size="small" @click="dialogOneShow">确定</el-button>
	  	<el-button size="small" @click="kcdialogVisible1=false">关闭</el-button>
	  </div>
	</el-dialog>


<el-dialog title="商品信息--信息框" :visible.sync="editinforbox">
            <el-tabs v-model="editActiveName" type="card" @tab-click="editHandleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
                        所属分类：
                        <el-row>
                            <el-col>
                                <el-form-item label="商品名称" prop="name">
                                    <el-input v-model="editForm.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="商品编号">
                                    <el-input v-model="editForm.num"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-checkbox v-model="checked" style="padding: 5px;">编号递增</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="简名">
                                    <el-input v-model="editForm.sname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="拼音码">
                                    <el-input v-model="editForm.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="品牌">
                                    <el-input v-model="editForm.brand"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产地">
                                    <el-input v-model="editForm.place"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="规格">
                                    <el-input v-model="editForm.format"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="型号">
                                    <el-input v-model="editForm.model"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="重量(kg)">
                                    <el-input v-model="editForm.weight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="长度">
                                    <el-input v-model="editForm.length"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="宽度">
                                    <el-input v-model="editForm.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="高度">
                                    <el-input v-model="editForm.height"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="供货信息">
                                    <el-input v-model="editForm.goodsinfor"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="参考成本价(基本单位)">
                                    <el-input v-model="editForm.ckcbj"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注">
                                    <el-input v-model="editForm.note"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="售价管理" name="second">
                    <el-table :data="editTable" border style="width: 100%" >
                        <el-table-column prop="colth" label="" width="150"></el-table-column>
                        <el-table-column prop="name" label="单位名称" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reltsp" label="单位关系" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="条码" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sale" label="特价" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="零售价" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price1" label="预设售价1" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price2" label="预设售价2" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price3" label="预设售价3" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price4" label="预设售价4" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price5" label="预设售价5" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price6" label="预设售价6" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price7" label="预设售价7" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price8" label="预设售价8" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price9" label="预设售价9" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price10" label="预设售价10" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="商品图片管理" name="third" class="sptpgl">
                    <span>图片大小不能超过500kb,格式必须为jpg,gif,png,bmp,建议分辨率为240*280</span>
                    <el-row>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button><span style="color:red;">头图</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editinforbox = false">关闭</el-button>
            </div>
        </el-dialog>







<div class="demo-input-size">
 		<el-form label-width="80px" :model="formLabelAlign">
 			<el-row>
 				<el-col :span="6">进货订单</el-col>
 				<el-col :span="3" :offset="12"><el-form-item label="录单日期"><el-date-picker size="mini" v-model="formLabelAlign.value" type="date" placeholder="选择日期"></el-date-picker></el-form-item></el-col>
 				<el-col :span="3"><el-form-item label="编号"><el-input size="mini" v-model="formLabelAlign.region"></el-input></el-form-item></el-col>
 			</el-row>
		</el-form>

    </div>

<div class="demo-input-size new_screen">
		<el-form ref="form" :model="supply_form" label-width="80px">
			<el-row>
				<el-col :span="3"><el-form-item label="供货单位">
			        <el-input size="small" v-model="supply_form.supply_name" icon="more" :on-icon-click="dialogOneShow1"></el-input>
			    </el-form-item></el-col>
			    <el-col :span="3"><el-form-item label="经手人">
			        <el-input size="small" v-model="supply_form.supply_person" icon="more" :on-icon-click="dialogTwoShow1"></el-input>
			    </el-form-item></el-col>
			    <el-col :span="3"><el-form-item label="经手日期">
			        <el-date-picker size="small" v-model="supply_form.supply_date" type="date" placeholder="选择日期"></el-date-picker>
			    </el-form-item></el-col>
			</el-row>
			<el-row>
				<el-col :span="3"><el-form-item label="收货仓库">
			        <el-input size="small" v-model="supply_form.supply_ware" icon="more" :on-icon-click="dialogThreeShow1"></el-input>
			    </el-form-item></el-col>
			    <el-col :span="6"><el-form-item label="摘要">
			        <el-input size="small" v-model="supply_form.supply_abs"></el-input>
			    </el-form-item></el-col>
			    <el-col :span="3"><el-form-item label="附加说明">
			        <el-input size="small" v-model="supply_form.supply_addit" icon="more" :on-icon-click="dialogFourShow1"></el-input>
			    </el-form-item></el-col>
			    <el-col :span="1">
			    	<el-form-item>
			    		<el-button type="primary" size="small">搜索</el-button>
			    	</el-form-item>
			    </el-col>
			</el-row>
		</el-form>
	</div>


	<!--进货商品详细列表-->
	<div class="list_table">
		<el-table :data="tableData" border style="width: 100%">
		    <el-table-column prop="order_num" label="商品编号" width="200">
		    	<template scope="scope">
		          <el-input v-model="input" icon="more" :on-icon-click="kcdialogShow1"></el-input>
		        </template>
		    </el-table-column>
		    <el-table-column prop="order_name" label="商品名称" width="120">
		    	<template scope="scope">
		          <el-input v-model="bianhao" icon="more" :on-icon-click="kcdialogShow1"></el-input>
		        </template>
		    </el-table-column>
		    <el-table-column prop="order_code" label="条码" width="120"></el-table-column>
		    <el-table-column prop="order_spec" label="规格" width="300"></el-table-column>
		    <el-table-column prop="order_model" label="型号" width="300"></el-table-column>
		    <el-table-column prop="order_company" label="单位" width="300"></el-table-column>
		    <el-table-column prop="order_unit" label="单位关系" width="300"></el-table-column>
		    <el-table-column prop="order_aux1" label="辅助单位1" width="120"></el-table-column>
		    <el-table-column prop="order_aux2" label="辅助单位2" width="120"></el-table-column>
		    <el-table-column prop="order_number" label="数量" width="120"></el-table-column>
		    <el-table-column prop="order_disprice" label="折前单价" width="120"></el-table-column>
		    <el-table-column prop="order_disamount" label="折前金额" width="120"></el-table-column>
		    <el-table-column prop="order_dis" label="折扣(0.9为9折)" width="200"></el-table-column>
		    <el-table-column prop="order_price" label="单价" width="120"></el-table-column>
		    <el-table-column prop="order_amount" label="金额" width="120"></el-table-column>
		    <el-table-column prop="order_state" label="状态" width="120"></el-table-column>
		    <el-table-column label="删除" width="80">
		      <template scope="scope">
		        <el-button  @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small" title="删除本行">删除</el-button>
		      </template>
		    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
	</div>

	<!--表格信息统计-->
	<div class="total">
		<el-row>
		  <el-col :span="1" align="right"><label>制单人：</label></el-col>
		  <el-col :span="2" ><label>河南不去电子科技</label></el-col>
		  <el-col :span="1"><template><el-checkbox v-model="checked">订单完成</el-checkbox></template></el-col>

		  <el-col :span="1" align="right" :offset="13"><label>合计数量：</label></el-col>
		  <el-col :span="1" ><label>0</label></el-col>

		  <el-col :span="2" align="right"><label>折前合计金额：</label></el-col>
		  <el-col :span="1" ><label>0</label></el-col>

		  <el-col :span="1" align="right"><label>合计金额：</label></el-col>
		  <el-col :span="1" ><label>0</label></el-col>
		</el-row>

		<div class="btn_all">
			<el-button size="small" @click="dialogFiveShow1">录单配置</el-button>
			<el-button size="small" @click="dialogSixShow1">选择套餐</el-button>
			<el-button size="small" @click="dialogSevenShow1">导入商品明细</el-button>
			<el-button size="small">付定金</el-button>
			<el-button size="small">打印</el-button>
			<el-button size="small">保存｜退出</el-button>
		</div>
	</div>
</div>
</template>

<script lang="babel">
	 import './less/style.less'
     import city from '../../../../assets/js/city.js'
     let id = 1000;
	export default {
      data:function() {
        return {
        	labelPosition:'left',
        	 currentPage:1,
        	 total: 10,
             input5: '',
             input1:'',
             input: '0001',
             bianhao: '苹果',
             select:'',
        	sales_select: '',
        	sales_input1:"",
        	value1:'',
        	value:'',
        	editActiveName: 'first',
        	checked: false,
			cityOptions:city,
			dialogVisible: false,
        	dialogOneVisible1 : false,
        	dialogOneVisible2: false,
        	dialogOneVisible3: false,
        	dialogOneVisible4: false,
        	dialogTwoVisible1: false,
        	dialogTwoVisible2: false,
        	dialogThreeVisible1: false,
        	dialogThreeVisible2: false,
        	dialogFourVisible1  : false,
        	dialogFourVisible2: false,
        	dialogFiveVisible1: false,
        	dialogSixVisible1: false,
        	dialogSixVisible2: false,
        	dialogSevenVisible1:false,
        	kcdialogVisible1: false,
        	editinforbox: false,
        	wldw:{
        		unit_name:[
        		 {required: true, message: '单位名称不能为空', trigger: 'blur'}
        		],
        		unit_num:[
        		   {required: true, message: '单位名称编号不能为空', trigger: 'blur'}
        		]
        	},
        	xzdz:{
        		dzname:[
        		 {required: true, message: '收货联系人不能为空', trigger: 'blur'}
        		],
        		dziphone:[
        		 {required: true, message: '联系电话不能为空', trigger: 'blur'}
        		],
        		dzaddress:[
        		 {required: true, message: '详细地址不能为空', trigger: 'blur'}
        		]
        	},
        	nbzy:{
        		nbzyname:[
        		 {required: true, message: '收货联系人不能为空', trigger: 'blur'}
        		],
        	},
        	addck:{
        		ckname:[
        		 {required: true, message: '仓库全名不能为空', trigger: 'blur'}
        		],
        		cklxr:[
        		 {required: true, message: '联系人不能为空', trigger: 'blur'}
        		],
        		cklxdh:[
        		 {required: true, message: '联系电话不能为空', trigger: 'blur'}
        		],
        		ckyzbm:[
        		 {required: true, message: '邮政编码不能为空', trigger: 'blur'}
        		],
        		ckfhdz:[
        		 {required: true, message: '发货地址不能为空', trigger: 'blur'}
        		]
        	},
        	addcy:{
        		addcybh:[
        		 {required: true, message: '编号不能为空', trigger: 'blur'}
        		],
        		addcynr:[
        		 {required: true, message: '内容不能为空', trigger: 'blur'}
        		]
        	},
	        formLabelAlign: {
	          value: '',
	          name: '',
	          region: '',
	          type: ''
	        },
	        wlForm:{
	        	select: '',
	        	input: '',
	        },
	        addressForm:{
	        	select: '',
	        	input: ''
	        },
		    supply_form: {
	          supply_name: '',
	          supply_person: '',
	          supply_date: '',
	          supply_ware: '',
	          supply_abs: '',
	          supply_addit: ''
		    },
		    formInline: {
		      unit_name: '',
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
	      	 ywyForm:{
	      	 sales_select: '',
	      	 sales_input1: ''
	      	 },
	      	 dizhiForm:{
	      	 	dzname: '',
	      	 	dziphone: '',
	      	 	dztel: '',
	      	 	dzcode: '',
	      	 	selectedOptions: '',
	      	 	dzaddress: ''
	      	 },
	      	 nbzyForm:{
	      	 	nbzyname: '',
	      	 	nbzyjian: '',
	      	 	nbzysector: '',
	      	 	nbzycode: '',
	      	 	nbzyiphone:'',
	      	 	nbzypinyin: '',
	      	 	nbzyremark: ''
	      	 },
	      	 ckForm:{
	      	 	select:'',
	      	 	input:''
	      	 },
	      	 addckForm:{
	      	 	cktype1: '',
	      	 	ckname: '',
	      	 	ckcode: '',
	      	 	ckbianhao: '',
	      	 	ckjm: '',
	      	 	ckpym: '',
	      	 	ckbz: '',
	      	 	cklxr: '',
	      	 	cklxdh: '',
	      	 	ckyzbm: '',
	      	 	selectedOptions: '',
	      	 	ckfhdz: ''
	      	 },
	      	 cyForm:{
	      	 	select: '',
	      	 	input:''
	      	 },
	      	 addcyForm:{
	      	 	addcybh: '',
	      	 	addcynr: ''
	      	 },
	      	 sptcForm:{
	      	 	select: '',
	      	 	input: ''
	      	 },
	      	 addtcForm:{
	      	 	tcname: '',
	      	 	tcbm: '',
	      	 	tctm: '',
	      	 	tcdyfs: '',
	      	 	tcbz: ''
	      	 },
	      	 editForm: {
	            name: ''
	            },
	         rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
            },
	      	 wltableData:[{
	      	 	wl_num: '001',
	      	 	wl_name: '河南不去',
	      	 	wl_sipmeName: '不去',
	      	 	wl_tel: '450000',
	      	 	wl_iphone: '126789546',
	      	 	wl_email: '456258',
	      	 	wl_money: '45623',
	      	 	wl_amount: '840384',
	      	 	wl_credit: "4793",
	      	 	wl_avai: '480384'
	      	 }],
	      	kctableData:[{
	      	 	kc_num: '',
	      	 	kc_name: '',
	      	 	kc_sipmeName: '',
	      	 	kc_tel: '',
	      	 	kc_iphone: '',
	      	 	kc_email: '',
	      	 	kc_money: '',
	      	 	kc_amount: '',
	      	 	kc_credit: "",
	      	 	kc_avai: ''
	      	 }],
          tableData: [{
	          order_num: '0001',
	          order_name: '苹果6splus',
	          order_code:'0001',
	          order_spec:'32G全网通4G手机',
	          order_model: '6splus',
	          order_company: '河南电信直供',
	          order_unit: '直供平台',
	          order_aux1: '无',
	          order_aux2: '无',
	          order_number: '10',
	          order_disprice: '3999',
	          order_disamount : '39990',
	          order_dis: '0.95',
	          order_price: '3799',
	          order_amount: '37990',
	          order_state: '预售'
	        },{
	          order_num: '0002',
	          order_name: 'vivo x20plus',
	          order_code:'0002',
	          order_spec:'官方标配64G裸机',
	          order_model: 'x20plus',
	          order_company: '河南电信直供',
	          order_unit: '直供平台',
	          order_aux1: '无',
	          order_aux2: '无',
	          order_number: '10',
	          order_disprice: '3999',
	          order_disamount : '39990',
	          order_dis: '0.95',
	          order_price: '3799',
	          order_amount: '37990',
	          order_state: '预售'
	        },{
	          order_num: '0003',
	          order_name: 'OPPO R11',
	          order_code:'0001',
	          order_spec:'官方标配64G全网通手机',
	          order_model: 'R11',
	          order_company: '郑州新天地',
	          order_unit: '零售供货商',
	          order_aux1: '无',
	          order_aux2: '无',
	          order_number: '10',
	          order_disprice: '2799',
	          order_disamount : '27990',
	          order_dis: '0.95',
	          order_price: '2659',
	          order_amount: '26590',
	          order_state: '预售'
	        },{
	          order_num: '1001',
	          order_name: '品胜 苹果快充版数据/充电线',
	          order_code:'1001',
	          order_spec:'1.5米 白色 苹果手机5/5s/6/6s/Plus/7/7Plus',
	          order_model: '苹果手机',
	          order_company: '郑州新天地',
	          order_unit: '零售供货商',
	          order_aux1: '无',
	          order_aux2: '无',
	          order_number: '50',
	          order_disprice: '25.90',
	          order_disamount : '1295',
	          order_dis: '1',
	          order_price: '25.90',
	          order_amount: '1295',
	          order_state: '预售'
	        },{
	          order_num: '1002',
	          order_name: '亿色(ESR)苹果7&8 Plus手机壳',
	          order_code:'1002',
	          order_spec:'5.5英寸手机套 透明轻薄硅胶防摔软壳',
	          order_model: 'iPhone7 plus&8 Plus手机壳',
	          order_company: '郑州新天地',
	          order_unit: '零售供货商',
	          order_aux1: '无',
	          order_aux2: '无',
	          order_number: '100',
	          order_disprice: '11.11',
	          order_disamount : '1111',
	          order_dis: '1',
	          order_price: '11.11',
	          order_amount: '1111',
	          order_state: '预售'
	        }],
        addressTableData:[{
          name:'小可',
          iphone: '456464',
          tel: '84038',
          code: '450000',
          city: '河南省郑州市金水区',
          address: '黄河南路永和伯爵'
        }],
        ywytableData:[{
        	ywycode: '001',
        	ywyname: '宋小可',
        	ywysector: '研发部'
        }],
        cktableData:[{
        	ckcode: '001',
        	ckname: '主仓库'
        }],
        cytableData:[{
        	cycode: '1',
        	cycontent: '重要供货商，小心维护'
        }],
        ldtableData:[{
        	lm: '1111'
        }],
        sptctableData:[{
        	sptccode: '00001',
        	sptcname: '套餐一'
        }],
        addcttableData:[{
        	ctcode: '套餐1',
        	ctname: '特惠套餐1',
        	ctdw: '河南电信',
        	ctnum: '100',
        	ctdj: '+29元',
        	ctje: '+29元',
        	ctzt: '未售完'
        }],
        editTable:[{

            }]

        }
      },
  methods: {
  	dialogOneShow1(){
  		this.dialogOneVisible1 = true;
  	},
  	dialogOneShow2(){
  		this.dialogOneVisible2 = true;
  	},
  	dialogOneShow(){
  		this.dialogOneVisible1 = false;
  	},
  	dialogOneShow3(){
  		this.dialogOneVisible3 = true;
  	},
  	dialogOneShow4(){
  		this.dialogOneVisible4 = true;
  	},
  	dialogTwoShow1(){
  		this.dialogTwoVisible1 = true;
  	},
  	dialogTwoShow2(){
  		this.dialogTwoVisible2 = true;
  	},
  	dialogThreeShow1(){
  		this.dialogThreeVisible1 = true;
  	},
  	dialogThreeShow2(){
  		this.dialogThreeVisible2 = true;
  	},
  	dialogFourShow1(){
  		this.dialogFourVisible1 = true;
  	},
  	dialogFourShow2(){
  		this.dialogFourVisible2 = true;
  	},
  	dialogFiveShow1(){
  		this.dialogFiveVisible1 = true;
  	},
  	dialogSixShow1(){
  		this.dialogSixVisible1 = true;
  	},
  	dialogSixShow2(){
  		this.dialogSixVisible2 = true;
  	},
  	dialogSevenShow1(){
  		this.dialogSevenVisible1 = true;
  	},
  	kcdialogShow1(){
  		this.kcdialogVisible1 = true;
  	},
  	editdialog(){
  		this.editinforbox = true;
  	},
  	editHandleClick(tab, event) {
        console.log(tab, event);
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

    },
    choiceRow(index, rows){
           this.supply_form.supply_name = rows[index].wl_name;
        },
    kcchoiceRow(index, rows){
//         this.supply_form.supply_name = rows[index].wl_name;
        },
     addresschoice(index, rows){
        this.formInline.unit_address = rows[index].city+rows[index].address;	
       },
    ywychoice(index, rows){
	    this.supply_form.supply_person = rows[index].ywyname;	
	   },
	 ckchoice(index, rows){
	    this.supply_form.supply_ware = rows[index].ckname;	
	   },
	cychoice(index, rows){
	    this.supply_form.supply_addit = rows[index].cycontent;	
	  },
//	ldchoice(index, rows){
//	   	this.dialogFiveVisible1=false;
//	   },
	 sptcchoice(index, rows){
	   	this.dialogSixVisible1=false;
	   },
	 onSubmit() {
	    console.log('submit!');
	  },
	  handleSelectionChange(index,row,val) {

	    this.multipleSelection = val;
	  },
	  handleChange(value){
            console.log(value);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.dialogOneVisible2=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dizhisubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.dialogOneVisible4=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      nbzysubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.dialogTwoVisible2=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addcksubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.dialogThreeVisible2=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addcysubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.dialogFourVisible2=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

  }

    }

</script>
