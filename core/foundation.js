/**
 * core/foundation.js (LOGOS統合版)
 * データの持続性(Persistence)とアカウント状態を管理する。
 */
import LogosCore from './LogosCore.js';

const INITIAL_ACCOUNTS = {
    Master: { LOGOS: 0, USD: 0, JPY: 0, BTC: 0, ETH: 0, MATIC: 0 },
    World:  { LOGOS: 0, USD: 0, JPY: 0, BTC: 0, ETH: 0, MATIC: 0 }
};

let state = initializeState();

export function initializeState() {
    return {
        status_message: "LOGOS 統治開始",
        active_user: "Master",
        accounts: JSON.parse(JSON.stringify(INITIAL_ACCOUNTS)),
        // LogosCoreの定数を反映
        tension: { 
            value: 0.0, 
            max_limit: LogosCore.SILENCE.MAX_TENSION, 
            increase_rate: LogosCore.SILENCE.NOISE_FILTER 
        }
    };
}

export function getCurrentState() {
    return state;
}

export function updateState(newState) {
    state = newState;
    localStorage.setItem('logosState', JSON.stringify(state));
}

// 状態復元ロジック
const saved = localStorage.getItem('logosState');
if (saved) {
    try {
        state = JSON.parse(saved);
        state.status_message = "正常化プロセス再開";
    } catch (e) {
        state = initializeState();
    }
}

/**
 * Tension（論理緊張度）の操作
 */
export function addTension(amount) {
    state.tension.value += amount;
    // 0.0 〜 1.0 の間でクランプ
    state.tension.value = Math.min(Math.max(state.tension.value, 0), 1.0);
    updateState(state);
}

// ...他の getActiveUserBalance 等の便利関数は維持...
