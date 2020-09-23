<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="inputTag"
                  @keydown.enter="addTag"
                />
                <div class="tag-list">
                  <span v-for="tag in article.tagList" class="tag-default tag-pill" :key="tag">
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submitArticle"
                :disabled="disabled"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, publishArticle, editArticle } from '@/api/article'

export default {
  name: 'EditorIndex',
  middleware: ['auth'],
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      inputTag: '',
      disabled: false,
      slug: ''
    }
  },
  mounted() {
    const { slug } = this.$route.params
    if (slug) {
      this.slug = slug
      this.getArticle(slug)
    }
  },
  methods: {
    async getArticle(slug) {
      const { data } = await getArticle(slug)
      this.article = data.article
    },
    async submitArticle() {
      this.disabled = true
      const requestData = {
        article: this.article
      }
      try {
        const { data } = this.slug
          ? await editArticle(requestData, this.slug)
          : await publishArticle(requestData)
        this.disabled = false
        this.$router.push({
          name: 'article',
          params: { slug: data.article.slug }
        })
      } catch (error) {
        this.disabled = false
      }
    },
    addTag() {
      if (this.inputTag) {
        this.article.tagList.push(this.inputTag)
        this.inputTag = ''
      }
    },
    removeTag(tag) {
      const index = this.article.tagList.findIndex((item) => item === tag)
      this.article.tagList.splice(index, 1)
    }
  }
}
</script>

<style>
</style>