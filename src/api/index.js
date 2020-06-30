import {post} from "./request"
// 登录
export const login = params => post("/JT808WebApi/Auth/RequestToken",params)

// 报警列表初始化
export const initBaseAlarm = () => post("/JT808WebApi/Alarm/QueryAlarmTop1ToMap")