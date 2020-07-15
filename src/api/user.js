import request from '@/utils/request'

export function login(data) {
  const base64 = require('js-base64').Base64
  data = { username: base64.encode(data.username), password: base64.encode(data.password) }
  return request({
    url: '/api/a/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/a/sys/user/info.json',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/a/logout',
    method: 'post'
  })
}

export function getUserMenu() {
  return request({
    url: '/api/a/menuTree',
    method: 'get'
  })
}

export function changeInfo(data) {
  return request({
    url: '/api/a/sys/user/infoSaveBase',
    method: 'post',
    data,
    type: 'form'
  })
}
export function changePassword(data) {
  const base64 = require('js-base64').Base64
  data = { oldPassword: base64.encode(data.oldPassword), newPassword: base64.encode(data.newPassword), confirmNewPassword: base64.encode(data.confirmNewPassword) }
  return request({
    url: '/api/a/sys/user/infoSavePwd',
    method: 'post',
    params: data
  })
}
//
export function changePwdQA(data) {
  return request({
    url: '/api/a/sys/user/infoSavePqa',
    method: 'post',
    params: data
  })
}
export function getPwdQA(data) {
  return request({
    url: '/api/account/getPwdQuestion',
    method: 'post',
    params: data
  })
}
