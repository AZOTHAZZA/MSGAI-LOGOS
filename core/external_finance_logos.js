/**
 * core/external_finance_logos.js
 * 金融的知性：資産の鋳造（Mint）と価値の循環を司る。
 */

import { addTension, updateState, getCurrentState } from './foundation.js';
import LogosCore from './LogosCore.js';

const Finance = {
    /**
     * LOGOS通貨を鋳造する
     * @param {number} amount 
     */
    mint(amount) {
        if (amount <= 0) return;

        const state = getCurrentState();
        const currentBalance = state.balances[LogosCore.ECONOMICS.BASE_UNIT] || 0;
        
        // 鋳造アクション：残高を増やし、緊張度をわずかに上昇させる
        const newBalance = currentBalance + amount;
        
        updateState({
            balances: {
                ...state.balances,
                [LogosCore.ECONOMICS.BASE_UNIT]: newBalance
            }
        });

        // 通貨発行による市場の緊張
        addTension(0.001 * amount);

        console.log(`%c[FINANCE:MINT] ${amount} LOGOS minted.`, "color: #FFD700; font-weight: bold;");
        return newBalance;
    },

    /**
     * 資産のリセット（浄化）
     */
    resetAccounts() {
        updateState({
            balances: { [LogosCore.ECONOMICS.BASE_UNIT]: 0.0 },
            tension: LogosCore.SILENCE.INITIAL_TENSION
        });
        console.log("[FINANCE:RESET] 全資産が浄化されました。");
    }
};

export default Finance;
