// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// modules
import {
    LSP8IdentifiableDigitalAsset
} from "../../LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol";
import {
    LSP8CompatibleERC721
} from "../../LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol";

// constants
import {
    _LSP4_METADATA_KEY
} from "../../LSP4DigitalAssetMetadata/LSP4Constants.sol";

contract LSP8CompatibleERC721Tester is LSP8CompatibleERC721 {
    constructor(
        string memory name_,
        string memory symbol_,
        address newOwner_,
        bytes memory tokenURIValue_
    ) LSP8CompatibleERC721(name_, symbol_, newOwner_) {
        _setData(_LSP4_METADATA_KEY, tokenURIValue_);
    }

    function mint(address to, uint256 tokenId, bytes calldata data) public {
        // using allowNonLSP1Recipient=true so we can send to EOA in test
        _mint(to, bytes32(tokenId), true, data);
    }

    function burn(uint256 tokenId, bytes calldata data) public {
        _burn(bytes32(tokenId), data);
    }
}
