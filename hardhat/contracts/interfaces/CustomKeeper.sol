// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface CustomKeeper {
    function check() external returns (bool required);

    function executeCall(bytes calldata data) external;
}
