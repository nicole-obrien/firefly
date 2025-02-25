import { get, writable } from 'svelte/store'

import { Subrouter } from '../../classes'
import { ProfileBackupRoute } from '../../enums'
import { onboardingRouter } from '../../routers'

export const profileBackupRoute = writable<ProfileBackupRoute>(null)
export const profileBackupRouter = writable<ProfileBackupRouter>(null)

export class ProfileBackupRouter extends Subrouter<ProfileBackupRoute> {
    constructor() {
        super(ProfileBackupRoute.BackupMnemonic, profileBackupRoute, get(onboardingRouter))
    }

    next(): void {
        let nextRoute: ProfileBackupRoute

        const currentRoute = get(this.routeStore)
        switch (currentRoute) {
            case ProfileBackupRoute.BackupMnemonic:
                nextRoute = ProfileBackupRoute.ViewMnemonic
                break

            case ProfileBackupRoute.ViewMnemonic:
                nextRoute = ProfileBackupRoute.VerifyMnemonic
                break

            case ProfileBackupRoute.VerifyMnemonic:
                nextRoute = ProfileBackupRoute.BackupStronghold
                break

            case ProfileBackupRoute.BackupStronghold: {
                this.parentRouter.next()
                return
            }
        }

        this.setNext(nextRoute)
    }
}
