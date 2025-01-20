export default function (dateTime: string) {
  const [date, time] = dateTime.split('T')
  const formattedDate = date.split('-').reverse().join('/')
  const formattedTime = time.split('+')[0].split(':').slice(0, 2).join(':')
  return {
    formattedDate,
    formattedTime,
  }
}
