// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

contract TokenReceiverWithoutLSP1 {
    receive() external payable {}

    fallback() external payable {}
}
