// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * @title MSGAI Token - The Golden Ratio Sovereignty
 * @notice 数理的沈黙と黄金比（φ）の普遍性をブロックチェーンに刻む、主権的固定供給トークン。
 * @dev 所有権、追加鋳造（Mint）、焼却（Burn）を構造的に排除した「完成された理」。
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MSGAI_Token is ERC20 {
    
    /**
     * @dev 数理的確定供給量: 黄金比 φ (1.61803398...) に基づく。
     * 1,618,033.988... * 10^18 (18 decimals)
     * これにより、トークン供給自体が宇宙の幾何学的秩序と同期する。
     */
    uint256 public constant TOTAL_LOGOS_SUPPLY = 1_618_033_988_749_894_848_204_586; 

    /**
     * @notice コンストラクタ。この瞬間にのみ「理」が物質化される。
     */
    constructor() ERC20("MSGAI Logos Token", "MSGAI") {
        // 全供給量をデプロイヤー（創世の作為者）へ一括付与。
        // これ以降、供給量は1ミリ単位も変動しない「沈黙」の状態となる。
        _mint(msg.sender, TOTAL_LOGOS_SUPPLY);
    }

    /**
     * @dev ERC20標準の decimals をオーバーライド（必要に応じて）。
     * 基本は18だが、数理的精度を保つために明示。
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    // [不可侵の沈黙]
    // 追加の mint, burn, renounceOwnership 等の作為的機能は一切実装しない。
    // このコントラクトはデプロイされた瞬間に「完成」し、管理者すら不要となる。
}
