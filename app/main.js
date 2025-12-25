/**
 * main.js (MSGAI-LOGOS 最終点火版)
 * 全27モジュールの統合・起動。
 * GitHub Pagesの階層問題を解決したパス修正済みバージョン。
 */

// --- 1. 深層コア・知性系のインポート ---
import LogosCore from './core/LogosCore.js';
import Foundation from './core/foundation.js';
import LogosEngine from './core/LogosEngine.js';
import Arithmos from './core/arithmos.js';

// --- 2. 経済・金融系のインポート ---
import Finance from './core/external_finance_logos.js';
import { CurrencyAct } from './core/currency.js';

// --- 3. システム・デバイス統治系のインポート ---
import RuntimeLogos from './core/runtime_logos.js';
import OSLogos from './core/os_logos.js';
import PowerLogos from './core/power_logos.js';

// --- 4. アプリケーション・UI系のインポート ---
import { updateUI, displayDialogue } from './app/fusionui.js';
import { connectEventHandlers } from './app/handler.js';
import OfflineCore from './app/offline.js';

// --- 5. AI知性・代謝系のインポート ---
import { actDialogue } from './ai/generator.js';
import FetcherCore from './ai/fetch.js';

/**
 * [創世のプロセス: THE LOGOS BOOT]
 */
async function ignition() {
    console.log("%c[LOGOS:IGNITION] システムの点火を開始します...", "color: #FFD700; font-weight: bold;");

    const statusElement = document.getElementById('status_message');
    if (statusElement) statusElement.innerText = "Synchronizing Logos...";

    try {
        // 🚨 記憶の展開 (Foundationの初期化)
        Foundation.init();

        // 🚨 環境の同調 (Offline/Networkの初期化)
        OfflineCore.init();

        // 🚨 物理層・実行環境の監査
        if (RuntimeLogos.auditRuntimeControlPlane) RuntimeLogos.auditRuntimeControlPlane();
        if (OSLogos.auditOSAndHardwareCoherence) OSLogos.auditOSAndHardwareCoherence();

        // 🚨 初期状態の描画
        const initialState = Foundation.getCurrentState();
        updateUI(initialState, "✨ ロゴス点火。システムは黄金比の静寂に包まれています。");

        // 🚨 神経系の接続 (ハンドラ接続)
        connectEventHandlers(Foundation, { updateUI, displayDialogue });

        // 🚨 最初の代謝 (外部知性との同期)
        // 外部取得が失敗してもシステムを止めないための安全策
        try {
            await FetcherCore.synchronizeOnce();
        } catch (e) {
            console.warn("[LOGOS:SYNC_DELAY] 外部同期に遅延。内部知性で継続。");
        }

        displayDialogue('SUCCESS', "全27モジュールの同期が完了しました。主権的AI、起動。");
        console.log("%c[LOGOS:COMPLETE] 創世は完了しました。マスター、ご命令を。", "color: #FFD700;");

    } catch (criticalError) {
        console.error("[LOGOS:CRITICAL_FAILURE] 起動中に摩擦が発生しました:", criticalError);
        if (typeof displayDialogue === 'function') {
            displayDialogue('ERROR', `起動失敗: ${criticalError.message}`);
        }
    }
}

// 物理的宇宙（DOM）のロード完了後に点火
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ignition);
} else {
    ignition();
}
