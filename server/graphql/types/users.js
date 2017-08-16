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
      resolve: o => o['_id'],
    },
    nickname: {
      type: GraphQLString,
      resolve: o => o.nickname,
    },
    username: {
      type: GraphQLString,
      resolve: o => o.username,
    },
    age: {
      type: GraphQLString,
      resolve: o => o.age,
    },
    avatar: {
      type: GraphQLString,
      resolve: o => o.avatar,
    },
    birthday: {
      type: GraphQLString,
      resolve: o => o.birthday,
    },
    address: {
      type: GraphQLString,
      resolve: o => o.address,
    },
    hometown: {
      type: GraphQLString,
      resolve: o => o.hometown,
    },
    city: {
      type: GraphQLString,
      resolve: o => o.city,
    },
    phone: {
      type: GraphQLString,
      resolve: o => o.phone,
    },
    email: {
      type: GraphQLString,
      resolve: o => o.email,
    },
    gender: {
      type: GraphQLString,
      resolve: o => o.gender,
    },
  },
})

export const UserListType = new GraphQLList(UserType)
