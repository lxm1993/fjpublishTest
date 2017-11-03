<template>
    <div>
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
                this.$emit('loginClick');
            }
        }
    }
</script>
