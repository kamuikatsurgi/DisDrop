// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@acala-network/contracts/schedule/ISchedule.sol";
import "@acala-network/contracts/oracle/IOracle.sol";
import "@acala-network/contracts/utils/Predeploy.sol";
import "@acala-network/contracts/utils/AcalaTokens.sol";

pragma solidity ^0.8.0;

contract DisDrop{

    constructor() payable{}

    ISchedule  scheduler = ISchedule(SCHEDULE);
    IOracle oracle = IOracle(ORACLE);

    fallback() external payable{}
    receive() external payable{}

    event ETHbatchTransfer(uint256 indexed recipientIndex, address indexed recipient, uint256 amount);
    event Erc20BatchTransfer(uint256 indexed recipientIndex, address indexed recipient, uint256 amount);
    event TransferScheduled(bytes indexed scheduleId, address indexed token, address[] recipients, uint256[] amounts, uint256 executionTime);
    event PriceCheckScheduled(bytes indexed scheduleId, uint256 nextCheckTime);

    function simpleETHBatchTransfer(address payable[] memory recipients, uint256[] memory amount) payable public{
        require(recipients.length == amount.length , "Give inputs accordingly!");
        require(msg.value > 0 , "You need to send some ETH please");
        for (uint256 i = 0; i < recipients.length; i++) {
            recipients[i].transfer(amount[i]);
            emit ETHbatchTransfer(i, recipients[i], amount[i]);
        }
        uint256 balance = address(this).balance;
        if (balance > 0) {
            payable(msg.sender).transfer(balance);
        }
    }

    function simpleERC20BatchTransfer(IERC20 token, address[] memory recipients, uint256[] memory amount) external{
    require(recipients.length == amount.length , "Give inputs accordingly!");
    uint256 total = 0;
    for (uint256 i = 0; i < recipients.length; i++) {
        total = total + amount[i];
        }
    require(token.transferFrom(msg.sender, address(this), total) , "Token transferFrom failed! ");
    for (uint256 i = 0; i < recipients.length; i++) {
        require(token.transfer(recipients[i], amount[i]), "Token transfer failed");
        emit Erc20BatchTransfer(i, recipients[i], amount[i]);
        }
    }

    function scheduleERC20BatchTransfer(IERC20 token, address[] memory recipients, uint256[] memory amounts, uint256 delay) payable public{
        require(recipients.length == amounts.length, "Give inputs accordingly!");
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total = total + amounts[i];
        }
        require(token.transferFrom(msg.sender, address(this), total), "Token transfer failed!");
        bytes memory data = abi.encodeWithSignature("executeERC20BatchTransfer(address,address[],uint256[])", address(token), recipients, amounts);
        bytes memory scheduleId = scheduler.scheduleCall(address(this), 0, 2100000, 64000, delay, data);
        emit TransferScheduled(scheduleId, address(token), recipients, amounts, block.timestamp + delay);
    }

    function executeERC20BatchTransfer(IERC20 token, address[] memory recipients, uint256[] memory amounts) private{
        require(recipients.length == amounts.length, "Mismatched recipients and amounts");
        for (uint256 i = 0; i < recipients.length; i++) {
            require(token.transfer(recipients[i], amounts[i]), "Token transfer failed");
            emit Erc20BatchTransfer(i, recipients[i], amounts[i]);
        }
    }

    function getPrice(address token) public view returns (uint256){
        uint256 price = oracle.getPrice(token);
        return price;
    }

    function scheduleConditionalBatchTransfer(
        IERC20 token,
        address[] memory recipients,
        uint256[] memory amounts,
        uint256 desiredPrice,
        uint256 interval
    ) public payable {
        address spender = msg.sender;
        uint256 currentPrice = oracle.getPrice(address(token));
        if (currentPrice == desiredPrice) {
            executeBatchTransfer(token, recipients, amounts, spender);
        } else {
            bytes memory data = abi.encodeWithSignature(
                "checkPriceAndTransfer(address,address[],uint256[],uint256,uint256,address)",
                address(token),
                recipients,
                amounts,
                desiredPrice,
                interval,
                spender
            );
            bytes memory scheduleId = scheduler.scheduleCall(address(this), 0, 2100000, 64000, interval, data);
            emit PriceCheckScheduled(scheduleId, block.timestamp + interval);
        }
    }

    function checkPriceAndTransfer(
        IERC20 token,
        address[] memory recipients,
        uint256[] memory amounts,
        uint256 desiredPrice,
        uint256 interval,
        address spender
    ) public payable{
        uint256 currentPrice = oracle.getPrice(address(token));
        if (currentPrice == desiredPrice) {
            executeBatchTransfer(token, recipients, amounts,spender);
        } else {
            scheduleConditionalBatchTransfer(token, recipients, amounts, desiredPrice, interval);
        }
    }

    function executeBatchTransfer(
        IERC20 token,
        address[] memory recipients,
        uint256[] memory amounts,
        address spender
    ) private {
        require(recipients.length == amounts.length, "Mismatched recipients and amounts");
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        require(token.transferFrom(spender, address(this), totalAmount), "Token transfer failed");
        for (uint256 i = 0; i < recipients.length; i++) {
            token.transfer(recipients[i], amounts[i]);
        }
    }
}
