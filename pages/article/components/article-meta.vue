<template>
  <div class="article-meta">
    <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link 
        class="author" 
        :to="{ name: 'profile', params: { username: article.author.username } }"
      >
      {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button 
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following}"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{ article.author.username }}
      <span class="counter">({{ '10' }})</span>
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
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>
</style>