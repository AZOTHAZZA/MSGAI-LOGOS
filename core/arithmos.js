/**
 * core/arithmos.js (最終確定版：ロゴス数理演算)
 * 緊張度、価値、純度の計算を黄金比に基づいた純粋関数として実行する。
 */
import LogosCore from './LogosCore.js';

const Arithmos = {
    /**
     * 次の緊張度を計算する（境界条件の厳密適用）
     */
    calculateNextTension: function(current, delta) {
        let next = current + delta;
        
        // 0.0 〜 1.0 (SINGULARITY) の範囲でクランプ
        const min = LogosCore.LIMIT.VOID;
        const max = LogosCore.LIMIT.SINGULARITY;
        
        next = Math.max(min, Math.min(max, next));
        
        // 微小ノイズ(EPSILON)以下の場合はVOIDへ収束させる
        if (next < LogosCore.LIMIT.EPSILON) next = min;
        
        return parseFloat(next.toFixed(10));
    },

    /**
     * 黄金比フィルター：エントロピーによる価値の減衰
     * @param {number} value - 元の価値
     * @param {number} entropy - 摩擦/ノイズ (0.0 - 1.0)
     */
    applyGoldenFilter: function(value, entropy) {
        const phi = LogosCore.RATIO.PHI;
        const invPhi = LogosCore.RATIO.INV_PHI;
        
        // 非線形減衰：摩擦が増えるほど、黄金比の反転点（0.618）によって価値が急激に濾過される
        const filterPower = Math.pow(phi, entropy);
        return value / filterPower;
    },

    /**
     * 幾何学的純度の算出
     * 入力された複雑性が、黄金比率（1/PHI）にどれだけ近いかを測定する
     */
    calculateGeometricPurity: function(complexity) {
        const target = LogosCore.RATIO.INV_PHI; // 0.618...
        const diff = Math.abs(complexity - target);
        
        // 乖離が小さいほど純度（1.0）に近づく
        const purity = 1.0 - Math.min(diff * LogosCore.RATIO.PHI, 1.0);
        
        return parseFloat(purity.toFixed(6));
    }
};

export default Arithmos;
