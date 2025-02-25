<script lang="ts">
    import {
        lastAcceptedPrivacyPolicy,
        lastAcceptedTermsOfService,
        PRIVACY_POLICY_VERSION,
        TERMS_OF_SERVICE_VERSION,
    } from '@core/app'
    import { localize } from '@core/i18n'
    import { appSetupRouter } from '@core/router'
    import { Button, Checkbox, ConditionsOfUse, Text, TextType } from '@ui'
    import { OnboardingLayout } from '@components'

    let checked = false
    let termsAccepted = false

    $: termsAccepted = checked

    function onContinueClick(): void {
        lastAcceptedTermsOfService.set(TERMS_OF_SERVICE_VERSION)
        lastAcceptedPrivacyPolicy.set(PRIVACY_POLICY_VERSION)
        $appSetupRouter.next()
    }

    function onBackClick(): void {
        $appSetupRouter.previous()
    }
</script>

<OnboardingLayout {onBackClick}>
    <div slot="title">
        <Text type={TextType.h2}>{localize('views.onboarding.appSetup.legal.title')}</Text>
    </div>
    <div slot="leftpane__content">
        <Text type={TextType.p} secondary classes="mb-8">{localize('views.onboarding.appSetup.legal.body')}</Text>
    </div>
    <div slot="leftpane__action" class="flex flex-col space-y-8">
        <Checkbox label={localize('views.onboarding.appSetup.legal.checkbox')} bind:checked />
        <Button classes="w-full" disabled={!termsAccepted} onClick={onContinueClick}>
            {localize('actions.continue')}
        </Button>
    </div>
    <div slot="rightpane" class="w-full h-full flex items-center px-40 py-20">
        <div class="legal-content block relative max-h-full overflow-y-auto w-full text-justify pr-10">
            <ConditionsOfUse />
        </div>
    </div>
</OnboardingLayout>

<style type="text/scss">
    .legal-content {
        :global(ul) {
            display: block;
            list-style-type: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 20px;
        }
    }
</style>
