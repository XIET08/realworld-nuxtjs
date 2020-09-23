<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4> {{ profile.username }}</h4>
            <p> {{ profile.bio }} </p>
            <router-link 
              class="btn btn-sm btn-outline-secondary action-btn" 
              v-if="isUser" 
              :to="{ name: 'setting' }">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
            <button 
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span 
                  class="nav-link" 
                  :class="{ active: this.tab === 'author' }" 
                  @click="toggleTab('author')"
                >
                  My Articles</span>
              </li>
              <li class="nav-item">
                <span 
                  class="nav-link" 
                  :class="{ active: this.tab === 'favorited' }" 
                  @click="toggleTab('favorited')"
                >
                  Favorited Articles</span>
              </li>
            </ul>
          </div>

          <article-item 
            v-for="article in articles" 
            :key="article.id"
            :article = "article"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '@/api/profile'
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item.vue'

export default {
    name: 'ProfileIndex',
    middleware: ['auth'],
    components: {
      ArticleItem
    },
    computed: {
      isUser () {
        return this.$store.state.user.username === this.profile.username
      }
    },
    data () {
      return {
        profile: {},
        articles: [],
        tab: 'author'
      }
    },
    async mounted () {
      this.getProfile()
      this.getArticle()
    },
    methods: {
      async getProfile() {
        const { data } = await getProfile(this.$route.params.username)
        this.profile = data.profile
      },
      async getArticle(tab = 'author') {
        const { data } = await getArticles({
          [tab]: this.$route.params.username
        })
        const { articles } = data
        articles.forEach(article => article.favoriteDisabled = false)
        this.articles = articles
      },
      toggleTab (tab) {
        this.tab = tab
        this.getArticle(tab)
      }
    },
}
</script>

<style>

</style>
