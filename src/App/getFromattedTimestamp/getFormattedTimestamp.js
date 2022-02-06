
export default function getFormatedTimestamp(timestamp) {
  if (timestamp === undefined || timestamp === null) {
    return ''
  }
  // let t = new Date(timestamp);
  let t = timestamp;
  let hours = ('0' + String(t.getHours())).slice(-2);
  let minutes  = ('0' + String(t.getMinutes())).slice(-2);
  let seconds = ('0' + String(t.getSeconds())).slice(-2);

  let day = ('0' + String(t.getDate())).slice(-2);
  let month = ('0' + String(t.getMonth() + 1)).slice(-2);
  let year = t.getFullYear();
  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`
}