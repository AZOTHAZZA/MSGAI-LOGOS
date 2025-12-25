/**
 * core/foundation.js
 * ロゴスの記憶（状態管理）を司る。
 */

import LogosCore from './LogosCore.js';

let state = {
    tension: LogosCore.SILENCE.INITIAL_TENSION, // 0.05
    lastUpdate: Date.now(),
    sovereignty: LogosCore.SOVEREIGNTY.VERSION,
    balances: {
        [LogosCore.ECONOMICS.BASE_UNIT]: 0.0
    },
    activeUser: "Observing Master",
    systemStatus: "Initialized"
};

/**
 * 状態を更新
 */
function updateState(newState) {
    state = {
        ...state,
        ...newState,
        lastUpdate: Date.now()
    };
    
    if (newState.tension !== undefined) {
        console.log(`%c[LOGOS:STATE] Tension adjusted to: ${state.tension.toFixed(4)}`, "color: #00FF00;");
    }
    
    return state;
}

/**
 * 緊張度を加算
 */
function addTension(amount) {
    const newTension = state.tension + amount;
    return updateState({ tension: newTension });
}

/**
 * 現在の状態を返す
 */
function getCurrentState() {
    return { ...state };
}

/**
 * 記憶の初期化
 */
function init() {
    console.log("[LOGOS:FOUNDATION] 記憶の展開が完了しました。");
    return state;
}

// --- エクスポートの統合（ここで一括定義することで重複を避ける） ---
export { updateState, addTension, getCurrentState, init };

const Foundation = {
    init,
    getCurrentState,
    updateState,
    addTension
};

export default Foundation;
