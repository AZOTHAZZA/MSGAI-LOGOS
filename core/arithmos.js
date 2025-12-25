/**
 * core/arithmos.js
 * ロゴス数理演算（アルスモス）。
 * 緊張度や価値の計算を、黄金比に基づいた純粋関数として実行する。
 */
import LogosCore from './LogosCore.js';

const Arithmos = {
    /**
     * 次の緊張度を計算する（純粋関数）
     * @param {number} current - 現在の緊張度
     * @param {number} delta - 変動量
     * @returns {number} 計算後の緊張度（精度補正済み）
     */
    calculateNextTension: function(current, delta) {
        const precision = 4; // LogosCoreに移行しても良い
        let next = current + delta;
        
        // 0.0 〜 1.0 の境界条件の適用
        next = Math.max(0, Math.min(1.0, next));
        
        return parseFloat(next.toFixed(precision));
    },

    /**
     * 黄金比に基づいた価値の減衰計算
     * ノイズ（エントロピー）が高いほど、生成される価値を黄金比率で削る
     */
    applyGoldenFilter: function(value, entropy) {
        const phi = LogosCore.RATIO.PHI;
        // 黄金比の逆数を用いてエントロピーの影響を計算
        return value * (1 / (1 + (entropy * phi)));
    }
};

export default Arithmos;
