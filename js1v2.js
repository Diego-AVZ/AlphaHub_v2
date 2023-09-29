// CONEXIÓN WALLET

var walletConnect = document.getElementById("walletConnect");
var Connected;
var AddressesConnected;

walletConnect.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const Accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("MTMSK Connected");
      AddressesConnected = Accounts[0];
      console.log(AddressesConnected);
      document.getElementById("walletConnect").innerText = "Connected";
      Connected = true;
      iniInterval1(); 
      console.log("Intervalo comienza")

    } catch (error) {
      console.log("ERROR al Conectar MTMSK");
    }
  } else {
    console.log("MTMSK Not Detected");
  }
});


function iniInterval1(){
  interval1 = setInterval(seeIfHasCreatedContract, 3000); 
}

function clearInterval1(){
  clearInterval(interval1);
}


// CONEXIÓN CONTRATO

const Factory = "0x77F5D9d255053262e2C97A837fb70dC6cEF4F0B2";
const FactoryABI = [
  {
    inputs: [],
    name: "createCustomAlphaProv",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "regName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractCreated",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "introName",
        type: "string",
      },
    ],
    name: "getContractFromName",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seeIfHasCreated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3Instance1 = new Web3(window.ethereum);

const contracFactoryPost = new web3Instance1.eth.Contract(
  FactoryABI,
  Factory
);

const CreateContract = document.getElementById("CreateContract");

var CustomContract;
var CustomContract2;


const seeIfHasCreatedContract = async()=>{
  try {
    const accountsA = await web3Instance1.eth.getAccounts();
    await contracFactoryPost.methods.seeIfHasCreated().call({from: accountsA[0] });
    CustomContract = await contracFactoryPost.methods.getContractCreated().call({ from: accountsA[0] });
    contract1 = new web3Instance1.eth.Contract(CustomContractABI, CustomContract);
    console.log("CustomContractAddress : " + CustomContract);
    console.log("seeIfHasCreatedContract called");
    if(CustomContract !== 0x0000000000000000000000000000000000000000){	  
    UpdateWithURL();}
  } catch(error){console.log(error);}
} 

var interval1;

CreateContract.addEventListener("click", async () => {
  if (Connected == true){
    try {
      const accountsA = await web3Instance1.eth.getAccounts();
      await contracFactoryPost.methods.createCustomAlphaProv().send({ from: accountsA[0], gas: 2000000 });
      CustomContract = await contracFactoryPost.methods.getContractCreated().call({ from: accountsA[0] });
      contract1 = new web3Instance1.eth.Contract(CustomContractABI,CustomContract
      );
      console.log("CustomContractAddress : " + CustomContract);
      UpdateWithURL();
    } catch (error) {
      console.log("error creating contract" + error);
    } }else {
      if (typeof window.ethereum !== "undefined") {
    try {
      const Accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("MTMSK Connected");
      AddressesConnected = Accounts[0];
      console.log(AddressesConnected);
      document.getElementById("walletConnect").innerText = "Connected";
      Connected = true;
      console.log("Intervalo comienza")
    } catch (error) {
      console.log("ERROR al Conectar MTMSK");
    }
  } else {
    console.log("MTMSK Not Detected");
  }
    try {
      const accountsA = await web3Instance1.eth.getAccounts();
      await contracFactoryPost.methods.createCustomAlphaProv().send({ from: accountsA[0], gas: 3000000 });
      CustomContract = await contracFactoryPost.methods.getContractCreated().call({ from: accountsA[0] });
      contract1 = new web3Instance1.eth.Contract(CustomContractABI,CustomContract
      );
      console.log("CustomContractAddress : " + CustomContract);
      UpdateWithURL();
    } catch (error) {
      console.log("error creating contract" + error);
    }
    }
});

const regName = document.getElementById("regName");
const regNameBut = document.getElementById("regNameBut");

regNameBut.addEventListener("click", async()=>{
  try {
    const accountsA = await web3Instance1.eth.getAccounts();
    var AlphaName = regName.value.toLowerCase();
    await contracFactoryPost.methods.regName(AlphaName).send({ from: accountsA[0] });
  } catch(error){error}
})

var SearchName = document.getElementById("SearchName");
var SearchBut = document.getElementById("SearchBut");
var AlphaAddress = document.getElementById("AlphaAddress");
var AlphaContractAddress;
var connectContract = document.getElementById("connectContract");

SearchBut.addEventListener("click", async()=>{
  try {
    const accountsA = await web3Instance1.eth.getAccounts();
    Name = SearchName.value.toLowerCase();
    AlphaContractAddress = await contracFactoryPost.methods.getContractFromName(Name).call({ from: accountsA[0] });
    AlphaAddress.innerText = `${AlphaContractAddress}`;
    connectContract.style.display = "block";
    
  } catch(error){error}
})



connectContract.addEventListener("click", async()=>{
  CustomContract2 = AlphaContractAddress;
  contract2 = new web3Instance1.eth.Contract(CustomContractABI, CustomContract2);
  console.log("contract is " + CustomContract2);
})

function UpdateWithURL() {
  walletConnect.style.display = "block";
  document.getElementById("IniDiv").style.display = "none";
  document.getElementById("AlphaProv").style.display = "block";
}

const CustomContractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ContractOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newTeam",
        type: "address",
      },
      {
        internalType: "string",
        name: "PartnerName",
        type: "string",
      },
    ],
    name: "AddToTeam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ContractOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_days",
        type: "uint256",
      },
    ],
    name: "CustomAccessDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "DeFiMsgs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "OnchainMsgs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "SearchPartner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "TradingMsgs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TradingMsgsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "ZonasProvs",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accessDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_priceEntry",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stopLoss",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_takeProfit",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_direction",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "_traSignalId",
        type: "uint16",
      },
    ],
    name: "addtraSignal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "balanceETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_styleValue",
        type: "uint8",
      },
    ],
    name: "changeStyle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPriceInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStyleValue",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getTradingSignal",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getURL",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "gettraSignal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gettraSignalsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isAlphaProv",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "isPartner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "messages2",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "msgs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "partner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partnerToPay",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToPay",
        type: "uint256",
      },
    ],
    name: "payTeam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "postMsg",
        type: "string",
      },
    ],
    name: "postTradingSignal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addressToRemove",
        type: "address",
      },
    ],
    name: "removeTeam",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seeIfHasPaid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seeIfIsAlphaProv",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setPriceInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "supply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "traSignals",
    outputs: [
      {
        internalType: "uint256",
        name: "priceEntry",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stopLoss",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "takeProfit",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "direction",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "traSignalId",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllToAlphaProv",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "yourUrl",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];


var contract1; // contrato personal AlphaProv
var contract2;

const MintAlphaProv = document.getElementById("MintAlphaProv");
var AlphaAddress;

MintAlphaProv.addEventListener("click", async()=>{
    
      try {
        const accounts = await web3Instance1.eth.getAccounts();
        var priceInWei = await contract1.methods.getPrice().call({ from: accounts[0] });
        await contract1.methods.mint().send({ from: accounts[0], value: priceInWei });
        AlphaAddress = await contract1.methods.getURL().call({ from: accounts[0] });
        console.log("Alpha Address is: " + AlphaAddress);
        document.getElementById("MintAlphaProv").innerText = "You are an Alpha Provider!";
        UpdateWithURL();
      } catch (error) {
        console.log("error", error);
      }

});


//______

var msgInput = document.getElementById("msgInput");
var postMsgTradSig = document.getElementById("postMsg");
var msgSee = document.getElementById("msgSee");
var read = document.getElementById("read");

postMsgTradSig.addEventListener("click", async()=>{
    try {
    const accounts = await web3Instance1.eth.getAccounts();
    var msg = msgInput.value;
    await contract1.methods.postTradingSignal(msg).send({ from: accounts[0],  gas: 1000000 });
    msgInput.value = "";
    console.log("msg Posted")
    } catch(error){console.log("error", error)}
});


// _________________________________________________________
// ALPHAPROV control de su contrato:
var AddToTeam = document.getElementById("AddToTeam");
var hisName = document.getElementById("hisName");
var addTeamBut = document.getElementById("addTeamBut");

addTeamBut.disabled;

function verificarContend() {
  if (AddToTeam != undefined && hisName != undefined) {
    addTeamBut.disabled = false;
  } else{
    addTeamBut.disabled = true;
    console.log("please fill the address and name")}
}


addTeamBut.addEventListener("click", async()=>{
  try {
    verificarContend();
    const accounts = await web3Instance1.eth.getAccounts();
    var addressTeam = AddToTeam.value;
    var nameTeam = hisName.value;
    await contract1.methods.AddToTeam(addressTeam, nameTeam).send({from: accounts[0]});
  } catch(error){console.log(error)};
})

hisName.addEventListener("click", function(){
  addTeamBut.disabled = false;
})

// USER ZONE

var traBut = document.getElementById("traBut");



// Trading MSGs
async function viewTradingSignalList (){
  console.log("viewTradingSignalList called");
  borrarLista();
  try {
	const accounts = await web3Instance1.eth.getAccounts();
  contract2 = new web3Instance1.eth.Contract(
    CustomContractABI,
    CustomContract2
  );
  console.log("CustomContract2 is " + CustomContract2);
  const signalList = document.getElementById("signalList");
	var tradingSignalsCount = await contract2.methods.TradingMsgsLength().call({ from: accounts[0] }); ;
    console.log("tradingSignalsCount = " + tradingSignalsCount);

    for (let i = tradingSignalsCount -1; i >=0 ; i--) {
      var signal = await contract2.methods.getTradingSignal(i).call({from: accounts[0]});
      const listItem = document.createElement("li");
      listItem.textContent = signal;
      signalList.appendChild(listItem);
      signalList.style.display = "block";
      listItem.style.rotate = "180deg";
      listItem.style.marginLeft = "-20px";
      listItem.style.backgroundColor = "black";
      listItem.style.marginTop = "20px";
      listItem.style.padding = "1vw";
      listItem.style.borderStyle = "solid";
      listItem.style.borderColor = "white";
      listItem.style.borderRadius = "10px";
      listItem.style.lineHeight = "30px";
    }
    
  } catch (error) {
    console.log("error getTradSignals", error);
  }
}; 


function intervalToseeAList1(){
  setInterval(viewTradingSignalList, 60000);
}

function borrarLista() {
  console.log("lista Borrada")
  while (signalList.firstChild) {
    signalList.removeChild(signalList.firstChild);
  }
}

// Trading SIGNALS

async function viewTradingSignalList2() {
  console.log("viewTradingSignalList called");
  borrarLista();
  try {
    const accounts = await web3Instance1.eth.getAccounts();
    contract2 = new web3Instance1.eth.Contract(
      CustomContractABI,
      CustomContract2
    );
    console.log("CustomContract2 is " + CustomContract2);
    const signalList2 = document.getElementById("signalList2");
    var tradingSignalsCount = await contract2.methods
      .getTraSignalsCount()
      .call({ from: accounts[0] });
    console.log("tradingSignalsCount = " + tradingSignalsCount);

    for (let i = tradingSignalsCount - 1; i >= 0; i--) {
      var signalData = await contract2.methods
        .getTraSignal(i)
        .call({ from: accounts[0] });
      const listItem = document.createElement("li");
      listItem.className = "signal-item";
      listItem.innerHTML = `
        <div id="Entry">Entry: ${signalData[0]}</div>
        <div id="SL">Stop Loss: ${signalData[1]}</div>
        <div id="TP">Take Profit: ${signalData[2]}</div>
        <div id="D">Direction: ${signalData[3]}</div>
        <div id="sId">Signal ID: ${signalData[4]}</div>
        `;
      signalList2.appendChild(listItem);
      signalList2.style.display = "block";

    }
  } catch (error) {
    console.log("error getTradSignals", error);
  }
}

function intervalToseeAList2() {
  setInterval(viewTradingSignalList2, 60000);
}











//__________________________________________________
//ESTILOS

function clearPlaceholder1() {
  document.getElementById("regName").placeholder = "";
}

function restorePlaceholder1() {
  document.getElementById("regName").placeholder = "Registre su nombre/apodo";  
}

function clearPlaceholder2() {
  document.getElementById("msgInput").placeholder = "";
}

function restorePlaceholder2() {
  document.getElementById("msgInput").placeholder = "Registre su mensaje";
}

function clearPlaceholder3() {
  document.getElementById("AddToTeam").placeholder = "";
}

function restorePlaceholder3() {
  document.getElementById("AddToTeam").placeholder = "Registre nuevo equipo";
}

function clearPlaceholder4() {
  document.getElementById("hisName").placeholder = "";
}

function restorePlaceholder4() {
  document.getElementById("hisName").placeholder = "Registre Nombre socio";
}

function clearPlaceholder5() {
  document.getElementById("setPrice").placeholder = "";
}

function restorePlaceholder5() {
  document.getElementById("setPrice").placeholder = "precio de su información";
}

function clearPlaceholder6() {
  document.getElementById("setDur").placeholder = "";
}

function restorePlaceholder6() {
  document.getElementById("setDur").placeholder = "Duración de acceso por pago";
}

function clearPlaceholder7() {
  document.getElementById("RemoveTeam").placeholder = "";
}

function restorePlaceholder7() {
  document.getElementById("RemoveTeam").placeholder =
    "Introduzca la dirección del socio a eliminar";
}

function clearPlaceholder9() {
  document.getElementById("addressToPay").placeholder = "";
}

function restorePlaceholder9() {
  document.getElementById("addressToPay").placeholder = "Address to pay";
}

function clearPlaceholder10() {
  document.getElementById("amountToPay").placeholder = "";
}

function restorePlaceholder10() {
  document.getElementById("amountToPay").placeholder = "Amount of ETH to pay";
}

//_________________________________

var CustomAlpha = document.getElementById("CustomAlpha");
var shareInfo = document.getElementById("shareInfo");
var CustomTeam = document.getElementById("CustomTeam");
var CustomEconomics = document.getElementById("CustomEconomics");
var CustomAlphaBut = document.getElementById("CustomAlphaBut");
var shareInfoBut = document.getElementById("shareInfoBut");
var CustomTeamBut = document.getElementById("CustomTeamBut");
var CustomEconomicsBut = document.getElementById("CustomEconomicsBut");

CustomAlphaBut.addEventListener("click", function(){
    CustomAlpha.style.display = "flex";
    shareInfo.style.display = "none";
    CustomTeam.style.display = "none";
    CustomEconomics.style.display = "none";
})

shareInfoBut.addEventListener("click", function () {
  CustomAlpha.style.display = "none";
  shareInfo.style.display = "flex";
  CustomTeam.style.display = "none";
  CustomEconomics.style.display = "none";
});

CustomTeamBut.addEventListener("click", function () {
  CustomAlpha.style.display = "none";
  shareInfo.style.display = "none";
  CustomTeam.style.display = "flex";
  CustomEconomics.style.display = "none";
});

CustomEconomicsBut.addEventListener("click", function () {
  CustomAlpha.style.display = "none";
  shareInfo.style.display = "none";
  CustomTeam.style.display = "none";
  CustomEconomics.style.display = "flex";
});
