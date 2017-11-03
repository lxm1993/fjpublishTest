<template>
	<div class="login">
        <h5>登录页面</h5>
        <button type="button" @click="login">登录</button>
    </div>
</template>
<script>
    import api from '~api'
    export default {
        components: {

        },
        data: function() {
            return {}
        },
        methods: {
            login(){
                window.localStorage.setItem('userId','sssss');
                let redirectUrl = this.$route.query.redirect;
                this.$store.commit('setIsLogin', true);
                this.$router.push({ path: redirectUrl });
            },
        }
    }
</script>
<style lang="less" scoped>
    .login{
        position: fixed;
        top: 0;
        left: 0;
    }
</style>
