
const TimeUtil = {
  add0(m) { return m < 10 ? '0' + m : m }
  ,
  timestamp2String(timestamp) {
    var date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const MM = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const s = date.getSeconds();
    return this.add0(yyyy) + '-' + this.add0(MM) + '-' + this.add0(dd) + ' ' + this.add0(hh) + ':' + this.add0(mm)
  }
}
export default {
  TimeUtil: TimeUtil
};