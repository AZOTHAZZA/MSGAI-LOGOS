/**
 * core/currency.js (最終確定版：多通貨統治モジュール)
 * 宇宙の理（黄金比）に基づき、知性から価値を、価値から多通貨を顕現させる。
 */
import LogosCore from './LogosCore.js';

/**
 * 黄金比ベースの動的為替レート
 * 全ての価値は LOGOS を特異点（1.0）として射影される。
 */
const getExchangeRate = (currency) => {
    const phi = LogosCore.RATIO.PHI;
    const invPhi = LogosCore.RATIO.INV_PHI; // 0.618...
    
    const rates = {
        LOGOS: 1.0,                              // 宇宙の基準
        JPY: phi * 100,                          // 約161.8
        USD: invPhi,                             // 約0.618
        EUR: invPhi * 0.9,
        BTC: 1 / Math.pow(phi, 10),              // 究極の希少性
        ETH: 1 / Math.pow(phi, 5),
        MATIC: LogosCore.RATIO.PI / phi
    };
    return rates[currency] || 1.0;
};

export const CurrencyAct = {
    /**
     * 通貨生成（鋳造）：純度と摩擦から価値を確定する
     * @param {Object} account - Foundationから渡される特定のユーザー口座
     * @param {string} currency - 鋳造する通貨単位
     * @param {number} purity - 言語監査による純度 (0.0 - 1.0)
     * @param {number} entropy - 発生したエントロピー/摩擦
     */
    mint: function(account, currency, purity, entropy) {
        const phi = LogosCore.RATIO.PHI;
        
        // 旧 Mint.js の数理を洗練：純度が高いほど黄金比の恩恵を受け、摩擦で減衰する
        const logosValue = (purity * phi) / (1 + (entropy * LogosCore.RATIO.INV_PHI));
        
        const rate = getExchangeRate(currency);
        const amount = logosValue * rate;

        // 口座への反映
        account[currency] = (account[currency] || 0) + amount;
        
        return {
            currency: currency,
            amount: amount,
            logosValue: logosValue
        };
    },

    /**
     * 通貨交換：エントロピー（手数料的な摩擦）を伴う等価変換
     */
    exchange: function(account, fromCur, amount, toCur) {
        if ((account[fromCur] || 0) < amount) {
            throw new Error("[CURRENCY:ERROR] 残高不足です。");
        }

        const fromRate = getExchangeRate(fromCur);
        const toRate = getExchangeRate(toCur);
        
        // 変換プロセス：一旦 LOGOS 換算してから目的の通貨へ
        const logosValue = amount / fromRate;
        const convertedAmount = logosValue * toRate;

        // 資産の移動
        account[fromCur] -= amount;
        account[toCur] = (account[toCur] || 0) + convertedAmount;

        return {
            from: fromCur,
            to: toCur,
            convertedAmount: convertedAmount
        };
    }
};
