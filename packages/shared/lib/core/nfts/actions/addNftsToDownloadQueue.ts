import { updateNftInAllAccountNfts } from '.'
import { INft } from '../interfaces'
import { addNftToDownloadQueue } from '../stores'
import { checkIfNftShouldBeDownloaded } from '../utils/checkIfNftShouldBeDownloaded'

export function addNftsToDownloadQueue(accountIndex: number, nfts: INft[]): void {
    for (const nft of nfts) {
        const shouldNotDownloadNft =
            nft?.downloadMetadata?.isLoaded || !!nft?.downloadMetadata?.error || !!nft?.downloadMetadata?.warning
        if (shouldNotDownloadNft) {
            continue
        } else {
            void validateNftThenAddToQueue(accountIndex, nft)
        }
    }
}

async function validateNftThenAddToQueue(accountIndex: number, nft: INft): Promise<void> {
    try {
        const { shouldDownload, downloadMetadata, downloadUrl } = await checkIfNftShouldBeDownloaded(nft)
        nft.downloadMetadata = downloadMetadata
        updateNftInAllAccountNfts(accountIndex, nft.id, { downloadMetadata })

        if (shouldDownload) {
            addNftToDownloadQueue({ nft: nft, downloadUrl, path: nft.filePath, accountIndex })
        }
    } catch (error) {
        console.error(error)
    }
}
