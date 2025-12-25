/**
 * core/silence.js (LOGOS統合版)
 * 作為（エントロピー）の定義。
 * 各種事象がロゴスの静寂をどれだけ乱すかを数理的に定義する。
 */
import LogosCore from './LogosCore.js';

/**
 * 各イベントが発生させる「エントロピー（緊張度への加算量）」
 * 黄金比 (phi) の逆数や累乗を用いて、自然な摂理に基づいた重みを定義する。
 */
export const TensionEvent = {
    // 低摩擦：自然な対話
    StandardInteraction: 0.01, 

    // 中摩擦：システム設定の変更、知識の登録
    AdjustmentPetition: 0.05, 

    // 高摩擦：外部送金、通貨の強制移動（強欲の作為）
    ExternalAct: 0.13, 

    // 拒絶：監査失敗による強制停止
    RejectedAudit: 0.21, 

    // 回復：システムの自律的な沈黙による緊張の緩和
    LogosSilence: -0.34 
};

/**
 * 沈黙の閾値：これを超えるとシステムは「作為」を拒絶し、沈黙する。
 * LogosCoreの定数を継承する。
 */
export const SILENCE_THRESHOLD = LogosCore.SILENCE.MAX_TENSION;

/**
 * エントロピー計算関数
 * 入力の文字列長や内容から、動的にエントロピーを算出する。
 */
export function calculateInputEntropy(text) {
    // 文字列が長い、または「金」「送金」などの作為的な単語が含まれると上昇
    const base = text.length * 0.001;
    const greedyFactor = /金|送金|円|BTC|修正|変えろ/.test(text) ? 0.05 : 0;
    return base + greedyFactor;
}
