<template>
    <div class="wlgs">
        <!-- 物流公司查询 -->
        <el-dialog size="" title="物流公司查询" :visible.sync="dialog">
            <el-input placeholder="请输入内容" v-model="selectAddressQuery">
                <el-select v-model="selectAddressQuery" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按全名查询" value="2"></el-option>
                    <el-option label="按编号查询" value="3"></el-option>
                    <el-option label="按拼音码查询" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="addressQueryData" border>
                <el-table-column property="bh" label="对应编号" width="100"></el-table-column>
                <el-table-column property="name" label="物流名称" width="100"></el-table-column>
                <el-table-column property="jm" label="物流简名" width="100"></el-table-column>
                <el-table-column property="telphone" label="电话"></el-table-column>
                <el-table-column property="phone" label="手机"></el-table-column>
                <el-table-column property="lxr" label="联系人"></el-table-column>
                <el-table-column property="address" label="物流地址" width="200"></el-table-column>
                <el-table-column property="sh" label="税号"></el-table-column>
                <el-table-column property="khyh" label="开户银行></el-table-column>
                <el-table-column property="yhzh" label="银行账号"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <!--<el-button-->
                            <!--@click.native.prevent="choiceQuery(scope.$index, addressData)"-->
                            <!--type="text"-->
                            <!--size="small">选中-->
                        <!--</el-button>-->
                        <el-button
                            @click.native.prevent="editQuery(scope.$index, addressData)"
                            type="text"
                            size="small">修改
                        </el-button>
                        <el-button
                            @click.native.prevent="removeQuery(scope.$index, addressData)"
                            type="text"
                            size="small">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 添加地址弹出框 -->
        <el-dialog size="tiny" title="地址" :visible.sync="dialogAddDz">
            <el-form label-width="100px" :label-position="labelPosition" :model="addDzForm" class="demo-form-inline demo-ruleForm" :rules="rules" ref="addDzForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人">
                            <el-input v-model="addDzForm.saName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <el-input v-model="addDzForm.cellphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电话号码">
                            <el-input v-model="addDzForm.telephone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮政编码">
                            <el-input v-model="addDzForm.postcode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="选择省市区" prop="area" style="margin:5px;">
                            <el-cascader :options="cityOptions" v-model="addDzForm.area" @change="handleChange"></el-cascader>*必填不可为空
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="收货地址">
                            <el-input v-model="addDzForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveCloseDz('addDzForm')">保存并关闭</el-button>
                <el-button @click="dialogAddDz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--  地址信息框 -->
        <el-dialog class="addressDialog" size="" title="地址" :visible.sync="dialogAddress">
            <el-input placeholder="请输入内容" v-model="selectAddress">
                <el-select v-model="inputAddress" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="收货人" value="2"></el-option>
                    <el-option label="手机号码" value="3"></el-option>
                    <el-option label="电话号码" value="4"></el-option>
                    <el-option label="邮政编码" value="4"></el-option>
                    <el-option label="收货地址" value="4"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="addressData" border>
                <el-table-column property="saName" label="收货人" width="150"></el-table-column>
                <el-table-column property="cellphone" label="手机号码" width="200"></el-table-column>
                <el-table-column property="telephone" label="电话号码" width="180"></el-table-column>
                <el-table-column property="postcode" label="邮政编码" width="180"></el-table-column>
                <el-table-column property="area[0]" label="省" width="60"></el-table-column>
                <el-table-column property="area[1]" label="市" width="60"></el-table-column>
                <el-table-column property="area[2]" label="区" width="60"></el-table-column>
                <el-table-column property="address" label="收货地址" width="200"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceAdRow(scope.$index, addressData)"
                            type="text"
                            size="small">选中
                        </el-button>
                        <el-button
                            @click.native.prevent="editAdRow(scope.$index, addressData)"
                            type="text"
                            size="small">修改
                        </el-button>
                        <el-button
                            @click.native.prevent="removeAdRow(scope.$index, addressData)"
                            type="text"
                            size="small">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addDz()">新增</el-button>
                <el-button @click="dialogAddress = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 物流公司-信息框 -->
        <el-dialog title="物流公司-信息框" :visible.sync="dialogWlgs">
            <el-form label-width="100px" :label-position="labelPosition" :model="wlgsForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="物流名称">
                            <el-input v-model="wlgsForm.lcName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="对应编号">
                            <el-input v-model="wlgsForm.lcSn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="简名">
                            <el-input v-model="wlgsForm.lcNameSp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="拼音码">
                            <el-input v-model="wlgsForm.lcNamePy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="税号">
                            <el-input v-model="wlgsForm.lcTax"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="wlgsForm.contacts"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话">
                            <el-input v-model="wlgsForm.telephone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="手机">-->
                            <!--<el-input v-model="wlgsForm.phone"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="电子邮件">
                            <el-input v-model="wlgsForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="地址">
                            <el-input icon="more" :on-icon-click="addressIconClick" v-model="wlgsForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!--<el-col :span="16">-->
                        <!--<el-form-item label="开户银行">-->
                            <!--<el-input v-model="wlgsForm.khyh"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="银行账号">
                            <el-input v-model="wlgsForm.bankAccount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="wlgsForm.bz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveAdd()">保存并新增</el-button>
                <el-button @click="dialogWlgs = false">关闭</el-button>
            </div>
        </el-dialog>
        <h4>物流公司</h4>
        <div class="con">
            <el-table :data="tableData" border style="width: 100%" height="600">
                <el-table-column prop="lcSn" label="对应编号" width="150"></el-table-column>
                <el-table-column prop="lcName" label="物流名称" width="120"></el-table-column>
                <el-table-column prop="lcNameSp" label="物流简名" width="120"></el-table-column>
                <el-table-column prop="lcNamePy" label="拼音码" width="170"></el-table-column>
                <el-table-column prop="lcTax" label="税号" width="120"></el-table-column>
                <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
                <el-table-column prop="contacts" label="联系人" width="120"></el-table-column>
                <el-table-column prop="status" label="状态" width="120"></el-table-column>
                <el-table-column prop="bankAccount" label="银行账号" width="120"></el-table-column>
                <!--<el-table-column prop="yhzh" label="开户银行" width="120"></el-table-column>-->
                <el-table-column prop="email" label="电子邮件" width="120"></el-table-column>
                <el-table-column prop="remark" label="备注" width="120"></el-table-column>
                <el-table-column label="操作" width="220">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">删除
                        </el-button>
                        <el-button
                            @click.native.prevent="editRow(scope.$index, tableData)"
                            type="text"
                            size="small">编辑
                        </el-button>
                        <el-button
                            @click.native.prevent="stopRow(scope.$index, tableData)"
                            type="text"
                            size="small">停用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <div class="btn-group">
            <el-button @click="add">新增</el-button>
            <el-button @click="query">查询</el-button>
            <el-button>物流单打印模板</el-button>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    import service from './service/getData.js'
    import city from '../../../../assets/js/city.js'
    export default {
        components: {

        },
        data: function(){
            return{
                labelPosition:'left',
                dialogWlgs:false,
                dialogAddDz:false,
                dialogAddress:false,
                dialog:false,
                flag:false,
                flag2:false,
                editFlag:false,
                currentPage:1,
                total:0,
                cityOptions:city,
                //selectedOptions:['','',''],
                selectAddress:'',
                inputAddress:'',
                selectAddressQuery:'',
                inputAddressQuery:'',
                rules:{
                    area:[
                        {type: 'array', required: true, message: '请选择省市区', trigger: 'change' }
                    ]
                },
                addDzForm:{
                    saId:'',
                    saName:'',
                    cellphone:'',
                    telephone:'',
                    postcode:'',
                    area:['','',''],
                    address:''
                },
                wlgsForm:{
                    lcId:'',
                    lcName:'',
                    lcSn:'',
                    lcNameSp:'',
                    lcNamePy:'',
                    lcTax:'',
                    contacts:'',
                    telephone:'',
                    bankAccount:'',
                    email:'',
                    address:'',
                    status:'',
                    remark:''
                },
                addressData:[
                    {
                        saId:'',
                        saName:'',
                        cellphone:'',
                        telephone:'',
                        area:['','',''],
                        address:'',
                        postcode:''
                    }
                ],
                addressQueryData:[
                    {
                        bh:'',
                        name:'',
                        jm:'',
                        telphone:'',
                        phone:'',
                        lxr:'',
                        address:'',
                        sh:'',
                        khyh:'',
                        yhzh:''
                    }
                ],
                tableData: [{
                    lcId: '',
                    lcSn: '001',
                    lcName: '申通',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1583678903',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                },{
                    lcId: '',
                    lcSn: '002',
                    lcName: '中通',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1568906543',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                },{
                    lcId: '',
                    lcSn: '003',
                    lcName: '圆通',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1368790765',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                },{
                    lcId: '',
                    lcSn: '004',
                    lcName: '天天快递',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1368790765',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                },{
                    lcId: '',
                    lcSn: '005',
                    lcName: '宅急送',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1368432032',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                },{
                    lcId: '',
                    lcSn: '006',
                    lcName: '顺丰',
                    lcNameSp: '8:00',
                    lcNamePy: '22:00',
                    lcTax: '正常',
                    contacts:'',
                    telephone:'1368934345',
                    bankAccount:'',
                    email:'',
                    status:'',
                    remark:''
                }]
            }
        },
        methods: {
            /**分页**/
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
            },
            async handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                let data = await service.wlList({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                }
            },
            async deleteRow(index, rows) {
                let data = await service.deleteWl({
                    "lcId":rows[index].lcId
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            async editRow(index, rows){
                this.dialogWlgs = true;
                this.flag = true;
                this.editFlag = true;
                let data = await service.editWl({
                    "lcId":rows[index].lcId
                });
                if(data.code == 200){
                    this.wlgsForm = data.obj;
                }
                this.wlgsForm.lcId = rows[index].lcId;
            },
            stopRow(index, rows){

            },
            add(){
                this.dialogWlgs = true;
            },
            async addressIconClick(){
                this.dialogAddress = true;
                if(this.editFlag){
                    let data = await service.editAddrList({
                        'lcId':this.wlgsForm.lcId
                    });
                    if(data.code == 200){
                        this.addressData = data.data;
                        this.editFlag = false;
                    }
                }else{
                    let data = await service.addrList({
                        'lcId':this.wlgsForm.lcId
                    });
                    if(data.code == 200){
                        this.addressData = data.data;
                    }
                }
            },
            query(){
                this.dialog = true;
            },
           async saveAdd(){
                if(this.flag){
                    let data = await service.updateWl({
                        'lcId':this.wlgsForm.lcId,
                        "lcSn":this.wlgsForm.lcSn,
                        "lcName":this.wlgsForm.lcName,
                        "lcNameSp":this.wlgsForm.lcNameSp,
                        "lcNamePy":this.wlgsForm.lcNamePy,
                        "lcTax":this.wlgsForm.lcTax,
                        "contacts":this.wlgsForm.contacts,
                        "telephone":this.wlgsForm.telephone,
                        "bankAccount":this.wlgsForm.bankAccount,
                        "email":this.wlgsForm.email,
                        "status":this.wlgsForm.status,
                        "remark":this.wlgsForm.remark
                    });
                    this.flag = false;
                    if(data.code == 200){
                        this.dialogWlgs = false;
                        let data = await service.wlList({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = data.data;
                            this.total = data.total;
                        }
                    }
                }else{
                    let data = await service.addWl({
                        'lcId':this.wlgsForm.lcId,
                        "lcSn":this.wlgsForm.lcSn,
                        "lcName":this.wlgsForm.lcName,
                        "lcNameSp":this.wlgsForm.lcNameSp,
                        "lcNamePy":this.wlgsForm.lcNamePy,
                        "lcTax":this.wlgsForm.lcTax,
                        "contacts":this.wlgsForm.contacts,
                        "telephone":this.wlgsForm.telephone,
                        "bankAccount":this.wlgsForm.bankAccount,
                        "email":this.wlgsForm.email,
                        "status":this.wlgsForm.status,
                        "remark":this.wlgsForm.remark
                    });
                    if(data.code == 200){
                        this.dialogWlgs = false;
                        let data = await service.wlList({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = data.data;
                            this.total = data.total;
                        }
                    }
                }
            },
            saveClose(){

            },
            saveCloseDz(addDzForm){
                console.log(this.addDzForm.area);
                this.$refs[addDzForm].validate(async(valid) => {
                    if (valid) {
                        if(this.flag2){
                            let data = await service.updateAddr({
                                'lcId':this.wlgsForm.lcId,
                                'saId':this.addDzForm.saId,
                                'saName':this.addDzForm.saName,
                                'cellphone':this.addDzForm.cellphone,
                                'telephone':this.addDzForm.telephone,
                                'postcode':this.addDzForm.postcode,
                                'areaId':this.addDzForm.area[2],
                                'address':this.addDzForm.address
                            });
                            if(data.code == 200){
                                this.dialogAddDz = false;
                                let data = await service.addrList({
                                    'lcId':this.wlgsForm.lcId
                                });
                                this.addressData = data.data;
                            }
                        }else{
                            let data = await service.addAddr({
                                'lcId':this.wlgsForm.lcId,
                                'saId':this.addDzForm.saId,
                                'saName':this.addDzForm.saName,
                                'cellphone':this.addDzForm.cellphone,
                                'telephone':this.addDzForm.telephone,
                                'postcode':this.addDzForm.postcode,
                                'areaId':this.addDzForm.area[2],
                                'address':this.addDzForm.address
                            });
                            if(data.code == 200){
                                this.dialogAddDz = false;
                                let data = await service.addrList({
                                    'lcId':this.wlgsForm.lcId
                                });
                                this.addressData = data.data;
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
//                setTimeout(function(){
//                    this.$refs[addDzForm].resetFields();
//                },2000)
            },
            handleChange(value){
                console.log(value);
            },
            addDz(){
                this.dialogAddDz = true;
            },
            choiceAdRow(index,rows){
                this.wlgsForm.address = rows[index].address;
                this.dialogAddress = false;
            },
            async editAdRow(index,rows){
                this.dialogAddDz = true;
                let data = await service.editAddr({
                    'saId':rows[index].saId
                });
                if(data.code == 200){
                    this.addDzForm = data.obj;
                    this.flag2 = false;
                }
                this.addDzForm.saId = rows[index].saId;
            },
            async removeAdRow(index,rows){
                let data = await service.deleteAddr({
                    'saId':rows[index].saId
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            choiceQuery(index,rows){

            },
            editQuery(index,rows){

            },
            removeQuery(index,rows){

            },
        },
        async mounted() {
            let data = await service.wlList({
                'page':1
            });
            if(data.code == 200){
                this.tableData = data.data;
                this.total = data.total;
            }
        }
    }
</script>
