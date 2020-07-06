import * as signalR from "@aspnet/signalr";

export const transportInitWebSocket = vm => {
    const token = sessionStorage.getItem("token")
    const rules = ["超速报警","疲劳驾驶报警","终端插入报警"]
    window.signalRConn = new signalR.HubConnectionBuilder()
        .withUrl(window.API_ROOT + "/PositionHub?Bearer=" + token)
        .build();
        
    window.signalRConn.on("ReceiveMessage", (TerminalNo, message) => {
        message = JSON.parse(message);
        if (!message.vno) return;
        if(!message.alarm_type_name) return;
        if(message.alarm_type_name)
        if(vm.tableData.length > 5000){
            vm.tableData.pop()
        }
        if(rules.includes(message.alarm_type_name)){
            console.log(message );
            vm.tableData.unshift(message)
        }
        
        // //更新右上角表格的报警信息
        // transportAlarmableUpdateRow(message, wgs84togcj02, status);
    });
    window.signalRConn.on("CarHeartbeat", (TerminalNo, message) => {
        message = JSON.parse(message);
        // console.log(TerminalNo, message);
        
        //console.log("CarHeartbeat",message);
        // if (message.alarm_type_name == "车辆故障码") return;
        // //没有就先忽略
        // if (!window.transportCarLocationMap) return;
        // if (!window.transportCarLocationMap.hasOwnProperty(message.terminal_sim)) return;
        // //更新左边的车辆状态表
        // let carStatusRow = window.transportCarLocationMap[message.terminal_sim];
        // if (carStatusRow) {
        //     carStatusRow.date = message.gps_time;
        //     if (carStatusRow.status == "在线") {
        //         carStatusRow.status = "离线";
        //         let trStr = "<tr class='text-danger' car-status-row=" + carStatusRow.terminal_sim + ">";
        //         trStr += "<td>" + carStatusRow.vno + "</td>";
        //         trStr += "<td>" + carStatusRow.status + "</td>";
        //         trStr += "<td>" + dayjs.unix(carStatusRow.date).format('HH:mm:ss') + "</td>";
        //         trStr += "<td>" + "挂车" + "</td>";
        //         trStr += "<td>"+carStatusRow.driver_name+"</td>";
        //         trStr + "</tr>";
        //         $("#transportVehicleTable>tbody tr[car-status-row='" + message.terminal_sim + "']").remove();
        //         $("#transportVehicleTable>tbody").prepend(trStr);
        //     } else {
        //         let trStr = "<td>" + carStatusRow.vno + "</td>";
        //         trStr += "<td>" + carStatusRow.status + "</td>";
        //         trStr += "<td>" + dayjs.unix(carStatusRow.date).format('HH:mm:ss') + "</td>";
        //         trStr += "<td>" + "挂车" + "</td>";
        //         trStr += "<td>"+carStatusRow.driver_name+"</td>";
        //         $("#transportVehicleTable>tbody tr[car-status-row='" + message.terminal_sim + "']").html(trStr);
        //     }
        // }
    });

    // window.signalRConn.on("AlarmVoice", (voiceId) => {
    //     let url = 'https://api-dev.guojutech.net/factoring-voice/voice/playVoice?id=' + voiceId;
    //     if(!window.AlarmVoiceArray) return;
    //     if(window.AlarmVoiceArray.length>5) return;
    //     window.AlarmVoiceArray.push(url);
    // });
    window.signalRConn.start().catch(err => console.error(err));
}
