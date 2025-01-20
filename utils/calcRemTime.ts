export default function (timeUTC: string, durationMins: number) {
  const [hours, minutes] = timeUTC.split(':').map(Number)
  const now = new Date()
  const nowHours = now.getUTCHours()
  const nowMinutes = now.getUTCMinutes()
  
  // Difference in minutes
  const elapsedHours = nowHours - hours
  const elapsedMinutes = nowMinutes - minutes
  const elapsedTimeMins = elapsedHours * 60 + elapsedMinutes
  
  // Remaining time in minutes
  const remainingTimeMins = durationMins - elapsedTimeMins
  
  return remainingTimeMins
}
