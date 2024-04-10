const express = require('express')



const Sell = require("./routes/log");
const app = express()
require('dotenv').config()
accounts = process.env.accounts
accounts = accounts.split(",")
privateKey = process.env.privateKey
urlw = process.env.provider
privateKey = privateKey.split(",")


var nonce = [0, 0, 0, 0, 0]

//web init
//original
const uniswapABI = require('./uniswapabi.json');
const balancerABI = require('./balancer.json')
const keccak256 = require('keccak256')
const Web3 = require('web3');
const BN = require("bignumber.js")
const math = require("math")
const WebSocket = require('ws')
const BlocknativeSdk = require('bnc-sdk');
const ws1 = new WebSocket('wss://api.blocknative.com/v0');

const uniswap_address = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const panc_address = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";
var deadline = new BN()
deadline = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const check = require("./erc20.json");
const res = require('express/lib/response');
const {
  acos
} = require('math');
const {
  Pool
} = require('@uniswap/v3-sdk');
const {
  body
} = require('express-validator');
//var urlw = "wss://mainnet.infura.io/ws/v3/1c6439bc40c3405bb1a0614c71218d03"; //change this for mainnet to "wss://mainnet.infura.io/ws/v3/1c6439bc40c3405bb1a0614c71218d03""wss://mainnet.infura.io/ws/v3/1c6439bc40c3405bb1a0614c71218d03"
const WETHaddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //change this for mainnet to 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
let PairAddress
let sellpair
var flag = true;
var bailout = false;

const options = {
  timeout: 30000,
  clientConfig: {
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,

    keepalive: true,
    keepaliveInterval: 60000 // ms
  },
  reconnect: {
    auto: true,
    delay: 5000,
    maxAttempts: 150,
    onTimeout: false,
  },
};

const web3 = new Web3(new Web3.providers.WebsocketProvider(urlw, options));

const uniswap = new web3.eth.Contract(uniswapABI, uniswap_address);
const balancer = new web3.eth.Contract(balancerABI, panc_address)
// const panc = new web3.eth.Contract(uniswapABI,panc_address)

//initializations !!!

routeradd = uniswap_address

//App routines
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("views"))
app.use(express.urlencoded({
  extended: false
}))




app.post("/Run", async (req, res) => {
  // console.log(req.body.antibot)
  // console.log(req.body.dead.DeadBlocks,req.body.GasLimit,req.body.GasPrice)
  PairAddress = req.body.PairAdress
  PairAddress = PairAddress.split(",")
  PairAddress.push(req.body.ContractAddress)
  sellpair = req.body.PairAdress
  sellpair = sellpair.split(",")
  sellpair.push(req.body.ContractAddress)
  // console.log("buy pair", PairAddress)

  // var date = new Date()
  // date.toISOString()
  // init1 = {
  //   "timeStamp": date,
  //   "dappId": "3280b7ad-3ca4-41eb-9ef2-41055a4ab35a",
  //   "version": "1",

  //   "blockchain": {
  //     "system": "ethereum",
  //     "network": "main"
  //   },
  //   "categoryCode": "initialize",
  //   "eventCode": "checkDappId"
  // }
  // ws1.send(JSON.stringify(init1))
  // ws1.onopen= ()=>{ws1.send(JSON.stringify(init1));}
  // ws1.onmessage=(event)=>{console.log(event.data)}



  // ws.on('connection', function connection(ws) {
  //   ws.on('message', function message(data) {
  //     console.log('received: %s', data);
  //   }); 
  // });

  sellpair[0] = PairAddress[PairAddress.length - 1]
  sellpair[sellpair.length - 1] = WETHaddress
  // console.log("sell pair ", sellpair)
  // console.log("buy pair", PairAddress)
  if (req.body.BuyStrategy == "9") {
    console.log("Buy Strategy 9")

    console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
    if (req.body.DeadBlocks != "" && req.body.GasLimit != "" && req.body.GasPrice != "" && req.body.BuyTx != "" && req.body.EthtoPay != "" && req.body.ContractAddress != "" && req.body.DevAddress != "" && req.body.StartingFunction != "" && req.body.DevAddress.length == 42 && req.body.ContractAddress.length == 42) {

      c = await ListentoMempool9(req.body.BuyTx, req.body.EthtoPay, req.body.ContractAddress, req.body.DevAddress, req.body.StartingFunction, req.body.DeadBlocks, req.body.GasLimit, req.body.Gasprice, parseInt(req.body.Wallets))

    } else if (req.body.BuyTx != "" && req.body.EthtoPay != "" && req.body.ContractAddress != "" && req.body.DevAddress != "" && req.body.StartingFunction != "" && req.body.DevAddress.length == 42 && req.body.ContractAddress.length == 42) {

      c = await ListentoMempool9(req.body.BuyTx, req.body.EthtoPay, req.body.ContractAddress, req.body.DevAddress, req.body.StartingFunction, 0, 0, 0, parseInt(req.body.Wallets))

    } else {
      //console.log("Erros")
      res.render("", {
        DeadBlocks: req.body.DeadBlocks,
        GasLimit: req.body.GasLimit,
        GasPrice: req.body.GasPrice,
        BuyTx: req.body.BuyTx,
        EthtoPay: req.body.EthtoPay,
        ContractAddress: req.body.ContractAddress,
        DevAddress: req.body.DevAddress,
        StartingFunction: req.body.StartingFunction
      })
    }
  } else {
    console.log(11)

    console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
    if (req.body.DeadBlocks != "" && req.body.GasLimit != "" && req.body.GasPrice != "" && req.body.BuyTx != "" && req.body.EthtoPay != "" && req.body.ContractAddress != "" && req.body.DevAddress != "" && req.body.StartingFunction != "" && req.body.DevAddress.length == 42 && req.body.ContractAddress.length == 42) {

      c = await ListentoMempool11(req.body.BuyTx, req.body.EthtoPay, req.body.ContractAddress, req.body.DevAddress, req.body.StartingFunction, req.body.DeadBlocks, req.body.GasLimit, req.body.Gasprice, parseInt(req.body.Wallets))


    } else if (req.body.BuyTx != "" && req.body.EthtoPay != "" && req.body.ContractAddress != "" && req.body.DevAddress != "" && req.body.StartingFunction != "" && req.body.DevAddress.length == 42 && req.body.ContractAddress.length == 42) {

      c = await ListentoMempool11(req.body.BuyTx, req.body.EthtoPay, req.body.ContractAddress, req.body.DevAddress, req.body.StartingFunction, 0, 0, 0, parseInt(req.body.Wallets))


    } else {
      //console.log("Erros")
      res.render("", {
        DeadBlocks: req.body.DeadBlocks,
        GasLimit: req.body.GasLimit,
        GasPrice: req.body.GasPrice,
        BuyTx: req.body.BuyTx,
        EthtoPay: req.body.EthtoPay,
        ContractAddress: req.body.ContractAddress,
        DevAddress: req.body.DevAddress,
        StartingFunction: req.body.StartingFunction
      })
    }
  }





})

app.post("/Approve", async (req, res) => {

  if (req.body.ContractAddress != "") {
    const checker = new web3.eth.Contract(check, req.body.ContractAddress)
    for (let i = 0; i < parseInt(req.body.Wallets); i++) {
      c = await checker.methods.balanceOf(accounts[i]).call();
      if (c > 0) {
        approve(accounts[i], privateKey[i], req.body.ContractAddress)
      }
    }
    //approve(accounts[2],privateKey[2],req.body.ContractAddress)
    //approve(accounts[3],privateKey[3],req.body.ContractAddress)
  }
})


app.post("/Stop", async (req, res) => {
  res.redirect("/")
  process.exit(0);
})

app.post("/BuyFlashbots", async (req, res) => {
  console.log("Feature not yet implemented")
  res.redirect("/")
  process.exit(0);
  PairAddress = req.body.PairAdress
  PairAddress = PairAddress.split(",")
  PairAddress.push(req.body.ContractAddress)
  console.log(PairAddress)

  Eth = new BN()
  Eth = req.body.EthtoPay * 1000000000000000000
  Eth = Eth.toString()
  console.log("asdjkhaskjdh")
  maxFeePerGas = new BN()
  maxFeePerGas = BN(req.body.Gasprice * 1000000000)
  maxFeePerGas = maxFeePerGas.toString()

  maxPriorityFeePerGas = new BN()
  maxPriorityFeePerGas = BN(req.body.GasLimit * 1000000000)
  maxPriorityFeePerGas = maxPriorityFeePerGas.toString()
  if (req.body.BuyStrategy == "9") {
    console.log("private force buying from 9")
    PairAddress = req.body.PairAdress
    console.log(PairAddress)
    console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
    for (let i = 0; i < parseInt(req.body.Wallets); i++) {
      nonce = web3.getTransactionCount(accounts[i])
      const tx = {
        chain: "1",
        hardfork: "istanbul",
        nonce: nonce,
        from: accounts[i],
        to: uniswap_address,
        value: Eth,
        gas: "800000",
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        data: uniswap.methods.swapETHForExactTokens(req.body.BuyTx, PairAddress, accounts[i], deadline).encodeABI()
      }
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey[i]).then((signedTx) => {
      var prtx = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_sendPrivateTransaction",
        "params": [{
          "tx": signedTx
        }]
      }

    })


  } else {
    console.log("private force buying from 11")
    PairAddress = req.body.PairAdress
    console.log(PairAddress)
    console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
    for (let i = 0; i < parseInt(req.body.Wallets); i++) {
      const tx = {
        from: accounts[i],
        to: uniswap_address,
        value: Eth,
        gas: "800000",
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        data: uniswap.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(req.body.BuyTx, PairAddress, accounts[i], deadline).encodeABI()
      }


      const res = await flashbotsProvider.sendPrivateTransaction({
        tx,
        signer,
      }, {
        maxBlockNumber: (await provider.getBlockNumber()) + 5, // only allow tx to be mined for the next 5 blocks
      });
      console.log(hash)
    }
  }
})


app.post("/BuyNow", async (req, res) => {
  // console.log(req.body.antibot)
  // console.log(req.body.dead.DeadBlocks,req.body.GasLimit,req.body.GasPrice)
  // PairAddress = req.body.PairAdress
  // PairAddress = PairAddress.split(",")
  // PairAddress.push(req.body.ContractAddress)
  // sellpair = req.body.PairAdress
  // sellpair = sellpair.split(",")
  // sellpair.push(req.body.ContractAddress)
  // // console.log("buy pair", PairAddress)

  // var date = new Date()
  // date.toISOString()
  // init1 = {
  //   "timeStamp": date,
  //   "dappId": "3280b7ad-3ca4-41eb-9ef2-41055a4ab35a",
  //   "version": "1",

  //   "blockchain": {
  //     "system": "ethereum",
  //     "network": "main"
  //   },
  //   "categoryCode": "initialize",
  //   "eventCode": "checkDappId"
  // }
  // ws1.send(JSON.stringify(init1))
  // ws1.onopen= ()=>{ws1.send(JSON.stringify(init1));}
  // ws1.onmessage=(event)=>{console.log(event.data)}

  if (req.body.BuyTx != "" && req.body.EthtoPay != "" && req.body.ContractAddress != "" && req.body.ContractAddress.length == 42) {
    Eth = new BN()
    Eth = req.body.EthtoPay * 1000000000000000000
    Eth = Eth.toString()
    console.log("asdjkhaskjdh")
    maxFeePerGas = new BN()
    maxPriorityFeePerGas = new BN()
    
    if (req.body.Gasprice != "" && req.body.GasLimit != "") {
      maxFeePerGas = BN(req.body.Gasprice * 1000000000)
      maxFeePerGas = maxFeePerGas.toString()


      maxPriorityFeePerGas = BN(req.body.GasLimit * 1000000000)
      maxPriorityFeePerGas = maxPriorityFeePerGas.toString()
    } else {
      basefee = await web3.eth.getGasPrice()
      basefee = Number(parseInt(basefee))
      maxFeePerGas=Number("11100010100") + 2 * basefee
      maxPriorityFeePerGas="11100010100"
      console.log(maxFeePerGas,maxPriorityFeePerGas)
      
      // basefee = 2 * basefee
      // maxFeePerGas = BN("10100010100")
      // maxPriorityFeePerGas = BN(basefee) + maxFeePerGas
      // maxFeePerGas = maxPriorityFeePerGas.toString()
      // maxPriorityFeePerGas = maxFeePerGas.toString()
    }
    PairAddress = req.body.PairAdress
    PairAddress = PairAddress.split(",")
    PairAddress.push(req.body.ContractAddress)
    console.log(PairAddress)
    if (req.body.BuyStrategy == "9") {
      console.log("force buying from 9")

      console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
      for (let i = 0; i < parseInt(req.body.Wallets); i++) {
        l = BuyNow9(accounts[i], Eth, req.body.BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey[i]);
      }


      //l = BuyNow(accounts[2], req.body.ContractAddress, Eth, req.body.BuyTx, maxPriorityFeePerGas, maxFeePerGas, privateKey[2]);
      //d = BuyNow(accounts[3], req.body.ContractAddress, Eth, req.body.BuyTx, maxPriorityFeePerGas, maxFeePerGas, privateKey[3]);
    } else {
      console.log("force buying from 11")
      for (let i = 0; i < parseInt(req.body.Wallets); i++) {
        PairAddress = req.body.PairAdress
        PairAddress = PairAddress.split(",")
        PairAddress.push(req.body.ContractAddress)
        console.log(PairAddress)
        console.log("Buying from ", parseInt(req.body.Wallets), " accounts")
        l = BuyNow11(accounts[i], Eth, req.body.BuyTx,maxFeePerGas, maxPriorityFeePerGas, privateKey[i]);
      }
    }
    res.status(200)
  }
})

app.post("/Safety", (req, res) => {
  flag = !flag
  console.log(flag)
  console.log(req.fieldset)
  res.status(200)
})

app.post("/SellNow", async (req, res) => {
  PairAddress = req.body.PairAdress
  PairAddress = PairAddress.split(",")
  PairAddress.push(req.body.ContractAddress)
  
  sellpair = req.body.PairAdress
  sellpair = sellpair.split(",")
  sellpair.push(req.body.ContractAddress)
  console.log("buy pair", PairAddress[PairAddress.length-1])
  
  sellpair[0] = PairAddress[PairAddress.length - 1]
  sellpair[sellpair.length - 1] = WETHaddress
  console.log("sell pair ", sellpair)
  console.log("buy pair", PairAddress)
  if (req.body.Gasprice != "" && req.body.GasLimit != "" && req.body.ContractAddress != "" && req.body.ContractAddress.length == 42) {
    Eth = new BN()
    Eth = req.body.EthtoPay * 1000000000000000000
    Eth = Eth.toString()

    maxFeePerGas = new BN()
    maxFeePerGas = BN(req.body.Gasprice * 1000000000) //Priority Fee (Gwei) :
    maxFeePerGas = maxFeePerGas.toString()

    maxPriorityFeePerGas = new BN()
    maxPriorityFeePerGas = BN(req.body.GasLimit * 1000000000) //Max Fee (Gwei) :
    maxPriorityFeePerGas = maxPriorityFeePerGas.toString()

    const checker = new web3.eth.Contract(check, req.body.ContractAddress)
    for (let i = 0; i < parseInt(req.body.Wallets); i++) {
      c = await checker.methods.balanceOf(accounts[i]).call();
      if (flag && c > 0) {
        console.log("Selling from : ", accounts[i])

        l = rugpullroutine(accounts[i], maxFeePerGas, maxPriorityFeePerGas, privateKey[i]);
      }
    }
  }
})

app.listen(8000)



var ListentoMempool9 = async (BuyTx, EthtoPay, Contract, devAddress, StartingFunction, DeadBlocks, maxPriorityFeePerGas1, maxFeePerGas1, wallets) => {


  Eth = new BN()
  Eth = EthtoPay * 1000000000000000000
  Eth = Eth.toString()

  const checker = new web3.eth.Contract(check, Contract);
  var deadblocks = 0;
  deadblocks = parseInt(DeadBlocks)
  console.log("deadblocks x2 ", deadblocks * 2)
  ///debug this !!!!!  maxFeePerGas, maxPriorityFeePerGas
  maxFeePerGas = new BN()
  maxFeePerGas = BN(maxFeePerGas1 * 1000000000)
  maxFeePerGas = maxFeePerGas.toString()

  maxPriorityFeePerGas = new BN()
  maxPriorityFeePerGas = BN(maxPriorityFeePerGas1 * 1000000000)
  maxPriorityFeePerGas = maxPriorityFeePerGas.toString()
  GasLimit = 600000
  console.log("Waiting")
  const optionsBNC = {
    dappId: '5eb9f8ca-da28-4935-b7f8-25502b83a256',
    networkId: 1, // change to 1 for mainet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ws: WebSocket,
    onreopen: console.log("Connection succefull"),
    //transactionHandlers: [event]
    onerror: (error) => {
      console.log(error)
    }
  }

  const blocknative = new BlocknativeSdk(optionsBNC)
  const address = devAddress
  const {
    emitter,
    details
  } = blocknative.account(address)


  if (StartingFunction == "addLiquidityETH()") {
    var StartingHex = "0xf305d719"
    console.log(StartingHex.slice(0, 10))
  } else if (StartingFunction.slice(0, 2) == "0x") {
    var StartingHex = StartingFunction
    console.log("You inputed the hex: ", StartingHex.slice(0, 10), " as starting function")
  } else {
    var StartingHex = "0x" + keccak256(StartingFunction).toString('hex')
    console.log(StartingHex.slice(0, 10))
  }

  console.log("swapETHForExactTokens")

  console.log("Listening to mempool")
  for (let i = 0; i < wallets; i++) {
    count = await web3.eth.getTransactionCount(accounts[i])
    nonce[i] = (count)
    console.log(nonce[i])
  }

  emitter.on('txPool', async (txHash) => {
    try {

      if (txHash.input.slice(0, 10) == StartingHex.slice(0, 10) && txHash.from == devAddress) {
        if (deadblocks == 0) {
          for (let i = 0; i < wallets; i++) {
            d = Interactwithcontract9(accounts[i], Eth, BuyTx, txHash.maxFeePerGas, txHash.maxPriorityFeePerGas, privateKey[i], 0, txHash.hash, nonce[i]);
          }

        } else {
          var res = await web3.eth.getTransactionReceipt(txHash.hash)
          console.log("Waiting for the trascaction to be mined..")
          while (res == null) {
            res = await web3.eth.getTransactionReceipt(txHash.hash)
          }


          if (!res.status) {
            console.log("Transaction failed waiting for the succeful one")

          } else {
            var block = await web3.eth.getBlockNumber()
            console.log("Waiting for the right block..")
            while (block < res.blockNumber + deadblocks - 1) {
              block = await web3.eth.getBlockNumber()
            }


            console.log("Sending Transaction on block ", block);
            for (let i = 0; i < wallets; i++) {
              d = Interactwithcontract9(accounts[i], Eth, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey[i], block, txHash.hash, nonce[i]);
            }
          }
        }



      } else if (txHash.input.slice(0, 10) == "0x2195995c" || txHash.input.slice(0, 10) == "0x5b0d5984" || txHash.input.slice(0, 10) == "0xc1ce3c06") {
        console.log("RUG PULL\n");

        for (let i = 0; i < wallets; i++) {
          allowance = await checker.methods.allowance(accounts[i], routeradd).call();
          if (allowance > 0) {
            c = rugpullroutine(accounts[i], txHash.maxFeePerGas, txHash.maxPriorityFeePerGas, privateKey[i]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
};

var ListentoMempool11 = async (BuyTx, EthtoPay, Contract, devAddress, StartingFunction, DeadBlocks, maxPriorityFeePerGas1, maxFeePerGas1, wallets) => {


  Eth = new BN()
  Eth = EthtoPay * 1000000000000000000
  Eth = Eth.toString()

  const checker = new web3.eth.Contract(check, Contract);
  var deadblocks = 0;
  deadblocks = parseInt(DeadBlocks)
  ///debug this !!!!!  maxFeePerGas, maxPriorityFeePerGas
  maxFeePerGas = new BN()
  maxFeePerGas = BN(maxFeePerGas1 * 1000000000)
  maxFeePerGas = maxFeePerGas.toString()

  maxPriorityFeePerGas = new BN()
  maxPriorityFeePerGas = BN(maxPriorityFeePerGas1 * 1000000000)
  maxPriorityFeePerGas = maxPriorityFeePerGas.toString()
  GasLimit = 600000
  console.log("Waiting")
  const optionsBNC = {
    dappId: '5eb9f8ca-da28-4935-b7f8-25502b83a256',
    networkId: 1, // change to 1 for mainet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ws: WebSocket,
    onreopen: console.log("Connection succefull"),
    //transactionHandlers: [event]
    onerror: (error) => {
      console.log(error)
    }
  }

  const blocknative = new BlocknativeSdk(optionsBNC)
  const address = devAddress
  const {
    emitter,
    details
  } = blocknative.account(address)


  if (StartingFunction == "addLiquidityETH()") {
    var StartingHex = "0xf305d719"
    console.log(StartingHex.slice(0, 10))
  } else if (StartingFunction.slice(0, 2) == "0x") {
    var StartingHex = StartingFunction
    console.log("You inputed the hex: ", StartingHex.slice(0, 10), " as starting function")
  } else {
    var StartingHex = "0x" + keccak256(StartingFunction).toString('hex')
    console.log(StartingHex.slice(0, 10))
  }

  console.log("swapExactETHForTokensSupportingFeeOnTransferTokens")

  console.log("Listening to mempool")
  for (let i = 0; i < wallets; i++) {
    count = await web3.eth.getTransactionCount(accounts[i])
    nonce[i] = count
    console.log(nonce[i])
  }
  emitter.on('txPool', async (txHash) => {
    try {

      if (txHash.input.slice(0, 10) == StartingHex.slice(0, 10) && txHash.from == devAddress) {

        if (deadblocks == 0) {
          for (let i = 0; i < wallets; i++) {
            d = Interactwithcontract11(accounts[i], Eth, BuyTx, txHash.maxFeePerGas, txHash.maxPriorityFeePerGas, privateKey[i], 0, txHash.hash, nonce[i]);
          }

        } else {
          var res = await web3.eth.getTransactionReceipt(txHash.hash)
          console.log("Waiting for the trascaction to be mined..")
          while (res == null) {
            res = await web3.eth.getTransactionReceipt(txHash.hash)
          }


          if (!res.status) {
            console.log("Transaction failed waiting for the succeful one")
            return 0;
          } else {
            var block = await web3.eth.getBlockNumber()
            console.log("Waiting for the right block..")
            while (block < res.blockNumber + deadblocks - 1) {
              block = await web3.eth.getBlockNumber()
            }


            console.log("Sending Transaction on block ", block);

            for (let i = 0; i < wallets; i++) {
              d = Interactwithcontract11(accounts[i], Eth, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey[i], block, txHash.hash, nonce[i]);
            }



          }

        }

      } else if (txHash.input.slice(0, 10) == "0x2195995c" || txHash.input.slice(0, 10) == "0x5b0d5984" || txHash.input.slice(0, 10) == "0xded9382a") {


        for (let i = 0; i < wallets; i++) {
          allowance = await checker.methods.allowance(accounts[i], routeradd).call();
          if (flag && allowance > 0) {
            console.log("RUG PULL\n");
            c = rugpullroutine(accounts[i], txHash.maxFeePerGas, txHash.maxPriorityFeePerGas, privateKey[i]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
};


const rugpullroutine = async (account, maxFeePerGas1, maxPriorityFeePerGas1, privateKey) => {




  maxFeePerGas = parseInt(maxFeePerGas1)
  maxFeePerGas = BN(math.floor(maxFeePerGas))
  maxFeePerGas = maxFeePerGas.toString()
  const checker = new web3.eth.Contract(check, sellpair[0]);
  maxPriorityFeePerGas = parseInt(maxPriorityFeePerGas1)
  maxPriorityFeePerGas = BN(math.floor(maxPriorityFeePerGas1))
  maxPriorityFeePerGas = maxPriorityFeePerGas1.toString()
  sell = new BN()
  sell = await checker.methods.balanceOf(account).call();
  sell = BN(sell)
  try {
    //console.log("Selling")
    const tx = {

      chain: "1",
      hardfork: "istanbul",
      from: account,
      to: routeradd,
      gas: "900000",
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      data: uniswap.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(sell, 0, sellpair, account, deadline).encodeABI()

    }

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("sent", (re) => {
        console.log("selling from :", account)

      }).on("receipt", (reee) => {
        console.log("we did it !!!")

      })

    })

    flag = true;
  } catch (err) {
    console.error(err);
  }

  return 0;
}


//max prio is the smol 1 and maxfeepergas the chad one
async function Interactwithcontract9(account, EthtoPay, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey, blockIn, hash, nonce) {
  try {



    const tx = {
      chain: "1",
      hardfork: "istanbul",
      nonce: nonce,
      from: account,
      to: routeradd,
      value: EthtoPay,
      gas: "900000",
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: maxFeePerGas,
      data: uniswap.methods.swapETHForExactTokens(BuyTx, PairAddress, account, deadline).encodeABI()
    }


    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      // var date = new Date()
      // date.toISOString()
      // tdn = {
      //   "timeStamp": date,
      //   "dappId": "3280b7ad-3ca4-41eb-9ef2-41055a4ab35a",
      //   "version": "1",
      //   "blockchain": {
      //     "system": "ethereum",
      //     "network": "main"
      //   },
      //   "categoryCode": "tdn",
      //   "eventCode": "txSubmit",
      //   "signedTransaction": signedTx.rawTransaction
      // }
      // ws1.send(JSON.stringify(tdn))
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", async (err) => {
          console.log("Transaction failed")
        })
        .on("sent", async (re) => {
          console.log("Transaction on Mempool from :", account)
          maxFeePerGas = BN(math.floor(parseInt(maxFeePerGas) * 1.1));
          maxPriorityFeePerGas = BN(math.floor(parseInt(maxPriorityFeePerGas) * 1.1));
          const cancel = {
            nonce: nonce,
            from: account,
            to: account,
            value: "0",
            gas: "900000",
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
          }
          if (blockIn == 0) {
            receipt = await web3.eth.getTransactionReceipt(hash)
            while (receipt == null) {
              receipt = await web3.eth.getTransactionReceipt(hash)
            }
          } else {

            var block = await web3.eth.getBlockNumber();
            while (block == blockIn) {
              block = await web3.eth.getBlockNumber();
            }
          }
          //console.log(block) 
          const signPromise = web3.eth.accounts.signTransaction(cancel, privateKey).then((signedTx2) => {
            const sentTx = web3.eth.sendSignedTransaction(signedTx2.rawTransaction)
              .on("error", async () => { /// you are a god
                const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length-1])
                balance = await checker.methods.balanceOf(accounts[0]).call();
                console.log(account ," was mined with balance :",balance)
                if (balance> 0) {
                  approve(account, privatekey, PairAddress[PairAddress.length-1])
                }

              }).on("receipt", () => {
                console.log("Missed the block and Transaction was canceled on ", account)
              })

          })


        }).on("receipt", (reee) => {
          const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length - 1])

          return 0;

        })



    })

  } catch (err) {
    console.log(err);
  }
  return 0;
}

async function Interactwithcontract11(account, EthtoPay, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey, blockIn, hash, nonce) {
  try {



    const tx = {
      chain: "1",
      hardfork: "istanbul",
      nonce: nonce,
      from: account,
      to: routeradd,
      value: EthtoPay,
      gas: "900000",
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      maxFeePerGas: maxFeePerGas,
      data: uniswap.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(BuyTx, PairAddress, account, deadline).encodeABI()
      //swapETHForExactTokens
      //swapExactETHForTokensSupportingFeeOnTransferTokens
    }


    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      // var date = new Date()
      // date.toISOString()
      // tdn = {
      //   "timeStamp": date,
      //   "dappId": "3280b7ad-3ca4-41eb-9ef2-41055a4ab35a",
      //   "version": "1",
      //   "blockchain": {
      //     "system": "ethereum",
      //     "network": "main"
      //   },
      //   "categoryCode": "tdn",
      //   "eventCode": "txSubmit",
      //   "signedTransaction": signedTx.rawTransaction
      // }
      // ws1.send(JSON.stringify(tdn))
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", async (err) => {
          console.log(err)
        })
        .on("sent", async (re) => {
          maxFeePerGas = BN(math.floor(parseInt(maxFeePerGas) * 1.1));
          maxPriorityFeePerGas = BN(math.floor(parseInt(maxPriorityFeePerGas) * 1.1));
          const cancel = {
            nonce: nonce,
            from: account,
            to: account,
            value: "0",
            gas: "900000",
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
          }
          console.log(account, "on mempool")
          if (blockIn == 0) {
            receipt = await web3.eth.getTransactionReceipt(hash)
            while (receipt == null) {
              receipt = await web3.eth.getTransactionReceipt(hash)
            }
          } else {

            var block = await web3.eth.getBlockNumber();
            while (block == blockIn) {
              block = await web3.eth.getBlockNumber();
            }
          }
          console.log(account, " on mempool")
          //console.log(block) 
          const signPromise = web3.eth.accounts.signTransaction(cancel, privateKey).then((signedTx2) => {
            const sentTx = web3.eth.sendSignedTransaction(signedTx2.rawTransaction)
              .on("error", async () => { /// you are a god
                const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length-1])
                balance = await checker.methods.balanceOf(accounts[0]).call();
                console.log(account ," was mined with balance :",balance)
                // allowance = await checker.methods.allowance(accounts[i], routeradd).call();
                // if ( balance > 0 && allowance==0) {
                //   approve(account, privatekey, PairAddress[PairAddress.length-1])
                // }

                return 0;
              }).on("transactionHash", () => {
                console.log("Missed the block and Transaction was canceled from account", account)
              })

          })


        }).on("receipt", (reee) => {

          return 0;

        })



    })

  } catch (err) {
    console.log(err);
  }
  return 0;
}


async function approve(account, key, Contract) {
  try {

    const checker = new web3.eth.Contract(check, Contract);
    basefee = await web3.eth.getGasPrice()
    basefee = Number(parseInt(basefee))
    const tx = {
      from: account,
      to: Contract,
      gas: "900000",
      maxFeePerGas: Number("5100010100") + 2 * basefee,
      maxPriorityFeePerGas: "5100010100",
      data: checker.methods.approve(routeradd, deadline).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, key).then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("sent", () => {
          console.log("approving account :", account)
        })
        .on("receipt", async (reee) => {
          console.log("Ready to Sell from account: ", account)

        })
    })
  } catch (err) {
    console.log(err)
  }
  return 0;
}

async function BuyNow9(account, EthtoPay, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey) {

  try {
    s = true
    const nonce = await web3.eth.getTransactionCount(account)
    
   
    const tx = {
      from: account,
      to: routeradd,
      value: EthtoPay,
      gas: "900000",
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      data: uniswap.methods.swapETHForExactTokens(BuyTx, PairAddress, account, deadline).encodeABI() //change it back
    }
  

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      // var date = new Date()
      // date.toISOString()
      // tdn = {
      //   "timeStamp": date,
      //   "dappId": "3280b7ad-3ca4-41eb-9ef2-41055a4ab35a",
      //   "version": "1",
      //   "blockchain": {
      //     "system": "ethereum",
      //     "network": "main"
      //   },
      //   "categoryCode": "tdn",
      //   "eventCode": "txSubmit",
      //   "signedTransaction": signedTx.rawTransaction
      // }
      // ws1.send(JSON.stringify(tdn))

      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", async (err) => {
          console.log(err)
        }).on("sent", () => {
          console.log(account, "on memepool")
        })
        .on("receipt", async (re) => {
          const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length-1])
          balance = await checker.methods.balanceOf(accounts[0]).call();
          console.log(account ," was mined with balance :",balance)
          // allowance = await checker.methods.allowance(accounts[i], routeradd).call();
          // if ( balance > 0 && allowance==0) {
          //   approve(account, privatekey, PairAddress[PairAddress.length-1])
          // }
          return 0;
        })
    })

  } catch (err) {
    console.log(err);
    return 0;
  }

}

async function BuyNow11(account, EthtoPay, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey) {

  try {
    s = true
    const nonce = await web3.eth.getTransactionCount(account)
    
    var tx
    console.log(maxPriorityFeePerGas,maxFeePerGas)
    
     tx = {
      from: account,
      to: routeradd,
      value: EthtoPay,
      gas: "900000",
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      data: uniswap.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(BuyTx, PairAddress, account, deadline).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", async (err) => {
          console.log(err)
        }).on("sent", () => {
          console.log(account, "on memepool")
        })
        .on("receipt", async (re) => {
          const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length-1])
          balance = await checker.methods.balanceOf(accounts[0]).call();
          console.log(account ," was mined with balance :",balance)
          // allowance = await checker.methods.allowance(accounts[i], routeradd).call();
          // if ( balance > 0 && allowance==0) {
          //   approve(account, privatekey, PairAddress[PairAddress.length-1])
          // }

        })
    })

  } catch (err) {
    console.log(err);
  }
  return 0;
}

var ListentoMempoolLBP = async (BuyTx, EthtoPay, Contract, devAddress, wallets, PoolID) => {


  Eth = new BN()
  Eth = EthtoPay * 1000000000000000000
  Eth = Eth.toString()

  const checker = new web3.eth.Contract(check, Contract);
  var deadblocks = 0;
  deadblocks = parseInt(DeadBlocks)
  ///debug this !!!!!  maxFeePerGas, maxPriorityFeePerGas
  maxFeePerGas = new BN()
  maxFeePerGas = BN(maxFeePerGas1 * 1000000000)
  maxFeePerGas = maxFeePerGas.toString()

  maxPriorityFeePerGas = new BN()
  maxPriorityFeePerGas = BN(maxPriorityFeePerGas1 * 1000000000)
  maxPriorityFeePerGas = maxPriorityFeePerGas.toString()
  GasLimit = 600000
  console.log("Waiting")
  const optionsBNC = {
    dappId: '5eb9f8ca-da28-4935-b7f8-25502b83a256',
    networkId: 1, // change to 1 for mainet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ws: WebSocket,
    onreopen: console.log("Connection succefull"),
    //transactionHandlers: [event]
    onerror: (error) => {
      console.log(error)
    }
  }

  const blocknative = new BlocknativeSdk(optionsBNC)
  const address = devAddress
  const {
    emitter,
    details
  } = blocknative.account(address)


  if (StartingFunction == "addLiquidityETH()") {
    var StartingHex = "0xf305d719"
    console.log(StartingHex.slice(0, 10))
  } else if (StartingFunction.slice(0, 2) == "0x") {
    var StartingHex = StartingFunction
    console.log("You inputed the hex: ", StartingHex.slice(0, 10), " as starting function")
  } else {
    var StartingHex = "0x" + keccak256(StartingFunction).toString('hex')
    console.log(StartingHex.slice(0, 10))
  }

  console.log("LBP snipe")

  console.log("Listening to mempool")
  for (let i = 0; i < wallets; i++) {
    count = await web3.eth.getTransactionCount(accounts[i])
    nonce[i] = count
    console.log(nonce[i])
  }
  emitter.on('txPool', async (txHash) => {
    try {

      if (txHash.input.slice(0, 10) == "0x51d48cea") {


        for (let i = 0; i < wallets; i++) {
          d = InteractwithcontractLBP(accounts[i], Eth, BuyTx, txHash.maxFeePerGas, txHash.maxPriorityFeePerGas, privateKey[i], 0, txHash.hash, nonce[i], PoolID);
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
};

async function InteractwithcontractLBP(account, EthtoPay, BuyTx, maxFeePerGas, maxPriorityFeePerGas, privateKey, blockIn, hash, nonce, PoolID) {
  try {



    const tx = {
      chain: "1",
      hardfork: "istanbul",
      nonce: nonce,
      from: account,
      to: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
      value: EthtoPay,
      gas: "900000",
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      data: balancer.methods.swap(0, [PoolID, 0, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", PairAddress[1], BuyTx, "0x"], [account, 0, account, 0], 0, deadline).encodeABI()
      //swapETHForExactTokens
      //swapExactETHForTokensSupportingFeeOnTransferTokens
    }


    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey).then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction).on("error", async (err) => {
          console.log(err)
        })
        .on("sent", async (re) => {
          maxFeePerGas = BN(math.floor(parseInt(maxFeePerGas) * 1.1));
          maxPriorityFeePerGas = BN(math.floor(parseInt(maxPriorityFeePerGas) * 1.1));
          const cancel = {
            chain: "1",
            hardfork: "istanbul",
            nonce: nonce,
            from: account,
            to: account,
            value: "0",
            gas: "900000",
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
          }
          console.log(account, "on mempool")
          if (blockIn == 0) {
            receipt = await web3.eth.getTransactionReceipt(hash)
            while (receipt == null) {
              receipt = await web3.eth.getTransactionReceipt(hash)
            }
          } else {

            var block = await web3.eth.getBlockNumber();
            while (block == blockIn) {
              block = await web3.eth.getBlockNumber();
            }
          }
          console.log(account, " on mempool")
          //console.log(block) 
          const signPromise = web3.eth.accounts.signTransaction(cancel, privateKey).then((signedTx2) => {
            const sentTx = web3.eth.sendSignedTransaction(signedTx2.rawTransaction)
              .on("error", () => { /// you are a god
                console.log("Transaction was sent from account ", account)
                const checker = new web3.eth.Contract(check, PairAddress[PairAddress.length - 1])


                return 0;
              }).on("transactionHash", () => {
                console.log("Missed the block and Transaction was canceled from account", account)
              })

          })


        }).on("receipt", (reee) => {

          return 0;

        })



    })

  } catch (err) {
    console.log(err);
  }
  return 0;
}