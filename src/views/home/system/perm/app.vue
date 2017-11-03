<template>
    <div class="perm">
    	<!---------新增详细地址的模态框-------------->
<el-dialog size="tiny" title="新增用户" :visible.sync="dialogOneVisible1">
    <div class="app_form">
    	<el-form :model="dizhiForm" label-width="100px" :rules="dizhi" ref="dizhiForm">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="职员名称" prop="dzname"><el-input size="small" v-model="dizhiForm.dzname"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				<el-form-item label="职员简名"><el-input size="small" v-model="dizhiForm.dziphone"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		   <el-row>
		   	  <el-col :span="12">
		   	  	<el-form-item label="类型">
				    <el-select size="small" v-model="dizhiForm.dzlx" placeholder="未设置">
				      <el-option label="研发部" value="供货商"></el-option>
				      <el-option label="运营部" value="客户"></el-option>
				    </el-select>
				</el-form-item>
		   	  </el-col>
		   	  <el-col :span="12">
		   	  	 <el-form-item label="编号"><el-input size="small" v-model="dizhiForm.dzcode"></el-input></el-form-item>
		   	  </el-col>
		   </el-row>
		   <el-row>
		   	  <el-col :span="12">
		   	  	<el-form-item label="手机"><el-input size="small" v-model="dizhiForm.dztel"></el-input></el-form-item>
		   	  </el-col>
		   	  <el-col :span="12">
		   	  	 <el-form-item label="拼音码"><el-input size="small" v-model="dizhiForm.dzcode"></el-input></el-form-item>
		   	  </el-col>
		   </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item class="addRem"  label="备注"><el-input size="small" v-model="dizhiForm.dzaddress" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
 <span slot="footer" class="dialog-footer">
  	<el-button size="small">保存</el-button>
  	<el-button size="small" @click="dialogOneVisible1=false">关闭</el-button>
 </span>
</el-dialog>


<!---------编辑用户---------->
<el-dialog size="tiny" title="编辑用户" :visible.sync="dialogOneVisible2">
    <div class="app_form">
    	<el-form :model="xiugaiForm" label-width="100px">
    		<el-row>
    			<el-col :span="12">
    				<el-form-item label="职员名称"><el-input size="small" v-model="xiugaiForm.dzname"></el-input></el-form-item>
    			</el-col>
    			<el-col :span="12">
    				<el-form-item label="职员简名"><el-input size="small" v-model="xiugaiForm.dziphone"></el-input></el-form-item>
    			</el-col>
    		</el-row>
		   <el-row>
		   	  <el-col :span="12">
		   	  	<el-form-item label="类型">
				    <el-select size="small" v-model="xiugaiForm.dzlx" placeholder="未设置">
				      <el-option label="研发部" value="1"></el-option>
				      <el-option label="运营部" value="2"></el-option>
				    </el-select>
				</el-form-item>
		   	  </el-col>
		   	  <el-col :span="12">
		   	  	 <el-form-item label="编号"><el-input size="small" v-model="xiugaiForm.dzcode"></el-input></el-form-item>
		   	  </el-col>
		   </el-row>
		   <el-row>
		   	  <el-col :span="12">
		   	  	<el-form-item label="手机"><el-input size="small" v-model="xiugaiForm.dztel"></el-input></el-form-item>
		   	  </el-col>
		   	  <el-col :span="12">
		   	  	 <el-form-item label="拼音码"><el-input size="small" v-model="xiugaiForm.dzpym"></el-input></el-form-item>
		   	  </el-col>
		   </el-row>
		  <el-row>
		  	<el-col>
		  		<el-form-item class="addRem"  label="备注"><el-input size="small" v-model="xiugaiForm.dzbz" ></el-input></el-form-item>
		  	</el-col>
		  </el-row>
		</el-form>
    </div>
  <!--操作按钮-->
 <span slot="footer" class="dialog-footer">
  	<el-button size="small">保存</el-button>
  	<el-button size="small" @click="dialogOneVisible2=false">关闭</el-button>
  </span>
</el-dialog>


<!--修改密码-->

<el-dialog title="设置登录密码" :visible.sync="dialogshezhi" size="tiny" :before-close="handleClose">
  <span>
  	 <div class="passCotent">
  	 	<h4>如何设置安全密码</h4>
  	 	<p>密码长度必须为8-20位，且同时包含字母、数字和符号，三种字符的组合。</p>
  	 	<p>避免使用太简单的密码，如：woaini1314，password。</p>
  	 	<p>避免使用有规律的数字或字母，如：123，321，aaa，ABC。</p>
  	 	<p>避免以3个连续特殊字符组合结尾，如:！@#。</p>
  	 	<p>避免用公司名、用户名或联系人的拼音首字母开头。</p>
  	 </div>
  	 <el-form :model="passForm" label-width="80px">
  	 	<el-row>
  	 		<el-col :span="16">
			    <el-form-item label="新密码">
			      <el-input v-model="passForm.name" auto-complete="off"></el-input>
			    </el-form-item>
	    	</el-col>
	    </el-row>
	    <el-row>
  	 		<el-col :span="16">
			    <el-form-item label="确认密码">
			    	<el-input v-model="passForm.mima" auto-complete="off"></el-input>
			    </el-form-item>
		    </el-col>
	    </el-row>
	  </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogshezhi = false">取 消</el-button>
    <el-button type="primary" @click="dialogshezhi = false">确 定</el-button>
  </span>
</el-dialog>

        <div class="left" v-if="leftFlag">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			   <el-tab-pane label="查询条件" name="first">
			   	<div class="tabFirst">
			   		<el-form ref="form" :model="form_tj" label-width="80px">
				   	    <div class="form_div" style="margin-top: 15px;">
						  <el-input placeholder="请输入内容" v-model="form_tj.input">
						    <el-select v-model="form_tj.select" slot="prepend" placeholder="请选择">
						      <el-option label="餐厅名" value="1"></el-option>
						      <el-option label="订单号" value="2"></el-option>
						      <el-option label="用户电话" value="3"></el-option>
						    </el-select>
						    <el-button slot="append" icon="search"></el-button>
						  </el-input>
						</div>
					<el-form-item label="是否停用" style="margin-top: 10px;">
				    <el-select size="small" v-model="form_tj.region" placeholder="请选择活动区域">
				      <el-option label="全部" value="0"></el-option>
				      <el-option label="否" value="1"></el-option>
				      <el-option label="是" value="2"></el-option>
				    </el-select>

				  </el-form-item>
				  <div class="formTab">
				  	<el-tree
                        :data="treeData"
                        :props="defaultProps"
                        node-key="id"
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>
				  </div>
				  </el-form>

				</div>
			   </el-tab-pane>
			</el-tabs>
        </div>
        <div class="right">
            <div class="btn-group">
            	<el-row>
            		<el-col :span="20">
            			<el-button @click="dialogOneShow1">新增</el-button>
		                <el-button >修改密码</el-button>
		                <el-button @click="dialogOne">修改密码</el-button>
		                <el-button >设置为普通登录用户</el-button>
		                <el-button >取消登录用户</el-button>
		                <el-button >设置登录用户权限</el-button>
		                <el-button >复制权限</el-button>
            		</el-col>
            		<el-col :span="4">
            			<el-form ref="form_tj" :model="form" label-width="80px">
		                	<el-form-item label="筛选" style="margin-top: 10px;">
						    <el-select size="small" v-model="form_sx.region" placeholder="请选择活动区域">
						      <el-option label="全部" value="0"></el-option>
						      <el-option label="仅显示登录用户" value="1"></el-option>
						    </el-select>
						  </el-form-item>
						</el-form>
            		</el-col>
            	</el-row>
            </div>
            <i class="goleft" :class="{true:'el-icon-arrow-left',false:'el-icon-arrow-right goright'}[leftFlag]" @click="goLeft()"></i>
            <div class="con">
                <el-table :data="tableData" border style="width: 100%" max-height="580">
                    <el-table-column prop="zybh" label="职员编号" width="150"></el-table-column>
                    <el-table-column prop="zymc" label="职员名称" width="120"></el-table-column>
                    <el-table-column prop="zyjm" label="职员简名" width="120"></el-table-column>
                    <el-table-column prop="pym" label="拼音码" width="120"></el-table-column>
                    <el-table-column prop="ssbm" label="所属部门" width="300"></el-table-column>
                    <el-table-column prop="bdsj" label="绑定手机" width="150"></el-table-column>
                    <el-table-column prop="fxdw" label="分销单位" width="120"></el-table-column>
                    <el-table-column prop="ty" label="停用" width="120"></el-table-column>
                    <el-table-column prop="dlyh" label="登录用户" width="120"></el-table-column>
                    <el-table-column prop="bz" label="备注" width="120"></el-table-column>
                    <el-table-column label="操作" width="300">
                        <template scope="scope">
                        	<el-button type="primary" size="small" @click="dialogOneShow2(scope.$index,scope.row)">修改</el-button>
                        	<el-button type="primary" size="small">停用</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
            </div>
            <div class="btn_tishi">
                <p>普通用户信息：总用户<span>[20]</span>已使用<span>[1]</span>未使用<span>[19]</span></p>
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
            	dialogOneVisible4: false,
            	dialogOneVisible1: false,
            	dialogOneVisible2: false,
            	input1:'',
                input5: '',
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
            	activeName2: 'first',
            	selectedOptions:['','',''],
				cityOptions:city,
            	dialogTwoVisible1: false,
            	dialogOneVisible4: false,
            	dialogOneVisible1: false,
            	dialogOneVisible2: false,
            	dialogshezhi: false,
		      	 dizhiForm:{
		      	 	dzname: '',
		      	 	dziphone: '',
		      	 	dztel: '',
		      	 	dzlx: '',
		      	 	dzcode: '',
		      	 	dzaddress: ''
		      	 },
		      	 xiugaiForm:{
		      	 	dzname: '',
		      	 	dziphone: '',
		      	 	dztel: '',
		      	 	dzcode: '',
		      	 	dzlx: '',
		      	 	dzpym: '',
		      	 	dzbz: ''
		      	 },
		      	 form_tj:{
		      	 	region: '0'
		      	 },
                leftFlag:true,
                select:'',
                input:'',
                cktableData:[{
		        	ckcode: '001',
		        	ckname: '主仓库'
		        }],
		      	 form_sx:{
		      	 	region: '0'
		      	 },
		      	 passForm:{
		      	 	name:'',
		      	 	mima:''
		      	 },
		      	 dizhi:{
	        		dzname:[
	        		 {required: true, message: '职员名称不能为空', trigger: 'blur'}
	        		],
	        	},
                leftFlag:true,
                tableData: [{
                    zybh: '001',
                    zymc: '张大可',
                    zyjm: '大可',
                    pym: 'zhangdake',
                    ssbm: '维修部',
                    bdsj: '15603555555',
                    fxdw: '',
                    ty: '否',
                    dlyh: '否',
                    bz: '无'
                },{
                    zybh: '002',
                    zymc: '汤小丽',
                    zyjm: '小丽',
                    pym: 'tangxiaoli',
                    ssbm: '后勤部',
                    bdsj: '18779135413',
                    fxdw: '',
                    ty: '否',
                    dlyh: '是',
                    bz: '无'
                },{
                    zybh: '003',
                    zymc: '杨小娜',
                    zyjm: '小娜',
                    pym: '杨小娜',
                    ssbm: '后勤部',
                    bdsj: '15646456236',
                    fxdw: '',
                    ty: '是',
                    dlyh: '是',
                    bz: '无'
                }],
                 treeData: [{
                    id: 1,
                    label: '全部分类',
                    children: [{
                        id: 4,
                        label: '按所属部门',
                        children: [{
                            id: 9,
                            label: '维修部'
                        }, {
                            id: 10,
                            label: '后勤部'
                        }]
                    },{
                        id: 5,
                        label: '按是否停用',
                        children: [{
                            id: 6,
                            label: '是'
                        }, {
                            id: 7,
                            label: '否'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
        	dialogOneShow1(){
		  		this.dialogOneVisible1 = true;
		  	},
		  	dialogOneShow2(index,row){
		  		this.dialogOneVisible2 = true;
		  		this.xiugaiForm={
		  			dzname:row.zymc,
		  			dziphone:row.zyjm,
		  			dzcode:row.zybh,
		  			dztel:row.bdsj,
		  			dzpym: row.pym,
		  			dzbz:row.bz
		  		}
		  	},
		  	dialogOneShow3(){
		  		this.dialogTwoVisible1 = true;
		  	},
		  	dialogOneShow4(){
		  		this.dialogOneVisible4 = true;
		  	},
		  	onSubmit() {
		        console.log('submit!');
		    },
		  	dialogOne(){
		  		this.dialogshezhi = true;
		  	},
        	 handleClick(tab, event) {
		        console.log(tab, event);
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
                <span style="float: right;">

                    <el-button class="el-icon-minus" size="mini" on-click={ () => this.remove(store, data) }></el-button>
                    <el-button style="margin-right:10px;" class="el-icon-plus" size="mini" on-click={ () => this.append(store, data) }></el-button>
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
            handleSelectionChange(val) {
			    this.multipleSelection = val;
			  },
            handleChange(value){
	            console.log(value);
	        },
	        append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

	        handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		      },
	        append(store, data) {
		        store.append({ id: id++, label: 'testtest', children: [] }, data);
		      }
        }
    }
</script>
