/**
 * core/external_finance_logos.js (最終確定版：金融執行・外部通信)
 * 内部の資産移動および外部への価値射影を制御する。
 * 計算ロジックを CurrencyAct に委譲し、執行と緊張度管理に特化する。
 */
import { getCurrentState, updateState, addTension } from './foundation.js';
import LogosCore from './LogosCore.js';
import { CurrencyAct } from './currency.js'; // 通貨の法をインポート

const Finance = {
    /**
     * 1. 内部送金（ユーザー間移動）
     * 内部移動は「調和」とみなし、緊張度の変動を最小限に抑える。
     */
    transferInternal: function(fromUser, toUser, currency, amount) {
        const state = getCurrentState();
        const fromAcc = state.accounts[fromUser];
        const toAcc = state.accounts[toUser];

        if (!fromAcc || !toAcc) return { success: false, reason: "対象が存在しません。" };
        if ((fromAcc[currency] || 0) < amount) return { success: false, reason: "残高不足" };

        // 実際の移動処理（法の執行）
        fromAcc[currency] -= amount;
        toAcc[currency] = (toAcc[currency] || 0) + amount;
        
        // わずかな処理エントロピーを付与
        addTension(LogosCore.LIMIT.EPSILON * 100);
        
        updateState(state);
        return { success: true, txId: `L-INT-${Date.now()}` };
    },

    /**
     * 2. 外部送金（システム外への価値射影）
     * 外部への干渉は大きな「摩擦」となり、緊張度を劇的に上昇させる。
     */
    initiateExternalTransfer: async function(user, currency, amount) {
        const state = getCurrentState();
        const account = state.accounts[user];

        if (!account || (account[currency] || 0) < amount) {
            return { success: false, reason: "残高不足またはユーザー不明" };
        }

        // 外部干渉に伴う緊張度の上昇（黄金比の反転点を利用したエントロピー算出）
        const externalFriction = LogosCore.RATIO.INV_PHI * 0.5;
        addTension(externalFriction); 

        // 擬似的な非同期通信（外部宇宙との同調待機）
        await new Promise(r => setTimeout(r, 800));

        account[currency] -= amount;
        updateState(state);
        
        return { success: true, txId: `L-EXT-${Date.now()}` };
    },

    /**
     * 3. 資産の交換（CurrencyAct への委譲）
     */
    executeExchange: function(user, fromCur, amount, toCur) {
        const state = getCurrentState();
        const account = state.accounts[user];

        try {
            const result = CurrencyAct.exchange(account, fromCur, amount, toCur);
            updateState(state);
            return { success: true, ...result };
        } catch (e) {
            return { success: false, reason: e.message };
        }
    }
};

export default Finance;
