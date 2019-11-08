const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
console.log('calling getMore')
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  console.log('event is ')
  console.log(event)
  var thisSeries = event.series;

  console.log('series is ')
  console.log(event.series)

  // 先取出集合记录总数
  const countResult = await db.collection('detail').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []


  for (let i = 0; i < batchTimes; i++) {
      const po = db.collection('detail').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({ series: event.series }).get()
      console.log('po is '+po);
      tasks.push(po)
    }



  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}