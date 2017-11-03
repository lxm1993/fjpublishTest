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
                                <el-input v-model="kjkmForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="科目编号">
                                <el-input v-model="kjkmForm.bh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="科目简名">
                                <el-input v-model="kjkmForm.jm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="拼音码">
                                <el-input v-model="kjkmForm.pym"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="kjkmForm.bz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">保存</el-button>
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
        <h4>基本信息--费用支出</h4>
        <div class="left" v-if="leftFlag">
            <h5>费用支出分类</h5>
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
                <el-table :data="tableData" border style="width: 100%" max-height="580">
                    <el-table-column prop="bh" label="科目编号"></el-table-column>
                    <el-table-column prop="name" label="科目名称"></el-table-column>
                    <el-table-column prop="jm" label="科目简名"></el-table-column>
                    <el-table-column prop="pym" label="拼音码"></el-table-column>
                    <el-table-column prop="ye" label="期末余额"></el-table-column>
                    <el-table-column prop="bz" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button
                                disabled
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">修改
                            </el-button>
                            <el-button
                                disabled
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                select:'',
                input:'',
                myTreeStore:'',
                myTreeData:'',
                kjkmForm:{
                    name:'',
                    bh:'',
                    jm:'',
                    pym:'',
                    bz:''
                },
                form:{
                    name:'',
                    bh:''
                },
                jzmxForm:{
                   dateStart:'',
                   dateEnd:''
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
                        bh:'0431',
                        name:'调账亏损',
                        jm:'调账亏损',
                        pym:'tzks',
                        ye:'0',
                        bz:''
                    },
                    {
                        bh:'0432',
                        name:'固定资产折旧',
                        jm:'固定资产折旧',
                        pym:'gdzczj',
                        ye:'0',
                        bz:''
                    },
                    {
                        bh:'0433',
                        name:'优惠',
                        jm:'优惠',
                        pym:'yh',
                        ye:'0',
                        bz:''
                    },{
                        bh:'0434',
                        name:'优惠1',
                        jm:'优惠',
                        pym:'yh',
                        ye:'0',
                        bz:''
                    }
                ]
            }
        },
        methods: {
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
            deleteRow(index,rows){

            },
            add(){
                this.dialogKjkmEdit = true
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
        }
    }
</script>
