<template>
    <div view-framework>
        <!--系统配置 dialog-->
        <el-dialog size="small" title="系统配置" :visible.sync="xtpzDialog">
        	 <el-tabs border v-model="activeName2" type="card" @tab-click="handleClick">
			    <el-tab-pane  label="公司信息" name="first" tyle="border: 1px solid #ccc;border-top: none;">

			    	<el-form ref="form" :model="form" label-width="80px">
			    		<el-col :span="12">
			    		    <el-form-item label="联系人">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
						 <el-col :span="12">
			    		    <el-form-item label="电话号码">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
						 <el-col :span="24">
			    		    <el-form-item label="公司全名">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
						 <el-col :span="8">
						   	  <el-form-item label="省市区">
							    <el-cascader :options="cityOptions" v-model="selectedOptions" @change="handleChange"></el-cascader>
							  </el-form-item>
					   	</el-col>
					   	<el-col :span="8">
			    		    <el-form-item label="邮编">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
						 <el-col :span="8">
			    		    <el-form-item label="QQ">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
						 <el-col :span="24">
			    		    <el-form-item label="公司地址">
			    				<el-input v-model="form.name"></el-input>
						     </el-form-item>
						 </el-col>
			    	</el-form>
			    </el-tab-pane>
			 </el-tabs>



            <div slot="footer" class="dialog-footer">
                <el-button @click="xtpzDialog = false">保存</el-button>
                <el-button type="primary" @click="xtpzDialog = false">退出</el-button>
            </div>
        </el-dialog>
        <!--首页-->
        <div v-if="isLogin">
        <div class="header">
            <div class="top">
                <div class="left"><i class="yunLogo"></i><span>云门店管理系统</span></div>
                <div class="right">
                    <ul>
                        <li>
                            <i class="el-icon-search"></i>帮助
                            <ul>
                                <li>
                                    <a href="#">下载打印管理器</a>
                                </li>
                                <li>
                                    <a href="#">版本更新</a>
                                </li>
                                <li>
                                    <a href="#">版本信息</a>
                                </li>
                                <li>
                                    <a href="#">帮助中心</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <i class="el-icon-setting"></i>用户名
                            <ul>
                                <li>
                                    <a href="#">修改密码</a>
                                </li>
                                <li>
                                    <a href="#">修改注册信息</a>
                                </li>
                                <li>
                                    <a href="#">退出</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="menu">
                <div class="meun-cont">
                    <ul>
                        <li v-for="item in menuData">
                            <a href="#">{{item.name}}<i class="el-icon-arrow-down"></i></a>
                            <ul v-if="item.list">
                                <li v-for="i in item.list">
                                    <a @click="addHistory(i)">{{i.name}}<i v-if="i.list" class="el-icon-arrow-right"></i></a>
                                    <ul v-if="i.list">
                                        <li v-for="j in i.list">
                                            <a @click="addHistory(j)">{{j.name}}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="history">
                <ul>
                    <!--<li :class="{ active: isActive }"><a @click="daohangChange()">导航</a></li>-->
                    <li v-for="item in historyList" :class="{1:'active',0:''}[item.flag]"><a @click="checkHistory(item)">{{item.name}}</a><i class="el-icon-circle-close" @click="close(item)" v-if="item.flag2"></i></li>
                </ul>
                <div v-if="historyArr.length>=4">
                    <div @click="back()" :class="{1:'bidden',0:''}[b1]">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div @click="forward()" :class="{1:'bidden',0:''}[b2]">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="closeHistor" @click="closeChose()">
                        <i class="el-icon-arrow-down"></i>
                        <div class="dlag" v-show="isShow">
                            <div @click="closeAll()">关闭所有</div>
                            <div @click="closeOther()">关闭其他</div>
                            <!--<div @click="closeThis()">关闭当前</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '~api'
    import axios from 'axios'
    import qs from 'qs'
    //import router from './index'
    // store from './index'
    //import login from '~components/common/login.vue'
    import city from '../../assets/js/city.js'
    export default {
        components: {
        },
        computed: {
            isLogin:{
                get: function(){
                    return this.$store.state.isLogin;
                },
                set: function (newValue) {
                    this.$store.commit('setIsLogin', newValue);
                }
            },
            historyList(){
                return this.$store.state.historyList
            },
            historyArr(){
                return this.$store.state.historyArr
            },
            isActive(){
                return this.$store.state.isActive
            },
            index(){
                return this.$store.state.index
            }
        },
        watch: {
            'isLogin':function(val,oldVal){ //监听到选择二级界面消失

            },
        },
        data: function() {
            return {
                //isActive:true,
                //index:'',
                activeName2: 'first',
                //loginAfter:false,
                xtpzDialog:false,
                b1:0,
                b2:0,
                isShow:false,
                deletIndex:'',
                baseUrl:api,
                selectedOptions:['','',''],
				cityOptions:city,
                form:{
                   name: ''
                },
                //historyList:[],
                //historyArr:[],
                menuData:[
                    {
                        "name":"商品",
                        "list":[
                            {"name":"商品信息","url":"/goodsDetail"},
//                            {"name":"SKU管理","url":"/suk"},
                            {"name":"商品套餐","url":"/goodstc"}
                        ]
                    },
                    {
                        "name":"资料",
                        "list":[
                            {"name":"往来单位","url":"wldw"},
                            {"name":"门店管理","url":"mdgl"},
                            {"name":"仓库管理","url":"ckgl"},
                            {"name":"费用支出","url":"fyzc"},
                            {"name":"现金银行","url":"xjyh"},
                            {"name":"物流公司","url":"wlgs"},
                            {"name":"其他收入类别","url":"qtsr"}
                        ]
                    },
                    {
                        "name":"店面管理",
                        "list":[
                            {"name":"会员信息","url":"vipManage"},
                            {"name":"维修登记","url":"repair"}
                        ]
                    },
                    {
                        "name":"进货",
                        "list":[
                            { "name":"进货单","url":"list"},
                            {"name":"进货开票","url":"inv"}
                        ]
                    },
                    {
                        "name":"销售",
                        "list":[
                        	{ "name":"零售单","url":"rtl"},
                            { "name":"销售换货","url":"excg"},
                            {"name":"零售退货","url":"rtrun"},
                            {"name":"物价管理","url":"prc"}
                        ]
                    },
                    {
                        "name":"库存",
                        "list":[
                        	{ "name":"进货入库单","url":"ware"},
                            { "name":"商品库存","url":"tory"},
                            {"name":"库存盘点","url":"che"}
                        ]
                    },
                    {
                        "name":"系统",
                        "list":[
                        	{ "name":"系统配置","url":""},
                        	{"name":"职员及权限配置","url":"perm"}
                        ]
                    }
                ]
            }
        },
        created:function(){
            this.testLogin();
        },
        methods: {
        	handleClick(tab, event) {
		        console.log(tab, event);
		      },
		    handleChange(value){
	            console.log(value);
	       },
            testLogin(){
                var id = window.localStorage.getItem('userId')
                if (id === null) { // 未登录
                    this.isLogin = false;
                }else{
                    this.isLogin = true;
                }
            },
            closeChose(){
                this.isShow == true?this.isShow = false:this.isShow = true;
            },
            //选中历史菜单栏里的一项
            checkHistory(item){
                //选中当前页样式
                for(var i=0;i<this.$store.state.historyArr.length;i++){
                    this.$store.state.historyList[i].flag = 0;
                }
                // this.$store.state.isActive = false;
                this.$store.state.index = this.$store.state.historyArr.indexOf(item.name);
                this.$store.state.historyList[this.$store.state.index].flag = 1;
                //路由跳转
                this.$router.push(this.$store.state.historyList[this.$store.state.index].url);
            },
            //从菜单中添加历史足迹栏
            addHistory(item){
                if(item.url!==""){
                    if(item.url != undefined){
                        $(".meun-cont ul ul").css("display","none");
                        this.$router.push(item.url);
                        setTimeout(function(){
                            $(".meun-cont ul ul").css("display","block");
                        },1000)
                        if(this.$store.state.historyArr.indexOf(item.name) == -1){
                            //选中当前页样式
                            for(var i=0;i<this.$store.state.historyArr.length;i++){
                                this.$store.state.historyList[i].flag = 0;
                            }
                            this.$store.state.isActive = false;
                            //添加到历史记录标签
                           // if(item.url!==""){
                                this.$store.state.historyList.push({"name":item.name,"url":item.url,"flag":1,"flag2":true});
                                this.$store.state.historyArr.push(item.name);
                           // }
                            //路由跳转
                            this.$router.push(item.url);
                        }else{
                            //选中当前页样式
                            for(var i=0;i<this.$store.state.historyArr.length;i++){
                                this.$store.state.historyList[i].flag = 0;
                            }
                            //  this.$store.state.isActive = false;
                            this.$store.state.index = this.$store.state.historyArr.indexOf(item.name);
                            this.$store.state.historyList[this.$store.state.index].flag = 1;
                            //路由跳转
                            this.$router.push(this.$store.state.historyList[this.$store.state.index].url);
                        }
                    }
                }else{
                    this.xtpzDialog=true;
                }
            },
            //关闭历史标签
            close(item){
                this.deletIndex = this.$store.state.historyArr.indexOf(item.name);
                this.$store.state.historyArr.splice(this.deletIndex,1);
                this.$store.state.historyList.splice(this.deletIndex,1);
                //把选中的样式移到上一标签，并转换相应路由
                for(var i=1;i<this.$store.state.historyArr.length;i++){
                    this.$store.state.historyList[i].flag = 0;
                }
                //this.$store.state.isActive = false;
                if(this.$store.state.historyArr.length>0){
                    this.$store.state.historyList[this.deletIndex - 1].flag = 1;
                    this.$router.push(this.$store.state.historyList[this.deletIndex - 1].url);
                }else{
                    //this.$store.state.isActive = true;
                    //this.$router.push("/");
                    this.$store.state.historyList[0].flag = 1;
                    this.$router.push(this.$store.state.historyList[0].url);
                }
            },
            back(){
                if(this.$store.state.index !== 0){
                    this.$store.state.index=this.$store.state.index == "" ? (this.$store.state.historyArr.length-1) : this.$store.state.index;
                    for(var i=0;i<this.$store.state.historyArr.length;i++){
                        this.$store.state.historyList[i].flag = 0;
                    }
                    var index = --this.$store.state.index;
                    this.$store.state.historyList[index].flag = 1;
                    this.$router.push(this.$store.state.historyList[index].url);
                }else{
                    this.b1=1;
                }
            },
            forward(){
                if((this.$store.state.index!==this.$store.state.historyArr.length-1)){
                    if(this.$store.state.index === ""){
                        this.b2=1;
                        return false;
                    }
                    // this.$store.state.index == "" ? (this.$store.state.historyArr.length-1) : this.$store.state.index;
                    for(var i=0;i<this.$store.state.historyArr.length;i++){
                        this.$store.state.historyList[i].flag = 0;
                    }
                    var index = ++this.$store.state.index;
                    this.$store.state.historyList[index].flag = 1;
                    this.$router.push(this.$store.state.historyList[index].url);
                }
            },
            closeAll(){
                var len = this.$store.state.historyArr.length-1;
                this.$store.state.historyArr.splice(1, len);
                this.$store.state.historyList.splice(1, len);
                this.$store.state.historyList[0].flag = 1;
                this.$router.push(this.$store.state.historyList[0].url);
            },
            closeOther(){
//                this.$store.state.index=this.$store.state.index == "" ? (this.$store.state.historyArr.length-1) : this.$store.state.index;
                for(var i = 0,len = this.$store.state.historyList.length;i<len;i++){
                    if(this.$store.state.historyList[i].flag == 1){
                        this.$store.state.index = i
                    }
                }
                var len = this.$store.state.historyArr.length-1;
                var index=this.$store.state.index;
                var obj = this.$store.state.historyList[index];
                this.$store.state.historyArr.splice(1, len);
                this.$store.state.historyList.splice(1, len);
                if(this.$store.state.index != 0){
                    this.$store.state.historyList.push(obj);
                    this.$store.state.historyArr.push(obj.name);
                }
            },
//            closeThis(){
//                this.$store.state.index=this.$store.state.index == "" ? (this.$store.state.historyArr.length-1) : this.$store.state.index;
//                for(var i = 0,len = this.$store.state.historyList.length;i<len;i++){
//                    if(this.$store.state.historyList[i].flag == 1){
//                        this.$store.state.index = i
//                    }
//                }
//                this.$store.state.historyArr.splice(this.$store.state.index, 1);
//                this.$store.state.historyList.splice(this.$store.state.index, 1);
//                var index = --this.$store.state.index;
//                this.$store.state.historyList[index].flag=1;
//                this.$router.push(this.$store.state.historyList[index].url);
//            }
        },
        mounted(){
            if(this.$store.state.historyArr.length == 0){
                this.$store.state.historyList.push({"name":'导航',"url":"/","flag":1,"flag2":false});
                this.$store.state.historyArr.push("导航");
                this.$router.push("/");
            }
        }
    }
</script>
