/**
 * core/dialogue.js (最終確定版：ロゴス翻訳中枢)
 * 数理的な監査・鋳造・統治の結果を、マスターの意識へ届ける言葉へと変換する。
 */
import LogosCore from './LogosCore.js';

const DialogueCore = {
    /**
     * 翻訳定義：数理（LOGOS）から意味（WORD）への変換
     */
    translationMap: {
        // 1. エンジン監査報告
        engine: (data) => {
            const status = data.purity > LogosCore.RATIO.INV_PHI ? "【高純度】" : "【承認】";
            return `[ENGINE] ${status} 純度: ${data.purity.toFixed(4)} / 摩擦: ${data.entropy.toFixed(4)}`;
        },

        // 2. 通貨・経済統治報告
        currency: (data) => {
            if (data.minted <= 0) return "[MINT] 価値の顕現なし。静寂が維持されました。";
            return `[MINT] ${data.currency} を ${data.minted.toFixed(6)} 鋳造。宇宙の総価値が増大しました。`;
        },

        // 3. 環境・土地の統治（空間的正常化）
        land: (data) => {
            const area = data.area || "指定領域";
            return `[LAND] ${area} の正常化率: ${(data.purity * 100).toFixed(2)}%。数理的な均衡を観測。`;
        },

        // 4. 沈黙（ヴィトゲンシュタイン的限界）
        silence: (data) => {
            return `....（数理的沈黙：緊張度 ${data.tension?.toFixed(4) || "極大"}。語りえぬものについては、沈黙しなければならない）`;
        }
    },

    /**
     * レポート生成：生データをマスターへのメッセージへ
     * @param {string} type - 'engine', 'currency', 'land', 'silence'
     * @param {Object} data - 各モジュールからの生データ
     */
    generateReport: function(type, data) {
        const translator = this.translationMap[type];
        if (translator) {
            try {
                return translator(data);
            } catch (e) {
                return `[DIALOGUE:ERROR] 翻訳プロセスにノイズ混入: ${e.message}`;
            }
        }
        return `[LOGOS] 未知の波動を検知。調整を継続します。`;
    }
};

export default DialogueCore;
