/**
 * core/module.js (最終確定版：モジュール統括・オーケストレーター)
 * 各サブシステムの整合性を維持し、システム全体の「統治状態」を管理する。
 */
import { getCurrentState, addTension } from './foundation.js';
import LogosCore from './LogosCore.js';

const ModuleRegistry = new Map();

const ModuleCore = {
    /**
     * モジュールの適格性検査と動的登録
     * @param {string} name - モジュール名
     * @param {Object} instance - モジュール実体
     */
    register: function(name, instance) {
        console.group(`[MODULE:REGISTRATION] ${name}`);
        
        try {
            // 1. 適格性監査（数理的インターフェースの確認）
            if (!instance || typeof instance !== 'object') {
                throw new Error("無効な実体構造です。");
            }

            // 2. 登録コストとしての微小緊張（エントロピー）の発生
            addTension(LogosCore.LIMIT.EPSILON * 1000);

            // 3. レジストリへの格納
            ModuleRegistry.set(name, instance);
            
            // 4. モジュールの初期化（存在すれば）
            if (typeof instance.init === 'function') {
                instance.init();
                console.log(`[INIT] ${name} の初期化が完了しました。`);
            }

            console.log(`[LOGOS] ${name} は統治下に置かれました。`);
            return true;
        } catch (e) {
            console.error(`[MODULE:ERROR] ${name} の承認に失敗:`, e.message);
            return false;
        } finally {
            console.groupEnd();
        }
    },

    /**
     * 特定モジュールの取得
     */
    get: (name) => ModuleRegistry.get(name),

    /**
     * 全システムの統治（主権）ステータス監査
     */
    getGlobalSovereigntyStatus: function() {
        const state = getCurrentState();
        const moduleCount = ModuleRegistry.size;
        
        // システムの安定度：(1 - 緊張度) をモジュール密度で補正
        const densityFactor = Math.sqrt(moduleCount) / LogosCore.RATIO.PHI;
        const stability = (1.0 - state.tension.value) * densityFactor;

        return {
            active_modules: Array.from(ModuleRegistry.keys()),
            module_count: moduleCount,
            tension: state.tension.value,
            stability: parseFloat(Math.min(stability, 1.0).toFixed(6)),
            sovereignty: state.active_user === "Master" ? "Absolute" : "Limited",
            version: LogosCore.SOVEREIGNTY.VERSION
        };
    }
};

export default ModuleCore;
