import { derived, get, Readable } from 'svelte/store'
import type { IAccountState } from '../interfaces'
import { selectedAccountIndex } from '../stores'
import { activeAccounts, updateActiveAccount } from '@core/profile/stores'

export const selectedAccount: Readable<IAccountState> = derived(
    [selectedAccountIndex, activeAccounts],
    ([$selectedAccountIndex, $activeAccounts]) => {
        $activeAccounts?.find((account) => account.index === $selectedAccountIndex)
        return $activeAccounts?.find((account) => account.index === $selectedAccountIndex)
    }
)

export function updateSelectedAccount(payload: Partial<IAccountState>): void {
    updateActiveAccount(get(selectedAccountIndex), payload)
}
