import Frequencimetro from '../views/Frequencimetro'
import usersRouter from './users' 
import balanceRouter from './balance'
// import constructionRoutr from './construction'
// import calendarRouter from './calendar'
// import balanceRouter from './balance'
// import deshboardRouter from './deshboard'


const FrequencimetroRouter = {
  path: '/',
  name: 'Frequencimetro',
  component: Frequencimetro,
  children: []
}

FrequencimetroRouter.children.push(usersRouter)
FrequencimetroRouter.children.push(balanceRouter)


// BackofficeRouter.children.push(calendarRouter)
// BackofficeRouter.children.push(balanceRouter)
// BackofficeRouter.children.push(deshboardRouter)


export default FrequencimetroRouter
