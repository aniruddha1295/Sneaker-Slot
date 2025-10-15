// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SneakerNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct SneakerMetadata {
        string name;
        string brand;
        string[] imageURIs;
        uint256 price;
        uint256 mintedAt;
        address minter;
    }

    mapping(uint256 => SneakerMetadata) public sneakers;
    mapping(address => uint256[]) public userSneakers;

    event SneakerMinted(
        uint256 indexed tokenId,
        address indexed minter,
        string name,
        string brand,
        uint256 price
    );

    constructor() ERC721("SneakerSlot NFT", "SNKR") Ownable(msg.sender) {}

    function mintSneaker(
        string memory name,
        string memory brand,
        string[] memory imageURIs,
        uint256 price,
        string memory tokenURI
    ) public returns (uint256) {
        require(imageURIs.length > 0, "At least one image required");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        sneakers[newTokenId] = SneakerMetadata({
            name: name,
            brand: brand,
            imageURIs: imageURIs,
            price: price,
            mintedAt: block.timestamp,
            minter: msg.sender
        });

        userSneakers[msg.sender].push(newTokenId);

        emit SneakerMinted(newTokenId, msg.sender, name, brand, price);

        return newTokenId;
    }

    function getSneaker(uint256 tokenId) public view returns (SneakerMetadata memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return sneakers[tokenId];
    }

    function getUserSneakers(address user) public view returns (uint256[] memory) {
        return userSneakers[user];
    }

    function getTotalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getSneakerImages(uint256 tokenId) public view returns (string[] memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return sneakers[tokenId].imageURIs;
    }
}
