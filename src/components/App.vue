<template>
  <div class="app">
    <header>
      <a href="https://github.com/damianlluch">
        <h1 class="logo">Trollo</h1>
      </a>
    </header>
    <main>
        <div id="nav">
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link> |
          <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
        </div>
        <router-view/>
    </main>
  </div>
</template>

<script>

export default {
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
body {
  background-color: #c24558;
}
h1, h2, h3, h4 {
  margin: 0;
}

@font-face {
  font-family: 'Noto Sans Japanese';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff2) format('woff2'),
  url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff) format('woff'),
  url(https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf) format('opentype');
}
</style>

<style lang="scss" scoped>
.app {
  font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
  font-weight: 700;
  color: #242424;
  width: 100%;
  height: 100%;

  header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: calc(100% - 40px);
    height: 100px;

    a {
      text-decoration: none;
      h1.logo {
        font-family: 'Pacifico', cursive;
        font-weight: normal;
        font-size: 48px;
        color: #fff;
      }
    }

    a:hover {
      h1.logo {
        opacity: 0.7;
      }
    }
  }

  main {
    padding: 0 20px;
    display: flex;
    overflow-x: scroll;
    width: calc(100% - 40px);
    height: calc(100% - 100px);
  }
}
</style>

