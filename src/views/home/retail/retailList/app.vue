<template>
    <div class="lsd">
        <el-dialog title="库存商品选择框" :visible.sync="dialogVisible1">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="value1">
                        <el-option
                            v-for="item in options1"
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
            <el-table :data="gridData1" border>
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
                <el-button @click="inforbox=true">添加</el-button>
            </div>
        </el-dialog>
        <!--商品信息--信息框-->
        <el-dialog title="商品信息--信息框" :visible.sync="inforbox" class="spxx-xxk">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        所属分类：
                        <el-row>
                            <el-col>
                                <el-form-item label="商品名称" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="商品编号">
                                    <el-input v-model="ruleForm.num"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-checkbox v-model="checked" style="padding: 5px;">编号递增</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="简名">
                                    <el-input v-model="ruleForm.sname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="拼音码">
                                    <el-input v-model="ruleForm.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="品牌">
                                    <el-input v-model="ruleForm.brand"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产地">
                                    <el-input v-model="ruleForm.place"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="规格">
                                    <el-input v-model="ruleForm.format"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="型号">
                                    <el-input v-model="ruleForm.model"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="重量(kg)">
                                    <el-input v-model="ruleForm.weight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="长度">
                                    <el-input v-model="ruleForm.length"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="宽度">
                                    <el-input v-model="ruleForm.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="高度">
                                    <el-input v-model="ruleForm.height"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="供货信息">
                                    <el-input v-model="ruleForm.goodsinfor"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="参考成本价(基本单位)">
                                    <el-input v-model="ruleForm.ckcbj"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注">
                                    <el-input v-model="ruleForm.note"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="售价管理" name="second" class="sjgl">
                    <el-table :data="tableData2" border style="width: 100%" >
                        <el-table-column prop="colth" label="" width="150"></el-table-column>
                        <el-table-column prop="name" label="单位名称" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="reltsp" label="单位关系" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code" label="条码" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sale" label="特价" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="零售价" width="100">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price1" label="预设售价1" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price2" label="预设售价2" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price3" label="预设售价3" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price4" label="预设售价4" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price5" label="预设售价5" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price6" label="预设售价6" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price7" label="预设售价7" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price8" label="预设售价8" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price9" label="预设售价9" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price10" label="预设售价10" width="120">
                            <template scope="scope">
                                <el-input></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="商品图片管理" name="third" class="sptpgl">
                    <span>图片大小不能超过500kb,格式必须为jpg,gif,png,bmp,建议分辨率为240*280</span>
                    <el-row>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button><span style="color:red;">头图</span>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="box">
                                <img src="">
                                <el-input type="file" size="small"></el-input>
                                <el-input size="small" placeholder="请输入图片名称"></el-input>
                                <el-button size="small">删除</el-button>
                                <el-button size="small">向下</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="xzspxx('ruleForm')">保存并新增</el-button>
                <el-button @click="inforbox = false">保存并关闭</el-button>
                <el-button @click="inforbox = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="商品套餐选择框" :visible.sync="dialogVisible2">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
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
                <el-col :span="5">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="gridData2" border>
                <el-table-column property="date" label="套餐编号"></el-table-column>
                <el-table-column property="name" label="套餐名称"></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button @click="xztcDialog=true">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增套餐" :visible.sync="xztcDialog">
            <el-form label-width="70px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="套餐名称">
                            <el-input v-model="xztcDialogData.tcmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="套餐编码">
                            <el-input v-model="xztcDialogData.tcbm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="套餐条码">
                            <el-input v-model="xztcDialogData.tctm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="套餐打印方式" label-width="100px">
                            <el-select v-model="xztcDialogData.dyfs">
                                <el-option label="按套餐明细打印" value="1"></el-option>
                                <el-option label="按套餐名打印" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="套餐类型">
                            <el-select v-model="xztcDialogData.tclx">
                                <el-option label="组合套餐" value="1"></el-option>
                                <el-option label="3c搭售包" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input v-model="xztcDialogData.bz"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="   ">
                            <el-checkbox v-model="xztcDialogData.checked">备选项</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="xztcTable" border>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="tcbh" label="套餐商品编号" width="130px"></el-table-column>
                <el-table-column prop="tcmc" label="套餐商品名称" width="130px"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="number" label="数量"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column prop="money" label="金额"></el-table-column>
                <el-table-column label="参与库存同步" type="selection" width="55"></el-table-column>
                <el-table-column prop="jeft" label="成交金额分摊" width="130px"></el-table-column>
                <el-table-column prop="ftbl" label="分摊比例"></el-table-column>
                <el-table-column prop="zt" label="状态"></el-table-column>
                <el-table-column prop="unit" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>套餐售价：<span>0</span></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="xztcDialog = false">保存</el-button>
                <el-button type="primary" @click="xztcDialog = false">保存并继续</el-button>
                <el-button type="primary" @click="xztcDialog = false">退出</el-button>
            </div>
        </el-dialog>
        <el-dialog title="会员选择" :visible.sync="dialogVisible3">
            <el-form label-width="70px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="会员名称">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="电话">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="卡号">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-button>查询</el-button>
                </el-row>
            </el-form>
            <el-table :data="gridData2" border>
                <el-table-column property="num" label="会员编号" width="100"></el-table-column>
                <el-table-column property="name" label="会员名"></el-table-column>
                <el-table-column property="phone" label="电话"></el-table-column>
                <el-table-column property="id" label="证件号码" width="100"></el-table-column>
                <el-table-column property="cardnum" label="会员卡号" width="100"></el-table-column>
                <el-table-column property="lx" label="会员卡类型" width="120"></el-table-column>
                <el-table-column property="zk" label="折扣"></el-table-column>
                <el-table-column property="fkrq" label="发卡日期" width="100"></el-table-column>
                <el-table-column property="dqrq" label="到期日期" width="100"></el-table-column>
                <el-table-column property="zhcxye" label="账户储蓄余额" width="130"></el-table-column>
                <el-table-column property="wjzczxf" label="未记帐储值消费" width="140"></el-table-column>
                <el-table-column property="jf" label="积分"></el-table-column>
                <el-table-column property="state" label="状态"></el-table-column>
                <el-table-column property="tip" label="备注"></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button >查看会员基本信息</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
            </div>
        </el-dialog>
        <el-dialog title="请输入会员名称或卡号或电话号码" :visible.sync="hykDialog" size="mini">
            <el-input></el-input>
            <div class="hykfooter">
                <el-button>确定</el-button>
                <el-button>取消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="零售单据选择" :visible.sync="tdDialog">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="录单时间">
                    <el-select v-model="formInline.region">
                        <el-option label="自定义" value="1"></el-option>
                        <el-option label="今天" value="2"></el-option>
                        <el-option label="昨天" value="3"></el-option>
                        <el-option label="最近三天" value="4"></el-option>
                        <el-option label="最近一周" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="formInline.time1"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="formInline.time2"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="查询条件">
                    <el-select v-model="formInline.cxtj">
                        <el-option label="单据编号" value="1"></el-option>
                        <el-option label="商品条码" value="2"></el-option>
                        <el-option label="商品名称" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table border :data="lsdjTable">
                <el-table-column prop="hh" label="行号"></el-table-column>
                <el-table-column prop="djbh" label="单据编号"></el-table-column>
                <el-table-column prop="ldsj" label="录单时间"></el-table-column>
                <el-table-column prop="ck" label="仓库"></el-table-column>
                <el-table-column prop="yyy" label="营业员(经手人)" width="150"></el-table-column>
                <el-table-column prop="bm" label="部门"></el-table-column>
                <el-table-column prop="gmdw" label="购买单位"></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button>查看</el-button>
                <el-button type="primary" @click="tdDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>快速提单</el-button>
            </div>
        </el-dialog>
        <el-dialog title="[操作员:zhangyue]零售配置" :visible.sync="lspzDialog">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="默认配置" name="first">
                    <el-form label-width="110px">
                        <el-form-item label="仓库">
                            <el-input size="small" icon="more" v-model="lspzForm.ck" :on-icon-click="handleIconClick5"></el-input>
                        </el-form-item>
                        <el-form-item label="购买单位">
                            <el-input size="small" icon="more" v-model="lspzForm.gmdw" :on-icon-click="handleIconClick6"></el-input>
                        </el-form-item>
                        <el-form-item label="营业员(经手人)">
                            <el-input size="small" icon="more" v-model="lspzForm.yyy" :on-icon-click="handleIconClick7"></el-input>
                        </el-form-item>
                        <el-form-item label="部门">
                            <el-input size="small" icon="more" v-model="lspzForm.bm" :on-icon-click="handleIconClick8"></el-input>
                        </el-form-item>
                        <el-form-item label="门店">
                            <el-select v-model="lspzForm.md">
                                <el-option label="区域一" value="1"></el-option>
                                <el-option label="区域二" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收银台">
                            <el-select v-model="lspzForm.syt">
                                <el-option label="区域一" value="1"></el-option>
                                <el-option label="区域二" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                     </el-form>
                    <div class="tip">
                        <p>温馨提示：</p>
                        <p>1.更改门店（仓库），系统将结束当前营业，并使用新的门店开始营业。</p>
                        <p>2.零售结算默认使用【现金】账户。</p>
                        <p>需要使用支付宝扫码支付功能，请到【资料】---【现金银行】绑定授权支付宝账号。</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="录帐配置" name="second">
                    <el-table border :data="lspzTable">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="pzlm" label="配置类名"></el-table-column>
                        <el-table-column prop="hh" label="允许"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="抹零设置规则" name="third">
                    <div class="settip">
                        <el-form label-width="100px">
                            <el-row>
                                <el-col>
                                    <el-form-item label="抹零设置">
                                        <el-select v-model="mlsz">
                                            <el-option label="不处理" value="1"></el-option>
                                            <el-option label="四舍五入" value="2"></el-option>
                                            <el-option label="只入不舍" value="3"></el-option>
                                            <el-option label="只舍不入" value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="保留小数位数">
                                        <el-select v-model="blws">
                                            <el-option label="不处理" value="1"></el-option>
                                            <el-option label="四舍五入" value="2"></el-option>
                                            <el-option label="只入不舍" value="3"></el-option>
                                            <el-option label="只舍不入" value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="举个例子">
                                        <el-col :span="3"><el-input></el-input></el-col>
                                        <el-col :span="1">&nbsp;--></el-col>
                                        <el-col :span="3"><el-input></el-input></el-col>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="settip">
                        <p>收位规则说明:</p>
                        <p>1.四舍五入：8.68四舍五入成8.7；</p>
                        <p>2.只入不舍：8.61只入不舍成8.7.</p>
                        <p>3.只舍不入：8.69只舍不入成8.6.</p>
                        <p>不处理：选择不处理时，小数位数就不允许设置了，8.68就保持为8.68</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="lspzDialog = false">保存</el-button>
                <el-button type="primary" @click="lspzDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="快捷键查看" :visible.sync="kjjDialog">
            <el-row>
                <el-col :span="2">条码录入</el-col>
                <el-col :span="6"><el-input v-model="kjj.tmlr">Enter</el-input></el-col>
                <el-col :span="2" :offset="1">小票配置</el-col>
                <el-col :span="6"><el-input v-model="kjj.xppz">F7</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">选择商品</el-col>
                <el-col :span="6"><el-input v-model="kjj.xzsp">Alt+1</el-input></el-col>
                <el-col :span="2" :offset="1">删除商品</el-col>
                <el-col :span="6"><el-input v-model="kjj.scsp">Shift+Delete</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">切换赠品</el-col>
                <el-col :span="6"><el-input v-model="kjj.qhzp">F9</el-input></el-col>
                <el-col :span="2" :offset="1">修改序列号</el-col>
                <el-col :span="6"><el-input v-model="kjj.xgxlh">Alt+U</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">快捷键</el-col>
                <el-col :span="6"><el-input v-model="kjj.kjj">Alt+K</el-input></el-col>
                <el-col :span="2" :offset="1">修改数量</el-col>
                <el-col :span="6"><el-input v-model="kjj.xgsl">Alt+B</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">修改单价</el-col>
                <el-col :span="6"><el-input v-model="kjj.xgdj">Alt+N+</el-input></el-col>
                <el-col :span="2" :offset="1">修改折扣</el-col>
                <el-col :span="6"><el-input v-model="kjj.xgzk">Alt+M</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">单据结算</el-col>
                <el-col :span="6"><el-input v-model="kjj.djjs">Ctrl+Enter</el-input></el-col>
                <el-col :span="2" :offset="1">挂单</el-col>
                <el-col :span="6"><el-input v-model="kjj.gd">Alt+2</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">提单/调单</el-col>
                <el-col :span="6"><el-input v-model="kjj.tdtd">Alt+3</el-input></el-col>
                <el-col :span="2" :offset="1">作废单据</el-col>
                <el-col :span="6"><el-input v-model="kjj.zfdj">Alt+4</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">钱箱配置</el-col>
                <el-col :span="6"><el-input v-model="kjj.qxpz">Alt+8</el-input></el-col>
                <el-col :span="2" :offset="1">使用会员卡</el-col>
                <el-col :span="6"><el-input v-model="kjj.syhyk">F2</el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2">零售配置</el-col>
                <el-col :span="6"><el-input v-model="kjj.lspz">Alt+9</el-input></el-col>
                <el-col :span="4" :offset="1">结算金额切换</el-col>
                <el-col :span="6"><el-input v-model="kjj.jsjeqh">Shift+Tab</el-input></el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="kjjDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="业务员选择框" :visible.sync="ywyxzDialog">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="ywyDialogData.ywyfilter">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按编号过滤" value="2"></el-option>
                        <el-option label="按全名过滤" value="3"></el-option>
                        <el-option label="按拼音码过滤" value="4"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="ywyDialogData.tableData" border>
                <el-table-column property="num" label="职员编号" ></el-table-column>
                <el-table-column property="name" label="职员名称" ></el-table-column>
                <el-table-column property="part" label="所属部门" ></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button type="primary" @click="ywyxzDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button @click="nbzyxxkDialog=true">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog title="部门选择框" :visible.sync="bmDialog" size="tiny">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="6" style="margin-right: 10px;">
                    <el-select v-model="bmDialogData.ywyfilter">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按全名过滤" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="bmDialogData.tableData" border>
                <el-table-column property="fullname" label="部门全名" ></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button type="primary" @click="bmDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
            </div>
        </el-dialog>
        <el-dialog title="往来单位[客户]选择框" :visible.sync="wldwkhDialog">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="wldwkhDData.ywyfilter">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按编号过滤" value="2"></el-option>
                        <el-option label="按全名过滤" value="3"></el-option>
                        <el-option label="按简名过滤" value="4"></el-option>
                        <el-option label="按拼音码过滤" value="5"></el-option>
                        <el-option label="按手机电话过滤" value="6"></el-option>
                        <el-option label="按电子邮件过滤" value="7"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="wldwkhDData.tableData" border>
                <el-table-column property="num" label="单位编号" ></el-table-column>
                <el-table-column property="unitname" label="单位名称" ></el-table-column>
                <el-table-column property="lowname" label="单位简名" ></el-table-column>
                <el-table-column property="phone" label="电话" ></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button disabled>查看单位基本信息</el-button>
                <el-button disabled>进入下级</el-button>
                <el-button disabled>返回上级</el-button>
                <el-button type="primary" @click="wldwkhDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button type="primary" @click="wldwxxkDialog=true">添加</el-button>
            </div>
        </el-dialog>
        <!-- 往来单位-信息框 -->
        <el-dialog class="wldwMessage" title="往来单位-信息框" :visible.sync="wldwxxkDialog">
            <el-form label-width="100px" :rules="wldwrule" ref="wldwForm" :model="wldwForm" class="demo-form-inline">
                <el-row>所属分类</el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="单位名称" prop="name">
                            <el-input v-model="wldwForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="单位名称编号" prop="bh" label-width="110px">
                            <el-input v-model="wldwForm.bh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="简名">
                            <el-input v-model="wldwForm.jm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="拼音码">
                            <el-input v-model="wldwForm.pym"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型">
                            <el-select v-model="wldwForm.select">
                                <el-option label="未设置" value="0"></el-option>
                                <el-option label="供货商" value="1"></el-option>
                                <el-option label="客户" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="税号">
                            <el-input v-model="wldwForm.sh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="税率（%）">
                            <el-input v-model="wldwForm.sl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="wldwForm.lxr"></el-input>
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
                            <el-input v-model="wldwForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电子邮件">
                            <el-input v-model="wldwForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价格等级">
                            <el-select v-model="wldwForm.dj">
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
                            <el-input v-model="wldwForm.khyh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号">
                            <el-input v-model="wldwForm.yhzh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="wldwForm.bz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveAddDw('wldwForm')">保存并新增</el-button>
                <el-button @click="saveClose()">保存并关闭</el-button>
                <el-button @click="wldwxxkDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 地址弹出框 -->
        <el-dialog class="addressDialog" size="" title="地址" :visible.sync="addrDialog">
            <el-input placeholder="请输入内容" v-model="selectAddress">
                <el-select v-model="inputAddress" slot="prepend">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="收货人" value="2"></el-option>
                    <el-option label="手机号码" value="3"></el-option>
                    <el-option label="电话号码" value="4"></el-option>
                    <el-option label="邮政编码" value="5"></el-option>
                    <el-option label="收货地址" value="6"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="addressData" border>
                <el-table-column property="shr" label="收货人" width="150"></el-table-column>
                <el-table-column property="phone" label="手机号码" width="200"></el-table-column>
                <el-table-column property="telphone" label="电话号码" width="180"></el-table-column>
                <el-table-column property="yzbm" label="邮政编码" width="180"></el-table-column>
                <el-table-column property="province" label="省" width="60"></el-table-column>
                <el-table-column property="city" label="市" width="60"></el-table-column>
                <el-table-column property="district" label="区" width="60"></el-table-column>
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
            <div class="btn-group" style="float: right">
                <el-button type="primary" @click="addrDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button @click="maddrDialog=true">新增</el-button>
                <el-button>修改</el-button>
                <el-button>删除</el-button>
            </div>
        </el-dialog>
        <!--地址添加-->
        <el-dialog title="地址" :visible.sync="maddrDialog" size="miny">
            <el-form label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人">
                            <el-input v-model="maddrDialogData.shr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <el-input v-model="maddrDialogData.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="邮政编码">
                            <el-input v-model="maddrDialogData.post"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="selectedOptions" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="收货地址">
                        <el-input v-model="maddrDialogData.shdz"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="maddrDialog = false">保存并关闭</el-button>
                <el-button type="primary" @click="maddrDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="仓库选择框" :visible.sync="ckDialog">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="ckDialogData.ywyfilter">
                        <el-option label="快速查询" value="1"></el-option>
                        <el-option label="按编号过滤" value="2"></el-option>
                        <el-option label="按全名过滤" value="3"></el-option>
                        <el-option label="按拼音码过滤" value="4"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="ckDialogData.tableData" border>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="unitnum" label="单位编号" ></el-table-column>
                <el-table-column property="fullname" label="单位全名" ></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button type="primary" @click="ckDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button @click="ckxxDialog = true">添加</el-button>
            </div>
        </el-dialog>
        <el-dialog title="仓库信息-信息框" :visible.sync="ckxxDialog" size="tiny">
            <el-form label-width="90px">
                <div class="content1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="仓库类型">
                                <el-select v-model="ckxxDialogData.zklx">
                                    <el-option label="自有仓" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="仓库名称">
                                <el-input v-model="ckxxDialogData.ckmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="仓库编号">
                                <el-input v-model="ckxxDialogData.ckbh"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="  ">
                                <el-checkbox v-model="ckxxDialogData.checked">编号递增</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="仓库简名">
                                <el-input v-model="ckxxDialogData.ckjm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="拼音码">
                                <el-input v-model="ckxxDialogData.pym"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="备注">
                                <el-input v-model="ckxxDialogData.bz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>联系信息【将作为您物流单上的寄件人信息打印出来,请确保信息准确】</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="ckxxDialogData.lxr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="ckxxDialogData.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮政编码">
                                <el-input v-model="ckxxDialogData.code"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="selectedOptions" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="发货地址">
                            <el-input v-model="ckxxDialogData.addr"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button>保存并新增</el-button>
                <el-button @click="ckxxDialog = false">保存并关闭</el-button>
                <el-button type="primary" @click="ckxxDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="内部职员--信息框" :visible.sync="nbzyxxkDialog" size="miny">
            <el-form label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="职员名称">
                            <el-input v-model="nbzyDialogData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员简名">
                            <el-input v-model="nbzyDialogData.sname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门">
                            <el-input v-model="nbzyDialogData.part" icon="more" :on-icon-click="nbzyIconClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员编号">
                            <el-input v-model="nbzyDialogData.num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input v-model="nbzyDialogData.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拼音码">
                            <el-input v-model="nbzyDialogData.pym"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="nbzyDialogData.bz"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button>保存并新增</el-button>
                <el-button @click="nbzyxxkDialog = false">保存并关闭</el-button>
                <el-button type="primary" @click="nbzyxxkDialog = false">关闭</el-button>
            </div>
        </el-dialog>
        <div>
            <el-row>
                <el-col :span="8">
                    <span class="tip">注：请进入"零售配置"录入门店(仓库)后再进行零售开单！</span>
                </el-col>
                <el-col :span="8">
                    <span>条码/序列号：</span><el-input @keyup.enter.native="showkcspDialog($event)" style="width: 75%;" placeholder="[Enter]后扫描,也支持快速查询"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="dialogVisible1 = true">选择商品 Alt+1</el-button>
                    <el-button @click="dialogVisible2 = true">选择套餐 Alt+6</el-button>
                    <el-button @click="dialogVisible3 = true">选择会员</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-row>
                <el-col :span="20" class="goodsTable">
                    <el-table border :data="tableData">
                        <el-table-column prop="spbh" label="商品编号" width="100"></el-table-column>
                        <el-table-column prop="spmc" label="商品名称"  width="200"></el-table-column>
                        <el-table-column prop="tm" label="条码" width="100"></el-table-column>
                        <el-table-column prop="gg" label="规格" width="200"></el-table-column>
                        <el-table-column prop="xh" label="型号" width="200"></el-table-column>
                        <el-table-column prop="cd" label="产地" width="100"></el-table-column>
                        <el-table-column prop="sl" label="数量" width="100"></el-table-column>
                        <el-table-column prop="dw" label="单位" width="100"></el-table-column>
                        <el-table-column prop="dj" label="单价" width="100"></el-table-column>
                        <el-table-column prop="je" label="金额" width="100"></el-table-column>
                        <el-table-column prop="zk" label="折扣" width="100"></el-table-column>
                        <el-table-column prop="zhdj" label="折后单价" width="100"></el-table-column>
                        <el-table-column prop="zhje" label="折后金额" width="100"></el-table-column>
                        <el-table-column prop="zt" label="状态" width="100"></el-table-column>
                        <el-table-column label="操作" width="120">
                            <template scope="scope">
                            	<el-button
                                    size="mini"
                                    @click.native.prevent="deleteRow(scope.$index, tableData)">选中</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="4" class="kjj">
                    <div><el-button @click="hykDialog = true">会员卡 F2</el-button></div>
                    <div><el-button>挂单 Alt+2</el-button></div>
                    <div><el-button @click="tdDialog = true">提单 Alt+3</el-button></div>
                    <div><el-button>作废单据 Alt+4</el-button></div>
                    <div><el-button>钱箱配置 Alt+8</el-button></div>
                    <div><el-button>小票配置 F7</el-button></div>
                    <div><el-button @click="lspzDialog = true">零售配置 Alt+9</el-button></div>
                    <div><el-button @click="kjjDialog = true">快捷键 Alt+k</el-button></div>
                </el-col>
            </el-row>
        </div>
        <div class="price-num">
            <ul>
                <li>数量:<span>38</span></li>
                <li>折前金额:<span>73707.6</span></li>
                <li>金额:<span>70027.6</span></li>
                <li>整单优惠:<span>3680</span></li>
            </ul>
        </div>
        <div style="float: right;">
            <el-button>结算 Ctrl+Enter</el-button>
        </div>
        <el-form label-width="110px">
            <el-row>
                <el-col :span="4">
                    <el-form-item label="营业员(经手人)">
                        <el-input size="small" icon="more" v-model="form.jsr" :on-icon-click="handleIconClick1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="部门">
                        <el-input size="small" icon="more" v-model="form.bm" :on-icon-click="handleIconClick2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="购买单位">
                        <el-input size="small" icon="more" v-model="form.gmdw" :on-icon-click="handleIconClick3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="仓库">
                        <el-input size="small" icon="more" v-model="form.ck" :on-icon-click="handleIconClick4"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="门店">
                        <el-select v-model="form.md" size="small">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="收银台">
                        <el-select v-model="form.syt" size="small">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="编号">
                        <el-input v-model="form.bh" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="录单时间">
                        <el-select v-model="form.ldsj" size="small">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import './less/style.less'
    import city from '../../../../assets/js/city.js'
    export default{
        data:function(){
            return{
                cityOptions:city,
                selectedOptions:['','',''],
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
                hykDialog: false,
                tdDialog: false,
                lspzDialog: false,
                kjjDialog: false,
                ywyxzDialog: false,
                bmDialog: false,
                wldwkhDialog: false,
                ckDialog: false,
                nbzyxxkDialog: false,
                wldwxxkDialog: false,
                addrDialog: false,
                maddrDialog: false,
                ckxxDialog: false,
                inforbox:false,
                xztcDialog:false,
                checked:'false',
                activeName: 'first',
                selectAddress:'',
                inputAddress:'快速查询',
                mlsz:'',
                blws:'',
                form:{
                    jsr:'',
                    bm:'',
                    gmdw:'',
                    ck:'',
                    md:'',
                    syt:'',
                    bh:'',
                    ldsj:''
                },
                formInline: {
                    time1:'',
                    time2:'',
                    user: '',
                    region: ''
                },
                lspzForm:{
                    ck:'',
                    gmdw:'',
                    yyy:'',
                    bm:'',
                    md:'',
                    syt:''
                },
                tableData:[{
                    spbh:'0001',
                    spmc:'iphone 6s plus',
                    tm:'0001',
                    gg:'32G全网通4G手机',
                    xh:'6s plus',
                    cd:'中国大陆',
                    sl:'10',
                    dw:'部',
                    dj:'3788',
                    je:'37880',
                    zk:'0.95',
                    zhdj:'3598',
                    zhje:'35980',
                    zt:'库存充足'
                },{
                    spbh:'0002',
                    spmc:'vivo x20 plus',
                    tm:'0002',
                    gg:'官方标配64G裸机',
                    xh:'x20 plus',
                    cd:'中国大陆',
                    sl:'5',
                    dw:'部',
                    dj:'2799',
                    je:'13995',
                    zk:'0.95',
                    zhdj:'2659',
                    zhje:'13295',
                    zt:'库存充足'
                },{
                    spbh:'1001',
                    spmc:'品胜 苹果快充版数据/充电线',
                    tm:'1001',
                    gg:'1.5米 白色 苹果手机5/5s/6/6s/Plus/7/7Plus',
                    xh:'苹果手机',
                    cd:'中国大陆',
                    sl:'5',
                    dw:'条',
                    dj:'25.90',
                    je:'129.5',
                    zk:'1',
                    zhdj:'25.90',
                    zhje:'129.5',
                    zt:'库存充足'
                },{
                    spbh:'1002',
                    spmc:'亿色(ESR)苹果7&8 Plus手机壳 ',
                    tm:'1002',
                    gg:'5.5英寸手机套 透明轻薄硅胶防摔软壳 ',
                    xh:' iPhone7 plus&8 Plus手机壳',
                    cd:'中国大陆',
                    sl:'10',
                    dw:'个',
                    dj:'11.11',
                    je:'111.1',
                    zk:'1',
                    zhdj:'11.11',
                    zhje:'111.1',
                    zt:'库存充足'
                },{
                    spbh:'0003',
                    spmc:'三星 Galaxy S7',
                    tm:'0003',
                    gg:'4GB+32GB 铂光金',
                    xh:'三星 Galaxy S7',
                    cd:'中国大陆',
                    sl:'8',
                    dw:'部',
                    dj:'2699',
                    je:'21592',
                    zk:'0.95',
                    zhdj:'2564',
                    zhje:'20512',
                    zt:'库存充足'
                }],
                tableData2: [{
                    colth: '基本单位',
                    name: '单位名称',
                    reltsp: '单位关系',
                    code: '条码',
                    sale: '特价',
                    price: '零售价',
                    price1:'预设售价1',
                    price2:'预设售价2',
                    price3:'预设售价3',
                    price4:'预设售价4',
                    price5:'预设售价5',
                    price6:'预设售价6',
                    price7:'预设售价7',
                    price8:'预设售价8',
                    price9:'预设售价9',
                    price10:'预设售价10'
                }, {
                    colth: '辅助单位1'
                },{
                    colth: '辅助单位2'
                }],
                lspzTable:[],
                options1: [{
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
                value1:'快速查询',
                options2: [{
                    value: '选项1',
                    label: '按套餐编码查询'
                },{
                    value: '选项2',
                    label: '按套餐名称查询'
                }],
                value2:'按套餐编码查询',
                gridData1:[],
                gridData2:[],
                lsdjTable:[],
                kjj:{
                    tmlr:'Enter',
                    xppz:'F7',
                    xxsp:'Alt+1',
                    scsp:'Shift+Delete',
                    qhzp:'F9',
                    xgxlh:'Alt+U',
                    kjj: 'Alt+K',
                    xgsl:'Alt=B',
                    xgdj:'Alt+N',
                    xgzk:'Alt+M',
                    djjs:'Ctrl+Enter',
                    gd:'Alt+2',
                    tdtd:'Alt+3',
                    zfdj:'Alt+4',
                    qxpz:'Alt+8',
                    syhyk:'F2',
                    lspz:'Alt+9',
                    jsjeqh:'Shift+Tab'
                },
                ywyDialogData:{
                    ywyfilter:'快速查询',
                    tableData:[]
                },
                bmDialogData:{
                    ywyfilter:'快速查询',
                    tableData:[]
                },
                wldwkhDData:{
                    ywyfilter:'快速查询',
                    tableData:[]
                },
                ckDialogData:{
                    ywyfilter:'快速查询',
                    tableData:[]
                },
                nbzyDialogData:{
                    name:'',
                    sname:'',
                    part:'',
                    num:'',
                    phone:'',
                    pym:'',
                    bz:''
                },
                wldwrule: {
                    name: [
                        { required: true, message: '请输入单位名称', trigger: 'blur' },
                    ],
                    bh:[{required: true, message: '请输入单位编号', trigger: 'blur'}]
                },
                wldwForm:{
                    name:'',
                    bh:'',
                    jm:'',
                    pym:'',
                    select:'未设置',
                    sh:'',
                    sl:'',
                    lxr:'',
                    telphone:'',
                    phone:'',
                    email:'',
                    dj:'预设售价1',
                    address:'',
                    khyh:'',
                    yhzh:'',
                    bz:''
                },
                addressData:[
                    {
                        'shr':'',
                        'phone':'',
                        'telphone':'',
                        'yzbm':'',
                        'province':'',
                        'city':'',
                        'district':'',
                        'address':''
                    }
                ],
                maddrDialogData:{
                    shr:'',
                    phone:'',
                    post:'',
                    shdz:''
                },
                ckxxDialogData:{
                    cklx:'自有仓',
                    ckmc:'',
                    checked:'false'
                },
                ruleForm: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                },
                xztcDialogData:{
                    tcmc:'',
                    tcbm:'',
                    tctm:'',
                    tcdyfs:'',
                    tclx:'',
                    bz:'',
                    checked:true
                },
                xztcTable:[
                    {
                        tcbh:'',
                        tcbm:'',
                        tctm:''
                    }
                ]
            }
        },
        mounted(){
            let that=this;
            $(document).keydown(function(e){
                if(e.keyCode == 113){//f2
                    that.hykDialog=true;
                }
                if (e.keyCode == 18 && e.keyCode == 97) {
                    console.log("你按下了Alt+1");
                    that.dialogVisible1=true;
                }
                if (e.keyCode == 18 && e.keyCode == 102) {
                    console.log("你按下了Alt+6");
                    that.dialogVisible2=true;
                }
                if (e.keyCode == 18 && e.keyCode == 105) {
                    console.log("你按下了Alt+9");
                    that.lspzDialog=true;
                }
            });
        },
        methods:{
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
            },
            handleIconClick1(ev) {
                this.ywyxzDialog=true;
            },
            handleIconClick2(ev) {
                this.bmDialog=true;
            },
            handleIconClick3(ev) {
                this.wldwkhDialog=true;
            },
            handleIconClick4(ev) {
                //console.log(ev);
            },
            handleIconClick5(ev) {
                this.ckDialog=true;
            },
            handleIconClick6(ev) {
                this.wldwkhDialog=true;
            },
            handleIconClick7(ev) {
                this.ywyxzDialog=true;
            },
            handleIconClick8(ev) {
                this.bmDialog=true;
            },
            nbzyIconClick(ev){
                this.bmDialog=true;
            },
            onSubmit() {
                console.log('submit!');
            },
            handleClick(tab, event) {
               // console.log(tab, event);
            },
            showkcspDialog(ev){
                this.dialogVisible1=true;//库存商品选择
            },
            addressIconClick(){
                this.addrDialog = true;
            },
            handleChange(value){
                //console.log(value);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style>
</style>
