import Users from '../model/Usera//Users'
import UsersList from '../model/Usera/UsersList'

const userseRouter = {
  path: '/users',
  name: 'Users',
  component: Users,
  redirect: { name: 'UsersList' },
  children:[
    {
      path: 'list',
      name: 'UsersList',
      component: UsersList,
      props: true
    }
  ] 
}

export default userseRouter