<template>
    <div class="invent">

<!--仓库选择框-->
<el-dialog size="tiny" title="仓库选择框" :visible.sync="dialogInvent">
	<el-form ref="form" :model="ckForm" label-width="80px">
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
  <el-table ref="multipleTable" :data="cktableData" border tooltip-effect="dark" style="width: 100%">
    <el-table-column prop="ckcode" label="仓库编号" width="120"></el-table-column>
    <el-table-column prop="ckname" label="仓库名称" show-overflow-tooltip></el-table-column>
    <el-table-column label="删除" width="120">
		      <template scope="scope">
		      	<el-button @click.native.prevent="ckchoice(scope.$index, cktableData)" type="text" size="small" value="选中" title="选中本行">选中</el-button>
		        <el-button  @click.native.prevent="deleteRow(scope.$index, cktableData)" type="danger" size="small" title="删除本行">删除</el-button>
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
  	<el-button size="small" @click="dialogInvent=false">关闭</el-button>
  </div>
</el-dialog>


        <h4>库存状况</h4>
        <div class="left" v-if="leftFlag">
            <h5>仓库 ：全部仓库</h5>
            <div>
                <h5>全部分类</h5>

            </div>
        </div>
        <div class="right">
            <i class="goleft" :class="{true:'el-icon-arrow-left',false:'el-icon-arrow-right goright'}[leftFlag]" @click="goLeft()"></i>
            <el-form label-width="100px" :model="wldwForm" class="demo-form-inline">
            <el-row>
            	<el-col :span="10">
            		<el-input placeholder="请输入内容" v-model="wldwForm.select">
                <el-select v-model="wldwForm.input" slot="prepend" placeholder="请选择">
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
            <!--</el-form-item>-->
            	</el-col>
            	<el-col :span="2" :offset="6">
            		<el-form-item>
	            		<el-checkbox v-model="wldwForm.ty">显示停用商品</el-checkbox>
	            	</el-form-item>
            	</el-col>
            	<el-col :span="2">
            		<el-form-item>
	            		<el-checkbox v-model="wldwForm.kxs">显示可销售库存</el-checkbox>
	            	</el-form-item>
            	</el-col>
            	<el-col :span="4">
            		<el-form-item label="过滤">
	            		<el-select v-model="wldwForm.gl" >
			                <el-option label="全部显示" value="0"></el-option>
			                <el-option label="不显示数量为0的商品" value="1"></el-option>
			                <el-option label="只显示数量为0的商品" value="2"></el-option>
			            </el-select>
	            	</el-form-item>
            	</el-col>

             </el-row>

            </el-form>


            <div class="con">
                <el-table :data="tableData" border height="532" style="width: 100%" max-height="580">
                    <el-table-column prop="spbh" label="商品编号" width="150"></el-table-column>
                    <el-table-column prop="spmc" label="商品名称" width="120"></el-table-column>
                    <el-table-column prop="spjm" label="商品简名" width="120"></el-table-column>
                    <el-table-column prop="sq" label="市区" width="120"></el-table-column>
                    <el-table-column prop="gg" label="规格" width="300"></el-table-column>
                    <el-table-column prop="xh" label="型号" width="120"></el-table-column>
                    <el-table-column prop="zl" label="重量" width="120"></el-table-column>
                    <el-table-column prop="jbdw" label="基本单位" width="120"></el-table-column>
                    <el-table-column prop="kcsl" label="库存数量" width="300"></el-table-column>
                    <el-table-column prop="cbjj" label="成本均价" width="120"></el-table-column>
                    <el-table-column prop="kcje" label="库存金额" width="120"></el-table-column>
                    <el-table-column prop="kxskc" label="可销售库存" width="120"></el-table-column>
                    <el-table-column prop="fzdw" label="辅助单位" width="120"></el-table-column>
                    <el-table-column prop="fzsl" label="辅助数量" width="120"></el-table-column>
                    <el-table-column prop="hw" label="货位" width="120"></el-table-column>
                    <el-table-column prop="spbz" label="商品备注" width="120"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
            </div>
            <div class="btn-group">

                <el-button @click="addInvent">选择仓库</el-button>
                <el-button>列表</el-button>
                <el-button >商品分布</el-button>
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
                dialogInvent:false,
                currentPage:1,
        		total: 10,
                input1: '',
                checked: true,
                 multipleSelection: [],
                ckForm:{
	            	select:'',
	            	input:''
                },
                wldwForm:{
                	input: '',
                	select: '',
                	ty: '',
                	kxs: '',
                	gl: ''
                },
                cktableData:[{
		        	ckcode: '001',
		        	ckname: '主仓库'
		        }],
                leftFlag:true,
                select:'',
                input:'',
                tableData: [{
                    spbh: '001',
                    spmc: '苹果6splus',
                    spjm: '苹果',
                    sq: '',
                    gg: '32G全网通4G手机',
                    xh: '6splus',
                    zl: '0.1kg',
                    jbdw: '部',
                    kcsl: '10',
                    cbjj: '3999',
                    kcje: '39990',
                    kxskc: '10',
                    fzdw: '无',
                    fzsl: '0',
                    hw: '本地仓库',
                    spbz: '无'
                },{
                    spbh: '002',
                    spmc: 'vivo x20plus',
                    spjm: 'vivo',
                    sq: '',
                    gg: '官方标配64G裸机',
                    xh: 'x20plus',
                    zl: '0.1kg',
                    jbdw: '部',
                    kcsl: '10',
                    cbjj: '3999',
                    kcje: '39990',
                    kxskc: '10',
                    fzdw: '无',
                    fzsl: '0',
                    hw: '本地仓库',
                    spbz: '无'
                }]
            }
        },
        methods: {
            ckchoice(index, rows){
            	this.dialogInvent=false
//			    this.supply_form.supply_addit = rows[index].cycontent;	
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
		     handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		      },
		      handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      },
            addInvent(){
                this.dialogInvent = true;
            },
            saveAddDw(){

            },
            saveClose(){

            },
            choiceAdRow(index,rows){

            },
            editAdRow(index,rows){

            },
            removeAdRow(index,rows){

            },
            handleChange(value){
                console.log(value);
            },
            handleSelectionChange(val) {
		        this.multipleSelection = val;
		     }
        }
    }
</script>
