export interface FormStateInterface {
  pomodoro: FormStateValues
  shortBreak: FormStateValues
  longBreak: FormStateValues
  font: FormStateValues
  color: FormStateValues

}

export interface FormStateValues {
  value: string | number
  isValid: boolean
}
