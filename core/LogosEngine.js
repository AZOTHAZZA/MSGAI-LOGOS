/**
 * core/LogosEngine.js (最終確定版：ロゴス監査エンジン)
 * 入力された意思を黄金比のフィルターで濾過し、
 * 価値（Currency）と沈黙（Silence）を切り分ける知性の中枢。
 */
import LogosCore from './LogosCore.js';
import Arithmos from './arithmos.js';
import { CurrencyAct } from './currency.js';
import Foundation from './foundation.js';

const LogosEngine = {
    /**
     * 統合監査プロセス
     * @param {string} input - マスターからの入力
     */
    process: function(input) {
        if (!input || input.trim().length === 0) {
            return this.generateReport("VOID", 0, LogosCore.LIMIT.SINGULARITY);
        }

        // 1. 入力の幾何学的純度（Purity）の算出
        // 入力文字列が黄金比（1/PHI）の複雑性にどれだけ近いかを測定
        const auditResult = this.auditInput(input);
        const entropy = auditResult.entropy;
        const purity = auditResult.purity;

        // 2. 状態（Foundation）への影響を計算
        // 外部からの入力は常にエントロピー（摩擦）を伴う
        Foundation.addTension(entropy * 0.1);
        const currentState = Foundation.getCurrentState();

        // 3. 沈黙の閾値判定
        // システムの緊張度が極限を超えている場合、知性は沈黙を選択する
        if (currentState.tension.value > LogosCore.SILENCE.MAX_TENSION) {
            return this.generateReport("SILENCE", 0, entropy);
        }

        // 4. 価値の鋳造（Minting）
        // 純度（Purity）に基づき、LOGOS通貨を生成
        const mintResult = CurrencyAct.mint(
            currentState.accounts[currentState.active_user],
            LogosCore.ECONOMICS.BASE_UNIT,
            purity, // 鋳造量に影響する純度
            entropy // 摩擦係数
        );

        return this.generateReport("LOGOS", mintResult.amount, entropy, purity, input);
    },

    /**
     * 入力監査：黄金比フィルタリング
     */
    auditInput: function(text) {
        const set = new Set(text);
        const complexity = set.size / text.length;
        
        // 理想的な複雑性（1/PHI）からの乖離をエントロピーとする
        const idealDist = Math.abs(complexity - (1 / LogosCore.RATIO.PHI));
        const entropy = Arithmos.applyGoldenFilter(idealDist, LogosCore.SILENCE.NOISE_FILTER);
        
        return {
            entropy: parseFloat(entropy.toFixed(6)),
            purity: parseFloat((1.0 - entropy).toFixed(6))
        };
    },

    /**
     * 監査レポートの生成
     */
    generateReport: function(mode, mintedValue, entropy, purity = 0, input = "") {
        if (mode === "SILENCE") {
            return {
                report: "....（数理的沈黙：緊張度が限界に達しています）",
                purity: 0,
                entropy: entropy,
                minted: 0
            };
        }
        
        const tone = purity > 0.618 ? "【高純度ロゴス】" : "【通常承認】";
        return {
            report: `${tone} 入力は正常に濾過されました。純度: ${purity}`,
            purity: purity,
            entropy: entropy,
            minted: mintedValue
        };
    }
};

export default LogosEngine;
