<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home', query: { tab: 'your_feed' }}"
                  :class="{ active: tab === 'your_feed'}"
                  exact
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home'}"
                  :class="{ active: tab === 'global_feed'}"
                  exact
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home', query:{ tag: tag, tab: 'tag'}}"
                  :class="{ active: tab === tag }"
                  exact
                ># {{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <article-item 
            v-for="article in articles" 
            :key="article.id"
            :article = "article"
          />

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{active: page == item }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: tag,
                    tab: tab,
                  }
                }"
                >{{ item }}</nuxt-link>
                <!-- <a class="page-link" :href="'/?page=' + item">{{ item }}</a> -->
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <router-link
                :to="{ name: 'home', query: {tag: item, tab: 'tag'} }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{ item }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getYourFeedArticles
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import ArticleItem from '@/components/article-item.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleItem
  },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    const loadArticles =
      tab === 'global_feed' ? getArticles : getYourFeedArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    // 为每一篇文章添加点赞按钮点击状态，用于防止重复点击
    articles.forEach((article) => (article.favoriteDisabled = false))

    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tab,
      tag
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
