//SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;


contract AlphaProviderAccess {

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
    address public yourUrl;
    mapping(address => address) public ZonasProvs;
    uint public balanceETH;


    function setPrice(uint _price) public{
        require(msg.sender == AlphaHubAddress);
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

    address AlphaHubAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    function withdrawETH() public {  // Creo que debo cambiar a un modificador de una address determinada oficial de la empresa
        require(msg.sender == AlphaHubAddress);
        uint balanceOfETH = address(this).balance;
        payable(msg.sender).transfer(balanceOfETH);
        balanceETH = balanceETH - balanceOfETH;
    }
}

//____________________________________________________________________

contract factoryAlphaProvTradSig {

    mapping(address => bool) hasCreateOne;
    address AlphaProv;
    address AlphaProvContract;
    mapping(string => address) AlphaNameToContract;
    mapping(address => address) ContractsCreated;
    mapping(address => address) ContractCreatedBy;

    function createCustomAlphaProv() public{
        require(hasCreateOne[msg.sender] == false);
        AlphaProv = msg.sender;
        CustomAlphaProv newCustomAlphaProv = new CustomAlphaProv(msg.sender);
        ContractsCreated[msg.sender] = address(newCustomAlphaProv);
        ContractCreatedBy[address(newCustomAlphaProv)]= msg.sender;
        AlphaProvContract = address(newCustomAlphaProv);
        hasCreateOne[msg.sender] = true;
    }

    function getContractCreated() public view returns(address){
        return (ContractsCreated[msg.sender]);
    }

    function regName(string memory name) public {
        require(hasCreateOne[msg.sender] == true, "Create a contract");
        AlphaNameToContract[name] = AlphaProvContract;
    }

    function getContractFromName(string memory introName) public view returns(address) {
        return(AlphaNameToContract[introName]);
    }


}


//_____________________________________________________________________

contract CustomAlphaProv is AlphaProviderAccess{

    address public ContractOwner;

    constructor (address _ContractOwner) {
        ContractOwner = _ContractOwner;
    }

    mapping(string => address) public SearchPartner;

    address[] public partner;
    string[] public msgs;

    mapping(address => string[]) public messages2;

    modifier onlyContractOwnerOrPartner() { 
        require(msg.sender == ContractOwner || isPartner(msg.sender), "Not ContractOwner");
        _;
    }

    function isPartner(address _address) public view returns (bool) {
        for (uint i = 0; i < partner.length; i++) {
            if (partner[i] == _address) {
                return true;
            }
        }
        return false;
    }

    string[] TradingSignals;
    string[] DeFiSignals;
    string[] OnchainSignals;

    function postTradingSignal(string memory postMsg) public onlyContractOwnerOrPartner{
        require(isAlphaProv == true || isPartner(msg.sender), "you are not AlphaProvider, please get access NFT");
        messages2[msg.sender].push(postMsg);
        TradingSignals.push(postMsg);
    }

    function AddToTeam(address newTeam, string memory PartnerName) public {
        require(msg.sender == ContractOwner);
        partner.push(newTeam);
        SearchPartner[PartnerName] = newTeam;
    }

    function removeTeam(address addressToRemove) public{
        require(msg.sender == ContractOwner, "Not Owner");
        for (uint i = 0; i < partner.length; i++) {
            if (partner[i] == addressToRemove) {
                partner[i] = partner[partner.length - 1];
                partner.pop();
                return;
            }

        }
    }

    //Payment:

    uint public priceInfo;
    uint supply2;
    
    function setPriceInfo(uint _price) public{
        require(isAlphaProv == true, "Not AlphaProv");
        require(msg.sender == ContractOwner, "Not Owner");
        priceInfo = _price;
    } 

    function getPriceInfo() public view returns(uint){
        return(priceInfo);
    }


    mapping(address => uint) lastPayment;
    uint public accessDuration = 30 days;

    function CustomAccessDuration(uint _days) public{
        require(msg.sender == ContractOwner, "Not Owner"); 
        accessDuration = _days * 1 days;  // Owner podría recibir pagos y cambiar la duración para impedir la entrada...
    }

    address feeRecipient = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148; //cambiar por mi address

    function pay() public payable{
        require(msg.value == priceInfo, "Price is higher");
        require(seeIfHasPaid() == false);
        uint fee = msg.value / 20;     // Modificar la fee y añadir una func() para que onlyOwner pueda modificar fee
        payable(feeRecipient).transfer(fee);
        supply2 = supply2 + 1;
        lastPayment[msg.sender] = block.timestamp;
    }

    function seeIfHasPaid() public view returns(bool){
       return block.timestamp - lastPayment[msg.sender] <= accessDuration;
       
    }

    function withdrawAllToAlphaProv() public{
        require(msg.sender == ContractOwner, "Not Owner");
        payable(owner).transfer(address(this).balance);
    }

    function payTeam(address partnerToPay, uint amountToPay) public {
        require(amountToPay > 0, "Amount to pay must be greater than zero");
        require(amountToPay <= address(this).balance, "Try to send more ETH than available");
        require(isPartner(partnerToPay), "That address is not part of your team");
        require(msg.sender == ContractOwner, "Not Owner");
        payable(partnerToPay).transfer(amountToPay);
    }

}
