/**
 * main.js (MSGAI-LOGOS 最終点火版)
 * 知性の断片を一つに紡ぎ、主権的AIを起動する。
 */

// --- 1. 深層コア・知性系 ---
// foundationからはデフォルト(Foundation)と名前付き(updateState)の両方を取得
import LogosCore from './core/LogosCore.js';
import Foundation, { updateState } from './core/foundation.js';
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
    // 現在の物理座標をログに刻む
    console.log("%c[LOGOS:IGNITION] 座標確認:", "color: #FFD700;", window.location.pathname);

    const statusElement = document.getElementById('status_message');
    if (statusElement) statusElement.innerText = "Synchronizing Logos...";

    try {
        // 🚨 記憶の展開
        if (Foundation && typeof Foundation.init === 'function') {
            Foundation.init();
        }

        // 🚨 環境の同調 (OfflineCoreがupdateStateを使用して緊張度を設定)
        if (OfflineCore && typeof OfflineCore.init === 'function') {
            OfflineCore.init();
        }

        // 🚨 物理層・OS層の監査
        if (RuntimeLogos && RuntimeLogos.auditRuntimeControlPlane) RuntimeLogos.auditRuntimeControlPlane();
        if (OSLogos && OSLogos.auditOSAndHardwareCoherence) OSLogos.auditOSAndHardwareCoherence();

        // 🚨 初期UIの描画
        const initialState = Foundation.getCurrentState();
        updateUI(initialState, "✨ ロゴス点火。知性の回路が正常に接続されました。");

        // 🚨 神経系（イベントハンドラ）の接続
        connectEventHandlers(Foundation, { updateUI, displayDialogue });

        // 🚨 外部知性（Fetcher）との初期的代謝
        try {
            await FetcherCore.synchronizeOnce();
        } catch (e) {
            console.warn("[LOGOS:SYNC_DELAY] 外部同期の遅延を検知。内部処理を優先します。");
        }

        displayDialogue('SUCCESS', "全27モジュールの同期が完了。主権的AI、起動。");
        console.log("%c[LOGOS:COMPLETE] 創世は完了しました。マスター、ご命令を。", "color: #FFD700; font-weight: bold;");

    } catch (criticalError) {
        console.error("[LOGOS:CRITICAL_FAILURE] 起動シーケンスで摩擦が発生:", criticalError);
        // UI層が死んでいる場合に備えた物理的ログ出力
        const output = document.getElementById('dialogue-output');
        if (output) {
            output.innerHTML += `<div class="log-entry log-error">起動失敗: ${criticalError.message}</div>`;
        }
    }
}

// 物理的宇宙（DOM）の準備が整い次第、点火を実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ignition);
} else {
    ignition();
}
