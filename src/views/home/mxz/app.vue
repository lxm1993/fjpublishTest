<template>
    <div class="mxz">
        <h5>记账科目明细账</h5>
        <div class="con">
            <el-row>
                <el-col :span="6">
                    <h5>会计科目：现金</h5>
                </el-col>
                <el-col :span="6">
                    <h5>此前余额：{{ye}}</h5>
                </el-col>
            </el-row>
            <div style="height:600px;border:1px solid #ddd;">
                <el-table :data="tableData" border style="width: 100%" max-height="580">
                    <el-table-column prop="date" label="日期" width="100"></el-table-column>
                    <el-table-column prop="bh" label="单据编号" width="120"></el-table-column>
                    <el-table-column prop="lx" label="单据类型" width="120"></el-table-column>
                    <el-table-column prop="zy" label="摘要" width="120"></el-table-column>
                    <el-table-column prop="wldw" label="往来单位" width="300"></el-table-column>
                    <el-table-column prop="zjje" label="增加金额" width="120"></el-table-column>
                    <el-table-column prop="jsje" label="减少金额" width="120"></el-table-column>
                    <el-table-column prop="ye" label="余额" width="120"></el-table-column>
                    <el-table-column prop="sm" label="附加说明" width="120"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="btn-group">
            <el-button @click="">打印</el-button>
            <el-button @click="">退出</el-button>
        </div>
    </div>
</template>
<script lang="babel">
    import './less/style.less'
    export default {
        components: {

        },
        data: function(){
            return {
                labelPosition:'left',
                ye:'',
                tableData:[
                    {
                        date:'',
                        bh:'',
                        lx:'',
                        zy:'',
                        wldw:'',
                        zjje:'',
                        jsje:'',
                        ye:'',
                        sm:''
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>
