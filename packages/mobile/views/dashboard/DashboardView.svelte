<script lang="ts">
    import { TabPane, TogglableAssetBalanceLabel, TopBar } from '@components'
    import { Button, Idle } from '@ui'
    import { TabNavigator } from './tabs'

    import { selectedAccount } from '@core/account'
    import { localize } from '@core/i18n'
    import { BASE_TOKEN } from '@core/network'
    import { activeProfile, hasStrongholdLocked, reflectLockedStronghold, saveActiveProfile } from '@core/profile'
    import { selectedAccountAssets } from '@core/wallet'

    import { DrawerId, openDrawer } from '@/auxiliary/drawer'
    import { activeDashboardTab, DASHBOARD_TAB_COMPONENT } from '@/contexts/dashboard'
    import features from '@features/features'

    $: activeDashboardTabComponent = DASHBOARD_TAB_COMPONENT[$activeDashboardTab]

    $: $activeProfile, saveActiveProfile()

    $: $hasStrongholdLocked && reflectLockedStronghold()

    function onReceiveClick(): void {
        openDrawer(DrawerId.Receive)
    }
    function handleSendClick(): void {
        openDrawer(DrawerId.Send, { fullScreen: true })
    }
</script>

<Idle />
{#if $selectedAccount}
    <dashboard-view class="flex flex-col w-screen h-screen bg-gray-50 dark:bg-gray-900">
        <div class="px-5 py-6">
            <TopBar />
            <div class="flex justify-center w-full mt-5">
                <TogglableAssetBalanceLabel
                    asset={$selectedAccountAssets?.baseCoin}
                    <TogglableAmountLabel
                    amount={$selectedAccount.balances?.baseCoin?.available}
                    tokenMetadata={BASE_TOKEN[$activeProfile?.networkProtocol]}
                />
            </div>
            {#if features?.dashboard?.send?.enabled || features?.dashboard?.receive?.enabled}
                <div class="flex flex-row items-center justify-center w-full space-x-2 mt-8">
                    {#if features?.dashboard?.send?.enabled}
                        <Button classes="w-full h-10" onClick={handleSendClick}>
                            {localize('actions.send')}
                        </Button>
                    {/if}
                    {#if features?.dashboard?.receive?.enabled}
                        <Button classes="w-full h-10" onClick={onReceiveClick}>
                            {localize('actions.receive')}
                        </Button>
                    {/if}
                </div>
            {/if}
        </div>
        {#if activeDashboardTabComponent}
            <div class="relative flex flex-col flex-auto w-full">
                <TabPane>
                    <svelte:component this={DASHBOARD_TAB_COMPONENT[$activeDashboardTab]} />
                </TabPane>
                <TabNavigator />
            </div>
        {/if}
    </dashboard-view>
{/if}>
