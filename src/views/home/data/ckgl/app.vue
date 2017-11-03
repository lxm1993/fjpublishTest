<template>
    <div class="ckgl">
        <!-- 修改 -->
        <el-dialog class="fzCkMessge" title="仓库信息--信息框" :visible.sync="dialogFzAdd">
            <el-form label-width="100px" :label-position="labelPosition" :model="fzCkMessgeform" class="demo-form-inline">
                <div class="content1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="仓库类型">
                                <el-select v-model="fzCkMessgeform.depotType">
                                    <el-option label="自有仓库" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="仓库名称">
                                <el-input v-model="fzCkMessgeform.depotName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="仓库编号">
                                <el-input v-model="fzCkMessgeform.depotSn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="仓库简名">
                                <el-input v-model="fzCkMessgeform.depotNameSp"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="拼音码">
                                <el-input v-model="fzCkMessgeform.depotNamePy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="备注">
                                <el-input v-model="fzCkMessgeform.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>联系信息【将作为您物流单上寄件人信息打印出来，请确保信息准确】</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="fzCkMessgeform.contacts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="fzCkMessgeform.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮政编码">
                                <el-input v-model="fzCkMessgeform.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="fzCkMessgeform.area"></el-cascader>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="发货地址">
                            <el-input v-model="fzCkMessgeform.addr"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="edit">保存并添加</el-button>
                <el-button @click="dialogFzAdd = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 空白新增 -->
        <el-dialog class="ckMessge" title="仓库信息--信息框" :visible.sync="dialogAdd">
            <el-form label-width="100px" :label-position="labelPosition" :model="ckMessgeform" class="demo-form-inline">
                <div class="content1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="仓库类型">
                                <el-select v-model="ckMessgeform.depotType">
                                    <el-option label="自有仓库" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="仓库名称">
                                <el-input v-model="ckMessgeform.depotName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="仓库编号">
                                <el-input v-model="ckMessgeform.bh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="仓库简名">
                                <el-input v-model="ckMessgeform.depotSn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="拼音码">
                                <el-input v-model="ckMessgeform.depotNamePy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="备注">
                                <el-input v-model="ckMessgeform.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>联系信息【将作为您物流单上寄件人信息打印出来，请确保信息准确】</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="ckMessgeform.contacts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="ckMessgeform.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮政编码">
                                <el-input v-model="ckMessgeform.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="ckMessgeform.area"></el-cascader>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="发货地址">
                            <el-input v-model="ckMessgeform.addr"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">保存并添加</el-button>
                <el-button @click="dialogckMessge = false">关闭</el-button>
            </div>
        </el-dialog>
        <h4>基本信息--存货仓库</h4>
        <div class="con">
            <el-table :data="tableData" border style="width: 100%" height="600">
                <el-table-column prop="depotSn" label="仓库编码" width="150"></el-table-column>
                <el-table-column prop="depotName" label="仓库名称" width="120"></el-table-column>
                <el-table-column prop="depotNameSp" label="仓库简名" width="120"></el-table-column>
                <el-table-column prop="depotNamePy" label="拼音码" width="170"></el-table-column>
                <el-table-column prop="depotStatus" label="状态" width="120"></el-table-column>
                <el-table-column prop="remark" label="备注" width="120"></el-table-column>
                <el-table-column label="操作" width="220">
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
            <el-button @click="dialogAdd = true">新增</el-button>
            <!--<el-button @click="fzAdd">复制新增</el-button>-->
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    import city from '../../../../assets/js/city.js'
    import service from './service/getData.js'
    export default {
        components: {

        },
        data: function(){
            return{
                labelPosition:'left',
                dialogAdd:false,
                dialogFzAdd:false,
                currentPage:1,
                total:0,
                cityOptions:city,
                editDepotId:'',
                ckMessgeform:{
                    storeId:'',
                    depotType:'',
                    depotName:'',
                    depotSn:'',
                    depotNameSp:'',
                    depotNamePy:'',
                    remark:'',
                    contacts:'',
                    telephone:'',
                    postcode:'',
                    areaId:'',
                    addr:'',
                    status:'',
                    area:['410000','410100','410105']
                },
                fzCkMessgeform:{
                    storeId:'',
                    depotType:'',
                    depotName:'',
                    depotSn:'',
                    depotNameSp:'',
                    depotNamePy:'',
                    remark:'',
                    contacts:'',
                    telephone:'',
                    postcode:'',
                    areaId:'',
                    addr:'',
                    status:'',
                    area:['410000','410100','410105']
                },
                tableData:[
                    {
                        depotId:'001',
                        depotSn:'001',
                        depotName:'主仓库01',
                        depotStatus:'正常',
                        areaId:'001',
                        depotType:'正常',
                        storeId:'001',
                        status:'1',
                        depotNameSp:'主仓',
                        depotNamePy:'zck',
                        remark:''
                    },{
                        depotId:'002',
                        depotSn:'002',
                        depotName:'中华仓',
                        depotStatus:'正常',
                        areaId:'001',
                        depotType:'正常',
                        storeId:'001',
                        status:'1',
                        depotNameSp:'主仓',
                        depotNamePy:'zhc',
                        remark:''
                    },{
                        depotId:'003',
                        depotSn:'003',
                        depotName:'华东仓',
                        depotStatus:'正常',
                        areaId:'001',
                        depotType:'正常',
                        storeId:'001',
                        status:'1',
                        depotNameSp:'主仓',
                        depotNamePy:'hdc',
                        remark:''
                    },{
                        depotId:'004',
                        depotSn:'004',
                        depotName:'华东仓2',
                        depotStatus:'正常',
                        areaId:'001',
                        depotType:'正常',
                        storeId:'001',
                        status:'1',
                        depotNameSp:'主仓',
                        depotNamePy:'hdc',
                        remark:''
                    },{
                        depotId:'005',
                        depotSn:'005',
                        depotName:'华中仓',
                        depotStatus:'正常',
                        areaId:'001',
                        depotType:'正常',
                        storeId:'001',
                        status:'1',
                        depotNameSp:'主仓',
                        depotNamePy:'hdc',
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
                let data = await service.ckTable({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    this.total = data.total;
                }
            },
            async add(){
                let data = await service.addCk({
                    "depotType":this.ckMessgeform.depotType,
                    "depotName":this.ckMessgeform.depotName,
                    "depotSn":this.ckMessgeform.depotSn,
                    "depotNameSp":this.ckMessgeform.depotNameSp,
                    "depotNamePy":this.ckMessgeform.depotNamePy,
                    "remark":this.ckMessgeform.remark,
                    "contacts":this.ckMessgeform.contacts,
                    "telephone":this.ckMessgeform.telephone,
                    "postcode":this.ckMessgeform.postcode,
                    "areaId":this.ckMessgeform.area[2],
                    "addr":this.ckMessgeform.addr,
                    "status":this.ckMessgeform.status
                });
                if(data.code == 200){
                    this.dialogAdd = false;
                    let data = await service.ckTable({
                        'page':`${val}`
                    });
                    if(data.code == 200){
                        this.tableData = data.data;
                        this.total = data.total;
                    }
                }
            },
            async edit(){
                let data = await service.updateCk({
                    "depotId":this.editDepotId,
                    "depotType":this.fzCkMessgeform.depotType,
                    "depotName":this.fzCkMessgeform.depotName,
                    "depotSn":this.fzCkMessgeform.depotSn,
                    "depotNameSp":this.fzCkMessgeform.depotNameSp,
                    "depotNamePy":this.fzCkMessgeform.depotNamePy,
                    "remark":this.fzCkMessgeform.remark,
                    "contacts":this.fzCkMessgeform.contacts,
                    "telephone":this.fzCkMessgeform.telephone,
                    "postcode":this.fzCkMessgeform.postcode,
                    "areaId":this.fzCkMessgeform.areaId,
                    "addr":this.fzCkMessgeform.addr,
                    "status":this.fzCkMessgeform.status
                });
                if(data.code == 200){
                    this.dialogFzAdd = false;
                }
            },
            async editRow(index,rows){
                console.log(rows[index].depotId);
                this.editDepotId = rows[index].depotId;
                let data = await service.editCk({"depotId":rows[index].depotId});
                this.dialogFzAdd = true;
                this.fzCkMessgeform = data.obj;
            },
            async deleteRow(index,rows){
                let data = await service.deleteCk({"depotId":rows[index].depotId});
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            }
        },
        async mounted() {
//            let data = await service.ckTable({
//                'page':1
//            });
//            if(data.code == 200){
//                this.tableData = data.data;
//                this.total = data.total;
//            }
        }
    }
</script>
