import Frequencimetro from '../views/Frequencimetro'
import studentRouter from './student' 
import balanceRouter from './balance'
import dashboradRouter from './dashboard'

const FrequencimetroRouter = {
  path: '/',
  name: 'Frequencimetro',
  component: Frequencimetro,
  children: []
}

FrequencimetroRouter.children.push(studentRouter)
FrequencimetroRouter.children.push(balanceRouter)
FrequencimetroRouter.children.push(dashboradRouter)




export default FrequencimetroRouter
