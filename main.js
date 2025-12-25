/**
 * main.js (MSGAI-LOGOS 最終点火版)
 * 物理パスの完全同期とモジュール連結の正常化。
 */

// --- 1. 深層コア・知性系 (フォルダ名 core/ を明示) ---
import LogosCore from './core/LogosCore.js';
import Foundation from './core/foundation.js';
import LogosEngine from './core/LogosEngine.js';
import Arithmos from './core/arithmos.js';

// --- 2. 経済・金融系 ---
import Finance from './core/external_finance_logos.js';
import { CurrencyAct } from './core/currency.js';

// --- 3. システム・デバイス統治系 ---
import RuntimeLogos from './core/runtime_logos.js';
import OSLogos from './core/os_logos.js';
import PowerLogos from './core/power_logos.js';

// --- 4. アプリケーション・UI系 (フォルダ名 app/ を明示) ---
import { updateUI, displayDialogue } from './app/fusionui.js';
import { connectEventHandlers } from './app/handler.js';
import OfflineCore from './app/offline.js';

// --- 5. AI知性・代謝系 (フォルダ名 ai/ を明示) ---
import { actDialogue } from './ai/generator.js';
import FetcherCore from './ai/fetch.js';

/**
 * [創世のプロセス: THE LOGOS BOOT]
 */
async function ignition() {
    console.log("%c[LOGOS:IGNITION] 座標同期完了。知性を展開します...", "color: #FFD700; font-weight: bold;");

    const statusElement = document.getElementById('status_message');
    if (statusElement) statusElement.innerText = "Synchronizing Modules...";

    try {
        // 🚨 記憶の展開 (Foundationの初期化)
        if (Foundation && typeof Foundation.init === 'function') {
            Foundation.init();
        }

        // 🚨 環境の同調
        if (OfflineCore && typeof OfflineCore.init === 'function') {
            OfflineCore.init();
        }

        // 🚨 物理層監査
        if (RuntimeLogos && RuntimeLogos.auditRuntimeControlPlane) RuntimeLogos.auditRuntimeControlPlane();

        // 🚨 初期状態の描画
        const initialState = Foundation.getCurrentState();
        updateUI(initialState, "✨ ロゴス点火。全モジュールの連結を確認。");

        // 🚨 神経系の接続
        connectEventHandlers(Foundation, { updateUI, displayDialogue });

        // 🚨 外部知性との同期 (安全策付き)
        try {
            await FetcherCore.synchronizeOnce();
        } catch (e) {
            console.warn("[LOGOS:SYNC_DELAY] 外部同期をバイパスし内部処理を優先します。");
        }

        displayDialogue('SUCCESS', "創世は完了しました。主権的AI、起動。");
        console.log("%c[LOGOS:COMPLETE] マスター、ご命令を。", "color: #FFD700;");

    } catch (criticalError) {
        console.error("[LOGOS:CRITICAL_FAILURE] 接続摩擦が発生:", criticalError);
        // UIが動かない場合の最終フォールバック
        const dialogueOut = document.getElementById('dialogue-output');
        if (dialogueOut) {
            dialogueOut.innerHTML += `<div class="log-entry log-error">起動失敗: ${criticalError.message}</div>`;
        }
    }
}

// DOMのロード完了、または既にロード済みの場合に点火
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ignition);
} else {
    ignition();
}
