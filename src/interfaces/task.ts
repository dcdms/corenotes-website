import type { TASK_COLOR_CLASSNAMES } from '@/constants/task-color-classnames'

export interface Task {
  id: string
  title: string
  description: string
  color: keyof typeof TASK_COLOR_CLASSNAMES
  favorite: boolean
}
