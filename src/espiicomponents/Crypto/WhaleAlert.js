export class WhaleAlert{

    constructor(){
        this.site = "https://api.whale-alert.io/v1/transactions?api_key=OG4C2LrYETrq39zoj5y6Qer01G7tCUsQ"
        this.data = {}
    }
    fetchData(){
        fetch(this.site,
            {method:"GET"},
            {mode:"cors"},
            {headers:{
            'cache-control':'no-cache',
            "Access-Control-Allow-Origin":"http://bmscis.github.io"
        }})
        .then(response => response.json())
        .then(data => this.clean(data))
        return this.data
    }
    clean(dt){
        var i = 0
        var len = dt.transactions.length

        for(i; i < len; i++){
            this.data[i] = {}
            switch(dt.transactions[i].from.owner_type){
                case "exchange":
                    this.data[i]["from_owner_type"] = dt.transactions[i].from.owner
                    this.data[i]["transaction_type"] = "buy"
                    break
                case "unknown":
                    this.data[i]["from_owner_type"] = dt.transactions[i].from.owner_type
                    this.data[i]["transaction_type"] = "neu"
                    break
                default:
                    this.data[i]["from_owner_type"] = dt.transactions[i].from.owner_type
                    this.data[i]["transaction_type"] = "neu"
                    break
            }
            switch(dt.transactions[i].to.owner_type){
                case "exchange":
                    this.data[i]["to_owner_type"] = dt.transactions[i].to.owner
                    this.data[i]["transaction_type"] = "sell"
                    break
                case "unknown":
                    this.data[i]["to_owner_type"] = dt.transactions[i].to.owner_type
                    this.data[i]["transaction_type"] = "buy"
                    break
                default:
                    this.data[i]["to_owner_type"] = dt.transactions[i].to.owner_type
                    this.data[i]["transaction_type"] = "neu"
                    break
            }
            this.data[i]["symbol"] = dt.transactions[i].symbol
            //this.data[i]["transaction_type"] = dt.transactions[i].transaction_type
            //this.data[i]["from_owner_type"] = dt.transactions[i].from.owner_type
            //this.data[i]["to_owner_type"] = dt.transactions[i].to.owner_type
            this.data[i]["timestamp"] = dt.transactions[i].timestamp
            this.data[i]["amount"] = dt.transactions[i].amount
            this.data[i]["amount_usd"] = dt.transactions[i].amount_usd
            this.data[i]["transaction_count"] = dt.transactions[i].transaction_count
        }
        this.getWhales()
        return
    }
    getWhales(){
        var i = 0
        var len = 99
        for(i; i < len; i++){
            var list = document.createElement('li')
            list.classList.add("list")

            var ls = document.createElement('div')
            ls.id = "whalefrom"
            var fm = document.createElement('div')
            fm.id = "whalemid"
            var dv = document.createElement('div')
            dv.id = "whaleto"

            var symbol = document.createElement('p')
            var sym = window.Espii.whalealert.data[i].symbol
            symbol.innerHTML = sym
            switch(window.Espii.whalealert.data[i].transaction_type){
                case "sell":
                    var arrow = document.createElement('label')
                    arrow.classList.add("arrow")
                    arrow.classList.add("sell")
                    break
                case "buy":
                    var arrow = document.createElement('label')
                    arrow.classList.add("arrow")
                    arrow.classList.add("buy")
                    break
            }
            var frm = window.Espii.whalealert.data[i].from_owner_type
            var fromOwner = document.createElement('p')
            fromOwner.id = "fromowner"
            fromOwner.setAttribute("owner",frm)
            fromOwner.innerHTML = frm

            var dollar = document.createElement('div')
            dollar.innerHTML = "$"

            var to = window.Espii.whalealert.data[i].to_owner_type
            var toOwner = document.createElement('p')
            toOwner.id = "toowner"
            toOwner.setAttribute("owner",to)
            toOwner.innerHTML = to

            var amn = window.Espii.whalealert.data[i].amount
            var amount = document.createElement('p')
            amount.id = "amnt"
            amount.setAttribute("sym",sym)
            amount.innerHTML = amn.toLocaleString()

            var amU = window.Espii.whalealert.data[i].amount_usd
            var amountUsd = document.createElement('p')
            amountUsd.innerHTML = amU.toLocaleString()
            amountUsd.id ="amntusd"
            //var tcc = window.Espii.whalealert.data[i].transaction_count
            //arrow
            ls.appendChild(symbol)            
            ls.appendChild(amount)
            ls.appendChild(fromOwner)     

            fm.appendChild(arrow)
            dv.appendChild(dollar)
            dv.appendChild(amountUsd)

            dv.appendChild(toOwner)
            list.appendChild(ls)
            list.appendChild(fm)
            list.appendChild(dv)
            //list.appendChild(lt)
            document.querySelector("#whaledata").appendChild(list)
        }
        return
    }
}
