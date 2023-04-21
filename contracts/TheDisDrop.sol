// SPDX-License-Identifier: MIT
import "https://github.com/AcalaNetwork/predeploy-contracts/blob/master/contracts/schedule/Schedule.sol"; 
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract DisDrop{

    fallback() external payable{}
    receive() external payable{}

    function disdropETH(address payable[] memory recipients, uint256[] memory amount) internal{
        require(recipients.length == amount.length , "Give inputs accordingly!");
        require(msg.value > 0 , "You need to send some ETH please");
        for (uint256 i = 0; i < recipients.length; i++) {
            recipients[i].transfer(amount[i]);
        }
        uint256 balance = address(this).balance;
        if (balance > 0) {
            payable(msg.sender).transfer(balance);
        }
    }

    function disdropERC20(IERC20 token, address[] memory recipients, uint256[] memory amount) external{
        require(recipients.length == amount.length , "Give inputs accordingly!");
        uint256 total = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            total = total + amount[i];
        }
        require(token.transferFrom(msg.sender, address(this), total) , "Certain error occurred! ");
        for (uint256 i = 0; i < recipients.length; i++) {
            require(token.transfer(recipients[i], amount[i]));
        }
    }

    function scheduleETHtransfer(
        uint256[] memory amount, 
        address payable[] memory recipients, 
        uint256 gasLimit,
        uint256 storageLimit,
        uint256 minDelay) external payable{

            bytes memory inputData = abi.encodeWithSelector(this.disdropETH.selector);
    }
}

// ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"]
// ["50000000000000000", "5500000000000000"]
// ["5", "5"]
// ["0.05", "0.0055"]