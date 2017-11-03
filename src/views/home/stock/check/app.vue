<template>
    <div class="stockCheck">
    	<el-dialog size="tiny" title="仓库选择框" :visible.sync="dialogVisible1">
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
  	<el-button size="small" @click="dialogOneShow2">添加</el-button>
  	<el-button size="small" @click="dialogVisible1=false">关闭</el-button>
  </div>
</el-dialog>

<!------------仓库的新增仓库信息-------------->
<el-dialog  title="仓库信息-信息框" :visible.sync="dialogVisible2">
    <div class="app_form">
    	<el-form :model="addckForm" label-width="100px" :rules="addck" ref="addckForm">
    		<el-row style="background: #eff3f6;">
    			<el-col>
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
				<el-col>
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
  	<el-button size="small" @click="dialogVisible2=false">关闭</el-button>
  </div>
</el-dialog>

<!--业务员选择框-->

<el-dialog size="tiny" title="业务员选择框" :visible.sync="dialogTwoVisible1">
	<el-form :model="ywyForm" label-width="100px">
			<el-input placeholder="请输入内容" v-model="ywyForm.select" >
                <el-select v-model="ywyForm.input" slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号查询" value="2"></el-option>
                    <el-option label="按全名过滤" value="3"></el-option>
                    <el-option label="按拼音码查询" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
          </el-input>

		<!--主要数据表格-->
	  <el-table :data="ywyTableData" border height="230" style="width: 100%">
		<el-table-column  prop="zybh" label="职员编号" width="150"></el-table-column>
	    <el-table-column prop="zymc" label="职员名称" width="200"></el-table-column>
	    <el-table-column prop="ssbm" label="所属部门" width="120"></el-table-column>
	    <el-table-column label="操作" width="150">
	      <template scope="scope">
	      	<el-button @click.native.prevent="ywychoice(scope.$index, ywyTableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
	        <el-button  @click.native.prevent="deleteRow(scope.$index, ywyTableData)" type="danger" size="small" value="删除" title="删除本行">删除</el-button>
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
	  	<el-button size="small" @click="dialogOneShow4">添加</el-button>
	  	<el-button size="small" @click="dialogTwoVisible1=false">关闭</el-button>
	  </div>
	</el-dialog>

<!--------------内部职员-信息框---------------->
<el-dialog size="tiny" title="内部职员-信息框" :visible.sync="dialogTwoVisible2">
    <div class="app_form">
    	<el-form :model="nbzyForm" label-width="80px" :rules="nbzy" ref="nbzyForm">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="职员名称" prop="zymc"><el-input size="small" v-model="nbzyForm.zymc"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				 <el-form-item label="职员简名"><el-input size="small" v-model="nbzyForm.zyjm"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="所属部门">
					    <el-select size="small" v-model="nbzyForm.ssbm" >
					      <el-option label="区域一" value="供货商"></el-option>
					      <el-option label="区域二" value="客户"></el-option>
					    </el-select>
					</el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="职员编号"><el-input size="small" v-model="nbzyForm.zybh"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col :span="12">
		    		<el-form-item label="手机"><el-input size="small" v-model="nbzyForm.sj"></el-input></el-form-item>
		    	</el-col>
		    	<el-col :span="12">
		    		<el-form-item label="拼音码"><el-input size="small" v-model="nbzyForm.pym"></el-input></el-form-item>
		    	</el-col>
		    </el-row>
		    <el-row>
		    	<el-col>
		    		<el-form-item label="备注"><el-input type="textarea"  size="small" v-model="nbzyForm.bz" ></el-input></el-form-item>
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



        <!--<h4>基本信息--往来单位</h4>-->
        <div class="left" v-if="leftFlag">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			   <el-tab-pane label="用户管理" name="first">
			   	<div class="tabFirst">
			   	<el-form ref="form" :model="glForm" label-width="80px">
					  <el-form-item label="盘点状态">
					    <el-select v-model="glForm.pdzt" placeholder="全部">
					      <el-option label="全部" value="1"></el-option>
					      <el-option label="盘点中" value="2"></el-option>
					       <el-option label="未盘点" value="3"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="仓库选择">
					    <el-input v-model="glForm.ckxz" icon="more" :on-icon-click="dialogOneShow1"></el-input>
					  </el-form-item>
					  <el-form-item label="盘点人">
					    <el-input v-model="glForm.pdr" icon="more" :on-icon-click="dialogOneShow3"></el-input>
					  </el-form-item>
					  <el-form-item label="开始时间">
					      <el-date-picker type="date" placeholder="选择日期" v-model="glForm.date1" style="width: 100%;"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="结束时间">
					      <el-date-picker type="date" placeholder="选择日期" v-model="glForm.date2" style="width: 100%;"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="盘点编号">
					    <el-input v-model="glForm.pdbh"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit">查询</el-button>
					  </el-form-item>
				</el-form>
				</div>
			   </el-tab-pane>
			</el-tabs>
        </div>
        <div class="right">
            <h5 style="color:red">盘点记录:</h5>
            <i class="goleft" :class="{true:'el-icon-arrow-left',false:'el-icon-arrow-right goright'}[leftFlag]" @click="goLeft()"></i>
            <div class="con">
                <el-table :data="tableData" border  style="width: 100%" height="532">
                    <el-table-column prop="ckbh" label="仓库编号" width="150"></el-table-column>
                    <el-table-column prop="ckmc" label="仓库名称" width="120"></el-table-column>
                    <el-table-column prop="pdbh" label="盘点编号" width="120"></el-table-column>
                    <el-table-column prop="pdzt" label="盘点状态" width="120"></el-table-column>
                    <el-table-column prop="pdsj" label="盘点时间" width="300"></el-table-column>
                    <el-table-column prop="pdr" label="盘点人" width="120"></el-table-column>
                    <el-table-column prop="bz" label="备注" width="120"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
            </div>
            <div class="btn-group">
                <el-button @click="dialogOneShow1">开始新盘点</el-button>
                <el-button >完成盘点</el-button>
                <el-button >删除记录</el-button>
                <el-button >退出</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    import city from '../../../../assets/js/city.js'
    let id = 1000;
    export default {
        components: {

        },
        data: function(){
            return{
                labelPosition:'left',
                currentPage:1,
        		total: 10,
            	activeName2: 'first',
            	selectedOptions:['','',''],
				cityOptions:city,
            	dialogVisible1: false,
            	dialogVisible2: false,
            	dialogTwoVisible1: false,
            	dialogTwoVisible2: false,
            	input1:'',
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
	        	nbzy:{
	        		zymc:[
	        		 {required: true, message: '职员名称不能为空', trigger: 'blur'}
	        		],
	        	},
                form:{
                   name:'',
                   bh:''
                },
                formInline: {
		          user: '',
		          region: '',
		          value: ''
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
		      	 glForm:{
		      	 	pdzt: '',
		      	 	pdzt: '',
		      	 	ckxz: '',
		      	 	pdr: '',
		      	 	date1: '',
		      	 	date2: '',
		      	 	pdbh: ''
		      	 },
		      	 ywyForm:{
		      	 	select: '',
		      	 	input: ''
		      	 },
		      	 nbzyForm:{
		      	 	zymc: '',
		      	 	zyjm: '',
		      	 	ssbm: '',
		      	 	zybh: '',
		      	 	sj: '',
		      	 	pym: '',
		      	 	bz: ''
		      	 },
                leftFlag:true,
                select:'',
                input:'',
                cktableData:[{
		        	ckcode: '001',
		        	ckname: '主仓库'
		        },{
		        	ckcode: '002',
		        	ckname: '仓库一号'
		        }],
                tableData: [{
                    ckbh: '001',
                    ckmc: '主仓库',
                    pdbh: 'pd001',
                    pdzt: '已盘点',
                    pdsj: '2017-10-25 17:55:55',
                    pdr: '张大可',
                    be: '无'
                },{
                    ckbh: '002',
                    ckmc: '仓库一号',
                    pdbh: '',
                    pdzt: '未盘点',
                    pdsj: '',
                    pdr: '',
                    be: '无'
                }],
                ywyTableData:[{
                	zybh: '001',
                	zymc: '宋小可',
                	ssbm: '研发部',
                	bz: '无'
                },{
                	zybh: '002',
                	zymc: '汤小丽',
                	ssbm: '后勤部',
                	bz: '无'
                }]
            }
        },
        methods: {
        	dialogOneShow1(){
		  		this.dialogVisible1 = true;
		  	},
		  	dialogOneShow2(){
		  		this.dialogVisible2 = true;
		  	},
		  	dialogOneShow3(){
		  		this.dialogTwoVisible1 = true;
		  	},
		  	dialogOneShow4(){
		  		this.dialogTwoVisible2 = true;
		  	},
		  	onSubmit() {
		        console.log('submit!');
		     },
        	 handleClick(tab, event) {
		        console.log(tab, event);
		      },
            ckchoice(index, rows){
			    this.glForm.ckxz = rows[index].ckname;
			  },
			ywychoice(index, rows){
			    this.glForm.pdr = rows[index].zymc;	
			   },
             handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
            remove(store, data) {
                this.$confirm('确定删除此分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.remove(data);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                //store.remove(data);
            },

            renderContent(h, { node, data, store }) {
                return (
                    <span>
                    <span>
                    <span>{node.label}</span>
                </span>
                <span style="float: right; margin-right: 20px ;margin-top:10px;">
                    <el-button class="el-icon-plus" size="mini" on-click={ () => this.append(store, data) }></el-button>
                <el-button class="el-icon-minus" size="mini" on-click={ () => this.remove(store, data) }></el-button>
                </span>
                </span>);
            },
            goLeft(){
                this.leftFlag == true?this.leftFlag =false:this.leftFlag = true;
                if(this.leftFlag == true){
                    $(".right").css("left","285px");
                }else{
                    $(".right").css("left","10px");
                }
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
            handleSelectionChange(val) {
			    this.multipleSelection = val;
			  },
            handleChange(value){
	            console.log(value);
	        }
        }
    }
</script>
