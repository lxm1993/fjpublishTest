<template>
    <div class="xshh">
        <!--录账配置-->
        <el-dialog title="录账配置" size="tiny" :visible.sync="dialogLzpz">
            <el-table :data="lzpzTable" border height="230" style="width: 100%" class="tcTable">
                <el-table-column label="允许" type="selection" width="55"></el-table-column>
                <el-table-column prop="lm" label="配置类名" width="300"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">保存</el-button>
                <el-button @click="dialogLzpz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--新增商品套餐-->
        <el-dialog title="新增套餐" :visible.sync="dialogAddTc">
            <el-form label-width="100px" :label-position="labelPosition" :model="addTcForm" class="demo-form-inline">
                <div class="content1">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="套餐名称">
                                <el-input v-model="addTcForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="套餐编码">
                                <el-input v-model="addTcForm.bm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="套餐条码">
                                <el-input v-model="addTcForm.tm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="套餐打印方式">
                                <el-select v-model="addTcForm.dyfs">
                                    <el-option label="按套餐明细打印" value="0"></el-option>
                                    <el-option label="按套餐名打印" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注">
                                <el-input v-model="addTcForm.bz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <el-table :data="addTcTable" border height="230" style="width: 100%" class="tcTable">
                <el-table-column prop="bm" label="套餐商品编号" width="200">
                    <template scope="scope">
                        <el-input icon="more" v-model="scope.row.bm" :on-icon-click="tcbh"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="套餐商品名称" width="200">
                    <template scope="scope">
                        <el-input icon="more" v-model="scope.row.name" :on-icon-click="tcmc"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="dw" label="单位" width="200"></el-table-column>
                <el-table-column prop="sl" label="数量" width="80"></el-table-column>
                <el-table-column prop="dj" label="单价" width="100"></el-table-column>
                <el-table-column prop="je" label="金额" width="100"></el-table-column>
                <el-table-column prop="zt" label="状态" width="80"></el-table-column>
                <el-table-column label="删除" width="100">
                    <template scope="scope">
                        <el-button type="primary" class="el-icon-close" size="small" value="选中" @click=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">保存</el-button>
                <el-button @click="dialogAddTc = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--商品套餐选择框-->
        <el-dialog title="商品套餐选择框" size="tiny" :visible.sync="dialogSptc">
            <el-input placeholder="请输入内容" v-model="sptcSelect">
                <el-select v-model="sptcInput" slot="prepend" placeholder="请选择">
                    <el-option label="按套餐编码查询" value="1"></el-option>
                    <el-option label="按套餐名称查询" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="sptcTable" border height="230" style="width: 100%">
                <el-table-column prop="bm" label="套餐编码" width="100"></el-table-column>
                <el-table-column prop="name" label="套餐名称" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中" @click="">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddTc = true">添加</el-button>
                <el-button size="small" @click="dialogSptc=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 科目选择框 -->
        <el-dialog title="科目选择框" size="tiny" :visible.sync="dialogKm">
            <el-input placeholder="请输入内容" v-model="kmSelect">
                <el-select v-model="kmInput" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号查询" value="2"></el-option>
                    <el-option label="按名称查询" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="kmTable" border height="230" style="width: 100%">
                <el-table-column prop="bm" label="科目编号" width="100"></el-table-column>
                <el-table-column prop="name" label="科目名称" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中" @click="">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogKm=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 新增说明 -->
        <el-dialog title="常用说明" size="tiny" :visible.sync="dialogAddSm" class="xzsm">
            <el-form label-width="100px" :label-position="labelPosition" :model="addSmForm" class="demo-form-inline">
                <div class="content1">
                    <h5>常用说明</h5>
                    <el-form-item label="编号">
                        <el-input v-model="addSmForm.bh"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="addSmForm.nr" type="textarea" :rows="4"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="">保存</el-button>
                <el-button size="small" @click="dialogAddSm=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 常用说明 -->
        <el-dialog title="常用说明" size="tiny" :visible.sync="dialogSm">
            快速查询：<el-input placeholder="请输入内容" v-model="smInput" icon="more" :on-icon-click="cxClick"></el-input>
            <el-table :data="smTable" border height="230" style="width: 100%">
                <el-table-column prop="bh" label="编号" width="100"></el-table-column>
                <el-table-column prop="nr" label="内容" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中" @click="">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddSm = true">新增</el-button>
                <el-button size="small" @click="dialogSm=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 仓库信息--信息选择框 -->
        <el-dialog class="ckMessge" title="仓库信息--信息框" :visible.sync="dialogCk">
            <el-form label-width="100px" :label-position="labelPosition" :model="ckMessgeform" class="demo-form-inline">
                <div class="content1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="仓库类型">
                                <el-select v-model="ckMessgeform.lx">
                                    <el-option label="自有仓库" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="仓库名称">
                                <el-input v-model="ckMessgeform.name"></el-input>
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
                                <el-input v-model="ckMessgeform.jm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="拼音码">
                                <el-input v-model="ckMessgeform.pym"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="备注">
                                <el-input v-model="ckMessgeform.bz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>联系信息【将作为您物流单上寄件人信息打印出来，请确保信息准确】</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="ckMessgeform.lxr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话">
                                <el-input v-model="ckMessgeform.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮政编码">
                                <el-input v-model="ckMessgeform.yzbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="ckSelectedOptions"></el-cascader>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="发货地址">
                            <el-input v-model="ckMessgeform.address"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">保存并添加</el-button>
                <el-button @click="">保存并关闭</el-button>
                <el-button @click="dialogCk = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--仓库选择框-->
        <el-dialog title="部门选择框" size="tiny" :visible.sync="dialogCkxz">
            <el-input placeholder="请输入内容" v-model="bmSelect">
                <el-select v-model="bmInput" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按全名查询" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="bmTable" border height="230" style="width: 100%">
                <el-table-column prop="bmqm" label="部门全名" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中" @click="">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogCk = true">添加</el-button>
                <el-button size="small" @click="dialogCkxz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 部门选择框 -->
        <el-dialog title="部门选择框" size="tiny" :visible.sync="dialogBm">
            <el-input placeholder="请输入内容" v-model="bmSelect">
                <el-select v-model="bmInput" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按全名查询" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="bmTable" border height="230" style="width: 100%">
                <el-table-column prop="bmqm" label="部门全名" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中" @click="">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogBm=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 内部职员--信息框 -->
        <el-dialog size="tiny" title="内部职员--信息框" :visible.sync="dialogZyxx">
            <el-form label-width="100px" :label-position="labelPosition" :model="zyxxForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="职员名称">
                            <el-input v-model="zyxxForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员简名">
                            <el-input v-model="zyxxForm.jm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门">
                            <el-input v-model="zyxxForm.bm" icon="more" :on-icon-click="bmClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员编号">
                            <el-input v-model="zyxxForm.bh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input v-model="zyxxForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拼音码">
                            <el-input v-model="zyxxForm.pym"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input  type="textarea" :rows="5" v-model="zyxxForm.bz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="">保存并新增</el-button>
                <el-button @click="dialogZyxx = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 经手人 -->
        <el-dialog title="业务员选择框" :visible.sync="dialogYwy">
            <el-input placeholder="请输入内容" v-model="selectYwy">
                <el-select v-model="inputYwy" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="收货人" value="2"></el-option>
                    <el-option label="手机号码" value="3"></el-option>
                    <el-option label="电话号码" value="4"></el-option>
                    <el-option label="邮政编码" value="5"></el-option>
                    <el-option label="收货地址" value="6"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="ywyTable" border>
                <el-table-column property="bh" label="职员编号" width="150"></el-table-column>
                <el-table-column property="name" label="职员名称" width="200"></el-table-column>
                <el-table-column property="bm" label="所属部门" width="180"></el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceYwyRow(scope.$index, addressData)"
                            type="text"
                            size="small">选中
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogZyxx = true">添加</el-button>
                <el-button @click="dialogYwy = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--新增地址-->
        <el-dialog size="tiny" title="地址" :visible.sync="dialogAddDz">
            <el-form label-width="100px" :label-position="labelPosition" :model="addDzForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人">
                            <el-input v-model="addDzForm.shr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <el-input v-model="addDzForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="电话号码">
                            <el-input v-model="addDzForm.telphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮政编码">
                            <el-input v-model="addDzForm.yzbm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="选择省市区">
                            <el-cascader :options="cityOptions" v-model="selectedOptions" @change=""></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="收货地址">
                            <el-input v-model="addDzForm.shdz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddDz = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--地址-->
        <el-dialog title="地址" :visible.sync="dialogAddress">
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
                <el-table-column property="shr" label="收货人" width="150"></el-table-column>
                <el-table-column property="phone" label="手机号码" width="200"></el-table-column>
                <el-table-column property="telphone" label="电话号码" width="180"></el-table-column>
                <el-table-column property="yzbm" label="邮政编码" width="180"></el-table-column>
                <el-table-column property="province" label="省市区" width="300"></el-table-column>
                <!--<el-table-column property="city" label="市" width="60"></el-table-column>
                <el-table-column property="district" label="区" width="60"></el-table-column>-->
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
                <el-button type="primary" @click="dialogAddDz = true">添加</el-button>
                <el-button @click="dialogAddress = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 往来单位[客户] -->
        <el-dialog title="往来单位[客户]选择框" :visible.sync="dialogWldw">
            <el-input placeholder="请输入内容" v-model="WldwSelect">
                <el-select v-model="WldwInput" slot="prepend" placeholder="请选择">
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
            <el-table :data="WldwTable" border height="230" style="width: 100%">
                <el-table-column prop="bh" label="单位编号" width="200"></el-table-column>
                <el-table-column prop="name" label="单位名称" width="200"></el-table-column>
                <el-table-column prop="jm" label="单位简名" width="120"></el-table-column>
                <el-table-column prop="telphone" label="电话" width="120"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="primary" size="small" value="选中">选中</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="wldwAdd">添加</el-button>
                <el-button size="small" disabled>进入下级</el-button>
                <el-button size="small" disabled>返回上级</el-button>
                <el-button size="small" @click="dialogWldw=false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 添加往来单位信息框 -->
        <el-dialog class="wldwMessage" title="往来单位-信息框" :visible.sync="dialogWldwEdit">
            <el-form label-width="100px" :label-position="labelPosition" :model="wldwAddForm" class="demo-form-inline">
                <el-row>所属分类</el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="单位名称">
                            <el-input v-model="wldwAddForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="单位名称编号">
                            <el-input v-model="wldwAddForm.bh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="简名">
                            <el-input v-model="wldwAddForm.jm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="拼音码">
                            <el-input v-model="wldwAddForm.pym"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型">
                            <el-select v-model="wldwAddForm.select">
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
                            <el-input v-model="wldwAddForm.sh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="税率（%）">
                            <el-input v-model="wldwAddForm.sl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="wldwAddForm.lxr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话">
                            <el-input v-model="wldwAddForm.telphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="手机">
                            <el-input v-model="wldwAddForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电子邮件">
                            <el-input v-model="wldwAddForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价格等级">
                            <el-select v-model="wldwAddForm.dj">
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
                            <el-input icon="more" :on-icon-click="addressIconClick" v-model="wldwAddForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="开户银行">
                            <el-input v-model="wldwAddForm.khyh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号">
                            <el-input v-model="wldwAddForm.yhzh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="wldwAddForm.bz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveAddDw()">保存并新增</el-button>
                <el-button @click="saveClose()">保存并关闭</el-button>
                <el-button @click="dialogWldwEdit = false">关闭</el-button>
            </div>
        </el-dialog>
        <h5>销售换货单</h5>
        <div class="ldrq">
            <div>
                录单日期：<el-date-picker size="mini" v-model="ldDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div>
                编号：<el-input style="width:80%;" size="mini" v-model="ldbh"></el-input>
            </div>
        </div>
        <div class="myForm">
            <el-form label-width="80px" v-model="form" :label-position="labelPosition0" class="demo-form-inline">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="往来单位">
                            <el-input icon="more" v-model="form.wldw" :on-icon-click="WldwClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="经手人">
                            <el-input icon="more" v-model="form.jsr" :on-icon-click="jsrClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="部门">
                            <el-input icon="more" v-model="form.bm" :on-icon-click="bmFormClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="换入仓库">
                            <el-input icon="more" v-model="form.hrck" :on-icon-click="hrckClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="换货类型">
                            <el-select v-model="form.lx" placeholder="请选择">
                                <el-option label="正常换货" value="1"></el-option>
                                <el-option label="坏损换货" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="换出仓库">
                            <el-input icon="more" v-model="form.hhck" :on-icon-click="hcckClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="摘要">
                            <el-input v-model="form.zy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="附加说明">
                            <el-input icon="more" v-model="form.fjsm" :on-icon-click="fjsmClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item label="税率">
                            <el-input v-model="form.sl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table1">
            <el-table :data="hrTable" border style="width: 100%" max-height="280">
                <el-table-column prop="bh" label="商品编号" width="100"></el-table-column>
                <el-table-column prop="name" label="换入商品名称" width="150"></el-table-column>
                <el-table-column prop="tm" label="条码" width="100"></el-table-column>
                <el-table-column prop="gg" label="规格" width="200"></el-table-column>
                <el-table-column prop="xh" label="型号" width="100"></el-table-column>
                <el-table-column prop="dw" label="单位" width="200"></el-table-column>
                <el-table-column prop="dwgx" label="单位关系" width="120"></el-table-column>
                <el-table-column prop="fzdw1" label="辅助单位1" width="120"></el-table-column>
                <el-table-column prop="fzdw2" label="辅助单位2" width="120"></el-table-column>
                <el-table-column prop="number" label="数量" width="100"></el-table-column>
                <el-table-column prop="pice" label="单价" width="100"></el-table-column>
                <el-table-column prop="je" label="金额" width="100"></el-table-column>
                <el-table-column prop="zt" label="状态" width="100"></el-table-column>
                <el-table-column prop="bz" label="备注" width="300"></el-table-column>
                <el-table-column prop="rkhw" label="入库货位" width="120"></el-table-column>
                <el-table-column label="删除" width="120">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="deleteHrRow(scope.$index, hrTable)"
                            type="text"
                            class="el-icon-close"
                            size="small">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="hrsptc">
            <button type="button" @click="hrsptc">选择换入商品套餐</button>
            <div>换入数量：{{hrsl}}</div>
            <div style="margin-right:30px;">换入金额：{{hrje}}</div>
        </div>
        <div class="table2">
            <el-table :data="hcTable" border style="width: 100%" max-height="280">
                <el-table-column prop="bh" label="商品编号" width="100"></el-table-column>
                <el-table-column prop="name" label="换出商品名称" width="150"></el-table-column>
                <el-table-column prop="tm" label="条码" width="100"></el-table-column>
                <el-table-column prop="gg" label="规格" width="200"></el-table-column>
                <el-table-column prop="xh" label="型号" width="100"></el-table-column>
                <el-table-column prop="dw" label="单位" width="200"></el-table-column>
                <el-table-column prop="dwgx" label="单位关系" width="120"></el-table-column>
                <el-table-column prop="fzdw1" label="辅助单位1" width="120"></el-table-column>
                <el-table-column prop="fzdw2" label="辅助单位2" width="120"></el-table-column>
                <el-table-column prop="number" label="数量" width="100"></el-table-column>
                <el-table-column prop="pice" label="单价" width="100"></el-table-column>
                <el-table-column prop="je" label="金额" width="100"></el-table-column>
                <el-table-column prop="zt" label="状态" width="100"></el-table-column>
                <el-table-column prop="bz" label="备注" width="300"></el-table-column>
                <el-table-column prop="ckhw" label="出库货位" width="120"></el-table-column>
                <el-table-column label="删除" width="120">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="deleteHcRow(scope.$index, hcTable)"
                            type="text"
                            class="el-icon-close"
                            size="small">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer-btn" style="margin-top:10px;">
            <el-form label-width="80px" v-model="footerForm" :label-position="labelPosition" class="demo-form-inline">
                <el-row>
                    <el-col :span="16" style="padding-left:5px;">制单人：{{footerForm.zdr}}</el-col>
                    <el-col :span="2"><button type="button">选择换出商品套餐</button></el-col>
                    <el-col :span="2">换出数量：{{footerForm.hcsl}}</el-col>
                    <el-col :span="2">换出金额：{{footerForm.hcje}}</el-col>
                    <el-col :span="2">换货差额：{{footerForm.hcce}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="收款账户">
                            <el-input size="mini" icon="more" v-model="footerForm.skzh" :on-icon-click="skzhClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label="收款金额">
                            <el-input size="mini" v-model="footerForm.skje"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="优惠金额">
                            <el-input size="mini" v-model="footerForm.yhje"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" style="float:right;">
                        <el-form-item>
                            优惠后金额：{{footerForm.yhhje}}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div style="float:right;">
                <button type="button" @click="dialogLzpz = true">录单配置</button>
                <button type="button">保存/退出</button>
            </div>
        </div>
    </div>
</template>

<script>
    import './less/style.less'
    import service from './service/getData.js'
    import city from '../../../../assets/js/city.js'
    export default {
        components: {

        },
        data: function(){
            return {
                labelPosition0:'right',
                labelPosition:'left',
                selectedOptions:['','',''],
                dialogWldw:false,
                dialogWldwEdit:false,
                dialogAddress:false,
                dialogAddDz:false,
                dialogYwy:false,
                dialogZyxx:false,
                dialogBm:false,
                dialogCk:false,
                dialogCkxz:false,
                dialogSm:false,
                dialogAddSm:false,
                dialogSptc:false,
                dialogAddTc:false,
                dialogKm:false,
                dialogLzpz:false,
                WldwSelect:'',
                WldwInput:'',
                kmSelect:'',
                kmInput:'',
                ldDate:'',
                hrsl:'',
                hrje:'',
                smInput:'',
                sptcSelect:'',
                sptcInput:'',
                ldbh:'201701109',
                selectAddress:'',
                inputAddress:'',
                selectYwy:'',
                inputYwy:'',
                bmSelect:'',
                bmInput:'',
                addSmForm:{
                    bh:'',
                    nr:''
                },
                form:{
                    wldw:'',
                    jsr:'',
                    hrck:'',
                    lx:'',
                    hcck:'',
                    zy:'',
                    fjsm:'',
                    sl:''
                },
                footerForm:{
                    zdr:'',
                    hcsl:'',
                    hcje:'',
                    hcce:'',
                    skzh:'',
                    skje:'',
                    yhje:'',
                    yhhje:''
                },
                cityOptions:city,
                ckSelectedOptions:['','',''],
                wldwAddForm:{
                    name:'',
                    bh:'',
                    jm:'',
                    pym:'',
                    select:'',
                    sh:'',
                    sl:'',
                    lxr:'',
                    telphone:'',
                    phone:'',
                    email:'',
                    dj:'',
                    address:'',
                    khyh:'',
                    yhzh:'',
                    bz:''
                },
                WldwTable:[
                    {
                        bh:'1001',
                        name:'河南电信公司',
                        jm:'电信',
                        telphone:'45006666'
                    },{
                        bh:'1002',
                        name:'河南翼龙直供平台',
                        jm:'翼龙',
                        telphone:'45008888'
                    }
                ],
                hrTable:[
                    {
                        bh:'0001',
                        name:'iphone 6s plus',
                        tm:'0001',
                        gg:'32G全网通4G手机',
                        xh:'6s plus',
                        dw:'部',
                        dwgx:'零售',
                        fzdw1:'无',
                        fzdw2:'无',
                        number:'1',
                        pice:'3799',
                        je:'3799',
                        zt:'开机问题',
                        bz:'销售出去出现开机问题，换货',
                        rkhw:'本地仓库'
                    },{
                        bh:'0002',
                        name:'vivo x20 plus',
                        tm:'0001',
                        gg:'官方标配64G裸机',
                        xh:'x20 plus',
                        dw:'部',
                        dwgx:'零售',
                        fzdw1:'无',
                        fzdw2:'无',
                        number:'1',
                        pice:'2799',
                        je:'2799',
                        zt:'屏幕问题',
                        bz:'未销售出去，发现问题',
                        rkhw:'本地仓库'
                    }
                ],
                hcTable:[
                    {
                        bh:'0001',
                        name:'iphone 6s plus',
                        tm:'0001',
                        gg:'32G全网通4G手机',
                        xh:'6s plus',
                        dw:'部',
                        dwgx:'零售',
                        fzdw1:'无',
                        fzdw2:'无',
                        number:'1',
                        pice:'3799',
                        je:'3799',
                        zt:'正常',
                        bz:'',
                        rkhw:'主仓库'
                    },{
                        bh:'0002',
                        name:'vivo x20 plus',
                        tm:'0002',
                        gg:'官方标配64G裸机',
                        xh:'x20 plus',
                        dw:'部',
                        dwgx:'零售',
                        fzdw1:'无',
                        fzdw2:'无',
                        number:'1',
                        pice:'2799',
                        je:'2799',
                        zt:'正常',
                        bz:'',
                        rkhw:'主仓库'
                    }
                ],
                addressData:[
                    {
                        'shr':'任泉',
                        'phone':'45668888',
                        'telphone':'15878787878',
                        'yzbm':'450000',
                        'province':'河南省郑州市金水区',
                        'address':'永和伯爵'
                    },{
                        'shr':'李冰冰',
                        'phone':'45768888',
                        'telphone':'15966666666',
                        'yzbm':'450000',
                        'province':'河南省郑州市郑东新区',
                        'address':'商务内环路'
                    }
                ],
                ywyTable:[
                    {
                        bh:'6001',
                        name:'楚小乔',
                        bm:'销售部'
                    },
                    {
                        bh:'6002',
                        name:'张大可',
                        bm:'后勤部'
                    }
                ],
                bmTable:[{
                    bmqm:'销售部'
                },{
                    bmqm:'后勤部'
                }
                ],
                smTable:[{
                    bh:'',
                    nr:''
                }],
                kmTable:[{
                    bm:'',
                    name:''
                }],
                sptcTable:[{
                    bm:'',
                    name:''
                }],
                addDzForm:{
                    shr:'',
                    phone:'',
                    telphone:'',
                    yzbm:'',
                    shdz:''
                },
                zyxxForm:{
                    name:'',
                    jm:'',
                    phone:'',
                    pym:'',
                    bz:''
                },
                ckMessgeform:{
                    lx:'',
                    name:'',
                    bh:'',
                    jm:'',
                    pym:'',
                    bz:'',
                    lxr:'',
                    phone:'',
                    yzbm:'',
                    address:''
                },
                addTcForm:{
                    name:'',
                    bm:'',
                    tm:'',
                    dyfs:'',
                    bz:''
                },
                addTcTable:[
                    {
                        bh:'',
                        name:'',
                        dw:'',
                        sl:'',
                        dj:'',
                        je:'',
                        zt:''
                    }
                ],
                lzpzTable:[{
                    lm:''
                }]
            }
        },
        methods:{
            WldwClick(){
                this.dialogWldw = true;
            },
            wldwAdd(){
                this.dialogWldwEdit = true;
            },
            addressIconClick(){
                this.dialogAddress = true;
            },
            choiceAdRow(index,rows){

            },
            editAdRow(index,rows){

            },
            removeAdRow(index,rows){

            },
            jsrClick(){
                this.dialogYwy = true;
            },
            bmClick(){
                this.dialogBm = true;
            },
            bmFormClick(){
                this.dialogBm = true;
            },
            hrckClick(){
               this.dialogCkxz = true;
            },
            hcckClick(){

            },
            fjsmClick(){
                this.dialogSm = true;
            },
            skzhClick(){
                this.dialogKm = true;
            },
            cxClick(){

            },
            hrsptc(){
                this.dialogSptc = true;
            },
            tcbh(){

            },
            tcmc(){

            }
        }
    }
</script>

