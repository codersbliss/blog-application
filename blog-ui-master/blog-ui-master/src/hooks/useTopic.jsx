import { useContext } from 'react'
import TopicContext from '../context/TopicContext'

const useTopic = () => useContext(TopicContext)
  
export default useTopic
