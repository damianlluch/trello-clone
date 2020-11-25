<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>User</label>
            <input required v-model="user" type="text" placeholder="Name"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return {
                user : "",
                password : ""
            }
        },
        methods: {
            login: function () {
                let username = this.user
                let password = this.password
                this.$store.dispatch('login', { username, password })
                    .then(() => this.$router.push('home'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>