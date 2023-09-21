import { type Time } from '@/models/time.interface.ts'
import { TabStyled } from '@components/tab/tab.styled.tsx'

interface Props {
  timeList: Time[]
}

export const Tab = (props: Props) => {
  const { timeList } = props

  return (
    <>
      <h1>pomodoro</h1>
      <TabStyled>
        {
          timeList.map(time => (
            <li className='active' key={time.id}>
              <button>
                <span>{time.name}</span>
              </button>
            </li>
          ))
        }
      </TabStyled>
    </>
  )
}
