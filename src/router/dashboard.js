import Dashboard from '../model/Dashboard/Dashboard'
import DashboradList from '../model/Dashboard/DashboardList'

const dashboardRouter = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  redirect: { name: 'DashboradList' },
  children:[
    {
      path: 'list',
      name: 'DashboradList',
      component: DashboradList,
      props: true
    }
  ] 
}

export default dashboardRouter