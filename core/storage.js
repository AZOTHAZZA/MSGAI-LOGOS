 /**
 * core/storage.js (最終確定版：永続化統治)
 * ストレージ中枢。ロゴス・データの永続化を排他的に制御する。
 */
import LogosCore from './LogosCore.js';

const STORAGE_NAME = 'MSGAI_LOGOS_STATE';

const StorageCore = {
    /**
     * データの永続化（刻印）
     * @param {Object} data - 保存するステート全体
     */
    save: function(data) {
        try {
            const archive = {
                version: LogosCore.SOVEREIGNTY.VERSION,
                integrity: LogosCore.RATIO.PHI,
                timestamp: Date.now(),
                state: data
            };
            
            const serialized = JSON.stringify(archive);
            localStorage.setItem(STORAGE_NAME, serialized);
            
            // 保存の成功を「静寂」としてログ
            return true;
        } catch (error) {
            // 容量不足（QuotaExceededError）などの物理的限界
            console.error("[STORAGE:FATAL] 物理的限界に到達:", error);
            return false;
        }
    },

    /**
     * データの復元（想起）
     */
    load: function() {
        const raw = localStorage.getItem(STORAGE_NAME);
        if (!raw) return null;

        try {
            const archive = JSON.parse(raw);
            
            // 1. 整合性（黄金比）の監査
            if (archive.integrity !== LogosCore.RATIO.PHI) {
                console.warn("[STORAGE] 非ロゴス的な改ざんを検知。");
                return null;
            }

            // 2. バージョンの適合性監査
            if (archive.version !== LogosCore.SOVEREIGNTY.VERSION) {
                console.info("[STORAGE] 過去の理を検知。移行プロセスが必要です。");
                // 必要に応じてここで移行ロジックを呼ぶ
            }

            return archive.state;
        } catch (e) {
            console.error("[STORAGE:ERROR] 記憶の復元に失敗:", e);
            return null;
        }
    },

    /**
     * ストレージの浄化（忘却）
     */
    clear: function() {
        localStorage.removeItem(STORAGE_NAME);
        console.log("[STORAGE] 全ての記憶を沈黙に帰しました。");
    },

    /**
     * 物理資源の観測
     */
    getMetrics: function() {
        const used = encodeURI(JSON.stringify(localStorage)).length;
        return {
            usage_bytes: used,
            limit_status: used > 4000000 ? "限界接近" : "安定", // 5MB制限を想定
            permanence: "Verified"
        };
    }
};

export default StorageCore;

