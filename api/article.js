// import request from '@/utils/request'
import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取用户文章列表
export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params,
        // headers: {
        //     // 添加用户身份，数据格式：Token空格Token数据
        //     Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE1NTc4LCJ1c2VybmFtZSI6Inh4eHgwMDAiLCJleHAiOjE2MDU2OTA5MTZ9.Z-F1ohamvk0723AYYAaGvLIVIayFK-42jov7GeSyql4`
        // }
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`,
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`,
    })
}

// 发布文章
export const publishArticle = data => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}

// 编辑文章
export const editArticle = (data, slug) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}

// 删除文章
export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`
    })
}

// 发布评论
export const addComment = (data, slug) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}