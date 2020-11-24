// 补0函数
export function addZero(s) {
    return s < 10 ? '0' + s : s
}

export function format(value) {
    let minute = Math.floor(value / 60)
    let second = Math.floor(value % 60)
    return `${addZero(minute)}:${addZero(second)}`
}

export function formatUrl(value) {
    return "http://p4.music.126.net/HUs7hjdVXSJeWct-iWsgsw==/"+value+".jpg"
}
