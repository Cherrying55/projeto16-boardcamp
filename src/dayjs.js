import dayjs from "dayjs";


let d = dayjs()
let d2 = dayjs('05-03-2022');
let d3 = d.diff(d2, 'days');

let a = ("05/01/2023")
let formatado = dayjs(a).format('DD-MM-YYYY');
    let diferença = dayjs().diff(dayjs(formatado), 'days');

console.log(diferença)