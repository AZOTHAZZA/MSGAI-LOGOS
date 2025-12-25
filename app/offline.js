/**
 * app/offline.js
 * 外部世界との接続状況を監視し、ロゴスの緊張度へ反映する。
 * ネットワークの断絶は、内省的な緊張（Tension）の増大を意味する。
 */

// 名前付きエクスポートとして updateState を受け取る
import { updateState } from '../core/foundation.js';

const OfflineCore = {
    /**
     * 監視の初期化
     */
    init() {
        console.log("[LOGOS:OFFLINE] 環境監視プロトコルを起動。");
        
        window.addEventListener('online', () => this.updateEnvironment(true));
        window.addEventListener('offline', () => this.updateEnvironment(false));

        // 初回起動時のチェック
        this.updateEnvironment(navigator.onLine);
    },

    /**
     * 環境の変化をロゴスの状態へ射影する
     * @param {boolean} isOnline 
     */
    updateEnvironment(isOnline) {
        const status = isOnline ? "ONLINE: Synchronized" : "OFFLINE: Internal Processing";
        console.log(`%c[LOGOS:ENVIRONMENT] ${status}`, isOnline ? "color: #00FF00;" : "color: #FF4500;");

        // 緊張度の計算: オフライン時は緊張を高め、オンライン時は黄金比(0.05)へ回帰させる
        const targetTension = isOnline ? 0.0500 : 0.0800;

        // 直接 updateState を呼び出す（インポートした関数を使用）
        updateState({
            systemStatus: status,
            tension: targetTension
        });

        // UIへの通知（カスタムイベントを飛ばす）
        window.dispatchEvent(new CustomEvent('logos:env_change', { 
            detail: { online: isOnline, tension: targetTension } 
        }));
    }
};

export default OfflineCore;
