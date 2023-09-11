import { CircleIcon } from '@components/icons/icons.tsx'
import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [currentTime, setCurrentTime] = useState(1 * 60)
  const [start, setStart] = useState(false)
  const currentStroke = '#535bf2'

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (start && currentTime === 0) {
      setStart(false)
      setCurrentTime(1 * 60)
      clearInterval(interval as unknown as NodeJS.Timeout)
    }

    if (start && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prevState => prevState - 1)
      }, 1000)
    }

    return () => {
      if (interval != null) clearInterval(interval)
    }
  }, [start, currentTime])

  const toggleStar = () => {
    setStart(prevState => !prevState)
  }

  const timeoutLabel = () => {
    const minutes = ('0' + String(Math.floor(currentTime / 60))).slice(-2)
    const seconds = ('0' + String(Math.floor(currentTime % 60))).slice(-2)
    return `${minutes}:${seconds}`
  }

  const label = timeoutLabel()

  return (
    <>
      <button onClick={toggleStar}>
        <span> {label} </span>
        <CircleIcon
          currentTime={currentTime}
          time={1}
          stroke={currentStroke}
        />
      </button>
    </>
  )
}

export default App
