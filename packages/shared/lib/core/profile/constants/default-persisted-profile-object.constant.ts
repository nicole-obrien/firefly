import { DEFAULT_MARKET_CURRENCY } from '@core/market'
import { NetworkProtocol, NetworkType } from '@core/network/enums'
import { ProfileType } from '../enums'
import { IPersistedProfile } from '../interfaces'
import { DEFAULT_STRONGHOLD_PASSWORD_TIMEOUT_IN_MINUTES } from './default_stronghold_password_timeout_in_minutes.constant'

export const DEFAULT_PERSISTED_PROFILE_OBJECT: IPersistedProfile = {
    id: '',
    name: '',
    type: ProfileType.Software,
    networkProtocol: NetworkProtocol?.Shimmer,
    networkType: NetworkType?.Mainnet,
    lastStrongholdBackupTime: undefined,
    settings: {
        marketCurrency: DEFAULT_MARKET_CURRENCY,
        lockScreenTimeoutInMinutes: 5,
        strongholdPasswordTimeoutInMinutes: DEFAULT_STRONGHOLD_PASSWORD_TIMEOUT_IN_MINUTES,
        maxMediaSizeInMegaBytes: 50,
        hideNetworkStatistics: true,
    },
    accountMetadata: [],
    isDeveloperProfile: false,
    forceAssetRefresh: false,
    strongholdVersion: undefined,
    clientOptions: {},
}
