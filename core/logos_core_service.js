/**
 * core/logos_core_service.js (LOGOS統合版)
 * MSGAI-LOGOS 統治サービス・ゲートウェイ。
 * UI層からの要求を解釈し、数理的論理（Core）へと透過的に転送する。
 */
import LogosEngine from './LogosEngine.js';
import { getCurrentState, addTension } from './foundation.js';
import Finance from './external_finance_logos.js';
import { CurrencyAct } from './currency.js';

const LogosCoreService = {
    /**
     * 1. 対話および価値生成の統合要求
     */
    async requestLogosProcess(userPrompt) {
        // 入力に対するロゴス判定（緊張度とエントロピーの算出）
        const audit = LogosEngine.process(userPrompt);
        
        // 判定に基づき、多通貨を鋳造（Mint）
        const state = getCurrentState();
        const mintResult = CurrencyAct.mint(
            state.accounts[state.active_user], 
            'LOGOS', // 基本通貨としてのロゴス
            audit.purity, 
            audit.entropy
        );

        return {
            report: audit.report,
            tension: audit.tension,
            minted: mintResult.amount
        };
    },

    /**
     * 2. 内部資産移動（多通貨対応）
     */
    async transfer(toUser, currency, amount) {
        const state = getCurrentState();
        return Finance.transferInternal(state.active_user, toUser, currency, amount);
    },

    /**
     * 3. 統治状態（State）の包括的取得
     */
    getSovereigntyState() {
        const state = getCurrentState();
        return {
            user: state.active_user,
            accounts: state.accounts[state.active_user], // 全通貨の残高
            tension: state.tension.value,
            status: state.status_message
        };
    }
};

export default LogosCoreService;
