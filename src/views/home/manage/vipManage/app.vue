<template>
    <div class="vipManage">
        <!-- 储值明细 -->
        <el-dialog title="会员储值变动记录" :visible.sync="dialogVipCzDetail" class="czmx">
            <el-form label-width="70px" :label-position="labelPosition" :model="vipCzDetailForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="会员名称">
                            <el-input v-model="vipCzDetailForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话">
                            <el-input v-model="vipCzDetailForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="卡号">
                            <el-input v-model="vipCzDetailForm.card"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="变动时间">
                            <el-date-picker
                                v-model="vipCzDetailForm.date1"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>至
                            <el-date-picker
                                v-model="vipCzDetailForm.date2"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="红冲过滤">
                            <el-select v-model="vipCzDetailForm.hc" placeholder="请选择">
                                <el-option label="全部显示" value="1"></el-option>
                                <el-option label="不显示红冲" value="1"></el-option>
                                <el-option label="只显示红冲" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="vipCzDetailData" border>
                <el-table-column property="card" label="卡号" width="100"></el-table-column>
                <el-table-column property="klx" label="卡类型" width="80"></el-table-column>
                <el-table-column property="name" label="会员名" width="100"></el-table-column>
                <el-table-column property="phone" label="电话" width="120"></el-table-column>
                <el-table-column property="djlx" label="单据类型" width="150"></el-table-column>
                <el-table-column property="djbh" label="单据编号" width="150"></el-table-column>
                <el-table-column property="jsr" label="经手人" width="100"></el-table-column>
                <el-table-column property="czje" label="充值金额" width="100"></el-table-column>
                <el-table-column property="zsje" label="赠送金额" width="100"></el-table-column>
                <el-table-column property="syje" label="使用金额" width="150"></el-table-column>
                <el-table-column property="bdje" label="变动金额" width="150"></el-table-column>
                <el-table-column property="bdzh" label="变动账户" width="100"></el-table-column>
                <el-table-column property="bddw" label="变动单位" width="100"></el-table-column>
                <el-table-column property="ldrq" label="录单日期" width="100"></el-table-column>
                <el-table-column property="bz" label="备注" width="150"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="" disabled>单据明细</el-button>
                <el-button @click="dialogVipCzDetail = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 会员充值-->
        <el-dialog title="会员充值" size="tiny" :visible.sync="dialogVipCz" class="vipCz">
            <el-form label-width="100px" :label-position="labelPosition" :model="vipCzForm" class="demo-form-inline">
                <div class="content2">
                    <h5>充值单</h5>
                    <el-row>
                        <el-col :span="24" style="padding:10px 0;">
                            账户名：{{vipCzForm.name}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="padding:10px 0;">
                            账户当前余额（元）：{{vipCzForm.dqye}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="本次充值（元）">
                                <el-input v-model="vipCzForm.cz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="本次赠送（元）">
                                <el-input v-model="vipCzForm.zs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="充值后余额（元）">
                                <el-input v-model="vipCzForm.czye"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="收款账户">
                                <el-input v-model="vipCzForm.zh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="vipCzForm.bz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="czmx">储值明细</el-button>
                <el-button type="primary" @click="">保存</el-button>
                <el-button @click="dialogVipCz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 会员卡 -->
        <el-dialog title="会员卡" size="tiny" :visible.sync="dialogVipCard">
            <el-form label-width="100px" :label-position="labelPosition" :model="vipCardForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称">
                            <el-input v-model="vipCardForm.memName"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="折扣">-->
                            <!--<el-input v-model="vipCardForm.zk"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input v-model="vipCardForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savaVipCard">保存</el-button>
                <el-button @click="dialogVipCard = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 会员卡类型 -->
        <el-dialog title="会员卡类型" :visible.sync="dialogVipLx">
            <el-form label-width="100px" :label-position="labelPosition" class="demo-form-inline">
                <el-table :data="vipLxData" border>
                    <el-table-column property="cardType" label="类型名称" width="140"></el-table-column>
                    <el-table-column property="zk" label="折扣" width="80"></el-table-column>
                    <el-table-column property="remark" label="备注" width="100"></el-table-column>
                    <el-table-column label="操作" width="320">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="editVipRow(scope.$index, tableData)"
                                size="small">修改
                            </el-button>
                            <el-button
                                style="color:red"
                                @click.native.prevent="removeVipRow(scope.$index, tableData)"
                                size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addVipCard">新增</el-button>
                <el-button @click="dialogVipLx = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 新增会员信息 -->
        <el-dialog :title=title :visible.sync="dialogVip" class="addVip">
            <el-form label-width="100px" :label-position="labelPosition" :model="vipForm" class="demo-form-inline">
                <div class="content2">
                    <h5>基本信息</h5>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="会员编号:">{{vipForm.memId}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="会员名">
                                <el-input v-model="vipForm.memName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话">
                                <el-input v-model="vipForm.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="证件号码">
                                <el-input v-model="vipForm.idNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="会员卡类型">
                                <el-select v-model="vipForm.cardType" placeholder="请选择">
                                    <el-option v-for="item in cardOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    <!--<el-option label="待维修" value="1"></el-option>-->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="">
                                <el-button @click="klxgl">卡类型管理</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="会员卡号">
                                <el-input placeholder="请输入内容" v-model="vipForm.cardNumber">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="会员卡有效期（年）">
                                <el-input placeholder="请输入内容" v-model="vipForm.nx"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="会员卡有效日期">
                                <el-date-picker v-model="vipForm.endAt" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="会员卡状态">
                                <el-select v-model="vipForm.status" placeholder="请选择">
                                    <el-option v-for="item in vipOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    <!--<el-option label="启用" value="1"></el-option>-->
                                    <!--<el-option label="停用" value="2"></el-option>-->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="会员卡消费折扣">
                                <el-input style="width: 100px;" v-model="vipForm.zk"></el-input>(0.9为9折)
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="vipForm.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <!--<div class="content2">-->
                    <!--<h5>账户信息</h5>-->
                    <!--<el-row>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item label="账户储值余额（元）:">-->
                                <!--{{vipForm.ye}}-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item label="累计充值金额（元）:">-->
                                <!--{{vipForm.czje}}-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item label="账户积分:">{{vipForm.zhjf}}</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item label="初始积分:">{{vipForm.csjf}}</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--</div>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savaVipAdd">保存</el-button>
                <el-button @click="dialogVip = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-form label-width="90px" :label-position="labelPosition" :model="form" class="demo-form-inline myForm">
            <el-row>
                <el-col :span="3">
                    <el-form-item label="会员名称">
                        <el-input v-model="form.memName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="电话">
                        <el-input v-model="form.telephone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="会员卡号">
                        <el-input v-model="form.cardNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="会员卡类型">
                        <el-select v-model="form.cardType" placeholder="请选择">
                            <el-option v-for="item in cardOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            <!--<el-option label="全部" value="1"></el-option>-->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="会员卡状态">
                        <el-select v-model="form.memStatus" placeholder="请选择">
                            <el-option v-for="item in vipOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            <!--<el-option label="启用" value="1"></el-option>-->
                            <!--<el-option label="停用" value="2"></el-option>-->
                            <!--<el-option label="所有" value="3"></el-option>-->
                        </el-select>
                    </el-form-item>
                </el-col>
                <i class="el-icon-search search" title="执行过滤"></i>
            </el-row>
        </el-form>
        <div class="con">
            <el-table :data="tableData" border height="600">
                <!--<el-table-column property="memId" label="会员编号" width="150"></el-table-column>-->
                <el-table-column property="memName" label="会员名" width="80"></el-table-column>
                <el-table-column property="telephone" label="电话" width="150"></el-table-column>
                <el-table-column property="idNumber" label="证件号码" width="200"></el-table-column>
                <el-table-column property="cardNumber" label="会员卡号" width="150"></el-table-column>
                <el-table-column property="cardType" label="会员卡类型" width="150"></el-table-column>
                <!--<el-table-column property="zk" label="折扣" width="100"></el-table-column>-->
                <el-table-column property="startAt" label="发卡日期" width="140"></el-table-column>
                <el-table-column property="endAt" label="到期日期" width="140"></el-table-column>
                <el-table-column property="integral" label="积分" width="100"></el-table-column>
                <el-table-column property="memStatus" label="状态" width="100"></el-table-column>
                <el-table-column property="enterFunc" label="录入方式" width="100"></el-table-column>
                <el-table-column property="remark" label="备注" width="150"></el-table-column>
                <!--<el-table-column label="操作" width="300">-->
                    <!--<template scope="scope">-->
                        <!--<el-button-->
                            <!--@click.native.prevent="editRow(scope.$index, tableData)"-->
                            <!--type="text"-->
                            <!--size="small">修改-->
                        <!--</el-button>-->
                        <!--<el-button-->
                            <!--disabled-->
                            <!--@click.native.prevent=""-->
                            <!--type="text"-->
                            <!--size="small">积分规则设置-->
                        <!--</el-button>-->
                        <!--<el-button-->
                            <!--disabled-->
                            <!--@click.native.prevent=""-->
                            <!--type="text"-->
                            <!--size="small">积分兑换-->
                        <!--</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <div class="btn">
            <!--<el-button @click="addVip">会员登记</el-button>-->
            <el-button>关闭</el-button>
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
            return {
                labelPosition:'left',
                dialogVip:false,
                dialogVipLx:false,
                dialogVipCard:false,
                dialogVipCz:false,
                dialogVipCzDetail:false,
                title:'',
                currentPage:1,
                total:0,
                cardOptions:[{
                    value: '0',
                    label: '普通卡'
                }, {
                    value: '1',
                    label: '黄金卡'
                }, {
                    value: '2',
                    label: '钻石卡'
                }],
                vipOptions:[
                {
                    value: '-1',
                    label: '失效'
                },{
                    value: '0',
                    label: '关注'
                },{
                    value: '1',
                    label: '领卡'
                },{
                    value: '2',
                    label: '激活'
                },{
                    value: '3',
                    label: '到期'
                }],
                form:{
                    memName:'',
                    telephone:'',
                    cardNumber:'',
                    cardType:'',
                    status:'',
                    memStatus:''
                },
                vipLxData:[
                    {
                        cardType:'普通会员卡',
                        zk:'0.95',
                        remark:'无'
                    }
                ],
                vipForm:{
                    memId:'',
                    memName:'',
                    telephone:'',
                    idNumber:'',
                    cardType:'',
                    cardNumber:'',
                    nx:'',
                    endAt:'',
                    status:'',
                    zk:'',
                    remark:''
//                    ye:'',
//                    czje:'',
//                    zhjf:'',
//                    csjf:''
                },
                vipCzForm:{
                    name:'',
                    dqye:'',
                    cz:'',
                    zs:'',
                    czye:'',
                    zh:'',
                    bz:''
                },
                vipCardForm:{
                    memName:'',
                    zk:'',
                    remark:''
                },
                vipCzDetailForm:{
                    name:'',
                    phone:'',
                    card:'',
                    date1:'',
                    date2:'',
                    hc:''
                },
                tableData:[
                    {
                        memId:'201710240001',
                        memName:'海棠',
                        telephone:'17766666666',
                        idNumber:'122222222222222222',
                        cardNumber:'201710240001',
                        cardType:'普通',
                        startAt:'2017-10-24',
                        endAt:'2018-10-24',
                        integral:'1000',
                        status:'正常',
                        memStatus:'',
                        enterFunc:'手工录入',
                        remark:'重要客户'
                    }, {
                        memId:'201710240002',
                        memName:'小王',
                        telephone:'17766666666',
                        idNumber:'145678222222222222',
                        cardNumber:'201710240001',
                        cardType:'普通',
                        startAt:'2017-10-24',
                        endAt:'2018-10-24',
                        integral:'1000',
                        status:'正常',
                        memStatus:'',
                        enterFunc:'手工录入',
                        remark:'重要客户'
                    },{
                        memId:'201710240003',
                        memName:'张三',
                        telephone:'17766666666',
                        idNumber:'122222222654322222',
                        cardNumber:'201710240001',
                        cardType:'黄金',
                        startAt:'2017-10-24',
                        endAt:'2018-10-24',
                        integral:'1200',
                        status:'正常',
                        memStatus:'',
                        enterFunc:'微信录入',
                        remark:'重要客户'
                    },{
                        memId:'201710240004',
                        memName:'赵四',
                        telephone:'17766668886',
                        idNumber:'122222222225678111',
                        cardNumber:'201710240001',
                        cardType:'白银',
                        startAt:'2017-10-24',
                        endAt:'2018-10-24',
                        integral:'1200',
                        status:'正常',
                        memStatus:'',
                        enterFunc:'微信录入',
                        remark:'重要客户'
                    }
                ],
                vipCzDetailData:[
                    {
                        card:'201710240001',
                        klx:'海棠',
                        name:'',
                        phone:'',
                        djlx:'',
                        djbh:'',
                        jsr:'',
                        czje:'',
                        zsje:'',
                        syje:'',
                        bdje:'',
                        bdzh:'',
                        bddw:'',
                        ldrq:'',
                        bz:''
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
                let data = await service.vipList({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    for(var i=0,len = this.tableData.length;i<len;i++){
                        if(data.data[i].memStatus == -1){
                            this.tableData[i].memStatus = "失效"
                        }else if(data.data[i].memStatus == 0){
                            this.tableData[i].memStatus = "关注"
                        }else if(data.data[i].memStatus == 1){
                            this.tableData[i].memStatus = "领卡"
                        }else if(data.data[i].memStatus == 2){
                            this.tableData[i].memStatus = "激活"
                        }else if(data.data[i].memStatus == 3){
                            this.tableData[i].memStatus = "到期"
                        }
                        if(data.data[i].cardType == 0){
                            this.tableData[i].cardType = "普通卡"
                        }else if(data.data[i].cardType == 1){
                            this.tableData[i].cardType = "黄金卡"
                        }else if(data.data[i].cardType == 2){
                            this.tableData[i].cardType = "钻石卡"
                        }
                    }
                }
            },
            /****/
            async addVip(){
               this.dialogVip = true;
               this.title = '新增会员信息';
            },
            async savaVipAdd(){
                let data = await service.addVip({
                    'memName':this.vipForm.memName,
                    'telephone':this.vipForm.telephone,
                    'idNumber':this.vipForm.idNumber,
                    'cardNumber':this.vipForm.cardNumber,
                    'cardType':this.vipForm.cardType,
                    'startAt':new Date(),
                    'endAt':this.vipForm.endAt,
                    'status':this.vipForm.status,
                    'remark':this.vipForm.remark,
                });
                if(data.code == 200){
                    this.dialogVip = false;
                    let data = await service.vipList({

                    });
                    this.tableData = data.data;
                }
            },
            async savaVipCard(){

            },
            klxRow(index,rows){
                this.dialogVipLx = true;
            },
            editRow(index,rows){
                this.dialogVip = true;
                this.title = '修改会员信息'
            },
            removeRow(index,rows){

            },
//            kczRow(index,rows){
//                this.dialogVipCz = true;
//            },
            klxgl(){
                this.dialogVipLx = true;
            },
            editVipRow(index,rows){

            },
            removeVipRow(index,rows){

            },
            addVipCard(){
                this.dialogVipCard = true;
            },
            czmx(){
                this.dialogVipCzDetail = true;
            }
        },
        async mounted() {
//            let data = await service.vipList({
//                'page':1
//            });
//            if(data.code == 200){
//                this.tableData = data.data;
//                this.total = data.total;
//                for(var i=0,len = this.tableData.length;i<len;i++){
//                    if(data.data[i].memStatus == -1){
//                        this.tableData[i].memStatus = "失效"
//                    }else if(data.data[i].memStatus == 0){
//                        this.tableData[i].memStatus = "关注"
//                    }else if(data.data[i].memStatus == 1){
//                        this.tableData[i].memStatus = "领卡"
//                    }else if(data.data[i].memStatus == 2){
//                        this.tableData[i].memStatus = "激活"
//                    }else if(data.data[i].memStatus == 3){
//                        this.tableData[i].memStatus = "到期"
//                    }
//                    if(data.data[i].cardType == 0){
//                        this.tableData[i].cardType = "普通卡"
//                    }else if(data.data[i].cardType == 1){
//                        this.tableData[i].cardType = "黄金卡"
//                    }else if(data.data[i].cardType == 2){
//                        this.tableData[i].cardType = "钻石卡"
//                    }
//                }
//            }
        }
    }
</script>
