export const getTimeoutLabel = (time: number) => {
  const minutes = ('0' + String(Math.floor(time / 60))).slice(-2)
  const seconds = ('0' + String(Math.floor(time % 60))).slice(-2)
  return `${minutes}:${seconds}`
}

export const getPomodoroLabelStatus = (isRunning: boolean, time: number) => {
  const textLabel = isRunning ? 'Pause' : 'Start'
  return isRunning && time <= 0 ? 'Restart' : textLabel
}
