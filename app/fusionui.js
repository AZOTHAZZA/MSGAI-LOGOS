 /**
 * app/fusionui.js
 * ロゴスの状態を物理的な画面（UI）へ翻訳し、出力する。
 */

/**
 * UIの全体更新
 * @param {Object} state - 現在のロゴスの状態
 * @param {string} message - 表示するメッセージ
 */
export function updateUI(state, message) {
    // 🚨 安全装置: stateが存在しない、あるいはtensionが未定義の場合のデフォルト値
    const tension = (state && state.tension !== undefined) ? state.tension : 0.0500;
    const balances = (state && state.balances) ? state.balances : { LOGOS: 0 };
    const user = (state && state.activeUser) ? state.activeUser : "Observing Master";

    // 1. Tensionの描画
    const tensionDisplay = document.getElementById('tension_level_display');
    const tensionBar = document.getElementById('tension_level_display_bar');
    
    if (tensionDisplay) {
        // ここで toFixed を安全に実行
        tensionDisplay.innerText = tension.toFixed(4);
    }
    
    if (tensionBar) {
        // 緊張度をプログレスバーの幅に変換 (例: 0.05 -> 5%)
        tensionBar.style.width = `${Math.min(tension * 100, 100)}%`;
    }

    // 2. 資産の描画
    const balanceContainer = document.getElementById('balance_display_container');
    if (balanceContainer) {
        balanceContainer.innerHTML = Object.entries(balances)
            .map(([unit, val]) => `<div class="balance-item">${unit}: <span class="gold-text">${val.toFixed(2)}</span></div>`)
            .join('');
    }

    // 3. ユーザー情報の描画
    const userDisplay = document.getElementById('active_user_name');
    if (userDisplay) userDisplay.innerText = user;

    // 4. メッセージの出力
    if (message) {
        displayDialogue('SYSTEM', message);
    }
}

/**
 * ダイアログエリアへのログ出力
 */
export function displayDialogue(type, text) {
    const output = document.getElementById('dialogue-output');
    if (!output) return;

    const entry = document.createElement('div');
    entry.className = `log-entry log-${type.toLowerCase()}`;
    entry.innerHTML = `<span class="log-type">[${type}]</span>: ${text}`;
    
    output.appendChild(entry);
    output.scrollTop = output.scrollHeight; // 常に最新へスクロール
}

