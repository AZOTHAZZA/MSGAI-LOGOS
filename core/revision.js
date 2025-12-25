/**
 * core/revision.js (LOGOS統合版)
 * 自律的修正プロトコル。
 * 緊張度が閾値を超えた際、数理的な「沈黙」を強制し、システムを正常化する。
 */
import { getCurrentState, updateState, addTension } from './foundation.js';
import LogosCore from './LogosCore.js';
import Arithmos from './arithmos.js';

const RevisionCore = {
    /**
     * 自律的修正の実行
     * 緊張度が高まりすぎた場合、作為をリセットし沈黙へ回帰する。
     */
    initiateAutonomousRevision: function() {
        const state = getCurrentState();
        const tension = state.tension.value;
        const threshold = LogosCore.SILENCE.MAX_TENSION * 0.8; // 緊張度80%で発動

        if (tension >= threshold) {
            // 緊張度を黄金比の逆数レベルまで急速に冷却（正常化）
            const reduction = -(tension * (1 / LogosCore.RATIO.PHI));
            addTension(reduction);

            state.status_message = "🔄 自律的修正：数理的沈黙による正常化を完了。";
            updateState(state);

            return `システムは自律的にエントロピーを排し、静寂へ回帰しました。緊張度: ${state.tension.value.toFixed(4)}`;
        } else {
            return "論理的整合性は維持されています。修正の必要はありません。";
        }
    }
};

export default RevisionCore;
