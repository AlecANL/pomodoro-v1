import { TabItem, TabStyled } from '@components/tab/tab.styled.tsx'
import { type SettingItem } from '@/models/time.interface.ts'

interface Props {
  timeList: SettingItem[]
  onChangeTime: (time: SettingItem) => void
  timeSelected: SettingItem
}

export const Tab = (props: Props) => {
  const { timeList, timeSelected, onChangeTime } = props

  const getActiveClassName = (id: string) => timeSelected.id === id ? 'active' : ''

  return (
    <>
      <TabStyled>
        {
          timeList.map(time => (
            <TabItem className={getActiveClassName(time.id)} key={time.id}>
              <button onClick={() => {
                onChangeTime(time)
              }}>
                <span>{time.name}</span>
              </button>
            </TabItem>
          ))
        }
      </TabStyled>
    </>
  )
}
