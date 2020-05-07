const utc_datetime = "2017-03-31T08:02:06Z";

export default function utcTobeijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    const T_pos = utc_datetime.indexOf('T');
    const Z_pos = utc_datetime.indexOf('Z');
    const year_month_day = utc_datetime.substr(0, T_pos);
    const hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    const new_datetime = year_month_day ; // 2017-03-31 08:02:06

    // 处理成为时间戳
    let timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    timestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    const beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
}
