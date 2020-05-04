// val:秒数
export default function secondTohour(val){
    if(val<60){
        return val + "\t秒";
    }else{

        const min_total = Math.floor(val / 60); // 分钟
        const sec = Math.floor(val % 60); // 余秒

        if(min_total<60){
            return min_total + "\t分钟" + sec + "\t秒";
        }else{
            const hour_total = Math.floor(min_total / 60); // 小时数
            const min = Math.floor(min_total % 60); // 余分钟

            return hour_total + "\t小时" + min + "\t分钟" + sec + "\t秒";
        }
    }
}