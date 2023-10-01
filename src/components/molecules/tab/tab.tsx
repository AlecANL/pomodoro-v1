import { TabItem, TabStyled } from '@components/molecules/tab/tab.styled.tsx'
import { type SettingItem } from '@/models/time.interface.ts'
import { type SettingItemType } from '@/models/settings-state.interface.ts'
import { getActiveClassName } from '@/utils/time.utils.ts'

interface Props {
  timeList: SettingItem[]
  onChangeTime: (time: SettingItem) => void
  timeSelected: SettingItemType
}

export const Tab = (props: Props) => {
  const { timeList, timeSelected, onChangeTime } = props

  return (
    <>
      <TabStyled>
        {
          timeList.map(time => (
            <TabItem className={getActiveClassName(time.id, timeSelected)} key={time.id}>
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
