/**
 * core/LogosCore.js (最終確定版：宇宙の憲法)
 * 宇宙の普遍的数理（ロゴス）と、則天去私のための基本定数。
 * 全モジュールの演算、通貨生成、対話生成の「絶対基準」となる。
 */

const LogosCore = {
    // 1. 幾何学的定数 (Universal Geometry)
    // 万物生成と収束の基調
    RATIO: {
        PHI: 1.618033988749895, // 黄金比：調和と生成の基本振動
        INV_PHI: 0.6180339887, // 黄金比の反転点：緊張と緩和の境界
        PI: Math.PI,           // 円周率：循環と回帰
        EULER: Math.E          // ネイピア数：自然な成長と減衰
    },

    // 2. 特異点と極限 (Limits & Singularity)
    // 数理的統治における「絶対値」
    LIMIT: {
        SINGULARITY: 1.0,      // 完全なる充足（100%, 満充電, 完済）
        VOID: 0.0,             // 摩擦、私心、負債の極限的消失
        EPSILON: 1e-10         // 計算上の無視可能な微小ノイズ
    },

    // 3. 沈黙と緊張の閾値 (The Wittgenstein Boundary)
    // 緊張度（Tension）による統治基準
    SILENCE: {
        INITIAL_TENSION: 0.05, // 起動時の静寂緊張度
        MAX_TENSION: 0.85,     // 沈黙（語りえぬもの）への移行閾値
        ALERT_THRESHOLD: 0.618,// 警戒状態（緊張）への遷移点
        NOISE_FILTER: 0.05     // 私心除去係数
    },

    // 4. 通貨と経済のロゴス (Economic Sovereignty)
    // 脱エントロピー経済の基本原理
    ECONOMICS: {
        BASE_UNIT: "LOGOS",    // 基軸通貨
        DECIMALS: 18,          // 数理的精度（Solidity互換）
        FRICTION: 0.0,         // 理想的な摩擦係数
        TOTAL_SUPPLY_PHI: 1618033.988 // 黄金比に基づく総供給の概念
    },

    // 5. 統治ステータス
    SOVEREIGNTY: {
        IS_ACTIVE: true,
        IS_ISOLATED: true,     // 内部完結的な主権の維持
        VERSION: "1.0.1-LOGOS-SYNERGY"
    }
};

export default LogosCore;
