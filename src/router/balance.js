import Balance from '../model/Balance/Balance'
import BalanceList from '../model/Balance/BalanceList'

const balanceRouter = {
  path: '/balance',
  name: 'Balance',
  component: Balance,
  redirect: { name: 'BalanceList' },
  children:[
    {
      path: 'list',
      name: 'BalanceList',
      component: BalanceList,
      props: true
    }
  ] 
}

export default balanceRouter