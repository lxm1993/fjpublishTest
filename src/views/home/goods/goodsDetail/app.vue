<template>
    <div class="spxx">
        <el-dialog title="添加分类" size="tiny" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="分类名称">
                    <el-input v-model="addData.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd()">确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑分类-->
        <el-dialog title="编辑分类" size="tiny" :visible.sync="flEditDialog">
            <el-form>
                <el-form-item label="分类名称">
                    <el-input v-model="editData.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="flEditDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
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
                <el-button @click="submitClose('ruleForm')">保存并关闭</el-button>
                <el-button @click="inforbox = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--往来单位  查询-->
        <el-dialog title="查询" :visible.sync="queryDialog" size="tiny">
            往来单位<el-input
            icon="more"
            v-model="dialogwldw"
            :on-icon-click="handleIconClick">
        </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button size="small">确定</el-button>
                <el-button size="small" @click="queryDialog=false">关闭</el-button>
            </div>
        </el-dialog>
        <!--往来单位选择框-->
        <el-dialog title="往来单位选择框" :visible.sync="wldwxzkDialog">
            <el-row style="margin-bottom: 10px;">
                <el-col :span="4" style="margin-right: 10px;">
                    <el-select v-model="value1">
                        <el-option
                            v-for="item in options"
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
                <el-table-column property="num" label="单位编号" width="120"></el-table-column>
                <el-table-column property="name" label="单位名称" width="120"></el-table-column>
                <el-table-column property="sname" label="单位简名" width="120"></el-table-column>
                <el-table-column property="phone" label="电话"></el-table-column>
                <el-table-column property="mobilephone" label="手机"></el-table-column>
                <el-table-column property="email" label="电子邮件" width="120"></el-table-column>
                <el-table-column property="money" label="应收金额" width="120"></el-table-column>
                <el-table-column property="pay" label="应付金额" width="120"></el-table-column>
                <el-table-column property="xyed" label="信用额度" width="120"></el-table-column>
                <el-table-column property="kyed" label="可用额度" width="120"></el-table-column>
            </el-table>
            <div class="btn-group" style="float: right">
                <el-button>查看单位基本信息</el-button>
                <el-button>进入下级</el-button>
                <el-button>返回上级</el-button>
                <el-button type="primary" @click="wldwxzkDialog = false">关闭</el-button>
            </div>
            <div class="btn-group">
                <el-button>选中</el-button>
                <el-button @click="wldwxxkDialog=true">添加</el-button>
            </div>
        </el-dialog>
        <!-- 往来单位-信息框 -->
        <el-dialog class="wldwMessage" title="往来单位-信息框" :visible.sync="wldwxxkDialog">
            <el-form label-width="100px" :label-position="labelPosition" :rules="wldwrule" ref="wldwForm" :model="wldwForm" class="demo-form-inline">
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
        <!--编辑-商品信息--信息框-->
        <el-dialog title="商品信息--信息框" :visible.sync="editinforbox">
            <el-tabs v-model="editActiveName" type="card" @tab-click="editHandleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
                        所属分类：
                        <el-row>
                            <el-col>
                                <el-form-item label="商品名称" prop="name">
                                    <el-input v-model="editForm.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="商品编号">
                                    <el-input v-model="editForm.num"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-checkbox v-model="checked" style="padding: 5px;">编号递增</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="简名">
                                    <el-input v-model="editForm.sname"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="拼音码">
                                    <el-input v-model="editForm.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="品牌">
                                    <el-input v-model="editForm.brand"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产地">
                                    <el-input v-model="editForm.place"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="规格">
                                    <el-input v-model="editForm.format"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="型号">
                                    <el-input v-model="editForm.model"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="重量(kg)">
                                    <el-input v-model="editForm.weight"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="长度">
                                    <el-input v-model="editForm.length"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="宽度">
                                    <el-input v-model="editForm.width"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="高度">
                                    <el-input v-model="editForm.height"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="供货信息">
                                    <el-input v-model="editForm.goodsinfor"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="参考成本价(基本单位)">
                                    <el-input v-model="editForm.ckcbj"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注">
                                    <el-input v-model="editForm.note"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="售价管理" name="second" class="sjgl">
                    <el-table :data="editTable" border style="width: 100%" >
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
                <el-button @click="editspxx('editForm')">保存并关闭</el-button>
                <el-button @click="editinforbox = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--dialog end-->
        <div class="left" v-if="leftFlag">
            <h5>商品分类</h5>
            <div>
                <el-input  placeholder="输入类别名称进行定位"></el-input>
                <el-button>定位</el-button>
                <div class="con">
                    <!--<el-tree>
                        :data="treeData"
                        :props="defaultProps"
                        node-key="id"
                        highlight-current
                        :expand-on-click-node="false"
                        :render-content="renderContent">
                    </el-tree>-->
                    <el-tree
                        :props="props"
                        :load="loadNode"
                        lazy
                        highlight-current
                        :expand-on-click-node="false"
                        :render-content="renderContent"
                        @check-change="handleCheckChange">
                    </el-tree>

                </div>
                <el-button class="fl-btn">编辑分类</el-button>
            </div>
        </div>
        <div class="right">
            <h5 style="color:red">当前商品所属分类:</h5>
            <i class="goleft" :class="{true:'el-icon-arrow-left',false:'el-icon-arrow-right goright'}[leftFlag]" @click="goLeft()"></i>
            <div>
                <el-input placeholder="请输入内容" v-model="input">
                    <el-select v-model="filter1" slot="prepend" placeholder="请选择">
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
                <div class="filter">
                    过滤
                    <el-select v-model="filter2" slot="prepend" placeholder="请选择">
                        <el-option label="仅显示正常商品" value="1"></el-option>
                        <el-option label="仅显示停用商品" value="2"></el-option>
                        <el-option label="显示全部商品" value="3"></el-option>
                    </el-select>
                    <a href="javascript:void(0)">刷新</a>
                </div>
            </div>

            <div class="con">
                <el-table :data="tableData" border style="width: 100%" max-height="580">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="proSn" label="商品编号" width="150"></el-table-column>
                    <el-table-column prop="proName" label="商品名称" width="120"></el-table-column>
                    <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
                    <el-table-column prop="model" label="型号" width="100"></el-table-column>
                    <el-table-column prop="spec" label="规格" width="200"></el-table-column>
                    <el-table-column prop="unit" label="单位" width="100"></el-table-column>
                    <!--<el-table-column prop="numbers" label="初期数量" width="120"></el-table-column>-->
                    <!--<el-table-column prop="cost" label="初期成本" width="120"></el-table-column>-->
                    <!--<el-table-column prop="money" label="初期金额" width="120"></el-table-column>-->
                    <el-table-column prop="weight" label="重量"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <!--<el-table-column prop="price" label="预设售价" width="120"></el-table-column>-->
                    <!--<el-table-column prop="ways" label="创建方式" width="120"></el-table-column>-->
                    <el-table-column prop="comment" label="备注" width="300"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="btn-group">
                <el-button @click="inforbox = true">新增</el-button>
                <el-button >停用</el-button>
                <!--<el-button >删除</el-button>-->
                <el-button @click="queryDialog = true">往来单位商品编号设置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import './less/style.less'
    import service from './service/getData.js'
    import city from '../../../../assets/js/city.js'
    let id = 1000;
    export default {
        components: {

        },
        data: function(){
            return{
                props: {
                   // label: 'typeName',
                    label: 'name',
                    children: 'zones'
                },
                count: 1,
                cityOptions:city,
                selectedOptions:['','',''],
                dialogFormVisible: false,
                flEditDialog: false,
                inforbox:false,
                editinforbox:false,
                queryDialog:false,
                wldwxzkDialog:false,
                wldwxxkDialog:false,
                addrDialog:false,
                maddrDialog:false,
                activeName: 'first',
                editActiveName: 'first',
                checked:'false',
                myTreeStore:'',
                myTreeData:'',
                dialogwldw:'',
                labelPosition:"right",
                selectAddress:'',
                inputAddress:'快速查询',
                value1:'快速查询',
                tableId:'',
                options: [{
                    value: '选项1',
                    label: '快速查询'
                }, {
                    value: '选项2',
                    label: '按编号过滤',
                    disabled: true
                }, {
                    value: '选项3',
                    label: '按全名过滤'
                }, {
                    value: '选项4',
                    label: '按简名过滤'
                }, {
                    value: '选项5',
                    label: '按拼音码过滤'
                },{
                    value: '选项5',
                    label: '按手机电话过滤'
                },{
                    value: '选项5',
                    label: '按电子邮件过滤'
                }],
                addData:{
                    name:'',
                },
                editData:{
                    name:''
                },
                leftFlag:true,
                filter1:'',
                filter2:'',
                input:'',
                treeData: [{
                    id: 1,
                    label: '全部分类',
                    children: [{
                        id: 4,
                        label: '热门推荐',
                        children: [{
                                id: 9,
                                label: 'iPhone'
                            }, {
                                id: 10,
                                label: 'vivo'
                            }, {
                                id: 11,
                                label: '小米'
                        }]
                        },{
                            id: 12,
                            label: '手机通讯',
                            children: [{
                                id: 13,
                                label: '快速充电'
                            }, {
                                id: 14,
                                label: '拍照神器'
                            }, {
                                id: 15,
                                label: '双卡双待'
                            }, {
                                id: 16,
                                label: '指纹识别'
                            }]
                        }
                    ]
                }],
                defaultProps: {
                children: 'children',
                label: 'name'
                },
                tableData: [
                    {
                        proSn:'1001',
                        proName:'小米',
                        brand:'小米',
                        model:'2014501',
                        spec:'32G',
                        unit:'台',
                        weight:'12',
                        status:'1',
                        comment:'小米4电信3G版'
                    },
                    {
                        proSn:'1002',
                        proName:'华为',
                        brand:'华为',
                        model:'20140203',
                        spec:'16G',
                        unit:'台',
                        weight:'13',
                        status:'1',
                        comment:'电信'
                    },
                    {
                        proSn:'1003',
                        proName:'三星',
                        brand:'三星',
                        model:'2016501',
                        spec:'64G',
                        unit:'台',
                        weight:'12',
                        status:'1',
                        comment:'电信3G版'
                    },
                    {
                        proSn:'1004',
                        proName:'魅族',
                        brand:'魅族',
                        model:'2016501',
                        spec:'64G',
                        unit:'台',
                        weight:'12',
                        status:'1',
                        comment:'电信3G版'
                    }
                ],
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
                editTable:[{

                }],
                gridData:[],
                ruleForm: {
                name: ''
                },
                editForm: {
                name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
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
                }
            }
        },
        methods: {
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
            },
             loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ name: '全部分类' }]);
                }else if(node.level === 1){
                    setTimeout(async() => {
                        var treeData;
                        let data = await service.flSp();
                        console.log(data);
                        if(data.code==200){
                            treeData=data.data;
                        }else{
                            treeData=[];
                        }
                        resolve(treeData);
                    }, 500);
                }else{
                    setTimeout(async() => {
                       // console.log(node.data.id);
                        var treeData;
                        let data = await service.flSp({'id':node.data.id});
                        if(data.code==200 && data.data){
                             treeData=data.data;
                        }else{
                            treeData=[];
                        }
                        resolve(treeData);
                    }, 500);
                }
            },
            //tree-----end
            handleIconClick(ev) {
                this.wldwxzkDialog = true;
            },
            async handleEdit(index, row) {
            // console.log(index);
             //console.log(row);//row.num是id
                let data = await service.editSp({'id':row.id});
                if(data.code==200){
                    let formData=data.data;
                    this.editForm={
                        id:formData.id,
                        num:formData.proSn,
                        name:formData.proName,
                        sname:formData.simpleName,
                        code:formData.pinyinCode,
                        place:formData.originPlace,
                        brand:formData.brand,
                        model:formData.model,
                        format:formData.spec,
                        weight:formData.weight,
                        length:formData.length,
                        width:formData.width,
                        height:formData.height,
                        goodsinfor:formData.offerInfo,
                        ckcbj:formData.costPrice,
                        note:formData.comment
                    }
                }

                this.editinforbox=true;
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            editHandleClick(tab, event) {
                console.log(tab, event);
            },
             deleteRow(index, rows) {
                this.$confirm('确定删除此分类?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async() => {
                        let data = await service.deleteSp({'id':rows[index].id});
                        if(data.code==200){
                            rows.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async saveAdd(){
                let id;
                this.myTreeData.id?id=this.myTreeData.id:id=0;
                let data = await service.createFl({'parentId':id,'name':this.addData.name});
                if(data.code==200){
                    this.myTreeStore.append({ name:this.addData.name }, this.myTreeData);
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                }
                //store.append({ id: id++, label: this.form.name, children: [] }, data);
            },
            async saveEdit(){
                let dataEdit = await service.updateFl({'id':this.myTreeData.id,'name':this.editData.name});
                if(dataEdit.code==200){
                    console.log(dataEdit);
                    this.myTreeData.name=this.editData.name;
                    this.flEditDialog=false;
                    this.$message({
                        type: 'success',
                        message: '编辑成功!'
                    });
                }
            },
            append(store, data) {
                this.dialogFormVisible = true;
                this.myTreeStore=store;
                this.myTreeData=data;
               // console.log(store);
                //console.log(data);
            },
            remove(store, data) {
                console.log(data);
                if(data.id){
                    this.$confirm('确定删除此分类?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async() => {
                        let dataDel = await service.deleteFl({'id':data.id});
                        console.log(dataDel);
                        if(dataDel.code==200){
                            store.remove(data);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '根节点不能删除',
                        type: 'warning'
                    });
                }

            //store.remove(data);
            },
            edit(store, data){
                if(data.id){
                    this.flEditDialog=true;
                    this.editData.name=data.name;
                }else{
                    this.$message({
                        showClose: true,
                        message: '根节点不能编辑',
                        type: 'warning'
                    });
                }
                this.myTreeStore=store;
                this.myTreeData=data;
            },
            renderContent(h, { node, data, store }) {
                 return (
                <span>
                <span>
                <span>{node.label}</span>
                </span>
                <span style="float: right; margin-right: 20px ;margin-top:10px;">
                <el-button class="el-icon-edit" size="mini" on-click={ () => this.edit(store, data) }></el-button>
                <el-button class="el-icon-minus" size="mini" on-click={ () => this.remove(store, data) }></el-button>
                <el-button class="el-icon-plus" size="mini" on-click={ () => this.append(store, data) }></el-button>
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
            saveAddDw(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs[formName].resetFields();
                    } else {
                        return false;
                    }
                });
            },
            saveClose(){

            },
            addressIconClick(){
                this.addrDialog = true;
            },
            xzspxx(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data = await service.createSp({
                            'proName':this.ruleForm.name,
                            'proSn':this.ruleForm.num,
                            'brand':this.ruleForm.brand,
                            'simpleName':this.ruleForm.sname,
                            'pinyinCode':this.ruleForm.code,
                            'originPlace':this.ruleForm.place,
                            'spec':this.ruleForm.format,
                            'model':this.ruleForm.model,
                            'weight':this.ruleForm.weight,
                            'length':this.ruleForm.length,
                            'width':this.ruleForm.width,
                            'height':this.ruleForm.height,
                            'offerInfo':this.ruleForm.goodsinfor,
                            'costPrice':this.ruleForm.ckcbj,
                             'comment':this.ruleForm.note
                        });
                        console.log(data);
                        if(data.code==200){
                            this.$refs[formName].resetFields();
                            let data = await service.listSp();
                            if(data.code==200){
                                this.tableData = data.data;
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
            submitClose(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data = await service.createSp({
                            proName: this.ruleForm.name,
                            proSn: this.ruleForm.num,
                            brand: this.ruleForm.brand,
                            simpleName: this.ruleForm.sname,
                            pinyinCode: this.ruleForm.code,
                            originPlace: this.ruleForm.place,
                            spec: this.ruleForm.format,
                            model: this.ruleForm.model,
                            weight: this.ruleForm.weight,
                            length: this.ruleForm.length,
                            width: this.ruleForm.width,
                            height: this.ruleForm.height,
                            offerInfo: this.ruleForm.goodsinfor,
                            costPrice: this.ruleForm.ckcbj,
                            comment: this.ruleForm.note
                        });
                        if (data.code == 200) {
                            this.inforbox = false;
                            let data = await service.listSp();
                            if(data.code==200){
                                this.tableData = data.data;
                            }
                        }
                    } else {
                        return false;
                    }
                })
            },
            editspxx(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data = await service.updateSp({
                            'id':this.editForm.id,
                            'proName':this.editForm.name,
                            'proSn':this.editForm.num,
                            'brand':this.editForm.brand,
                            'simpleName':this.editForm.sname,
                            'pinyinCode':this.editForm.code,
                            'originPlace':this.editForm.place,
                            'spec':this.editForm.format,
                            'model':this.editForm.model,
                            'weight':this.editForm.weight,
                            'length':this.editForm.length,
                            'width':this.editForm.width,
                            'height':this.editForm.height,
                            'offerInfo':this.editForm.goodsinfor,
                            'costPrice':this.editForm.ckcbj,
                            'comment':this.editForm.note
                        });
                        if(data.code==200){
                            this.editinforbox = false;
                            let data = await service.listSp();
                            if(data.code==200){
                                this.tableData = data.data;
                            }
                        }
                    } else {
                        return false;
                    }
                });
            },
            handleChange(value){
                console.log(value);
            }
        },
//        async mounted() {
//            let data = await service.listSp();
//            if(data.code==200){
//                this.tableData = data.data;
//            }
//        }
    }
</script>
