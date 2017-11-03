<template>
    <div class="sptc">
        <el-dialog title="新增套餐" :visible.sync="dialogTableVisible">
            <el-form label-width="70px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="套餐名称">
                            <el-input v-model="dialogform.tcmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="套餐编码">
                            <el-input v-model="dialogform.tcbm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="套餐条码">
                            <el-input v-model="dialogform.tctm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="套餐打印方式" label-width="100px">
                            <el-select v-model="dialogform.tcdyfs" size="small">
                                <el-option label="按套餐名打印" value="1"></el-option>
                                <el-option label="按套餐明细打印" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="套餐类型">
                            <el-select v-model="dialogform.tclx" size="small">
                                <el-option label="组合套餐" value="1"></el-option>
                                <el-option label="3C搭售包" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-checkbox v-model="checked">同步库存</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="tableData3" border>
                <el-table-column
                type="index"
                width="50"></el-table-column>
                <el-table-column prop="tcspbh" label="套餐商品编号" width="150"></el-table-column>
                <el-table-column prop="tcspmc" label="套餐商品名称" width="130"></el-table-column>
                <el-table-column prop="dw" label="单位" width="120"></el-table-column>
                <el-table-column prop="sl" label="数量" width="100"></el-table-column>
                <el-table-column prop="dj" label=" 单价" width="100"></el-table-column>
                <el-table-column prop="je" label="金额" width="100"></el-table-column>
                <el-table-column prop="cykctb" label="参与库存同步" width="130"></el-table-column>
                <el-table-column prop="cjjeft" label="成交金额分摊" width="130"></el-table-column>
                <el-table-column prop="ftbl" label="分摊比例" width="120"></el-table-column>
                <el-table-column prop="zt" label="状态"></el-table-column>
                <el-table-column label="操作" width="120">
                <template scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">保存</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">保存并继续</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">退出</el-button>
            </div>
        </el-dialog>
        <div class="box-left">
            <div class="flex-arrow" @click="flex"><span></span></div>
            <el-form ref="form" :model="form" label-width="90px">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="套餐状态">
                            <el-select v-model="form.tczt" size="small">
                                <el-option label="全部" value="1"></el-option>
                                <el-option label="停用" value="2"></el-option>
                                <el-option label="启用" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" style="margin-top: 3px;">查询</el-button>
                    </el-col>
                </el-row>
                <el-form-item label="同步库存">
                    <el-select v-model="form.tbkc" size="small">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="同步" value="2"></el-option>
                        <el-option label="不同步" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="套餐类型">
                    <el-select v-model="form.tclx" size="small">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="组合套餐" value="2"></el-option>
                        <el-option label="3c搭售包" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格区间">
                    <el-col :span="11">
                        <el-input size="small" v-model="form.jgqj1" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input size="small" v-model="form.jgqj2" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="套餐名称">
                    <el-input size="small" v-model="form.tcmc"></el-input>
                </el-form-item>
                <el-form-item label="套餐编码">
                    <el-input size="small" v-model="form.tcbm"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input size="small" v-model="form.bz"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input size="small" v-model="form.spmc"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                    <el-input size="small" v-model="form.spbh"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="box-right">
            <div>
                <el-button class="newadd-btn" size="small" @click="newadd">新增
                    <ul>
                        <li @click="dialogTableVisible = true">手工添加</li>
                        <li>导入套餐</li>
                    </ul>
                </el-button>
                <el-button size="small">编辑</el-button>
                <el-button size="small">复制新增</el-button>
                <el-button size="small">批量编辑</el-button>
                <el-button size="small">导出套餐</el-button>
            </div>
            <div class="table-first">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="tcmc" label="套餐名称" ></el-table-column>
                    <el-table-column prop="tcbm" label="套餐编码" ></el-table-column>
                    <el-table-column prop="tctm" label="套餐条码"></el-table-column>
                    <el-table-column prop="tclx" label="套餐类型" ></el-table-column>
                    <el-table-column prop="tcsj" label="套餐售价" ></el-table-column>
                    <el-table-column prop="cjsj" label="创建时间" ></el-table-column>
                    <el-table-column prop="tbkc" label="同步库存" ></el-table-column>
                    <el-table-column prop="tczt" label="套餐状态" ></el-table-column>
                    <el-table-column prop="tcdyfs" label="套餐打印方式" width="130"></el-table-column>
                    <el-table-column prop="bz" label="备注" width="120"></el-table-column>
                </el-table>
            </div>
            <div>
                <div class="flex-arrow" @click="flexRight"><span></span></div>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="套餐明细" name="first">
                        <el-table
                            ref="multipleTable"
                            :data="tableData2"
                            border
                            style="width: 100%"
                            >
                            <el-table-column prop="tcspbh" label="套餐商品编号"></el-table-column>
                            <el-table-column prop="tcspmc" label="套餐商品名称"></el-table-column>
                            <el-table-column prop="dw" label="单位"></el-table-column>
                            <el-table-column prop="sl" label="数量"></el-table-column>
                            <el-table-column prop="dj" label="单价"></el-table-column>
                            <el-table-column prop="je" label="金额"></el-table-column>
                            <el-table-column prop="cykctb" label="参与库存同步"></el-table-column>
                            <el-table-column prop="cjjeft" label="成交金额分摊"></el-table-column>
                            <el-table-column prop="ftbl" label="分摊比列"></el-table-column>
                            <el-table-column prop="zt" label="状态"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    export default {
        components: {

        },
        data:function(){
            return{
                dialogTableVisible:false,
                activeName: 'first',
                checked:'true',
                form:{
                    tczt:'全部',
                    tckc:'全部',
                    tclx:'全部',
                    jgqj1:'',
                    jgqj2:'',
                    tcmc:'',
                    tcbm:'',
                    bz:'',
                    spmc:'',
                    spbh:''
                },
                tableData: [{
                    tcmc: '官方标配',
                    tcbm: '000',
                    tctm: '000',
                    tclx:'标配',
                    tcsj:'+0元',
                    cjsj:'2017-10-24',
                    tbkc:'是',
                    tczt:'正常',
                    tcdyfs:'导出',
                    bz:'无'
                },{
                    tcmc: '套餐1',
                    tcbm: '001',
                    tctm: '001',
                    tclx:'套餐1',
                    tcsj:'+29元',
                    cjsj:'2017-10-24',
                    tbkc:'是',
                    tczt:'正常',
                    tcdyfs:'导出',
                    bz:'无'
                },{
                    tcmc: '套餐2',
                    tcbm: '002',
                    tctm: '002',
                    tclx:'套餐2',
                    tcsj:'+59元',
                    cjsj:'2017-10-24',
                    tbkc:'是',
                    tczt:'正常',
                    tcdyfs:'导出',
                    bz:'无'
                }],
                tableData2: [{
                    tcspbh: '000',
                    tcspmc: '官方标配',
                    dw: '个',
                    sl:'500',
                    dj:'+0元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'是',
                    ftbl:'0.5',
                    zt:'无'
                },{
                    tcspbh: '001',
                    tcspmc: '套餐1',
                    dw: '个',
                    sl:'10',
                    dj:'+29元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'是',
                    ftbl:'0.3',
                    zt:'无'
                },{
                    tcspbh: '002',
                    tcspmc: '套餐2',
                    dw: '个',
                    sl:'5',
                    dj:'+59元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'否',
                    ftbl:'',
                    zt:'无'
                }],
                tableData3:[{
                    tcspbh: '000',
                    tcspmc: '官方标配',
                    dw: '个',
                    sl:'500',
                    dj:'+0元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'是',
                    ftbl:'0.5',
                    zt:'无'
                },{
                    tcspbh: '001',
                    tcspmc: '套餐1',
                    dw: '个',
                    sl:'10',
                    dj:'+29元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'是',
                    ftbl:'0.3',
                    zt:'无'
                },{
                    tcspbh: '002',
                    tcspmc: '套餐2',
                    dw: '个',
                    sl:'5',
                    dj:'+59元',
                    je:'是',
                    cykctb:'是',
                    cjjeft:'否',
                    ftbl:'',
                    zt:'无'
                }],
                multipleSelection: [],
                dialogform:{
                    tcmc:'',
                    tcbm:'',
                    tctm:'',
                    tcdyfs:'',
                    tclx:'',
                    bz:''
                }
            }
        },
        methods: {
            flex(){
                $(".box-left").toggleClass("box-left-flex");
                $(".box-right").toggleClass("box-right-flex");
                $(".box-left span").toggleClass("active");
            },
            flexRight(){
                $(".box-right .table-first").toggleClass("div-first");
                $(".box-right>div:eq(2)").toggleClass("div-last");
                $(".box-right span").toggleClass("active");
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            newadd(){
                $(".newadd-btn ul").toggleClass("active");
            },
            deleteRow(index, rows) {
                this.$confirm('确定删除此分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
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
            }
        }
    }
</script>
