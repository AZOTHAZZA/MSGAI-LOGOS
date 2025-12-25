/**
 * core/foundation.js
 * ロゴスの記憶（状態管理）を司る。
 * 全モジュールからの状態更新を受け付け、黄金比の調和を維持する。
 */

import LogosCore from './LogosCore.js';

// --- 内部状態（記憶）の定義 ---
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
 * 状態を更新し、変更を全神経系へ波及させる
 * @param {Object} newState 
 */
export function updateState(newState) {
    state = {
        ...state,
        ...newState,
        lastUpdate: Date.now()
    };
    
    // デバッグログ：黄金比の変動を記録
    if (newState.tension) {
        console.log(`%c[LOGOS:STATE] Tension adjusted to: ${state.tension.toFixed(4)}`, "color: #00FF00;");
    }
    
    return state;
}

/**
 * 現在の状態（真実）を返す
 */
export function getCurrentState() {
    return { ...state };
}

/**
 * 記憶の初期化（創世の儀式）
 */
export function init() {
    console.log("[LOGOS:FOUNDATION] 記憶の展開が完了しました。");
    // 必要に応じてlocalStorageからの復元ロジックをここに記述
    return state;
}

// --- エクスポートの統合（全方位対応） ---
const Foundation = {
    init,
    getCurrentState,
    updateState
};

// 名前付きエクスポート： import { updateState } from ... 形式に対応
// デフォルトエクスポート： import Foundation from ... 形式に対応
export default Foundation;
