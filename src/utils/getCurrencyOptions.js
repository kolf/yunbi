const currencyAll = ["btccny", "ethcny", "dgdcny", "btscny", "sccny", "etccny", "1stcny", "repcny", "anscny", "zeccny", "gntcny", "qtumcny", "gxscny", "eoscny", "sntcny", "bcccny", "omgcny"]

export default function getCurrencyOptions(keys){
    if(!Array.isArray(keys)){
        return []
    }else{
        return currencyAll.reduce((result, next, index) => {
            const key = index + 1
            if(keys.indexOf(key)!==-1){
                result.push({
                    label: next,
                    value: key
                })
            }

            return result
        }, [])
    }
}