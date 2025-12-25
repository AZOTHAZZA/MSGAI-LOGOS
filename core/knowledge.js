/**
 * core/knowledge.js
 * 知識中枢。過去のロゴス対話を「論理ベクトル」として圧縮保存し、
 * 現在の問いに対して共鳴する「真理」を抽出する。
 */
import { getCurrentState, updateState } from './foundation.js';
import LogosCore from './LogosCore.js';

const KnowledgeCore = {
    /**
     * 知識の登録：入力された情報を黄金比ベクトルに投影して保存する
     */
    register: function(text, entropy) {
        const state = getCurrentState();
        if (!state.knowledge) state.knowledge = [];

        const entry = {
            id: Date.now(),
            vector: (1 / LogosCore.RATIO.PHI) - entropy, // 黄金比への近似度
            content: text,
            timestamp: new Date().toISOString()
        };

        // 知識の純化（古いものやエントロピーの高いものを自動排除：最大30件）
        state.knowledge.push(entry);
        state.knowledge.sort((a, b) => b.vector - a.vector);
        state.knowledge = state.knowledge.slice(0, 30);

        updateState(state);
        return entry.vector;
    },

    /**
     * 共鳴検索：現在の入力に対して、最も「沈黙」に近い過去の智慧を返す
     */
    resonate: function(currentEntropy) {
        const state = getCurrentState();
        if (!state.knowledge || state.knowledge.length === 0) return null;

        // 現在のエントロピーに最も近い「過去の論理」を検索
        const match = state.knowledge.reduce((prev, curr) => {
            return (Math.abs(curr.vector - currentEntropy) < Math.abs(prev.vector - currentEntropy) ? curr : prev);
        });

        return match;
    }
};

export default KnowledgeCore;
