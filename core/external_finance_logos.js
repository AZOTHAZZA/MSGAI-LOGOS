/**
 * core/external_finance_logos.js (LOGOS統合版)
 * 外部および内部の金融作為を「ロゴス統治」の下で制御する。
 */
import { getCurrentState, updateState, addTension } from './foundation.js';
import LogosCore from './LogosCore.js';

const Finance = {
    // 1. 内部移動（多通貨対応）
    transferInternal: function(fromUser, toUser, currency, amount) {
        const state = getCurrentState();
        if (!state.accounts[fromUser] || !state.accounts[toUser]) {
            return { success: false, reason: "対象ユーザーが存在しません。" };
        }

        if ((state.accounts[fromUser][currency] || 0) < amount) {
            return { success: false, reason: `${currency} の残高が不足しています。` };
        }

        // 摩擦ゼロの移動
        state.accounts[fromUser][currency] -= amount;
        state.accounts[toUser][currency] = (state.accounts[toUser][currency] || 0) + amount;
        
        updateState(state);
        return { success: true, txId: `LOGOS_INT_${Date.now()}` };
    },

    // 2. 外部送金（緊張度の上昇を伴う）
    initiateExternalTransfer: async function(user, currency, amount) {
        const state = getCurrentState();
        if ((state.accounts[user][currency] || 0) < amount) {
            return { success: false, reason: "残高不足" };
        }

        // 外部への干渉は「ノイズ」とみなし、緊張度を大幅に上げる
        addTension(LogosCore.SILENCE.NOISE_FILTER * 5); 

        // 擬似的な外部通信
        await new Promise(r => setTimeout(r, 1000));

        state.accounts[user][currency] -= amount;
        updateState(state);
        
        return { success: true, txId: `LOGOS_EXT_${Date.now()}` };
    },

    // 3. 創世（生成）：Mintモジュールとの橋渡し
    generateGenesis: function(user, currency, amount) {
        const state = getCurrentState();
        if (!state.accounts[user]) return { success: false };

        state.accounts[user][currency] = (state.accounts[user][currency] || 0) + amount;
        
        updateState(state);
        return { success: true, newBalance: state.accounts[user][currency] };
    }
};

export default Finance;
