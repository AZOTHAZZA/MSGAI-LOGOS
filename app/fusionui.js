/**
 * app/fusionui.js (LOGOS統合版)
 * 視覚的ロゴス。コアの状態をマスターの網膜へ透過的に投影する。
 */

export function updateUI(stateData, statusMessage) {
    // 1. 防御的チェックと緊張度 (Tension) の取得
    if (!stateData || !stateData.tension) {
        console.error("[UI:ERROR] 状態データが不完全です。");
        return;
    }

    const T_value = stateData.tension.value;
    
    // 緊張度表示の更新
    const tensionDisplay = document.getElementById('tension_level_display');
    const tensionBar = document.getElementById('tension_level_display_bar');
    
    if (tensionDisplay) tensionDisplay.textContent = `T: ${T_value.toFixed(4)}`;
    if (tensionBar) {
        tensionBar.style.width = `${T_value * 100}%`;
        // 黄金比(0.618)を超えると警告色へ
        tensionBar.style.backgroundColor = T_value > 0.618 ? 'var(--color-alert-red)' : 'var(--color-success-green)';
    }

    // 2. 多通貨残高 (Portfolio) の動的表示
    const balanceContainer = document.getElementById('balance_display_container');
    const activeUser = stateData.active_user;
    const accounts = stateData.accounts[activeUser] || {};

    if (balanceContainer) {
        // 残高表示を一度クリアして再構築（多通貨対応）
        balanceContainer.innerHTML = ''; 
        Object.entries(accounts).forEach(([currency, amount]) => {
            const span = document.createElement('span');
            span.className = 'currency-badge';
            span.innerHTML = `<strong>${currency}:</strong> ${amount.toFixed(currency === 'BTC' ? 8 : 2)} `;
            balanceContainer.appendChild(span);
        });
    }

    // 3. アクティブユーザー名とステータス
    const activeUserNameElement = document.getElementById('active_user_name');
    if (activeUserNameElement) activeUserNameElement.textContent = activeUser;

    const mainStatusElement = document.getElementById('status_message');
    if (mainStatusElement) mainStatusElement.textContent = statusMessage;

    // 4. 暴走抑止ステータスの更新
    const autonomyStatusElement = document.getElementById('autonomy_status');
    if (autonomyStatusElement) {
        const status = T_value > 0.8 ? '臨界 (CRITICAL)' : T_value > 0.618 ? '緊張 (TENSE)' : '静寂 (SILENT)';
        autonomyStatusElement.textContent = `統治状態: ${status}`;
        autonomyStatusElement.style.color = T_value > 0.618 ? 'var(--color-alert-red)' : 'var(--color-success-green)';
    }
}

/**
 * ログエリアへのメッセージ追記
 */
export function displayDialogue(type, message) {
    const output = document.getElementById('dialogue-output');
    if (!output) return;

    const div = document.createElement('div');
    div.className = `log-entry log-${type.toLowerCase()}`;
    div.innerHTML = `[${new Date().toLocaleTimeString()}] <strong>${type}:</strong> ${message}`;
    
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}
