<script lang="ts">
    import { FontWeight, Icon, Text, Tooltip } from 'shared/components'
    import { Position } from 'shared/components/enums'

    import { localize } from '@core/i18n'

    import { Icon as IconEnum } from '@auxiliary/icon'

    export let isStrongholdUpdated: boolean = false

    let tooltipAnchor: HTMLElement
    let isTooltipVisible = false

    function showTooltip(show: boolean): void {
        isTooltipVisible = show
    }
</script>

{#if !isStrongholdUpdated}
    <stronghold-badge
        bind:this={tooltipAnchor}
        on:mouseenter={() => showTooltip(true)}
        on:mouseleave={() => showTooltip(false)}
        on:wheel={() => showTooltip(false)}
        class="block absolute -right-1 -bottom-1"
    >
        <icon-container class="block rounded-full text-yellow-700 ring-2 ring-white">
            <Icon icon={IconEnum.ExclamationFilled} primaryColor="white" height={26} width={26} removeWhitespace />
        </icon-container>
    </stronghold-badge>
    {#if isTooltipVisible}
        <Tooltip anchor={tooltipAnchor} size="small" position={Position.Right} offset={6}>
            <Text fontWeight={FontWeight.semibold} color="gray-600" darkColor="gray-400" classes="text-left" smaller>
                {localize('tooltips.updateStronghold.profileBadge').replace('. ', '.\n')}
            </Text>
        </Tooltip>
    {/if}
{/if}
