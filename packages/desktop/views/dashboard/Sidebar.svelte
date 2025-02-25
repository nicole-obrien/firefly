<script lang="ts">
    import { Modal, NetworkIndicator, NotificationBadge, ProfileActionsModal } from '@ui'
    import { SidebarTab } from '@components'
    import features from '@features/features'
    import { appVersionDetails } from '@core/app/stores'
    import { getInitials, isRecentDate } from '@core/utils'
    import { activeProfile } from '@core/profile/stores'
    import { collectiblesRouter, DashboardRoute, dashboardRouter, governanceRouter, settingsRouter } from '@core/router'
    import { localize } from '@core/i18n'
    import { ISidebarTab } from '../../lib/routers'

    let profileModal: Modal

    const profileColor = 'blue' // TODO: each profile has a different color

    const { shouldOpenProfileModal } = $activeProfile

    $: profileInitial = getInitials($activeProfile?.name, 1)

    $: lastStrongholdBackupTime = $activeProfile?.lastStrongholdBackupTime
    $: lastBackupDate = lastStrongholdBackupTime ? new Date(lastStrongholdBackupTime) : null
    $: isBackupSafe = lastBackupDate && isRecentDate(lastBackupDate)?.lessThanThreeMonths

    const sidebarTabs: ISidebarTab[] = [
        ...(features?.wallet?.enabled
            ? [
                  {
                      icon: 'wallet',
                      label: localize('tabs.wallet'),
                      route: DashboardRoute.Wallet,
                      onClick: openWallet,
                  },
              ]
            : []),
        ...(features?.collectibles?.enabled
            ? [
                  {
                      icon: 'collectibles',
                      label: localize('tabs.collectibles'),
                      route: DashboardRoute.Collectibles,
                      onClick: openCollectibles,
                  },
              ]
            : []),
        ...(features?.governance?.enabled
            ? [
                  {
                      icon: 'governance',
                      label: localize('tabs.governance'),
                      route: DashboardRoute.Governance,
                      onClick: openGovernance,
                  },
              ]
            : []),
        ...(features?.developerTools?.enabled && $activeProfile?.isDeveloperProfile
            ? [
                  {
                      icon: 'tools',
                      label: localize('tabs.developer'),
                      route: DashboardRoute.Developer,
                      onClick: openDeveloper,
                  },
              ]
            : []),
    ]

    function openWallet(): void {
        resetAllRouters()
    }

    function openCollectibles(): void {
        resetAllRouters()
        $dashboardRouter.goTo(DashboardRoute.Collectibles)
    }

    function openGovernance(): void {
        resetAllRouters()
        $dashboardRouter.goTo(DashboardRoute.Governance)
    }

    function openDeveloper(): void {
        resetAllRouters()
        $dashboardRouter.goTo(DashboardRoute.Developer)
    }

    function resetAllRouters(): void {
        $dashboardRouter.reset()
        $collectiblesRouter.reset()
        $settingsRouter.reset()
        $governanceRouter.reset()
    }
</script>

<aside
    class="flex flex-col justify-center items-center bg-white dark:bg-gray-800 relative w-18 px-5 pt-10 pb-5 border-solid border-r border-gray-100 dark:border-gray-800"
>
    <nav class="flex flex-grow flex-col items-center justify-between">
        <div class="flex flex-col items-center">
            <NetworkIndicator />
        </div>
        <div class="flex flex-col flex-auto items-center justify-center mb-7 space-y-8">
            {#each sidebarTabs as tab}
                <div class="flex">
                    <SidebarTab {tab} />
                </div>
            {/each}
        </div>
        <div class="flex flex-col items-center">
            <button
                class="w-10 h-10 relative flex items-center justify-center rounded-full bg-{profileColor}-500 leading-100"
                on:click={profileModal?.open}
            >
                <span class="text-12 text-center text-white uppercase">{profileInitial}</span>
                {#if !$shouldOpenProfileModal && (!isBackupSafe || !$appVersionDetails.upToDate)}
                    <NotificationBadge />
                {/if}
            </button>
        </div>
    </nav>
    <ProfileActionsModal bind:modal={profileModal} />
</aside>

<style type="text/scss">
    :global(body.platform-win32) aside {
        @apply -top-0;
        @apply pt-10;
    }
</style>
