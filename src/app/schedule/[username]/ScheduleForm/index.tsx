'use client'
import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import ConfirmStep from './CofirmStep'

export const ScheduleForm = () => {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => {
    setSelectDateTime(null)
  }

  if (selectDateTime)
    return (
      <ConfirmStep
        onCancelConfirmation={handleClearSelectedDateTime}
        schedulingDate={selectDateTime}
      />
    )

  return <CalendarStep onSelectDateTime={setSelectDateTime} />
}
