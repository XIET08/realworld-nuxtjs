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
        :disabled="isDeleting"
        @click="deleteArticle()"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following}"
        :disabled="isFollowing"
        @click="onFollowing(article.author)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }}
        <!-- <span class="counter">({{ '10' }})</span> -->
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        @click="onFavorite(article)"
        :disabled="isFavorating"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
        <span
          class="counter"
        >({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
import { addFavorite, deleteFavorite } from '@/api/article'

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
  data() {
    return {
      isDeleting: false,
      isFollowing: false,
      isFavorating: false
    }
  },
  methods: {
    async deleteArticle() {
      try {
        this.isDeleting = true
        await deleteArticle(this.article.slug)
        this.isDeleting = false
        this.$router.push('/')
      } catch (error) {
        this.isDeleting = false
      }
    },
    async onFollowing(profile) {
      this.isFollowing = true
      if (profile.following) {
        await unFollowUser()
        profile.following = false
      } else {
        await followUser()
        profile.following = true
      }
      this.isFollowing = false
    },
    async onFavorite(article) {
      this.isFavorating = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      this.isFavorating = false
    }
  }
}
</script>

<style>
</style>