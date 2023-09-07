//SPDX-License-Identifier: MIT;
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

    function seeIfIsAlphaProv() public view returns(bool){
        return(isAlphaProv);
    }
}

//____________________________________________________________________

contract factoryAlphaProvTradSig is AlphaProviderAccess {

    bool hasCreateOne;
    mapping(address => address) public ContractsCreated;

    function createCustomTradSig() public{
        require(isAlphaProv == true, "you are not AlphaProvider, please get access NFT");
        require(hasCreateOne == false, "You have already created");
        CustomAlphaProvTradingSig newCustomTradSigAlphaProv = new CustomAlphaProvTradingSig();
        ContractsCreated[msg.sender] = address(newCustomTradSigAlphaProv);
        hasCreateOne = true;

    }

}


contract CustomAlphaProvTradingSig is AlphaProviderAccess {
    //NOTAS: AÑADIR FUNCION DAR ACCESO A OTROS

    bool public funcCalled = false;

    function post() public returns(bool){
        require(isAlphaProv == true, "Not Alpha Provider, please get access NFT");
        funcCalled = true;
        return(funcCalled);
    } 
}


/*______________DISEÑO_____________________

contract AccessAlphaProv{}

contract CustomAccessNFT {}

contract CustomSignals {}

contract Factory {

    new CustomAccesNFT() //Para el acceso de los usuarios
        mapping msg.sender => address(newCustomAccessNFT) //Sender es el AlphaProv y se le relaciona con el contrato creado
            js: if (addressConnected has CustomAccessNFT) {Access ok}


    new CustomSignals()  
        mapping msg.sender => address(newCustomSignals) //Para que el AlphaProv postee 
                                                            y para que los users vean info
}




*/
