pragma solidity ^0.4.8;


contract SupplyChain {


    struct Item {
        uint uuid;
        string location;
        uint timestamp; 
    }
    
    Item[] public itemIndex;

    mapping(uint => Item) public items;

    function addItem(uint uuid, string location, uint timestamp) public returns (uint) {
        timestamp = now;
        items[uuid] = Item(uuid, location, timestamp);
        itemIndex.push(Item(uuid, location, timestamp));
    }

    function scanItem(uint uuid, string location, uint timestamp) public returns (bool success) {
        timestamp = now;
        items[uuid].location = location;
        items[uuid].timestamp = timestamp;
        return true;
    }

    function getLocation(uint uuid) public returns (string) {
        return items[uuid].location;
    }
    
    function getItemInfo(uint uuid) public returns (uint, string, uint) {
        return (items[uuid].uuid, items[uuid].location, items[uuid].timestamp);
    } 

    function getItemCount() public constant returns(uint count) {
        return itemIndex.length;
    }
}