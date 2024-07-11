// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is Ownable {
    IERC20 public token;
    uint256 public rate;
    uint256 public end;
    bool public started;
    uint256 public tokenSold;

    event TokensPurchased(address indexed _purchaser, uint256 _amount);

    constructor(uint256 _rate, address _token) Ownable(msg.sender) {
        rate = _rate;
        token = IERC20(_token);
    }

    function startPresale(uint256 _duration) external onlyOwner {
        require(!started, "Presale already started");
        started = true;
        end = block.timestamp + _duration;
    }

    function buyTokens() external payable {
        require(started, "Presale not started");
        require(block.timestamp < end, "Presale ended");
        uint256 tokenAmount = msg.value * rate;
        tokenSold += tokenAmount;

        require(token.transfer(msg.sender, tokenAmount), "Transfer failed");
        emit TokensPurchased(msg.sender, tokenAmount);
    }

    function withdraw() external payable {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawTokens() external payable {
        uint256 remainingToken = token.balanceOf(address(this));
        require(token.transfer(owner(), remainingToken), "Transfer failed");
    }

    function setRate(uint256 _newRate) external onlyOwner {
        rate = _newRate;
    }
}
