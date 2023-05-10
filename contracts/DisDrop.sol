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

    event Erc20BatchTransfer(uint256 indexed recipientIndex, address indexed recipient, uint256 amount);
    event TransferScheduled(bytes indexed scheduleId, address indexed token, address[] recipients, uint256[] amounts, uint256 executionTime);
    event PriceCheckScheduled(bytes indexed scheduleId, uint256 nextCheckTime);

    function dispersal(address tokenAddress, address[] memory recipients, uint256[] memory amount) payable public{
        IERC20 token = IERC20(tokenAddress);
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

    function scheduled_dispersal(address tokenAddress, address[] memory recipients, uint256[] memory amounts, uint256 delay) payable public{
        IERC20 token = IERC20(tokenAddress);
        require(recipients.length == amounts.length, "Give inputs accordingly!");
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total = total + amounts[i];
        }
        require(token.transferFrom(msg.sender, address(this), total), "Token transfer failed!");
        bytes memory data = abi.encodeWithSignature("executeERC20BatchTransfer(address,address[],uint256[])",tokenAddress, recipients, amounts);
        bytes memory scheduleId = scheduler.scheduleCall(address(this), 0, 2100000, 64000, delay, data);
        emit TransferScheduled(scheduleId,tokenAddress, recipients, amounts, block.timestamp + delay);
    }

    function executeERC20BatchTransfer(address tokenAddress, address[] memory recipients, uint256[] memory amounts) public {
        IERC20 token = IERC20(tokenAddress);
        require(recipients.length == amounts.length, "Mismatched recipients and amounts");
        for (uint256 i = 0; i < recipients.length; i++) {
            require(token.transfer(recipients[i], amounts[i]), "Token transfer failed");
            emit Erc20BatchTransfer(i, recipients[i], amounts[i]);
        }
    }

    function priceTriggeredDispersal(
        address tokenAddress,
        address[] memory recipients,
        uint256[] memory amounts,
        uint256 desiredPrice,
        uint256 interval,
        uint256 percentage,
        address spender
    ) public {
        IERC20 token = IERC20(tokenAddress);
        uint256 currentPrice = oracle.getPrice(address(token));
        uint256 priceDifference = desiredPrice * percentage / 100;

        if (currentPrice >= desiredPrice-priceDifference && currentPrice <= desiredPrice+priceDifference){
            require(recipients.length == amounts.length, "Mismatched recipients and amounts");
            uint256 totalAmount = 0;
            for(uint256 i = 0; i < amounts.length; i++){
                totalAmount += amounts[i];
            }
            require(token.transferFrom(spender, address(this), totalAmount), "Token transfer failed");
            for(uint256 i = 0; i < recipients.length; i++){
                token.transfer(recipients[i], amounts[i]);
            }
            
        } else {
            bytes memory data = abi.encodeWithSignature(
                "priceTriggeredDispersal(address,address[],uint256[],uint256,uint256,uint256,address)",
                tokenAddress,
                recipients,
                amounts,
                desiredPrice,
                interval,
                percentage,
                spender
            );
            bytes memory scheduleId = scheduler.scheduleCall(address(this), 0, 2100000, 64000, interval, data);
            emit PriceCheckScheduled(scheduleId, block.timestamp + interval);
        }
    }
}