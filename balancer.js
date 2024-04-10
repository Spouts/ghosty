const express = require('express')
const { body, validationResult } = require('express-validator');

const Sell = require("./routes/log");
const app = express()
require('dotenv').config()
accounts = process.env.accounts
accounts = accounts.split(",")
privateKey = process.env.privateKey
urlw = process.env.provider
privateKey = privateKey.split(",")


var nonce = [0, 0, 0, 0]

//web init
//original
const uniswapABI = require('./uniswapabi.json');
const keccak256 = require('keccak256')
const Web3 = require('web3');
const BN = require("bignumber.js")
const math = require("math")
const WebSocket = require('ws')
const BlocknativeSdk = require('bnc-sdk');
