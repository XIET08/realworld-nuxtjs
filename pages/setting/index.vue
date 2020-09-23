<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image"/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required/>
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" required/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required/>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="disabled" >Update Settings</button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'SettingIndex',
  middleware: ['auth'],
  data() {
    return {
      user: {
        bio: '',
        email: '',
        password: '',
        username: '',
        image: ''
      },
      disabled: false
    }
  },
  async mounted() {
    const { data } = await getUser()
    const { bio, email, username, image } = data.user
    this.user = {
      password: '',
      bio,
      email,
      username,
      image,
    }
  },
  methods: {
    onLogout () {
      // 清除容器中的用户信息
      this.$store.commit('setUser', null)
      // 清除cookie中的用户信息
      Cookie.remove('user')
      // 跳转到首页
      this.$router.replace('/')
    },
    async onSubmit () {
      try {
        this.disabled = true
        const { data } = await updateUser({
          user: this.user
        })
        this.disabled = false
        const { user } = data
        // 将用户信息存入容器
        this.$store.commit('setUser', data.user)
        // 将登录状态持久化到 Cookie 中
        Cookie.set('user', data.user)

        this.$router.push({ name: 'profile', params: { username: this.user.username } })
      } catch (error) {
        this.disabled = false
      }
    }
  },
}
</script>

<style>
</style>