pragma solidity ^0.4.8;


contract SupplyChain {
    uint m_uuid;
    string m_location;
    uint m_timestamp;


    function SupplyChain(uint uuid, string location) public {
        m_timestamp = now;
        m_uuid = uuid;
        m_location = location;
    }

    function addItem(uint uuid, string location) public returns (uint) {
        m_timestamp = now;
        m_uuid = uuid;
        m_location = location;
    }

    function scanItem(uint uuid, string location) public returns (bool success) {
        m_timestamp = now;
        m_uuid = uuid;
        m_location = location;
        return true;
    }

    function getLocation(uint uuid) public returns (string) {
        return m_location;
    }
    
    function getItemInfo(uint uuid) public returns (string) {
        return m_location;
    } 

}