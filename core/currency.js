/**
 * core/currency.js
 * MSGAI-LOGOS 多通貨交換・統治モジュール
 */
import LogosCore from './LogosCore.js';
import LogosEngine from './LogosEngine.js';
import Mint from './Mint.js';

// 黄金比ベースの動的な為替計算（USDを基準とした射影）
const getLogosRate = (currency) => {
    const phi = LogosCore.RATIO.PHI;
    const rates = {
        JPY: phi * 100,      // 161.8
        USD: 1,              // 基準
        EUR: phi / 1.7,      // 0.95
        BTC: 1 / Math.pow(phi, 10), // 希少性
        ETH: 1 / Math.pow(phi, 5),
        MATIC: Math.PI / phi
    };
    return rates[currency] || 1;
};

export const CurrencyAct = {
    /**
     * 通貨生成：LogosEngineの判定を経て価値を顕現させる
     */
    mint: function(userState, currency, energy, entropy) {
        // ロゴス価値を算出
        const logosValue = Mint.calculateMint(energy, entropy);
        const rate = getLogosRate(currency);
        
        const amount = logosValue * rate;
        userState.accounts[currency] = (userState.accounts[currency] || 0) + amount;
        
        return { userState, amount };
    },

    /**
     * 通貨交換：エントロピーを発生させつつ、価値を転換する
     */
    exchange: function(userState, fromCur, amount, toCur) {
        if ((userState.accounts[fromCur] || 0) < amount) throw new Error("残高不足");

        const fromRate = getLogosRate(fromCur);
        const toRate = getLogosRate(toCur);
        
        // 価値の等価変換 (USD換算経由)
        const usdValue = amount / fromRate;
        const convertedAmount = usdValue * toRate;

        userState.accounts[fromCur] -= amount;
        userState.accounts[toCur] = (userState.accounts[toCur] || 0) + convertedAmount;

        return { userState, convertedAmount };
    }
};
