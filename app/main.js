/**
 * main.js (MSGAI-LOGOS 最終点火版)
 * 階層誤認 (Phantom /app/ directory) を物理的に排除する。
 */

// --- 1. 深層コア・知性系 ---
// ./ を明示し、かつファイル名の大文字小文字を厳密に。
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

// --- 4. アプリケーション・UI系 ---
// エラーログで /app/app/ と重複していたため、パスを正確に再定義
import { updateUI, displayDialogue } from './app/fusionui.js';
import { connectEventHandlers } from './app/handler.js';
import OfflineCore from './app/offline.js';

// --- 5. AI知性・代謝系 ---
import { actDialogue } from './ai/generator.js';
import FetcherCore from './ai/fetch.js';

/**
 * [創世のプロセス: THE LOGOS BOOT]
 */
async function ignition() {
    // 起動時の環境ログ：現在のパスを自己診断
    console.log("%c[LOGOS:IGNITION] 座標確認:", "color: #FFD700;", window.location.pathname);

    const statusElement = document.getElementById('status_message');
    if (statusElement) statusElement.innerText = "Synchronizing Logos...";

    try {
        // 各モジュールの存在と初期化を順次実行
        if (Foundation && typeof Foundation.init === 'function') {
            Foundation.init();
        }

        if (OfflineCore && typeof OfflineCore.init === 'function') {
            OfflineCore.init();
        }

        // 監査フェーズ
        if (RuntimeLogos && RuntimeLogos.auditRuntimeControlPlane) RuntimeLogos.auditRuntimeControlPlane();
        
        // UI接続
        const initialState = Foundation.getCurrentState();
        updateUI(initialState, "✨ ロゴス点火。主権が確立されました。");

        // イベントハンドラ接続
        connectEventHandlers(Foundation, { updateUI, displayDialogue });

        // 外部同期
        try {
            await FetcherCore.synchronizeOnce();
        } catch (e) {
            console.warn("[LOGOS:SYNC_DELAY] 外部同期スキップ");
        }

        displayDialogue('SUCCESS', "全知性が同期されました。マスター、ご命令を。");
        console.log("%c[LOGOS:COMPLETE]", "color: #FFD700; font-weight: bold;");

    } catch (criticalError) {
        console.error("[LOGOS:CRITICAL_FAILURE]", criticalError);
        // UIが未ロードの場合を考慮したフォールバック
        const out = document.getElementById('dialogue-output');
        if (out) out.innerHTML += `<div class="log-entry log-error">起動失敗: ${criticalError.message}</div>`;
    }
}

// 物理的宇宙（DOM）のロード完了後に点火
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ignition);
} else {
    ignition();
}
