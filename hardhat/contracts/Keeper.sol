// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Keeper is Ownable {
    uint256 public fee;

    struct Info {
        address owner;
        uint balance;
    }

    mapping(address => Info) public keepers;

    function registerKeeper(address _contract, uint amount) external payable {
        require(
            keepers[_contract].owner == address(0),
            "Keeper already registered"
        );
        require(msg.value == amount, "Insufficient amount");
        keepers[_contract].owner = msg.sender;
        keepers[_contract].balance = amount;
    }

    function withdraw(address _contract, uint amount) external {
        require(keepers[_contract].owner == msg.sender, "Not owner");
        require(keepers[_contract].balance >= amount, "Insufficient balance");
        keepers[_contract].balance -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function deposit(address _contract) external payable {
        keepers[_contract].balance += msg.value;
    }

    function call(address target, uint256 value, bytes memory data) external {
        uint256 gas = gasleft() * tx.gasprice;
        uint256 totalAmount = value + gas;
        require(keepers[target].balance >= totalAmount, "Insufficient balance");
        keepers[target].balance -= totalAmount;
        fee += gas;
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function withdrawfee() external onlyOwner {
        (bool success, ) = msg.sender.call{value: fee}("");
        require(success, "Transfer failed");
        fee = 0;
    }
}
