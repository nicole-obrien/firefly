import { get } from 'svelte/store'

import { INode } from '@core/network/interfaces'

import {
    DEFAULT_PERSISTED_PROFILE_OBJECT,
    DEFAULT_STRONGHOLD_PASSWORD_TIMEOUT_IN_MINUTES,
    PROFILE_VERSION,
} from '../../constants'
import { IPersistedProfile } from '../../interfaces'
import { currentProfileVersion, profiles, saveProfile } from '../../stores'

/**
 * Migrates profile data in need of being modified to accommodate changes
 * in a newer Firefly version.
 */

export function checkAndMigrateProfiles(): void {
    const shouldMigratePersistedProfiles = (get(currentProfileVersion) ?? 3) < PROFILE_VERSION
    if (shouldMigratePersistedProfiles) {
        migrateEachVersion()
    }
}

function migrateEachVersion(): void {
    let migrationVersion = get(currentProfileVersion)
    for (migrationVersion; migrationVersion < PROFILE_VERSION; migrationVersion++) {
        migratePersistedProfile(migrationVersion)
        currentProfileVersion.set(migrationVersion + 1)
    }
}

function migratePersistedProfile(migrationVersion): void {
    const _profiles = get(profiles)
    for (const profile of _profiles) {
        persistedProfileMigrationsMap?.[migrationVersion]?.(profile)
    }
}

const persistedProfileMigrationsMap: Record<number, (existingProfile: unknown) => void> = {
    /**
     * NOTE: 0-2 are missing here because we wrote this functionality,
     * when the profile version was already 3.
     */
    3: persistedProfileMigrationToV4,
    4: persistedProfileMigrationToV5,
    5: persistedProfileMigrationToV6,
    6: persistedProfileMigrationToV7,
    7: persistedProfileMigrationToV8,
    8: persistedProfileMigrationToV9,
    9: persistedProfileMigrationToV10,
}

function persistedProfileMigrationToV4(existingProfile: unknown): void {
    const newProfile = {}

    const keysToKeep = [
        'id',
        'name',
        'type',
        'networkProtocol',
        'networkType',
        'lastStrongholdBackupTime',
        'settings',
        'accountMetadata',
        'isDeveloperProfile',
        'hasVisitedDashboard',
        'lastUsedAccountIndex',
        'clientOptions',
    ]

    keysToKeep.forEach((key) => {
        const existingValue = existingProfile?.[key]
        newProfile[key] = existingValue
    })

    saveProfile(newProfile as IPersistedProfile)
}

function persistedProfileMigrationToV5(existingProfile: unknown): void {
    interface IOldPersistedProfile {
        settings: {
            currency: unknown
        }
    }

    const oldProfile = existingProfile as IOldPersistedProfile
    delete oldProfile?.settings?.currency

    const newProfile = oldProfile as unknown as IPersistedProfile
    newProfile.settings.marketCurrency = DEFAULT_PERSISTED_PROFILE_OBJECT.settings?.marketCurrency

    saveProfile(newProfile)
}

function persistedProfileMigrationToV6(existingProfile: IPersistedProfile): void {
    existingProfile.forceAssetRefresh = true
    saveProfile(existingProfile)
}

function persistedProfileMigrationToV7(existingProfile: unknown): void {
    const newProfile = {}

    const keysToKeep = [
        'id',
        'name',
        'type',
        'networkProtocol',
        'networkType',
        'lastStrongholdBackupTime',
        'settings',
        'accountMetadata',
        'isDeveloperProfile',
        'hasVisitedDashboard',
        'lastUsedAccountIndex',
        'clientOptions',
        'forceAssetRefresh',
    ]

    keysToKeep.forEach((key) => {
        const existingValue = existingProfile?.[key]
        newProfile[key] = existingValue
    })

    saveProfile(newProfile as IPersistedProfile)
}

function persistedProfileMigrationToV8(existingProfile: IPersistedProfile): void {
    existingProfile.settings = { ...existingProfile.settings, maxMediaSizeInMegaBytes: 50 }

    saveProfile(existingProfile)
}

function persistedProfileMigrationToV9(existingProfile: IPersistedProfile): void {
    function migrateNode(node: INode): INode {
        if (node) {
            return {
                url: node.url as string,
                auth: {
                    jwt: node.auth?.jwt,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    basicAuthNamePwd: [node.auth?.username, node.auth?.password],
                },
            }
        } else {
            return undefined
        }
    }

    existingProfile.clientOptions.nodes = existingProfile?.clientOptions?.nodes?.map(migrateNode)
    existingProfile.clientOptions.primaryNode = migrateNode(existingProfile?.clientOptions?.primaryNode)

    saveProfile(existingProfile)
}

function persistedProfileMigrationToV10(existingProfile: IPersistedProfile): void {
    existingProfile.settings = {
        ...existingProfile.settings,
        strongholdPasswordTimeoutInMinutes: DEFAULT_STRONGHOLD_PASSWORD_TIMEOUT_IN_MINUTES,
    }
    saveProfile(existingProfile)
}

// TODO: Rename accountMetadata to accountPersistedData in next migration
