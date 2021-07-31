import { Action, thunk, action, Thunk, ActionOn, actionOn } from 'easy-peasy'
import { User } from '../types/user'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { StoreModel } from './index'
import axios from 'axios'

export interface UserModel {
  data: User
  setUser: Action<UserModel, User>
  getUser: Thunk<UserModel>
}

const initialUser: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  isAdmin: false,
}

const user: UserModel = {
  data: initialUser,
  setUser: action((state, payload) => {
    state.data = payload
  }),
  getUser: thunk(async actions => {
    try {
      const { data } = await axios.get('')
      const user = data.user
      actions.setUser(user)
    } catch (err) {
      console.log('err', err)
    }
  })
}

export default user
