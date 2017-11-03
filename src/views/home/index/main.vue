<template>
    <div class="con">
        <div class="xssl">新手上路</div>
        <div class="lc">
            <div class="operate">
                <div class="op1">
                    <div @click="goGoods('商品信息','goodsDetail')"></div>
                    <i></i>
                </div>
                <div class="op2">
                    <div @click="goGoods('进货入库单','ware')"></div>
                    <i></i>
                </div>
                <div class="op3">
                    <div @click="goGoods('会员信息','vipManage')"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import store from '.././index'
    export default {
        components: {

        },
        computed: {
            index(){
                return store.state.index
            }
        },
        data:function(){
            return{

            }
        },
        created:function () {

        },
        methods: {
            goGoods(name,url){
                if(store.state.historyArr.indexOf(name) == -1){
                    //选中当前页样式
                    for(var i=0;i<store.state.historyArr.length;i++){
                        store.state.historyList[i].flag = 0;
                        console.log(store.state.historyList[i]);
                    }
                    store.state.isActive = false;
                    //添加到历史记录标签
                    store.state.historyArr.push(name);
                    store.state.historyList.push({"name":name,"url":url,"flag":1});
                    //路由跳转
                    this.$router.push(url);
                }else{
                    //选中当前页样式
                    for(var i=0;i<store.state.historyArr.length;i++){
                        store.state.historyList[i].flag = 0;
                    }
                    store.state.isActive = false;
                    store.state.index = store.state.historyArr.indexOf(name);
                    store.state.historyList[ store.state.index].flag = 1;
                    //路由跳转
                    this.$router.push(store.state.historyList[store.state.index].url);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .con{
        min-width:1200px;
        /*width:1500px;*/
        height:500px;
        padding:10px 40px;
        .xssl{
            width: 65px;
            height: 20px;
            padding: 15px;
            border-left: 2px solid #FFA004;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            background-color: #fff;
            float: left;
        }
        .lc{
            height: 100%;
            border: 1px solid #ddd;
            margin-left: 96px;
            .operate{
                width:1300px;
                height:200px;
                margin: 50px 10px 0 50px;
                .op1{
                    width:180px;
                    height:100px;
                    position:relative;
                    float:left;
                    div{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                        background-color: #A6D895;
                        background-image: url("../../../assets/img/xssl/xsgl.png");
                        background-repeat: no-repeat;
                        background-position:center;
                    }
                    i{
                        width: 40px;
                        height: 25px;
                        display: block;
                        position: absolute;
                        left: 115px;
                        top: 40px;
                        background-image: url("../../../assets/img/xssl/jiantou.png");
                        background-repeat: no-repeat;
                        background-position:center;
                    }
                }
                .op2{
                        width:180px;
                        height:100px;
                        position:relative;
                        float:left;
                    div{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                        background-color: #97A7D8;
                        background-image: url("../../../assets/img/xssl/jxctz.png");
                        background-repeat: no-repeat;
                        background-position:center;
                    }
                    i{
                        width: 40px;
                        height: 25px;
                        display: block;
                        position: absolute;
                        left: 115px;
                        top: 40px;
                        background-image: url("../../../assets/img/xssl/jiantou.png");
                        background-repeat: no-repeat;
                        background-position:center;
                    }
                }
                .op3{
                        width:180px;
                        height:100px;
                        position:relative;
                        float:left;
                    div{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                        background-color: #97C8D8;
                        background-image: url("../../../assets/img/xssl/dygl.png");
                        background-repeat: no-repeat;
                        background-position:center;
                    }
                }
            }
        }
    }
</style>
