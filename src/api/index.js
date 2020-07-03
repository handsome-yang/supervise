import {post} from "./request"

// 登录
export const login = params => post("/JT808WebApi/Auth/RequestToken",params)


// 报警列表初始化
// export const initBaseAlarm = () => post("/JT808WebApi/Alarm/QueryAlarmTop1ToMap")


// 根据报警类型筛选数据
export const QuerySpecifyTypeCarAlarm = () => post("/JT808WebApi/Alarm/QuerySpecifyTypeCarAlarm")


// 七日报警统计 
export const QueryWeekAlarmStatistics = () => post("/JT808WebApi/Alarm/QueryWeekAlarmStatistics")