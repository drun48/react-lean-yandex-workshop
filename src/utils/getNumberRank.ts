export default function getNumberRank(value:number, runk:number = 0){
    const valueStr = value.toString()
    if(valueStr.length >= runk) return valueStr
    return new Array(runk - valueStr.length).fill('0').join('') + valueStr
}