<template>
    <div class="sku">
        <el-dialog title="库存商品选择框" :visible.sync="dialogVisible1">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="value4">
                        <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="gridData" border>
                <el-table-column property="date" label="商品编号" width="150"></el-table-column>
                <el-table-column property="name" label="商品名称" width="150"></el-table-column>
                <el-table-column property="address" label="商品简名" width="150"></el-table-column>
                <el-table-column property="address" label="锁定库存" width="150"></el-table-column>
                <el-table-column property="address" label="剩余库存" width="150"></el-table-column>
                <el-table-column property="address" label="单位"></el-table-column>
                <el-table-column property="address" label="产地"></el-table-column>
                <el-table-column property="address" label="规格"></el-table-column>
                <el-table-column property="address" label="型号"></el-table-column>
                <el-table-column property="address" label="重量"></el-table-column>
                <el-table-column property="address" label="品牌"></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button>进入下级</el-button>
                <el-button>返回上级</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button>选中并关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="商品条形码导入" :visible.sync="dialogVisible2">
            <el-row>
                <a href="#">导入前请点这里导出模板！</a>
            </el-row>
            <el-row>
                导入文件：<el-input type="file"></el-input>
            </el-row>
            <el-row></el-row>
            <el-row></el-row>
            <div slot="footer" class="dialog-footer">
                <el-button>导入</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-row>
            <div class="formbox">
                <el-form label-width="80px">
                    <el-row style="margin-top: 15px;">
                        <el-col :span="3">
                            <el-form-item label="商品名称">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="商品编号">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="品牌">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="条码">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <el-form-item label="SKU编号">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="淘宝补码">
                                <el-select v-model="value1">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label="单位">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-button class="btn-default">查询</el-button>
                        </el-col>
                        <el-col :span="3" :offset="3">
                            <el-select v-model="value2">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-checkbox v-model="checked">只显示SKU编号为空的商品</el-checkbox>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="value3">
                                <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="brand"
                    label="品牌">
                </el-table-column>
                <el-table-column
                    prop="place"
                    label="产地">
                </el-table-column>
                <el-table-column
                    prop="format"
                    label="规格">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="型号">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位">
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="条码">
                </el-table-column>
                <el-table-column
                    prop="suk"
                    label="SKU编号">
                </el-table-column>
                <el-table-column
                    prop="codestate"
                    label="淘宝补码状态">
                </el-table-column>
            </el-table>
        </el-row>
        <div class="btn-group">
            <el-button class="btn-default" @click="dialogVisible1=true">商品选择</el-button>
            <el-button class="btn-default">全部选中</el-button>
            <el-button class="btn-default">条码打印设置</el-button>
            <el-button class="btn-default">条码打印</el-button>
            <el-button class="btn-default" @click="dialogVisible2=true">导入商品条码</el-button>
            <el-button class="btn-default">淘宝商品补码</el-button>
            <el-button class="btn-default">SUK编号规则设置</el-button>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    export default {
        components: {

        },
        data: function(){
            return{
                checked: false,
                dialogVisible1: false,
                dialogVisible2: false,
                options: [{
                    value: '选项1',
                    label: '全部'
                    },{
                    value: '选项2',
                    label: '未完成'
                    }, {
                    value: '选项3',
                    label: '已完成',
                    }, {
                    value: '选项4',
                    label: '补码失败'
                }],
                value1:'全部',
                    options2: [{
                    value: '选项1',
                    label: '仅显示正常商品'
                    },{
                    value: '选项2',
                    label: '仅显示停用商品'
                    }, {
                    value: '选项3',
                    label: '显示全部商品',
                }],
                value2:'仅显示正常商品',
                options3: [{
                    value: '选项1',
                    label: '全部显示'
                    },{
                    value: '选项2',
                    label: '有条码商品'
                    }, {
                    value: '选项3',
                    label: '无条码商品',
                }],
                value3:'全部显示',
                options4: [{
                    value: '选项1',
                    label: '快速查询'
                    },{
                    value: '选项2',
                    label: '按编号过滤'
                    }, {
                    value: '选项3',
                    label: '按名称过滤',
                    },{
                    value: '选项4',
                    label: '按简名过滤',
                    },{
                    value: '选项5',
                    label: '按品牌过滤',
                    },{
                    value: '选项6',
                    label: '按规格过滤'
                    }, {
                    value: '选项7',
                    label: '按型号过滤',
                    },{
                    value: '选项8',
                    label: '按产地过滤',
                    },{
                    value: '选项9',
                    label: '按条码过滤',
                    },{
                    value: '选项10',
                    label: '按拼音码过滤',
                }],
                value4:'快速查询',
                tableData: [],
                gridData:[]
            }
        },
        methods: {
        }
    }
</script>
