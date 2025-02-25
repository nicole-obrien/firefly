<script lang="ts">
    import { DeveloperIndicatorPill, Icon, NetworkIconBadge, StrongholdBadge, Text, TextType } from 'shared/components'

    import { getInitials as _getInitials } from '@core/utils'
    import { NetworkProtocol, NetworkType } from '@core/network'

    export let name: string = ''
    export let id: string = ''
    export let networkType: NetworkType = undefined
    export let networkProtocol: NetworkProtocol = undefined
    export let classes: string = undefined
    export let bgColor: string = ''
    export let isDeveloper: boolean = false
    export let isLedgerProfile: boolean = false
    export let updateRequired: boolean = false

    export let onClick: undefined | ((id: string) => void) = undefined

    const slots = $$props.$$slots

    function onProfileClick(): void {
        onClick && onClick(id)
    }

    function getInitials(): string {
        const initials = _getInitials(name, 1)
        if (initials.length === 1) {
            return initials
        } else {
            const letters = initials.split('')
            return letters[0] + letters[letters.length - 1]
        }
    }
</script>

<profile-container class="flex items-center justify-center w-24">
    <div class="flex flex-col justify-between items-center w-full">
        <button type="button" on:click={onProfileClick} class="relative cursor-pointer mb-3">
            <div
                class="h-18 w-18 rounded-full font-bold text-center flex items-center justify-center
                {bgColor ? `bg-${bgColor}-500` : ''} {classes}"
            >
                {#if slots}
                    <slot />
                {:else}
                    <Text type={TextType.h3} classes="text-white">{getInitials()}</Text>
                {/if}
            </div>
            {#if !updateRequired}
                <NetworkIconBadge {networkType} {networkProtocol} />
            {:else}
                <StrongholdBadge />
            {/if}
        </button>
        <div class="flex flex-row items-baseline justify-center space-x-1.5 mb-2 w-full">
            {#if isLedgerProfile}
                <Icon
                    icon={'ledger'}
                    classes="text-gray-900 dark:text-gray-100 relative top-0.5"
                    width={14}
                    height={14}
                />
            {/if}
            <Text type={TextType.h5} classes="text-center truncate">{name}</Text>
        </div>
        {#if isDeveloper}
            <DeveloperIndicatorPill />
        {/if}
    </div>
</profile-container>
