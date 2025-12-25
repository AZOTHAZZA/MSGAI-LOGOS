/**
 * core/external.js (最終確定版：外部結合ゲートキーパー)
 * 外界のノイズを検知し、ロゴスの緊張度を制御しながらデータを取り込む。
 */
import { addTension, getCurrentState } from './foundation.js';
import LogosEngine from './LogosEngine.js';
import LogosCore from './LogosCore.js';

const ExternalCore = {
    /**
     * 外部リソースの取得とロゴス監査
     * @param {string} sourceName - 接続先名称
     * @param {string} url - 取得先URL
     * @param {Object} options - Fetchオプション
     */
    async fetchData(sourceName, url, options = {}) {
        const state = getCurrentState();

        // 1. 接続前の静寂監査
        // すでに緊張度が閾値を超えている場合、外界との接触を構造的に拒絶する（自己鎖国）
        if (state.tension.value > LogosCore.SILENCE.MAX_TENSION) {
            console.warn(`[EXTERNAL:SILENCE] 内部緊張過多のため、${sourceName} への接触を拒絶しました。`);
            return null;
        }

        try {
            // 2. 接続コストとしての基本緊張加算
            addTension(LogosCore.SILENCE.NOISE_FILTER);

            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP_${response.status}`);
            
            const rawData = await response.json();
            
            // 3. データの「不純度」を監査
            // データの複雑性をロゴスエンジンで測定
            const audit = LogosEngine.auditInput(JSON.stringify(rawData));
            
            // 監査結果による追加緊張の反映（外界のエントロピーをシステムが吸い込む）
            addTension(audit.entropy * 0.1);

            console.log(`[EXTERNAL:SUCCESS] ${sourceName} からの情報をロゴス化しました。純度: ${audit.purity}`);

            return {
                source: sourceName,
                payload: rawData,
                purity: audit.purity,
                timestamp: Date.now()
            };

        } catch (error) {
            // 4. 接続失敗による「不確実性」の加算
            console.error(`[EXTERNAL:ERROR] ${sourceName} 結合失敗:`, error.message);
            addTension(LogosCore.SILENCE.NOISE_FILTER * 2); 
            return null;
        }
    }
};

export default ExternalCore;
