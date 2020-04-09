import Frequencimetro from '../views/Frequencimetro'
import studentRouter from './student' 
import balanceRouter from './balance'

const FrequencimetroRouter = {
  path: '/',
  name: 'Frequencimetro',
  component: Frequencimetro,
  children: []
}

FrequencimetroRouter.children.push(studentRouter)
FrequencimetroRouter.children.push(balanceRouter)



export default FrequencimetroRouter
