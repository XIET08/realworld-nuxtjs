<template>
  <div>
    <form class="card comment-form" @submit.prevent="submitComment">
      <div class="card-block">
        <textarea 
          class="form-control" 
          placeholder="Write a comment..." 
          rows="3"
          v-model="comment"
          required
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.user.image" class="comment-author-img" />
        <button 
          class="btn btn-sm btn-primary"
          :disabled = "disabled"
        >Post Comment</button>
      </div>
    </form>

    <div 
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <router-link class="comment-author" :to="{ name: 'profile', params: { username: comment.author.username } }">
          <img :src="comment.author.image" class="comment-author-img" />
        </router-link>
        &nbsp;
        <router-link class="comment-author" :to="{ name: 'profile', params: { username: comment.author.username } }">
          {{ comment.author.username }}
        </router-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from '@/api/article'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [],  // 评论列表
      comment: '',
      disabled: false
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async submitComment () {
      this.disabled = true
      try {
        const { data } = await addComment({ 
          comment: { body: this.comment}
        }, this.article.slug)
        this.disabled = false
        this.comments.push(data.comment)
        this.comment = ''
      } catch (error) {
        this.disabled = false
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>