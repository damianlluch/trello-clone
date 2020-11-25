<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="text" v-model="user" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                user : "",
                password : "",
            }
        },
        methods: {
            register: function () {
                let username = this.user
                let password = this.password
                this.$store.dispatch('register', { username, password })
                    .then(() => this.$router.push('/home'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>