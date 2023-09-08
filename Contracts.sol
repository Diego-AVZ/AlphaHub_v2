//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AlphaProviderAccess is ERC721{

    address owner;

    constructor () ERC721("AlphaProvider", "AlphaProv") {
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    bool public isAlphaProv;
    uint public price;
    uint public supply;
    mapping(address => uint) public balance; 
    address public yourUrl;
    mapping(address => address) public ZonasProvs;
    uint public balanceETH;


    function setPrice(uint _price) public onlyOwner{
        price = _price;
    } 

    function getPrice() public view returns(uint){
        return(price);
    }

    function createURL(address newURL) internal {
        yourUrl = newURL;
        ZonasProvs[msg.sender] = newURL;
    }
    
    function mint() public payable returns(bool){
        require(msg.value == price, "Price is higher");
        //require(balance[msg.sender] < 1, "Max Reached");
        supply = supply++;
        balance[msg.sender]++;
        createURL(msg.sender);
        balanceETH = balanceETH + msg.value;
        return(isAlphaProv = true);
    }

    function getURL() public view returns (address) {
        return (ZonasProvs[msg.sender]);
    }

    function seeIfIsAlphaProv() public view returns(bool){
        return(isAlphaProv);
    }

    function withdrawETH() public onlyOwner {
        uint balanceOfETH = address(this).balance;
        payable(msg.sender).transfer(balanceOfETH);
        balanceETH = balanceETH - balanceOfETH;
    }
}

//____________________________________________________________________

contract factoryAlphaProvTradSig {

    bool hasCreateOne;
    mapping(address => address) public ContractsCreated;

    function createCustomTradSig() public{
        
        CustomAlphaProvTradingSig newCustomTradSigAlphaProv = new CustomAlphaProvTradingSig();
        ContractsCreated[msg.sender] = address(newCustomTradSigAlphaProv);
        hasCreateOne = true;
    }

    function getContractCreated() public view returns(address){
        return (ContractsCreated[msg.sender]);
    }

}

//______________________________________________________________________

contract CustomAccessPayment{ //INCOMPLETO
        address owner;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    bool public isAlphaProv;
    uint public price;
    uint public supply;
    mapping(address => uint) public balance; 


    function setPrice(uint _price) public onlyOwner{
        price = _price;
    } 

    
    function mint() public payable returns(bool){
        require(msg.value == price, "Price is higher");
        require(balance[msg.sender] < 1, "Max Reached");
        supply = supply++;
        balance[msg.sender]++;
        return(isAlphaProv = true);
    }
}

//_____________________________________________________________________

contract CustomAlphaProvTradingSig is AlphaProviderAccess {
    //NOTAS: AÑADIR FUNCION DAR ACCESO A OTROS PARA POSTEAR

    mapping(address => string) public messages;

    function post(string memory postMsg) public{
        require(isAlphaProv == true, "you are not AlphaProvider, please get access NFT");
        messages[msg.sender] = postMsg;

    }

    function readMsg() public view returns(string memory) {
        return(messages[msg.sender]);
    }


}


