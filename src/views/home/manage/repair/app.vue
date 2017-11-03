<template>
    <div class="repair">
        <!-- 业务员选择框 -->
        <el-dialog title="业务员选择框" size="tiny" :visible.sync="dialogYwy">
            <el-form label-width="100px" :label-position="labelPosition" :model="ywyForm" class="demo-form-inline">
                <el-input placeholder="请输入内容" v-model="ywyForm.select">
                    <el-select v-model="ywyForm.option" slot="prepend" placeholder="请选择">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按编号过滤" value="2"></el-option>
                        <el-option label="按全名过滤" value="3"></el-option>
                        <el-option label="按拼音码过滤" value="4"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
                <el-table :data="ywyData" border>
                    <el-table-column property="bh" label="职员编号" width="100"></el-table-column>
                    <el-table-column property="name" label="职员名称" width="200"></el-table-column>
                    <el-table-column property="bm" label="所属部门" width="150"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="choiceYwyRow(scope.$index, addressData)"
                                type="text"
                                size="small">选中
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogYwy = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 库存商品选择框 -->
        <el-dialog title="库存商品选择框" :visible.sync="dialogKcsp">
            <el-form label-width="100px" :label-position="labelPosition" :model="kcspForm" class="demo-form-inline">
                <el-input placeholder="请输入内容" v-model="kcspForm.select">
                    <el-select v-model="kcspForm.option" slot="prepend" placeholder="请选择">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按编号过滤" value="2"></el-option>
                        <el-option label="按全名过滤" value="3"></el-option>
                        <el-option label="按拼音码过滤" value="4"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
                <el-table :data="ckspData" border>
                    <el-table-column property="img" label="图" width="150"></el-table-column>
                    <el-table-column property="bh" label="商品编号" width="200"></el-table-column>
                    <el-table-column property="spjm" label="商品简名" width="200"></el-table-column>
                    <el-table-column property="kcyl" label="库存余量" width="180"></el-table-column>
                    <el-table-column property="dw" label="单位" width="180"></el-table-column>
                    <el-table-column property="cd" label="产地" width="100"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="choiceSpRow(scope.$index, addressData)"
                                type="text"
                                size="small">选中
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogKcsp = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 维修商品登记 -->
        <el-dialog title="维修商品登记" size="tiny" :visible.sync="dialogWxsp" class="wxdj">
            <el-form label-width="100px" :label-position="labelPosition" :model="wxspForm" class="demo-form-inline">
                <div class="content2">
                    <h5>基本信息</h5>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="编号:">{{wxspForm.bh}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="商品名称">
                                <el-input icon="more" :on-icon-click="spmcClick" v-model="wxspForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预估费用">
                                <el-input v-model="wxspForm.ygfy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="维修人">
                                <el-input icon="more" :on-icon-click="wxrClick" v-model="wxspForm.wxr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="维修状态">
                                <el-select v-model="wxspForm.zt" placeholder="请选择">
                                    <el-option label="待维修" value="1"></el-option>
                                    <el-option label="正在维修" value="2"></el-option>
                                    <el-option label="完成维修" value="3"></el-option>
                                    <el-option label="已取件" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="维修描述">
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="wxspForm.ms">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content2">
                    <h5>寄件人</h5>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名">
                                <el-input v-model="wxspForm.xm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话">
                                <el-input v-model="wxspForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="联系地址">
                                <el-input v-model="wxspForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="btn">
                    <el-button type="primary">保存</el-button>
                    <el-button>取消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <el-form label-width="70px" :label-position="labelPosition" :model="form" class="demo-form-inline myForm">
            <el-row>
                <el-col class="my-col-1">
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="form.startTime" type="date" placeholder="开始时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="my-col-1">
                    <el-form-item label="结束时间">
                        <el-date-picker v-model="form.endTime" type="date" placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="margin-right:10px">
                    <el-input placeholder="请输入内容" v-model="form.select">
                        <el-select v-model="form.input" slot="prepend" placeholder="请选择">
                            <el-option label="快速查询" value="1"></el-option>
                            <el-option label="收货人" value="2"></el-option>
                            <el-option label="手机号码" value="3"></el-option>
                            <el-option label="电话号码" value="4"></el-option>
                            <el-option label="邮政编码" value="5"></el-option>
                            <el-option label="收货地址" value="6"></el-option>
                        </el-select>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
                <el-col class="my-col-1">
                    <el-form-item label="维修状态">
                        <el-select v-model="form.input1" placeholder="请选择">
                            <el-option label="待维修" value="1"></el-option>
                            <el-option label="正在维修" value="2"></el-option>
                            <el-option label="完成维修" value="3"></el-option>
                            <el-option label="已取件" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="my-col-1">
                    <el-form-item label="结算状态">
                        <el-select v-model="form.input2" placeholder="请选择">
                            <el-option label="已结算" value="1"></el-option>
                            <el-option label="未结算" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="left">
            <el-table :data="tableData" border>
                <el-table-column property="bh" label="编号" width="150"></el-table-column>
                <el-table-column property="wxsp" label="维修商品" width="150"></el-table-column>
                <el-table-column property="lxr" label="联系人" width="120"></el-table-column>
                <el-table-column property="phone" label="联系人电话" width="150"></el-table-column>
                <el-table-column property="address" label="联系人地址" width="300"></el-table-column>
                <el-table-column property="wxr" label="维修人" width="150"></el-table-column>
                <el-table-column property="djr" label="登记人" width="150"></el-table-column>
                <el-table-column property="ygfy" label="预估费用" width="200"></el-table-column>
                <el-table-column property="jszt" label="结算状态" width="200"></el-table-column>
                <el-table-column property="wxzt" label="维修状态" width="200"></el-table-column>
                <el-table-column property="startTime" label="创建时间" width="200"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceRow(scope.$index, addressData)"
                            type="text"
                            size="small">选中
                        </el-button>
                        <el-button
                            @click.native.prevent="editRow(scope.$index, addressData)"
                            type="text"
                            size="small">修改
                        </el-button>
                        <el-button
                            @click.native.prevent="removeRow(scope.$index, addressData)"
                            type="text"
                            size="small">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="right">
            <h5>维修详情</h5>
            <div class="con">
                <div class="content1">
                    <h5>基本信息</h5>
                    <el-row>
                        <el-col :span="24">编号：{{wxxqForm.bh}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">商品名称：</el-col>
                        <el-col :span="12">预估费用（元）：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">维修人：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">登记人：</el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h5>维修描述</h5>
                </div>
                <div class="content1" style="position: relative;margin-bottom: 30px;">
                    <h5>寄件人</h5>
                    <el-row>
                        <el-col :span="12">寄件人姓名：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">联系电话：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">联系地址：</el-col>
                    </el-row>
                    <div class="btn-group">
                        <button type="button" disabled>维修结算</button>
                        <button type="button" disabled>销售单结算</button>
                        <button type="button" disabled>维修结算</button>
                    </div>
                </div>
                <div class="wxfy">维修费用（元）：</div>
                <div class="content1">
                    <el-table :data="fyData" border>
                        <el-table-column property="bh" label="编号" width="150"></el-table-column>
                        <el-table-column property="dj" label="单据类型" width="120"></el-table-column>
                        <el-table-column property="fy" label="费用" width="120"></el-table-column>
                        <el-table-column property="zy" label="摘要" width="120"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="btn-group">
            <el-button @click="add">新增</el-button>
            <el-button @click="refresh">刷新</el-button>
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
            return {
                labelPosition:'left',
                dialogWxsp:false,
                dialogKcsp:false,
                dialogYwy:false,
                startTime:'',
                endTime:'',
                form:{
                    startTime:'',
                    endTime:'',
                    select:'',
                    input:'',
                    input1:'',
                    input2:'',
                },
                kcspForm:{
                    select:'',
                    option:''
                },
                ywyForm:{
                    select:'',
                    option:''
                },
                wxspForm:{
                    bh:'',
                    name:'',
                    ygfy:'',
                    wxr:'',
                    zt:'',
                    ms:'',
                    xm:'',
                    phone:'',
                    address:''
                },
                wxxqForm:{
                    bh:'',
                    name:'',
                    ygfy:'',
                    wxr:'',
                    djr:'',
                    wxms:'',
                    jjrName:'',
                    phone:'',
                    address:''
                },
                fyData:[
                    {
                        bh:'201710251418',
                        dj:'普通',
                        fy:'58',
                        zy:'无'
                    }
                ],
                ywyData:[
                    {
                        bh:'001',
                        name:'维修人1号',
                        bm:'维修部'
                    },{
                        bh:'002',
                        name:'维修人2号',
                        bm:'维修部'
                    }

                ],
                tableData:[
                    {
                        bh:'0001',
                        wxsp:'iphone 6sp',
                        lxr:'某人1号',
                        phone:'12345698756',
                        address:'河南省郑州市郑东新区大学生科技园',
                        wxr:'维修人1号',
                        djr:'登记人1号',
                        ygfy:'58',
                        jszt:'未结算',
                        wxzt:'正在维修',
                        startTime:'2017-10-25 10:25：25'
                    },{
                        bh:'0002',
                        wxsp:'vivo x20 plus',
                        lxr:'某人2号',
                        phone:'15966666666',
                        address:'北京市朝阳区',
                        wxr:'维修人2号',
                        djr:'登记人1号',
                        ygfy:'45',
                        jszt:'已结算',
                        wxzt:'完成维修',
                        startTime:'2017-10-20 18:55：35'
                    },{
                        bh:'0003',
                        wxsp:'OPPO R11全网通',
                        lxr:'某人3号',
                        phone:'48779777777',
                        address:'河南省郑州市二七区',
                        wxr:'维修人1号',
                        djr:'登记人1号',
                        ygfy:'68',
                        jszt:'未结算',
                        wxzt:'待维修',
                        startTime:'2017-10-25 10:25：25'
                    }
                ],
                ckspData:[
                    {
                        img:'无',
                        bh:'0003',
                        spjm:'OPPO R11全网通',
                        kcyl:'123',
                        dw:'部',
                        cd:'中国'
                    },{
                        img:'无',
                        bh:'0001',
                        spjm:'iphone 6sp',
                        kcyl:'456',
                        dw:'部',
                        cd:'美国'
                    }
                ]
            }
        },
        methods: {
            editRow(index,rows){

            },
            removeRow(index,rows){

            },
            add(){
                this.dialogWxsp = true;
            },
            refresh(){

            },
            spmcClick(){
                this.dialogKcsp = true;
            },
            wxrClick(){
                this.dialogYwy = true;
            },
            choiceSpRow(index,rows){

            },
            choiceYwyRow(index,rows){

            },
            choiceRow(index,rows){

            }
        }
    }
</script>
