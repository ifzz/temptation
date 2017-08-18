import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql'

export const UserType = new GraphQLObjectType({
  name: 'user',
  description: '用户类型',
  fields: {
    id: {
      type: GraphQLString,
      description: 'ID',
      resolve: o => o['_id'],
    },
    username: {
      type: GraphQLString,
      description: '登录名',
      resolve: o => o.username,
    },
    joinDate: {
      type: GraphQLString,
      description: '加入日期',
      resolve: o => o.createdate.toLocaleString(),
    },
    age: {
      type: GraphQLString,
      description: '年龄',
      resolve: o => o.profiles.age,
    },
    nickname: {
      type: GraphQLString,
      description: '昵称',
      resolve: o => o.profiles.nickname,
    },
    avatar: {
      type: GraphQLString,
      description: '头像',
      resolve: o => o.profiles.avatar,
    },
    phone: {
      type: GraphQLString,
      description: '手机号',
      resolve: o => o.profiles.phone,
    },
    email: {
      type: GraphQLString,
      description: '邮箱',
      resolve: o => o.profiles.email,
    },
  },
})

export const UserListType = new GraphQLList(UserType)
