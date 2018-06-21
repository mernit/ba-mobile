pragma solidity ^0.4.6;


contract SupplyChain {


    struct Item {
        uint uuid;
        string location;
    }
    
    Item[] public items;

    mapping(uint => Item) public uuids;

    function newItem(uint uuid, string location) public {
        // require modifier here
        items.push(Item(uuid, location));
    }
    
    function getItem(uint uuid) public view returns (string location) {
        return items[uuid].uuid;
    } 
}
