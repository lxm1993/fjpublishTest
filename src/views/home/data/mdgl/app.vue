<template>
    <div class="mdxx">
        <!--往来单位--信息框-->
        <el-dialog class="wldwMessage" title="往来单位-信息框" :visible.sync="dialogWldwXxEdit">
            <el-form label-width="100px" :label-position="labelPosition" :model="wldwXxForm" class="demo-form-inline">
                <el-row>所属分类</el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="单位名称">
                            <el-input v-model="wldwXxForm.comName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="单位名称编号">
                            <el-input v-model="wldwXxForm.comSn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="简名">
                            <el-input v-model="wldwXxForm.comNameSp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="拼音码">
                            <el-input v-model="wldwXxForm.comNamePy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型">
                            <el-select v-model="wldwXxForm.typeId">
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
                            <el-input v-model="wldwXxForm.taxNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="税率（%）">
                            <el-input v-model="wldwXxForm.taxRate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="联系人">
                            <el-input v-model="wldwXxForm.contacts"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话">
                            <el-input v-model="wldwXxForm.telphone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="手机">
                            <el-input v-model="wldwXxForm.cellphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电子邮件">
                            <el-input v-model="wldwXxForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价格等级">
                            <el-select v-model="wldwXxForm.priceScale">
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
                            <el-input v-model="wldwXxForm.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="开户银行">
                            <el-input v-model="wldwXxForm.bankName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行账号">
                            <el-input v-model="wldwXxForm.bankNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="wldwXxForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="saveAddDw()">保存并新增</el-button>
                <el-button @click="dialogWldwXxEdit = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--部门选择框-->
        <el-dialog size="tiny" title="部门选择框" :visible.sync="dialogBm">
            <el-input placeholder="请输入内容" v-model="selectBm">
                <el-select v-model="inputBm" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按全名过滤" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="bmData" border>
                <el-table-column property="name" label="部门全名" width="200"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceSyt(scope.$index, sytData)"
                            type="text"
                            size="small">选中
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="">新增</el-button>
                <el-button @click="dialogBm = false">取消</el-button>
            </div>
        </el-dialog>
        <!--添加内部职员--信息框-->
        <el-dialog class="sytEdit" size="tiny" title="内部职员--信息框" :visible.sync="dialogZy">
            <el-form label-width="100px" :label-position="labelPosition" :model="zyForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="职员名称">
                            <el-input v-model="zyForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员简名">
                            <el-input v-model="zyForm.jm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门">
                            <el-input v-model="zyForm.bm" icon="more" :on-icon-click="bmClick"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职员编号">
                            <el-input v-model="zyForm.bh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input v-model="zyForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="拼音码">
                            <el-input v-model="zyForm.pym"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="zyForm.textarea"></el-input>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogZy = false">取消</el-button>
                <el-button type="primary" @click="">保存</el-button>
            </div>
        </el-dialog>
        <!--业务员选择框-->
        <el-dialog size="tiny" title="业务员选择框" :visible.sync="dialogYwy">
            <el-input placeholder="请输入内容" v-model="selectYwy">
                <el-select v-model="inputYwy" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号过滤" value="3"></el-option>
                    <el-option label="按全名过滤" value="4"></el-option>
                    <el-option label="按拼音码过滤" value="5"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="ywyData" border>
                <el-table-column property="bh" label="职员编号" width="150"></el-table-column>
                <el-table-column property="name" label="职员名称" width="200"></el-table-column>
                <el-table-column property="bm" label="所属部门" width="200"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceSyt(scope.$index, sytData)"
                            type="text"
                            size="small">选中
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogZy = true">添加</el-button>
                <el-button @click="dialogYwy = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 收银台编辑 -->
        <el-dialog class="sytEdit" size="tiny" title="收银台编辑" :visible.sync="dialogSyt">
            <el-form label-width="100px" :label-position="labelPosition" :model="sytForm" class="demo-form-inline">
                <el-form-item label="名称">
                    <el-input v-model="sytForm.cashierName"></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="sytForm.cashierId"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSyt = false">取消</el-button>
                <el-button type="primary" @click="addSyt()">保存</el-button>
            </div>
        </el-dialog>
        <!-- 收银台设置 -->
        <el-dialog class="sytEdit" size="tiny" title="收银台设置" :visible.sync="dialogsytEdit">
            <div class="content1">
                <h4>门店：<span>{{mdName}}</span></h4>
                <el-table :data="sytData" border>
                    <el-table-column property="cashierSn" label="收银台编号" width="150"></el-table-column>
                    <el-table-column property="cashierName" label="收银台名称" width="200"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button
                                @click.native.prevent="editSyt(scope.$index, sytData)"
                                type="text"
                                size="small">修改
                            </el-button>
                            <el-button
                                @click.native.prevent="removeSyt(scope.$index, sytData)"
                                type="text"
                                size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogSyt = true">新增</el-button>
                <el-button @click="dialogsytEdit = false">取消</el-button>
            </div>
        </el-dialog>
        <!--往来单位选择框-->
        <el-dialog class="wldwEdit" title="往来单位选择框" :visible.sync="dialogWldwEdit">
            <el-input placeholder="请输入内容" v-model="selectDw">
                <el-select v-model="inputDw" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号过滤" value="3"></el-option>
                    <el-option label="按全名过滤" value="4"></el-option>
                    <el-option label="按拼音码过滤" value="5"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="dwData" border>
                <el-table-column property="comSn" label="单位编号" width="150"></el-table-column>
                <el-table-column property="comName" label="单位名称" width="200"></el-table-column>
                <el-table-column property="comSp" label="单位简名" width="200"></el-table-column>
                <el-table-column property="telephone" label="电话" width="200"></el-table-column>
                <el-table-column label="操作"  width="300">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceDwRow(scope.$index, dwData)"
                            type="text"
                            size="small">选中
                        </el-button>
                        <el-button
                            @click.native.prevent="dwjbxx(scope.$index, dwData)"
                            type="text"
                            size="small">查看单位基本信息
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <!--<el-button type="primary" @click="dwjbxx()">查看单位基本信息</el-button>-->
                <el-button @click="dialogckEdit = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 仓库库信息弹出框 -->
        <el-dialog class="ckMessge" title="仓库信息--信息框" :visible.sync="dialogckMessge">
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
                                <el-input v-model="ckMessgeform.depotSn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="仓库简名">
                                <el-input v-model="ckMessgeform.depotNameSp"></el-input>
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
                <el-button type="primary" @click="ckAdd">保存并添加</el-button>
                <el-button @click="dialogckMessge = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 仓库选择弹出框 -->
        <el-dialog class="ckEdit" size="tiny" title="仓库选择框" :visible.sync="dialogckEdit">
            <el-input placeholder="请输入内容" v-model="select">
                <el-select v-model="input" slot="prepend" placeholder="请选择">
                    <el-option label="快速查询" value="1"></el-option>
                    <el-option label="按编号过滤" value="3"></el-option>
                    <el-option label="按全名过滤" value="4"></el-option>
                    <el-option label="按拼音码过滤" value="5"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-table :data="gridData" border>
                <el-table-column property="depotSn" label="仓库编号" width="150"></el-table-column>
                <el-table-column property="depotName" label="仓库名称" width="200"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            @click.native.prevent="choiceRow(scope.$index, gridData)"
                            type="text"
                            size="small">选中
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCk()">添加</el-button>
                <el-button @click="dialogckEdit = false">关闭</el-button>
            </div>
        </el-dialog>
        <!-- 新增门店弹出框 -->
        <el-dialog class="addMd" title="新增门店(仅支持仓库)" :visible.sync="dialogaddMd">
            <el-form label-width="100px" :label-position="labelPosition" :model="addMdForm" class="demo-form-inline">
                <div class="content1">
                    <h4>门店基础信息</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门店名称">
                                <el-input v-model="addMdForm.storeName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门店编码">
                                <el-input v-model="addMdForm.storeSn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="选择仓库">
                                <el-input icon="more" v-model="addMdForm.depotName" :on-icon-click="handleIconClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开始营业时间">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="addMdForm.openTime" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="关闭营业时间">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="addMdForm.closeTime" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="门店介绍">
                                <el-input v-model="addMdForm.introduce"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门店状态">
                                <el-select v-model="addMdForm.storeStatus">
                                    <el-option label="正常" value="1"></el-option>
                                    <el-option label="暂停营业" value="0"></el-option>
                                    <el-option label="关店" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="店长">
                                <el-input v-model="addMdForm.employeeId" icon="more" :on-icon-click="ywyClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="结存往来单位">
                                <el-input icon="more" v-model="addMdForm.comName" :on-icon-click="jsdwClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>门店地址</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="选择省市区">
                                <el-cascader :options="cityOptions" v-model="addMdForm.area"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮编">
                                <el-input v-model="addMdForm.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="详细地址">
                            <el-input v-model="addMdForm.storeAddr"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>门店联系方式</h4>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="联系人">
                              <el-input v-model="addMdForm.contacts"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="移动电话">
                              <el-input v-model="addMdForm.mobile"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="固定电话">
                              <el-input v-model="addMdForm.telephone"></el-input>
                          </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="传真">
                                <el-input v-model="addMdForm.fax"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="备注">
                            <el-input v-model="addMdForm.remark"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddMd = false">取消</el-button>
                <el-button type="primary" @click="saveAdd()">保存</el-button>
            </div>
        </el-dialog>
        <!-- 编辑门店弹出框 -->
        <el-dialog class="editMd" title="编辑门店(仅支持仓库)" :visible.sync="dialogeditMd">
            <el-form label-width="100px" :label-position="labelPosition" :model="form" class="demo-form-inline">
                <div class="content1">
                    <h4>门店基础信息</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门店名称">
                                <el-input v-model="form.storeName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="门店编码">
                                <el-input v-model="form.storeSn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="选择仓库">
                                <el-input icon="more" v-model="form.depotName" :on-icon-click="handleIconClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="开始营业时间">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.openTime" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="关闭营业时间">
                                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.closeTime" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="门店介绍">
                                <el-input v-model="form.introduce"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="门店状态">
                                <el-select v-model="form.storeStatus">
                                    <el-option label="正常" value="1"></el-option>
                                    <el-option label="暂停营业" value="0"></el-option>
                                    <el-option label="关店" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="店长">
                                <el-input v-model="form.employeeId" icon="more" :on-icon-click="ywyEditClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="结存往来单位">
                                <el-input icon="more" v-model="form.comName" :on-icon-click="jsdwClick"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>门店地址</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="选择省市区">
                                <el-cascader :options="cityOptions" v-model="form.area"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮编">
                                <el-input v-model="form.postcode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="详细地址">
                            <el-input v-model="form.storeAddr"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
                <div class="content1">
                    <h4>门店联系方式</h4>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="联系人">
                                <el-input v-model="form.contacts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="移动电话">
                                <el-input v-model="form.mobile"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="固定电话">
                                <el-input v-model="form.telephone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="传真">
                                <el-input v-model="form.fax"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="备注">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogeditMd = false">取消</el-button>
                <el-button type="primary" @click="saveEdit()">保存</el-button>
            </div>
        </el-dialog>
        <h4>基本信息--门店</h4>
        <div class="con">
            <el-table :data="tableData" border style="width: 100%" height="600">
                <el-table-column prop="storeSn" label="门店编码" width="150"></el-table-column>
                <el-table-column prop="storeName" label="门店名称" width="150"></el-table-column>
                <el-table-column prop="empName" label="店长" width="120"></el-table-column>
                <el-table-column prop="openTime" label="开始营业时间" width="150"></el-table-column>
                <el-table-column prop="closeTime" label="关闭营业时间" width="150"></el-table-column>
                <el-table-column prop="status" label="门店状态" width="120"></el-table-column>
                <el-table-column prop="openTime" label="开始营业时间" width="200"></el-table-column>
                <el-table-column prop="closeTime" label="关闭营业时间" width="200"></el-table-column>
                <el-table-column prop="storeStatus" label="门店状态" width="120"></el-table-column>
                <el-table-column prop="contacts" label="联系人" width="120"></el-table-column>
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
                            @click.native.prevent="sytRow(scope.$index, tableData)"
                            type="text"
                            size="small">收银台设置
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total=total></el-pagination>
        </div>
        <div class="btn-group">
            <el-button @click="dialogaddMd = true">新增</el-button>
            <el-button @click="updataTable">刷新</el-button>
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
                dialogaddMd:false,
                dialogeditMd:false,
                dialogckEdit:false,
                dialogckMessge:false,
                dialogWldwEdit:false,
                dialogsytEdit:false,
                dialogSyt:false,
                dialogYwy:false,
                dialogZy:false,
                dialogBm:false,
                dialogWldwXxEdit:false,
                currentPage:1,
                total:0,
                selectYwy:'',
                inputYwy:'',
                mdName:'',
                selectBm:'',
                inputBm:'',
                editStoreId:'',
                storeNameSyt:'',
                flag:false,
                labelPosition:'left',
                cityOptions:city,
                //ckSelectedOptions:['','',''],
                //selectedOptions:['','',''],
                //selectedOptionsAdd:['','',''],
                bmData:[{
                    name:''
                }],
                ywyData:[
                    {
                        bh:'',
                        name:'',
                        bm:''
                    }
                ],
                zyForm:{
                    name:'',
                    jm:'',
                    bm:'',
                    bh:'',
                    phone:'',
                    pym:'',
                    bz:''
                },
                select:'',
                input:'',
                selectDw:'',
                inputDw:'',
                wldwXxForm:{
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
                    area:['','',''],
                    addr:'',
                    status
                },
                addMdForm:{
                    storeName: '',
                    storeSn: '',
                    employeeId:'',
                    depotId:'',
                    openTime:'',
                    closeTime:'',
                    openTimeSr:'',
                    closeTimeSr:'',
                    storeStatus:'',
                    introduce:'',
                    area:['410000','410100','410105'],
                    contacts:'',
                    mobile:'',
                    comId:'',
                    comName:'',
                    telephone:'',
                    postcode:'',
                    storeAddr:'',
                    fax:'',
                    remark:''
                },
                form: {
                    storeName: '',
                    storeSn: '',
                    employeeId:'',
                    depotId:'',
                    openTime:'',
                    closeTime:'',
                    openTimeSr:'',
                    closeTimeSr:'',
                    storeStatus:'',
                    introduce:'',
                    area:['410000','410100','410105'],
                    contacts:'',
                    mobile:'',
                    comId:'',
                    comName:'',
                    telephone:'',
                    postcode:'',
                    storeAddr:'',
                    fax:'',
                    remark:''
                },
                sytForm:{
                    cashierName:'',
                    cashierId:''
                },
                gridData:[
                    {
                        depotId:'',
                        depotSn:'',
                        depotName:''
                    }
                ],
                sytData:[
                    {
                        cashierSn:'ggg',
                        cashierName:'wdddd',
                        cashierId:''
                    }
                ],
                dwData:[
                    {
                        comId:'',
                        comSn:'',
                        comName:'',
                        comSp:'',
                        telephone:''
                    }
                ],
                tableData: [{
                    storeSn: '001',
                    storeId:'001',
                    storeName: '张三的店',
                    employeeId:'0001',
                    openTime: '8:00',
                    closeTime: '18:00',
                    status:'正常',
                    contacts:'张三'
                },{
                    storeSn: '002',
                    storeId:'002',
                    storeName: '赵四手机专卖',
                    employeeId:'0002',
                    openTime: '8:00',
                    closeTime: '18:00',
                    status:'正常',
                    contacts:'赵四'
                },{
                    storeSn: '003',
                    storeId:'003',
                    storeName: '二七店',
                    employeeId:'0001',
                    openTime: '8:00',
                    closeTime: '18:00',
                    status:'正常',
                    contacts:'王明'
                },{
                    storeSn: '004',
                    storeId:'004',
                    storeName: '李霞的店',
                    employeeId:'0001',
                    openTime: '8:00',
                    closeTime: '18:00',
                    status:'关店',
                    contacts:'王明'
                },{
                    storeSn: '004',
                    storeId:'004',
                    storeName: '万达店',
                    employeeId:'0001',
                    openTime: '8:00',
                    closeTime: '18:00',
                    status:'关店',
                    contacts:'王明'
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
                let data = await service.mdTable({
                    'page':`${val}`
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    this.total = data.total;
                    for(var i=0,len=data.data.length;i<len;i++){
                        if(data.data[i].storeStatus == 1){
                            this.tableData[i].storeStatus = '正常';
                        }else if(data.data[i].storeStatus == 0){
                            this.tableData[i].storeStatus = '暂停营业';
                        }else if(data.data[i].storeStatus == -1){
                            this.tableData[i].storeStatus = '关店';
                        }
                    }
                }
            },
            timeSr(tim){
                let Y = tim.getFullYear();
                let M = (tim.getMonth() + 1);
                let D = tim.getDate();
                let H = tim.getHours();
                let Mm = tim.getMinutes();
                let S = tim.getSeconds();
                if(M<10){
                    M = "0"+M
                }
                if(D<10){
                    D = "0"+D
                }
                if(H<10){
                    H = "0"+H
                }
                if(Mm<10){
                    Mm = "0"+Mm
                }
                if(S<10){
                    S = "0"+S
                }
                return Y+'-'+M+'-'+D+' '+H+':'+Mm+':'+S;
            },
            async handleIconClick() {
                this.dialogckEdit = true;
                let data = await service.ckList({"storeId":this.editStoreId});
                this.gridData = data.data;
            },
            bmClick(){
                this.dialogBm = true;
            },
            async jsdwClick(){
                this.dialogWldwEdit = true;
                let data = await service.wldwxz();
                this.dwData = data.data;
            },
            async dwjbxx(index,rows){
                this.dialogWldwXxEdit = true;
                let data = await service.editwldw({
                    "comId":rows[index].comId
                });
                if(data.code == 200){
                    this.wldwXxForm = data.obj;
                }
            },
            async deleteRow(index, rows) {
                let data = await service.deleteMd({storeId:rows[index].storeId});
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            async editRow(index, rows){
                this.dialogeditMd = true;
                let data = await service.editMd({storeId:rows[index].storeId});
                this.editStoreId = rows[index].storeId;
                this.ckMessgeform.storeId =  rows[index].storeId;
                if(data.code == 200){
                    this.form = data.obj;
                    if(data.obj.storeStatus == 1){
                        this.form.storeStatus = '正常';
                    }else if(data.obj.storeStatus == 0){
                        this.form.storeStatus = '暂停营业';
                    }else if(data.obj.storeStatus == -1){
                        this.form.storeStatus = '关店';
                    }
                }
            },
            async saveEdit(){
                console.log(this.form.openTime);
                this.form.openTimeSr = this.timeSr(new Date(this.form.openTime));
                this.form.closeTimeSr = this.timeSr(new Date(this.form.closeTime));
                console.log(this.form.openTimeSr);
                let data = await service.updateMd({
                    "storeId":this.editStoreId,
                    "storeName":this.form.storeName,
                    "storeSn":this.form.storeSn,
                    "employeeId":this.form.employeeId,
                    "depotId":this.form.depotId,
                    "openTimeStr":this.form.openTimeSr,
                    "closeTimeStr":this.form.closeTimeSr,
                    "storeStatus":this.form.storeStatus,
                    "introduce":this.form.introduce,
                    "areaId":this.form.area[2],
                    "contacts":this.form.contacts,
                    "mobile":this.form.mobile,
                    "comId":this.form.comId,
                    "telephone":this.form.telephone,
                    "postcode":this.form.postcode,
                    "storeAddr":this.form.storeAddr,
                    "fax":this.form.fax,
                    "remark":this.form.remark
                });
                if(data.code == 200){
                    this.dialogeditMd = false;
                }
            },
            async sytRow(index, rows){
                this.dialogsytEdit = true;
                this.mdName = rows[index].storeName;
                this.storeNameSyt = rows[index].storeId;
                let data = await service.sytList({
                    "storeId":rows[index].storeId
                });
                console.log(data);
                this.sytData = data.data;
            },
            choiceRow(index, rows){
                this.addMdForm.depotName = rows[index].depotName;
                this.addMdForm.depotId = rows[index].depotId;
                this.form.depotName = rows[index].depotName;
                this.form.depotId = rows[index].depotId;
                this.dialogckEdit = false;
            },
            async saveAdd(){
                this.addMdForm.openTimeSr = this.timeSr(this.addMdForm.openTime);
                this.addMdForm.closeTimeSr = this.timeSr(this.addMdForm.closeTime);
                let data = await service.addMd({
                    "storeName":this.addMdForm.storeName,
                    "storeSn":this.addMdForm.storeSn,
                    "employeeId":this.addMdForm.employeeId,
                    "depotId":this.addMdForm.depotId,
                    "openTimeStr":this.addMdForm.openTimeSr,
                    "closeTimeStr":this.addMdForm.closeTimeSr,
                    "storeStatus":this.addMdForm.storeStatus,
                    "introduce":this.addMdForm.introduce,
                    "areaId":this.addMdForm.area[2],
                    "contacts":this.addMdForm.contacts,
                    "mobile":this.addMdForm.mobile,
                    "comId":this.addMdForm.comId,
                    "telephone":this.addMdForm.telephone,
                    "postcode":this.addMdForm.postcode,
                    "storeAddr":this.addMdForm.storeAddr,
                    "fax":this.addMdForm.fax,
                    "remark":this.addMdForm.remark
                });
                console.log(data);
                if(data.code == 200){
                    this.dialogaddMd = false;
                    let data = await service.mdTable({
                        'page':1
                    });
                    if(data.code == 200){
                        this.tableData = data.data;
                        this.total = data.total;
                        for(var i=0,len=data.data.length;i<len;i++){
                            if(data.data[i].storeStatus == 1){
                                this.tableData[i].storeStatus = '正常';
                            }else if(data.data[i].storeStatus == 0){
                                this.tableData[i].storeStatus = '暂停营业';
                            }else if(data.data[i].storeStatus == -1){
                                this.tableData[i].storeStatus = '关店';
                            }
                        }
                    }
                }
            },
            choiceDwRow(index,rows){
                this.addMdForm.comId = rows[index].comId;
                this.addMdForm.comName = rows[index].comName;
                this.form.comId = rows[index].comId;
                this.form.comName = rows[index].comName;
                this.dialogWldwEdit = false;
            },
            addCk(){
                this.dialogckMessge = true;
            },
            async addSyt(){
                if(this.flag){
                    let data = await service.updateSyt({
                        "storeId":this.storeNameSyt,
                        "cashierId":this.sytForm.cashierId,
                        "cashierName":this.sytForm.cashierName
                    });
                    if(data.code == 200){
                        this.dialogSyt = false;
                    }
                    this.flag = false;
                }else{
                    let data = await service.addSyt({
                        "storeId":this.storeNameSyt,
                        "cashierId":this.sytForm.cashierId,
                        "cashierName":this.sytForm.cashierName
                    });
                    if(data.code == 200){
                        this.dialogSyt = false;
                    }
                }
                let data = await service.sytList({
                    "storeId":this.storeNameSyt
                });
                this.sytData = data.data;
            },
            async editSyt(index,rows){
                this.dialogSyt = true;
                this.flag = true;
                this.sytForm = rows[index];
            },
            async removeSyt(index,rows){
                let data = await service.deleteSyt({
                    "cashierId":rows[index].cashierId
                });
                if(data.code == 200){
                    rows.splice(index, 1);
                }
            },
            ywyClick(){
                this.dialogYwy = true;
            },
            ywyEditClick(){
                this.dialogYwy = true;
            },
            async ckAdd(){
                let data = await service.addCk({
                    "storeId":this.ckMessgeform.storeId,
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
                console.log(data);
                if(data.code == 200){
                    this.dialogckMessge = false;
                    let list = await service.ckList({"storeId":this.editStoreId});
                    this.gridData = list.data;
                }
            },
            async updataTable(){
                let data = await service.mdTable({
                    'page':1
                });
                if(data.code == 200){
                    this.tableData = data.data;
                    this.total = data.total;
                    for(var i=0,len=data.data.length;i<len;i++){
                        if(data.data[i].storeStatus == 1){
                            this.tableData[i].storeStatus = '正常';
                        }else if(data.data[i].storeStatus == 0){
                            this.tableData[i].storeStatus = '暂停营业';
                        }else if(data.data[i].storeStatus == -1){
                            this.tableData[i].storeStatus = '关店';
                        }
                    }
                }
            }
        },
        async mounted() {
//            let data = await service.mdTable({
//                'page':1
//            });
//            if(data.code == 200){
//                this.tableData = data.data;
//                this.total = data.total;
//                for(var i=0,len=data.data.length;i<len;i++){
//                    if(data.data[i].storeStatus == 1){
//                        this.tableData[i].storeStatus = '正常';
//                    }else if(data.data[i].storeStatus == 0){
//                        this.tableData[i].storeStatus = '暂停营业';
//                    }else if(data.data[i].storeStatus == -1){
//                        this.tableData[i].storeStatus = '关店';
//                    }
//                }
//            }
        }
    }
</script>
