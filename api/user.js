// import request from '@/utils/request'
import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}

// 获取用户信息
export const getUser = () => {
    return request({
        method: 'GET',
        url: '/api/user',
    })
}

// 更新用户信息
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    })
}

// 关注用户
export const followUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

// 关注用户
export const unFollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}