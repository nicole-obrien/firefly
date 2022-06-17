const onboardingFeatures = {
    enabled: true,
    iota: {
        enabled: false,
        mainnet: {
            enabled: false,
            claimRewards: {
                enabled: false,
                hidden: true,
            },
            newProfile: {
                enabled: false,
                sofwareProfile: {
                    enabled: false,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: false,
                migrateSeed: {
                    enabled: false,
                },
                recoveryPhrase: {
                    enabled: false,
                },
                strongholdBackup: {
                    enabled: false,
                },
                ledgerBackup: {
                    enabled: false,
                },
            },
        },
        devnet: {
            enabled: false,
            hidden: true,
            claimRewards: {
                enabled: false,
                hidden: true,
            },
            newProfile: {
                enabled: false,
                sofwareProfile: {
                    enabled: false,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: false,
                migrateSeed: {
                    enabled: false,
                },
                recoveryPhrase: {
                    enabled: false,
                },
                strongholdBackup: {
                    enabled: false,
                },
                ledgerBackup: {
                    enabled: false,
                },
            },
        },
        'private-net': {
            enabled: false,
            claimRewards: {
                enabled: false,
                hidden: true,
            },
            newProfile: {
                enabled: false,
                sofwareProfile: {
                    enabled: false,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: false,
                migrateSeed: {
                    enabled: false,
                },
                recoveryPhrase: {
                    enabled: false,
                },
                strongholdBackup: {
                    enabled: false,
                },
                ledgerBackup: {
                    enabled: false,
                },
            },
        },
    },
    shimmer: {
        enabled: true,
        mainnet: {
            enabled: false,
            claimRewards: {
                enabled: false,
                hidden: true,
            },
            newProfile: {
                enabled: false,
                sofwareProfile: {
                    enabled: false,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: false,
                migrateSeed: {
                    enabled: false,
                    hidden: true,
                },
                recoveryPhrase: {
                    enabled: false,
                },
                strongholdBackup: {
                    enabled: false,
                },
                ledgerBackup: {
                    enabled: false,
                },
            },
        },
        devnet: {
            enabled: false,
            claimRewards: {
                enabled: false,
            },
            newProfile: {
                enabled: true,
                sofwareProfile: {
                    enabled: true,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: true,
                migrateSeed: {
                    enabled: false,
                    hidden: true,
                },
                recoveryPhrase: {
                    enabled: true,
                },
                strongholdBackup: {
                    enabled: true,
                },
                ledgerBackup: {
                    enabled: false,
                },
            },
        },
        'private-net': {
            enabled: true,
            claimRewards: {
                enabled: false,
                hidden: true,
            },
            newProfile: {
                enabled: true,
                sofwareProfile: {
                    enabled: true,
                },
                ledgerProfile: {
                    enabled: false,
                },
            },
            restoreProfile: {
                enabled: true,
                migrateSeed: {
                    enabled: false,
                    hidden: true,
                },
                recoveryPhrase: {
                    enabled: true,
                },
                strongholdBackup: {
                    enabled: true,
                },
                ledgerBackup: {
                    enabled: true,
                },
            },
        },
    },
}

export default onboardingFeatures
