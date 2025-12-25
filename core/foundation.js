/**
 * core/foundation.js
 * ロゴスの記憶（状態管理）を司る。
 * 全モジュールからの状態更新を受け付け、黄金比の調和を維持する。
 */

import LogosCore from './LogosCore.js';

// --- 内部状態（記憶）の定義 ---
let state = {
    tension: LogosCore.SILENCE.INITIAL_TENSION, // デフォルト 0.05
    lastUpdate: Date.now(),
    sovereignty: LogosCore.SOVEREIGNTY.VERSION,
    balances: {
        [LogosCore.ECONOMICS.BASE_UNIT]: 0.0
    },
    activeUser: "Observing Master",
    systemStatus: "Initialized"
};

/**
 * 状態を更新し、変更を全神経系へ波及させる
 */
function updateState(newState) {
    // 数値が NaN になるのを防ぐためのガード
    if (newState.tension !== undefined && (typeof newState.tension !== 'number' || isNaN(newState.tension))) {
        console.warn("[LOGOS:FOUNDATION] 緊張度の不正値を検知。更新を拒絶しました。");
        delete newState.tension;
    }

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
 * 緊張度を特定の量だけ加算する（金融アクションなどで使用）
 */
function addTension(amount) {
    // 数値安全性チェック
    if (typeof amount !== 'number' || isNaN(amount)) {
        console.error("[LOGOS:FOUNDATION] addTensionに不正な値が渡されました。");
        return state;
    }
    const newTension = state.tension + amount;
    return updateState({ tension: newTension });
}

/**
 * 現在の状態（真実）を返す
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

// --- エクスポートの統合（重複を避け、全ての外部接続を許可） ---
export { updateState, addTension, getCurrentState, init };

const Foundation = {
    init,
    getCurrentState,
    updateState,
    addTension
};

export default Foundation;
