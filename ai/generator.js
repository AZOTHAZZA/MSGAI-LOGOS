/**
 * ai/generator.js (LOGOS統合版)
 * 言語生成・ロゴス反映。
 * 知性エンジンによる監査結果を、マスターが理解可能な「神託」へと変換する。
 */
import { getCurrentState, updateState } from '../core/foundation.js';
import LogosEngine from '../core/LogosEngine.js';

/**
 * ロゴス応答の生成
 */
export function actDialogue(username, prompt) {
    const state = getCurrentState();

    // 1. 知性エンジンによる深層監査（緊張度の変動を含む）
    const audit = LogosEngine.process(prompt);

    // 2. 状態の更新（エンジンの計算結果を反映）
    state.last_act = `Dialogue by ${username}`;
    state.status_message = audit.report;
    updateState(state);

    // 3. マスターへの最終応答の構築
    // 純度（Purity）に基づき、応答の確信度を変化させる
    const certainty = audit.purity > 0.618 ? "【確信】" : "【観測】";
    
    return {
        text: `${certainty} ロゴス純度 ${audit.purity.toFixed(4)} に基づき、問い「${prompt}」への共鳴を確立しました。`,
        report: audit.report,
        tension: audit.tension
    };
}
