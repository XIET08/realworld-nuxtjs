<template>
  <div class="article-meta">
    <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        class="author"
        :to="{ name: 'profile', params: { username: article.author.username } }"
      >{{ article.author.username }}</router-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="canModify">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        :to="{name: 'editor', params: {slug: article.slug}}"
      >
        <i class="ion-edit"></i> Edit Article
      </router-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :class="{ disabled: isDeleting}"
        :disabled = "isDeleting"
        @click="deleteArticle()"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{ active: article.author.following}">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{ article.author.username }}
        <!-- <span class="counter">({{ '10' }})</span> -->
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    canModify() {
      return this.$store.state.user.username === this.article.author.username
    }
  },
  data () {
    return {
      isDeleting: false
    }
  },
  methods: {
    async deleteArticle () {
      try {
        this.isDeleting = true
        await deleteArticle(this.article.slug)
        this.isDeleting = false
        this.$router.push('/')
      } catch (error) {
        this.isDeleting = false
      }
    }
  },
}
</script>

<style>
</style>