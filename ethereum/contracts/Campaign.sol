pragma solidity ^0.4.24;
contract CampaignFactory{

    address[]public deployedCampaigns;
    bytes32[]public names;

    function createCampaign(uint minimum,string campaignName) public{

        Campaign newCampaign= new Campaign(msg.sender,minimum,campaignName);
        deployedCampaigns.push(newCampaign);
        bytes32 campName= stringToBytes32(campaignName);
        names.push(campName);
    }
    
    function getDeployedCampaigns() public view returns(address[],bytes32[]){
       
        return (deployedCampaigns, names);
  
    }
    
    function stringToBytes32(string memory source)  returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }
    assembly {
        result := mload(add(source, 32))
    }
    
}
  
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool)approvals;

    }
    Request[]public requests;
    bytes32 result;
    uint public minimumContribution;
    string public campaignName;
    address public manager;
    mapping(address=>bool)public approvers;
    uint public approverCount;

    modifier restricted() {
        require(msg.sender==manager);
        _;
    }

    function Campaign( address creator,uint minimum,string memory name)public{
        manager=creator;
        minimumContribution=minimum;
        campaignName=name;
       
    
    }
    function contribute() public payable{
        require(msg.value>minimumContribution);
        approvers[msg.sender]=true;
        approverCount++;
    }

    function createRequest(string description,uint value, address recipient) public restricted{
        Request memory newRequest= Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount: 0

        });
        requests.push(newRequest);
    }
    function approveRequest(uint index)public{
        Request storage request=requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index)public restricted{
        Request storage request= requests[index];

        require(request.approvalCount>(approverCount/2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete=true;
    }

    function getSummary()public view returns(string, uint, uint,uint,uint,address){
      return(
        campaignName,
        minimumContribution,
        this.balance,
        requests.length,
        approverCount,
        manager
        
        );
    }

    function getRequestCount()public view returns(uint){

      return requests.length;
    }

    }
