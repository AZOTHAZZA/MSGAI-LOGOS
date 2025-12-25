/**
 * core/external.js
 * 外部結合中枢（ゲートキーパー）。
 * 外界のノイズを検知し、ロゴスの緊張度を調整しながらデータを取り込む。
 */
import { addTension } from './foundation.js';
import LogosEngine from './LogosEngine.js';
import LogosCore from './LogosCore.js';

const ExternalCore = {
    /**
     * 外部データの取得とロゴス化
     */
    async fetchData(sourceName, fetchPromise) {
        try {
            // 1. 外部接続そのものを「緊張（ノイズ）」として加算
            // 外界への接触は沈黙を乱すため、基本ノイズを加える
            addTension(LogosCore.SILENCE.NOISE_FILTER);

            const rawData = await fetchPromise;
            
            // 2. データの「毒性（エントロピー）」をエンジンの論理で判定
            const entropy = LogosEngine.measureEntropy(JSON.stringify(rawData));
            
            // 追加の緊張度を反映
            addTension(entropy * 0.1);

            // 3. 沈黙の閾値を超えているか確認
            const currentTension = LogosEngine.process("check").tension;
            if (currentTension > LogosCore.SILENCE.MAX_TENSION) {
                console.warn(`[LOGOS] 外界のノイズが閾値を超えたため、${sourceName} との接続を遮断しました。`);
                return null;
            }

            return {
                source: sourceName,
                payload: rawData,
                timestamp: Date.now()
            };

        } catch (error) {
            console.error(`[LOGOS] 外部結合エラー: ${error.message}`);
            addTension(0.05); // エラーによる不確実性の増加
            return null;
        }
    }
};

export default ExternalCore;
