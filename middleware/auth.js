export default function ({ store, redirect }) {
    // 未登录状态不允许访问
    if (!store.state.user) {
      return redirect('/login')
    }
}