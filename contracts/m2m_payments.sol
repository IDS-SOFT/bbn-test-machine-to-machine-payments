// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract M2MPayments {

    address public owner;
    mapping(address => uint256) public balances;
    event CheckBalance(string text, uint amount);

    constructor() {
        owner = msg.sender;
    }

    // Function to deposit funds into the contract
    function deposit() external payable {
        require(msg.value > 0, "You must deposit some cryptocurrency.");
        balances[msg.sender] += msg.value;
    }

    // Function to transfer funds from one machine to another
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        require(msg.sender != to, "You cannot transfer funds to yourself.");

        // Add additional conditions or logic here if needed

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    // Function to check the balance of an address
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    // Function to withdraw funds from the contract (only owner)
    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only the owner can withdraw funds.");
        require(amount <= address(this).balance, "Insufficient contract balance.");
        payable(owner).transfer(amount);
    }

    function getUserBalance(address user_account) external returns (uint){
    
       string memory data = "User Balance is : ";
       uint user_bal = user_account.balance;
       emit CheckBalance(data, user_bal );
       return (user_bal);

    }
}
