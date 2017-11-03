<template>
    <div class="fyzc">
        <!--记账科目明细账-->
        <el-dialog class="kjkmMessage" size="tiny" title="记账科目明细账" :visible.sync="dialogJzmx">
            <el-form label-width="100px" :label-position="labelPosition" :model="jzmxForm" class="demo-form-inline">
                <div class="content1">
                    <h4>请输入日期</h4>
                    <el-row style="padding:10px;">
                        <el-col :span="12">
                            <el-date-picker v-model="jzmxForm.dateStart" type="date" placeholder="选择日期"></el-date-picker>&nbsp;&nbsp;至
                        </el-col>
                        <el-col :span="12">
                            <el-date-picker v-model="jzmxForm.dateEnd" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="mxzb('记账科目明细账','/mxz')">确定</el-button>
                <el-button @click="dialogJzmx = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 会计科目--信息框 -->
        <el-dialog class="kjkmMessage" size="tiny" title="会计科目--信息框" :visible.sync="dialogKjkmEdit">
            <el-form label-width="100px" :label-position="labelPosition" :model="kjkmForm" class="demo-form-inline">
                <div class="content1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="科目名称">
                                <el-input v-model="kjkmForm.bcName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="科目编号">
                                <el-input v-model="kjkmForm.bcSn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="科目简名">
                                <el-input v-model="kjkmForm.bcNameSp"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="拼音码">
                                <el-input v-model="kjkmForm.bcNamePy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="kjkmForm.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveKjkm">保存</el-button>
                <el-button @click="dialogKjkmEdit = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 树结构的分类添加 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd()">确 定</el-button>
            </div>
        </el-dialog>
        <h4>基本信息--现金银行</h4>
        <div class="left" v-if="leftFlag">
            <h5>现金银行分类</h5>
            <div>
                <el-input  placeholder="输入类别名称进行定位"></el-input>
                <el-button>定位</el-button>
                <div class="con">
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        node-key="id"
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>
                </div>
                <el-button class="fl-btn">编辑完成</el-button>
            </div>
        </div>
        <div class="right">
            <h5 style="color:red">分类路径:</h5>
            <i class="goleft" :class="{true:'el-icon-arrow-left',false:'el-icon-arrow-right goright'}[leftFlag]" @click="goLeft()"></i>
            <el-input placeholder="请输入内容" v-model="select">
                <el-select v-model="input" slot="prepend" placeholder="请选择">
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
            <div class="con">
                <el-table :data="tableData" border style="width: 100%" height="530">
                    <el-table-column prop="bcSn" label="科目编号" width="150"></el-table-column>
                    <el-table-column prop="bcName" label="科目名称" width="120"></el-table-column>
                    <el-table-column prop="bcNameSp" label="科目简名" width="120"></el-table-column>
                    <el-table-column prop="bcNamePy" label="拼音码" width="120"></el-table-column>
                    <el-table-column prop="bcInitialbalance" label="期初余额" width="300"></el-table-column>
                    <el-table-column prop="bcEndingbalan" label="期末余额" width="300"></el-table-column>
                    <el-table-column prop="bcStatus" label="状态" width="120"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="120"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="editRow(scope.$index, tableData)"
                                type="text"
                                size="small">修改
                            </el-button>
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
            </div>
            <div class="btn-group">
                <el-button @click="add">空白新增</el-button>
                <el-button @click="dialogJzmx = true" >明细账本</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    import service from './service/getData.js'
    let id = 1000;
    export default {
        components: {

        },
        data: function(){
            return{
                labelPosition:'left',
                dialogFormVisible:false,
                dialogKjkmEdit:false,
                dialogJzmx:false,
                leftFlag:true,
                flag:false,
                currentPage:1,
                total:0,
                select:'',
                input:'',
                myTreeStore:'',
                myTreeData:'',
                jzmxForm:{
                    dateStart:'',
                    dateEnd:''
                },
                kjkmForm:{
                    bcId:'',
                    bcName:'',
                    bcSn:'',
                    bcNameSp:'',
                    bcNamePy:'',
                    remark:''
                },
                form:{
                    name:'',
                    bh:''
                },
                treeData: [{
                    id: 1,
                    label: '全部分类',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData:[
                    {
                        bcId:'',
                        bcSn:'101',
                        bcName:'现金',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    },
                    {
                        bcId:'',
                        bcSn:'101',
                        bcName:'招商银行',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    },{
                        bcId:'',
                        bcSn:'101',
                        bcName:'建设银行',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    },{
                        bcId:'',
                        bcSn:'101',
                        bcName:'农业银行',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    },{
                        bcId:'',
                        bcSn:'101',
                        bcName:'中国银行',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    },{
                        bcId:'',
                        bcSn:'101',
                        bcName:'交通银行',
                        bcNameSp:'现金',
                        bcNamePy:'xj',
                        bcInitialbalance:'0',
                        bcEndingbalan:'',
                        bcStatus:'',
                        remark:''
                    }
                ]
            }
        },
        methods: {
            /**分页**/
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
            },
            async handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                let data = await service.xjyhList({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    this.total = data.total;
                }
            },
            goLeft(){
                this.leftFlag == true?this.leftFlag =false:this.leftFlag = true;
                if(this.leftFlag == true){
                    $(".right").css("left","285px");
                }else{
                    $(".right").css("left","10px");
                }
            },
            saveAdd(){
                this.dialogFormVisible = false;
                this.myTreeStore.append({ id: id++, label: this.form.name, children: [] }, this.myTreeData);
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
                //store.append({ id: id++, label: this.form.name, children: [] }, data);
            },
            append(store, data) {
                this.dialogFormVisible = true;
                console.log(store);
                console.log(data);
                this.form.bh=data.id;
                this.myTreeStore=store;
                this.myTreeData=data;
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
            async editRow(index,rows){
                this.dialogKjkmEdit = true;
                this.flag = true;
                let data = await service.editXjyh({
                    'bcId':rows[index].bcId
                });
                if(data.code == 200){
                   this.kjkmForm = data.obj;
                }
                this.kjkmForm.bcId = rows[index].bcId;
            },
            async deleteRow(index,rows){
                let data = await service.deleteXjyh({
                    'bcId':rows[index].bcId
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            add(){
                this.dialogKjkmEdit = true
            },
            async saveKjkm(){
                if(this.flag){
                    let data = await service.updateXjyh({
                        'bcId':this.kjkmForm.bcId,
                        'bcName':this.kjkmForm.bcName,
                        'bcSn':this.kjkmForm.bcSn,
                        'bcNameSp':this.kjkmForm.bcNameSp,
                        'bcNamePy':this.kjkmForm.bcNamePy,
                        'remark':this.kjkmForm.remark
                    });
                    if(data.code == 200){
                        this.dialogKjkmEdit = false;
                        this.flag = false;
                        let data = await service.xjyhList({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = data.data;
                            this.total = data.total;
                        }
                    }
                }else{
                    let data = await service.addXjyh({
                        'bcId':this.kjkmForm.bcId,
                        'bcName':this.kjkmForm.bcName,
                        'bcSn':this.kjkmForm.bcSn,
                        'bcNameSp':this.kjkmForm.bcNameSp,
                        'bcNamePy':this.kjkmForm.bcNamePy,
                        'remark':this.kjkmForm.remark
                    });
                    if(data.code == 200){
                        this.dialogKjkmEdit = false;
                        let data = await service.xjyhList({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = data.data;
                            this.total = data.total;
                        }
                    }
                }
            },
            mxzb(name,url){
                this.$router.push('/mxz');
                if(this.$store.state.historyArr.indexOf(name) == -1){
                    //选中当前页样式
                    for(var i=0;i<this.$store.state.historyArr.length;i++){
                        this.$store.state.historyList[i].flag = 0;
                    }
                    this.$store.state.isActive = false;
                    //添加到历史记录标签
                    this.$store.state.historyList.push({"name":name,"url":url,"flag":1,"flag2":true});
                    this.$store.state.historyArr.push(name);
                    //路由跳转
                    this.$router.push(url);
                }else{
                    //选中当前页样式
                    for(var i=0;i<this.$store.state.historyArr.length;i++){
                        this.$store.state.historyList[i].flag = 0;
                    }
                    this.$store.state.index = this.$store.state.historyArr.indexOf(name);
                    this.$store.state.historyList[this.$store.state.index].flag = 1;
                    //路由跳转
                    this.$router.push(this.$store.state.historyList[this.$store.state.index].url);
                }
            }
        },
        async mounted() {
            let data = await service.xjyhList({
                'page':1
            });
            if(data.code == 200){
                this.tableData = data.data;
                this.total = data.total;
            }
        }
    }
</script>
