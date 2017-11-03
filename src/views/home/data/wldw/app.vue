<template>
    <div class="wldw">
        <!--修改期初应收款-->
        <el-dialog size="tiny" title="期初应收应付" :visible.sync="dialogQcysk">
            <el-form label-width="100px" :label-position="labelPosition" :model="qcyskForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="期初应收款">
                            <el-input v-model="qcyskForm.initialReceivables"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="期初应付款">
                            <el-input v-model="qcyskForm.initialPayables"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="qcysk">确认</el-button>
                <el-button @click="dialogQcysk = false">退出</el-button>
            </div>
        </el-dialog>
        <!--设置信用额度-->
        <el-dialog size="tiny" title="信用额度设置" :visible.sync="dialogXyed">
            <el-form label-width="100px" :label-position="labelPosition" :model="xyedForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="24">
                        <el-checkbox v-model="xyedForm.creditStatus">启用信用额度</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="信用额度">
                            <el-input v-model="xyedForm.creditLimit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="xyedForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="xyed">确认</el-button>
                <el-button @click="dialogXyed = false">退出</el-button>
            </div>
        </el-dialog>
        <!-- 添加地址弹出框 -->
        <el-dialog size="tiny" title="地址" :visible.sync="dialogAddDz">
            <el-form label-width="100px" :label-position="labelPosition" :model="addDzForm" class="demo-form-inline">
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
                        <el-form-item label="选择省市区">
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
                <el-button type="primary" @click="saveAddr()">确认</el-button>
                <el-button @click="dialogAddDz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 地址弹出框 -->
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
                <el-button type="primary" @click="addDz()">添加</el-button>
                <el-button @click="dialogAddress = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 往来单位-信息框 -->
        <el-dialog class="wldwMessage" title="往来单位-信息框" :visible.sync="dialogWldwEdit">
            <el-form label-width="100px" :label-position="labelPosition" :model="wldwForm" class="demo-form-inline">
                <el-row>所属分类</el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="单位名称">
                            <el-input v-model="wldwForm.comName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="单位名称编号">
                            <el-input v-model="wldwForm.comId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="简名">
                            <el-input v-model="wldwForm.comNameSp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="拼音码">
                            <el-input v-model="wldwForm.comNamePy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型">
                            <el-select v-model="wldwForm.typeId">
                                <el-option label="正常" value="0"></el-option>
                                <el-option label="暂停营业" value="1"></el-option>
                                <el-option label="关店" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="税号">
                            <el-input v-model="wldwForm.taxNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="税率（%）">
                            <el-input v-model="wldwForm.taxRate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="wldwForm.contacts"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话">
                            <el-input v-model="wldwForm.telphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="手机">
                            <el-input v-model="wldwForm.cellphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电子邮件">
                            <el-input v-model="wldwForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价格等级">
                            <el-select v-model="wldwForm.priceScale">
                                <el-option label="预设售价1" value="0"></el-option>
                                <el-option label="预设售价2" value="1"></el-option>
                                <el-option label="预设售价3" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="地址">
                            <el-input icon="more" :on-icon-click="addressIconClick" v-model="wldwForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="开户银行">
                            <el-input v-model="wldwForm.bankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号">
                            <el-input v-model="wldwForm.bankNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="wldwForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveAddDw()">保存并新增</el-button>
                <el-button @click="dialogWldwEdit = false">关闭</el-button>
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
        <h4>基本信息--往来单位</h4>
        <div class="left" v-if="leftFlag">
            <h5>往来单位分类</h5>
            <div>
                <el-input  placeholder="输入类别名称进行定位"></el-input>
                <el-button>定位</el-button>
                <div class="con">
                    <!--<el-tree-->
                        <!--:data="treeData"-->
                        <!--:props="defaultProps"-->
                        <!--node-key="id"-->
                        <!--:expand-on-click-node="false"-->
                        <!--:render-content="renderContent">-->
                    <!--</el-tree>-->
                    <el-tree
                        :props="props"
                        :load="loadNode"
                        lazy
                        @check-change="handleCheckChange">
                    </el-tree>
                </div>
                <!--<el-button @click="editFinish" class="fl-btn">编辑完成</el-button>-->
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
                    <el-table-column prop="comSn" label="单位编号" width="150"></el-table-column>
                    <el-table-column prop="comName" label="单位名称" width="120"></el-table-column>
                    <el-table-column prop="comNameSp" label="单位简名" width="120"></el-table-column>
                    <el-table-column prop="typeId" label="类型" width="120"></el-table-column>
                    <el-table-column prop="initialReceivables" label="期初应收款" width="300"></el-table-column>
                    <el-table-column prop="initialPayables" label="期初应付款" width="120"></el-table-column>
                    <el-table-column prop="currentReceivables" label="当前应收账款" width="150"></el-table-column>
                    <el-table-column prop="currentPayables" label="当前应付账款" width="150"></el-table-column>
                    <el-table-column prop="creditStatus" label="信用额度启用状态" width="300"></el-table-column>
                    <el-table-column prop="creditLimit" label="信用额度" width="120"></el-table-column>
                    <el-table-column prop="usableLimit" label="可用额度" width="120"></el-table-column>
                    <el-table-column prop="cellphone" label="手机" width="120"></el-table-column>
                    <el-table-column prop="contacts" label="联系人" width="120"></el-table-column>
                    <el-table-column prop="priceScale" label="价格等级" width="120"></el-table-column>
                    <el-table-column prop="companyStatus" label="状态" width="120"></el-table-column>
                    <el-table-column prop="email" label="电子邮件" width="120"></el-table-column>
                    <el-table-column prop="remark" label="备注" width="120"></el-table-column>
                    <el-table-column label="操作" width="350">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="editRow(scope.$index, tableData)"
                                type="text"
                                size="small">修改
                            </el-button>
                            <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData)"
                                type="text"
                                size="small">删除/停用
                            </el-button>
                            <el-button
                                @click.native.prevent="qcysRow(scope.$index, tableData)"
                                type="text"
                                size="small">修改期初应收应付
                            </el-button>
                            <el-button
                                @click.native.prevent="xyxxRow(scope.$index, tableData)"
                                type="text"
                                size="small">设置信用额度
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
            </div>
            <div class="btn-group">
                <el-button disabled>往来单位和期初导入</el-button>
                <el-button @click="addWldw">空白新增</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    import service from './service/getData.js'
    import city from '../../../../assets/js/city.js'
    let id = 1000;
    export default {
        components: {

        },
        data: function(){
            return{
                dialogAddDz:false,
                dialogFormVisible: false,
                dialogWldwEdit:false,
                dialogAddress:false,
                dialogQcysk:false,
                dialogXyed:false,
                flag:false,
                flag2:false,
                editFlag:false,
                currentPage:1,
                total:0,
                labelPosition:"left",
                myTreeStore:'',
                myTreeData:'',
                selectAddress:'',
                inputAddress:'',
                cityOptions:city,
                addDzForm:{
                    saId:'',
                    saName:'',
                    cellphone:'',
                    telephone:'',
                    area:['','',''],
                    address:'',
                    postcode:''
                },
                form:{
                   name:'',
                   bh:''
                },
                wldwForm:{
                    comId:'',
                    comSn:'',
                    comName:'',
                    comNameSp:'',
                    comNamePy:'',
                    typeId:'',
                    taxNum:'',
                    taxRate:'',
                    initialReceivables:'',
                    initialPayables:'',
                    currentReceivables:'',
                    currentPayables:'',
                    creditStatus:'',
                    creditLimit:'',
                    usableLimit:'',
                    cellphone:'',
                    contacts:'',
                    telephone:'',
                    priceScale:'',
                    address:'',
                    email:'',
                    bankName:'',
                    bankNum:'',
                    remark:'',
                    saId:''
                },
                qcyskForm:{
                    comId:'',
                    initialReceivables:'',
                    initialPayables:''
                },
                xyedForm:{
                    comId:'',
                    creditStatus:1,
                    remark:''
                },
                leftFlag:true,
                select:'',
                input:'',
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
                treeData: [{
                    id: 1,
                    label: '全部分类',
                    children: [{
                        id: 4,
                        label: '一级 1-1',
                        children: [{
                            id: 9,
                            label: '二级 1-1-1'
                        }, {
                            id: 10,
                            label: '二级 1-1-2'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                tableData: [{
                    comId:'001',
                    comSn:'001',
                    comName:'立业公司',
                    comNameSp:'lygs',
                    typeId:'1',
                    initialReceivables:'20000.00',
                    initialPayables:'20000.00',
                    currentReceivables:'10000.00',
                    currentPayables:'5000.00',
                    creditStatus:'0',
                    creditLimit:'1',
                    usableLimit:'1',
                    cellphone:'1368990876',
                    contacts:'1',
                    priceScale:'',
                    status:'0',
                    companyStatus:'',
                    email:'987966554@qq.com',
                    remark:''
                },{
                    comId:'002',
                    comSn:'001',
                    comName:'树人公司',
                    comNameSp:'lygs',
                    typeId:'1',
                    initialReceivables:'20000.00',
                    initialPayables:'20000.00',
                    currentReceivables:'10000.00',
                    currentPayables:'5000.00',
                    creditStatus:'0',
                    creditLimit:'1',
                    usableLimit:'1',
                    cellphone:'1368990876',
                    contacts:'1',
                    priceScale:'',
                    status:'0',
                    companyStatus:'',
                    email:'987966554@qq.com',
                    remark:''
                },{
                    comId:'003',
                    comSn:'001',
                    comName:'桃李公司',
                    comNameSp:'lygs',
                    typeId:'1',
                    initialReceivables:'20000.00',
                    initialPayables:'20000.00',
                    currentReceivables:'10000.00',
                    currentPayables:'5000.00',
                    creditStatus:'0',
                    creditLimit:'1',
                    usableLimit:'1',
                    cellphone:'1368990876',
                    contacts:'1',
                    priceScale:'',
                    status:'0',
                    companyStatus:'',
                    email:'987966554@qq.com',
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
                let data = await service.wldwTable({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    this.total = data.total;
                    for(var i=0,len = this.tableData.length;i<len;i++){
                        if(data.data[i].companyStatus == 1){
                            this.tableData[i].companyStatus = "启用"
                        }else{
                            this.tableData[i].companyStatus = "停用"
                        }
                        if(data.data[i].creditStatus == 1){
                            this.tableData[i].creditStatus = "启用"
                        }else{
                            this.tableData[i].creditStatus = "启用"
                        }
                    }
                }
            },
            /**tree***/
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ name: 'region1' }, { name: 'region2' }]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                    hasChild = true;
                } else if (node.data.name === 'region2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                    var data;
                    if (hasChild) {
                        data = [{
                            name: 'zone' + this.count++
                        }, {
                            name: 'zone' + this.count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 500);
            },
            /**tree-end***/
            editFinish(){
                console.log("klkl");
                console.log(this.myTreeStore);
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
            qcysRow(index,rows){
                this.dialogQcysk = true;
                this.qcyskForm.comId = rows[index].comId;
            },
            xyxxRow(index,rows){
                this.dialogXyed = true;
                this.xyedForm.comId = rows[index].comId;
            },
            async xyed(){
                let data = await service.xyxxWldw({
                    "comId":this.xyedForm.comId,
                    "creditStatus":this.xyedForm.companyStatus,
                    "creditLimit":this.xyedForm.creditLimit,
                    "remark":this.xyedForm.remark,
                });
                if(data.code == 200){
                    this.dialogXyed = false;
                    let data = await service.wldwTable({
                        'page':1
                    });
                    this.tableData = data.data;
                    for(var i=0,len = this.tableData.length;i<len;i++){
                        if(data.data[i].companyStatus == 1){
                            this.tableData[i].companyStatus = "启用"
                        }else{
                            this.tableData[i].companyStatus = "停用"
                        }
                        if(data.data[i].creditStatus == 1){
                            this.tableData[i].creditStatus = "启用"
                        }else{
                            this.tableData[i].creditStatus = "启用"
                        }
                    }
                }
            },
            async qcysk(){
                let data = await service.qcyfkWldw({
                    "comId":this.qcyskForm.comId,
                    "initialReceivables":this.qcyskForm.initialReceivables,
                    "initialPayables":this.qcyskForm.initialPayables
                });
                if(data.code == 200){
                    this.dialogQcysk = false;
                    let data = await service.wldwTable({
                        'page':1
                    });
                    if(data.code == 200){
                        this.tableData = data.data;
                        for(var i=0,len = this.tableData.length;i<len;i++){
                            if(data.data[i].companyStatus == 1){
                                this.tableData[i].companyStatus = "启用"
                            }else{
                                this.tableData[i].companyStatus = "停用"
                            }
                            if(data.data[i].creditStatus == 1){
                                this.tableData[i].creditStatus = "启用"
                            }else{
                                this.tableData[i].creditStatus = "启用"
                            }
                        }
                    }
                }
            },
            async deleteRow(index, rows) {
                let data = await service.deleteWldw({
                    "comId":rows[index].comId,
                    "companyStatus":rows[index].companyStatus
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            addWldw(){
                this.dialogWldwEdit = true;
            },
            async editRow(index,rows){
                this.flag = true;
                this.dialogWldwEdit = true;
                this.editFlag = true;
                let data = await service.editWldw({
                    "comId":rows[index].comId
                });
                this.wldwForm = data.obj;
                this.wldwForm.comId = rows[index].comId;
            },
            async saveAddDw(){
                if(this.flag){
                    let data = await service.updateWldw({
                        "comId":this.wldwForm.comId,
                        "comName":this.wldwForm.comName,
                        "comNameSp":this.wldwForm.comNameSp,
                        "comNamePy":this.wldwForm.comNamePy,
                        "typeId":this.wldwForm.typeId,
                        "taxNum":this.wldwForm.taxNum,
                        "taxRate":this.wldwForm.taxRate,
                        "initialReceivables":this.wldwForm.initialReceivables,
                        "initialPayables":this.wldwForm.initialPayables,
                        "currentReceivables":this.wldwForm.currentReceivables,
                        "currentPayables":this.wldwForm.currentPayables,
                        "creditStatus":this.wldwForm.creditStatus,
                        "creditLimit":this.wldwForm.creditLimit,
                        "usableLimit":this.wldwForm.usableLimit,
                        "cellphone":this.wldwForm.cellphone,
                        "contacts":this.wldwForm.contacts,
                        "telephone":this.wldwForm.telephone,
                        "priceScale":this.wldwForm.priceScale,
                        "address":this.wldwForm.address,
                        "email":this.wldwForm.email,
                        "bankName":this.wldwForm.bankName,
                        "bankNum":this.wldwForm.bankNum,
                        "remark":this.wldwForm.remark
                    });
                    if(data.code == 200){
                        this.dialogWldwEdit = false;
                        let list = await service.wldwTable({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = list.data;
                            for(var i=0,len=this.tableData.length;i<len;i++){
                                if(list.data[i].companyStatus == 1){
                                    this.tableData[i].companyStatus = "启用"
                                }else{
                                    this.tableData[i].companyStatus = "停用"
                                }
                                if(list.data[i].creditStatus == 1){
                                    this.tableData[i].creditStatus = "启用"
                                }else{
                                    this.tableData[i].creditStatus = "启用"
                                }
                            }
                        }
                    }
                    this.flag = false;
                }else{
                    let data = await service.addWldw({
                        "comId":this.wldwForm.comId,
                        "comName":this.wldwForm.comName,
                        "comNameSp":this.wldwForm.comNameSp,
                        "comNamePy":this.wldwForm.comNamePy,
                        "typeId":this.wldwForm.typeId,
                        "taxNum":this.wldwForm.taxNum,
                        "taxRate":this.wldwForm.taxRate,
                        "initialReceivables":this.wldwForm.initialReceivables,
                        "initialPayables":this.wldwForm.initialPayables,
                        "currentReceivables":this.wldwForm.currentReceivables,
                        "currentPayables":this.wldwForm.currentPayables,
                        "creditStatus":this.wldwForm.creditStatus,
                        "creditLimit":this.wldwForm.creditLimit,
                        "usableLimit":this.wldwForm.usableLimit,
                        "cellphone":this.wldwForm.cellphone,
                        "contacts":this.wldwForm.contacts,
                        "telephone":this.wldwForm.telephone,
                        "priceScale":this.wldwForm.priceScale,
                        "address":this.wldwForm.address,
                        "email":this.wldwForm.email,
                        "bankName":this.wldwForm.bankName,
                        "bankNum":this.wldwForm.bankNum,
                        "remark":this.wldwForm.remark
                    });
                    if(data.code == 200){
                        this.dialogWldwEdit = false;
                        let list = await service.wldwTable({
                            'page':1
                        });
                        if(data.code == 200){
                            this.tableData = list.data;
                            this.total = list.total;
                            for(var i=0,len = this.tableData.length;i<len;i++){
                                if(data.data[i].companyStatus == 1){
                                    this.tableData[i].companyStatus = "启用"
                                }else{
                                    this.tableData[i].companyStatus = "停用"
                                }
                                if(data.data[i].creditStatus == 1){
                                    this.tableData[i].creditStatus = "启用"
                                }else{
                                    this.tableData[i].creditStatus = "启用"
                                }
                            }
                        }
                    }
                }
            },
            async addressIconClick(){
                this.dialogAddress = true;
                if(this.editFlag){
                    let data = await service.editAddrList({
                        'comId':this.wldwForm.comId
                    });
                    if(data.code == 200){
                        this.addressData = data.data;
                        this.editFlag = false;
                    }
                }else{
                    let data = await service.addrList({
                        'comId':this.wldwForm.comId
                    });
                    if(data.code == 200){
                        this.addressData = data.data;
                    }
                }
            },
            choiceAdRow(index,rows){
                this.wldwForm.address = rows[index].address;
                this.dialogAddress = false;
            },
            async editAdRow(index,rows){
                this.dialogAddDz = true;
                this.flag2 = true;
                let data = await service.editAddr({
                    'saId':rows[index].saId
                });
                if(data.code == 200){
                    this.addDzForm = data.obj;
                }
            },
            async removeAdRow(index,rows){
                let data = await service.deleteAddr({
                    'saId':rows[index].saId
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            addDz(){
                this.dialogAddDz = true;
            },
            async saveAddr(){
                if(this.flag2){
                    let data = await service.updateAddr({
                        'comId':this.wldwForm.comId,
                        'saId':this.addDzForm.saId,
                        'saName':this.addDzForm.saName,
                        'cellphone':this.addDzForm.cellphone,
                        'telephone':this.addDzForm.telephone,
                        'areaId':this.addDzForm.area[2],
                        'address':this.addDzForm.address,
                        'postcode':this.addDzForm.postcode
                    });
                    if(data.code == 200){
                        this.dialogAddDz = false;
                        let data = await service.addrList();
                        this.addressData = data.data;
                    }
                    this.flag2 = false;
                }else{
                    let data = await service.addAddr({
                        'comId':this.wldwForm.comId,
                        'saName':this.addDzForm.saName,
                        'cellphone':this.addDzForm.cellphone,
                        'telephone':this.addDzForm.telephone,
                        'areaId':this.addDzForm.area[2],
                        'address':this.addDzForm.address,
                        'postcode':this.addDzForm.postcode
                    });
                    if(data.code == 200){
                        this.dialogAddDz = false;
                        let data = await service.addrList();
                        this.addressData = data.data;
                    }
                }
            },
            handleChange(value){
                console.log(value);
            }
//            ceshi(){
//                this.$router.push({path:'/login',query:{ redirect:'/'}});
//                this.$store.commit('setIsLogin', false);
//            }
        },
        async mounted() {
//            let data = await service.wldwTable({
//                'page':1
//            });
//            if(data.code == 200){
//                this.tableData = data.data;
//                this.total = data.total;
//                for(var i=0,len = this.tableData.length;i<len;i++){
//                    if(data.data[i].companyStatus == 1){
//                        this.tableData[i].companyStatus = "启用"
//                    }else{
//                        this.tableData[i].companyStatus = "停用"
//                    }
//                    if(data.data[i].creditStatus == 1){
//                        this.tableData[i].creditStatus = "启用"
//                    }else{
//                        this.tableData[i].creditStatus = "启用"
//                    }
//                }
//            }
        }
    }
</script>
