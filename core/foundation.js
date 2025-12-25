/**
 * core/foundation.js (最終確定版：基盤・状態管理)
 * データの持続性(Persistence)とアカウント状態を統治する。
 */
import LogosCore from './LogosCore.js';

// 初期口座構成
const INITIAL_ACCOUNTS = {
    Master: { LOGOS: 0, USD: 0, JPY: 0, BTC: 0, ETH: 0, MATIC: 0 },
    World:  { LOGOS: 0, USD: 0, JPY: 0, BTC: 0, ETH: 0, MATIC: 0 }
};

let state = null;

const Foundation = {
    /**
     * 状態の初期化と復元
     */
    init: function() {
        const saved = localStorage.getItem('logosState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // 既存の保存データに新しい初期構造をマージ（新通貨対応）
                state = {
                    ...this.createInitialState(),
                    ...parsed,
                    status_message: "正常化プロセス再開"
                };
            } catch (e) {
                state = this.createInitialState();
            }
        } else {
            state = this.createInitialState();
        }
    },

    /**
     * 真新しいロゴス状態の生成
     */
    createInitialState: function() {
        return {
            status_message: "LOGOS 統治開始",
            active_user: "Master",
            accounts: JSON.parse(JSON.stringify(INITIAL_ACCOUNTS)),
            tension: { 
                value: LogosCore.SILENCE.INITIAL_TENSION, // 0.05 の鼓動
                max_limit: LogosCore.SILENCE.MAX_TENSION, 
                increase_rate: LogosCore.SILENCE.NOISE_FILTER 
            }
        };
    },

    getCurrentState: () => state,

    updateState: function(newState) {
        state = { ...state, ...newState };
        localStorage.setItem('logosState', JSON.stringify(state));
    },

    /**
     * Tension（論理緊張度）の操作
     */
    addTension: function(amount) {
        state.tension.value += amount;
        // 0.0 〜 1.0 の間でクランプ
        state.tension.value = Math.min(Math.max(state.tension.value, 0), 1.0);
        this.updateState(state);
    },

    /**
     * 特定ユーザーの残高取得
     */
    getBalance: function(user, currency) {
        return state.accounts[user] ? (state.accounts[user][currency] || 0) : 0;
    }
};

// 初回インポート時に初期化を実行
Foundation.init();

export const { getCurrentState, updateState, addTension } = Foundation;
export default Foundation;
