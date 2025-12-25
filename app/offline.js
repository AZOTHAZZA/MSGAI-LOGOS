/**
 * app/offline.js (LOGOS統合版)
 * 環境適応。ネットワークのゆらぎを観測し、
 * システムの緊張度（Tension）を環境に合わせて最適化する。
 */
import { addTension, updateState } from '../core/foundation.js';
import LogosCore from '../core/LogosCore.js';

const OfflineCore = {
    isOnline: navigator.onLine,

    /**
     * 初期化：現在の環境をロゴスへ報告
     */
    init: function() {
        this.updateEnvironment(this.isOnline);
        
        window.addEventListener('online', () => this.updateEnvironment(true));
        window.addEventListener('offline', () => this.updateEnvironment(false));
    },

    /**
     * 環境変化の統治：オフラインを「静寂な緊張」として処理
     */
    updateEnvironment: function(status) {
        this.isOnline = status;
        
        // オフライン時は外部ノイズが消えるため、
        // 緊張度を「黄金比（phi）」に基づいて調整する
        const phi = LogosCore.RATIO.PHI;
        const environmentEntropy = status ? 0.01 : (1 / phi) * 0.1;

        // 緊張度の変動として適用
        addTension(environmentEntropy);

        const msg = status 
            ? "[LOGOS] 外部世界と再接続。共鳴を開始します。" 
            : "[LOGOS] 外部世界から隔離。静寂の論理へ移行します。";
            
        console.log(msg);
    }
};

export default OfflineCore;
