<script lang="ts">
    import { Dropdown, Text, TextType } from '@ui'
    import { localize } from '@core/i18n'
    import { activeProfile, DEFAULT_PERSISTED_PROFILE_OBJECT, updateActiveProfileSettings } from '@core/profile'
    import { IDropdownChoice, SECONDS_PER_MINUTE } from '@core/utils'
    import { setStrongholdPasswordClearInterval } from '@core/profile-manager'

    function onSelect(option): void {
        const strongholdPasswordTimeoutInMinutes = option.value
        updateActiveProfileSettings({ strongholdPasswordTimeoutInMinutes })
        void setStrongholdPasswordClearInterval(strongholdPasswordTimeoutInMinutes * SECONDS_PER_MINUTE)
    }

    function assignTimeoutOptionLabel(timeInMinutes: number): string {
        if (timeInMinutes >= 60) {
            return localize('times.hour', { values: { time: timeInMinutes / 60 } })
        }

        return localize('times.minute', { values: { time: timeInMinutes } })
    }

    function lockScreenTimeoutOptions(): IDropdownChoice[] {
        return [1, 2, 5, 10, 15, 30].map((time) => ({
            value: time,
            label: assignTimeoutOptionLabel(time),
        }))
    }
</script>

<Text type={TextType.h4} classes="mb-3">{localize('views.settings.strongholdPasswordTimeout.title')}</Text>
<Text type={TextType.p} secondary classes="mb-5"
    >{localize('views.settings.strongholdPasswordTimeout.description')}</Text
>
<Dropdown
    {onSelect}
    value={assignTimeoutOptionLabel(
        $activeProfile?.settings?.strongholdPasswordTimeoutInMinutes ??
            DEFAULT_PERSISTED_PROFILE_OBJECT.settings.strongholdPasswordTimeoutInMinutes
    )}
    items={lockScreenTimeoutOptions()}
/>
