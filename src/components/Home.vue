<template>
    <div>
        <list v-for="({ title, cards }, index) in lists" :title="title" :cards="cards" :index="index"></list>
        <list-draft></list-draft>
    </div>
</template>

<script>
    import List from './List';
    import ListDraft from './ListDraft';
    import {mapState, mapActions} from "vuex";
    export default {
        name: "Home",
        components: {
            List,
            ListDraft
        },
        mounted() {
            this.listsUser()
        },
        computed: {
            ...mapState([
                'lists'
            ])
        },
        methods: {
            ...mapActions([
                'listsUser'
            ]),
        }
    }
</script>

<style scoped>
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