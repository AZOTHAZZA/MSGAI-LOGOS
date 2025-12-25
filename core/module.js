/**
 * core/module.js
 * モジュール統括。各サブシステム（Finance, Knowledge, External等）の
 * 整合性を維持し、システム全体の「統治状態」を管理する。
 */
import { getCurrentState } from './foundation.js';
import LogosCore from './LogosCore.js';

const ModuleRegistry = new Map();

const ModuleCore = {
    /**
     * モジュールの適格性検査と登録
     */
    register: function(name, moduleInstance) {
        // 登録自体を一つの「論理イベント」として承認
        console.log(`[LOGOS:MODULE] 承認中: ${name}`);
        
        // モジュールが「理」に準拠しているか（必須メソッドの有無など）を確認
        if (typeof moduleInstance !== 'object') {
            console.error(`[LOGOS:ERROR] 不適格なモジュール構造: ${name}`);
            return false;
        }

        ModuleRegistry.set(name, moduleInstance);
        return true;
    },

    /**
     * 全モジュールの統合ステータスを取得
     */
    getGlobalSovereigntyStatus: function() {
        const state = getCurrentState();
        return {
            activeModules: Array.from(ModuleRegistry.keys()),
            tension: state.tension.value,
            stability: (1.0 - state.tension.value) * LogosCore.RATIO.PHI,
            sovereignty: state.active_user === "Master" ? "Absolute" : "Observing"
        };
    }
};

export default ModuleCore;
