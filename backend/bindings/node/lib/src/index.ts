import { BridgeMessage, MessageResponse } from '../../../../api-wrapper/bridge'
import {
  AccountToCreate,
  AccountIdentifier,
  ListMessagesFilter,
  createAccount as _createAccount,
  removeAccount as _removeAccount,
  getAccount as _getAccount,
  syncAccounts as _syncAccounts,
  internalTransfer as _internalTransfer,
  generateAddress as _generateAddress,
  listMessages as _listMessages,
  listAddresses as _listAddresses,
  availableBalance as _availableBalance,
  totalBalance as _totalBalance,
  latestAddress as _latestAddress
} from '../../../../api-wrapper/account'
import {
  Transfer,
  reattach as _reattach
} from '../../../../api-wrapper/message'
import {
  backup as _backup,
  restoreBackup as _restoreBackup,
  setStrongholdPassword as _setStrongholdPassword,
  send as _send
} from '../../../../api-wrapper/wallet'

const addon = require('../native')
const mailbox = []
const onMessageListeners: ((payload: MessageResponse) => void)[] = []

function _poll(runtime: typeof addon.ActorSystem, cb: (error: string, data: any) => void) {
  runtime.poll((err: string, data: string) => {
    cb(err, err ? null : JSON.parse(data))
    _poll(runtime, cb)
  })
}

function sendMessage(message: BridgeMessage): Promise<void> {
  return new Promise(resolve => addon.sendMessage(JSON.stringify(message), resolve))
}

export function init(storagePath?: string) {
  const runtime = new addon.ActorSystem(storagePath || '')
  _poll(runtime, (error, data) => {
    const message = error || data
    mailbox.push(message)
    onMessageListeners.forEach(listener => listener(message))
  })
}

export function onMessage(cb: (payload: any) => void) {
  onMessageListeners.push(cb)
}

export function createAccount(account: AccountToCreate): Promise<void> {
  return _createAccount(sendMessage, account)
}

export function removeAccount(accountId: AccountIdentifier): Promise<void> {
  return _removeAccount(sendMessage, accountId)
}

export function getAccount(accountId: AccountIdentifier): Promise<void> {
  return _getAccount(sendMessage, accountId)
}

export function syncAccounts(): Promise<void> {
  return _syncAccounts(sendMessage)
}

export function generateAddress(accountId: AccountIdentifier) {
  return _generateAddress(sendMessage, accountId)
}

export function listMessages(accountId: AccountIdentifier, filters?: ListMessagesFilter) {
  return _listMessages(sendMessage, accountId, filters)
}

export function listAddresses(accountId: AccountIdentifier, unspent?: boolean) {
  return _listAddresses(sendMessage, accountId, unspent)
}

export function availableBalance(accountId: AccountIdentifier) {
  return _availableBalance(sendMessage, accountId)
}

export function totalBalance(accountId: AccountIdentifier) {
  return _totalBalance(sendMessage, accountId)
}

export function latestAddress(accountId: AccountIdentifier) {
  return _latestAddress(sendMessage, accountId)
}

export function reattach(accountId: AccountIdentifier, messageId: string): Promise<void> {
  return _reattach(sendMessage, accountId, messageId)
}

export function backup(destinationPath: string): Promise<void> {
  return _backup(sendMessage, destinationPath)
}

export function restoreBackup(backupPath: string): Promise<void> {
  return _restoreBackup(sendMessage, backupPath)
}

export function setStrongholdPassword(password: string): Promise<void> {
  return _setStrongholdPassword(sendMessage, password)
}

export function send(fromAccountId: AccountIdentifier, transfer: Transfer): Promise<void> {
  return _send(sendMessage, fromAccountId, transfer)
}

export function internalTransfer(fromAccountId: AccountIdentifier, toAccountId: AccountIdentifier, amount: number): Promise<void> {
  return _internalTransfer(sendMessage, fromAccountId, toAccountId, amount)
}

export function listenToErrorEvents() {
  addon.listen('ErrorThrown')
}

export function listenToBalanceChangeEvents() {
  addon.listen('BalanceChange')
}

export function listenToNewTransactionEvents() {
  addon.listen('NewTransaction')
}

export function listenToConfirmationStateChangeEvents() {
  addon.listen('ConfirmationStateChange')
}

export function listenToReattachmentEvents() {
  addon.listen('Reattachment')
}

export function listenToBroadcastEvents() {
  addon.listen('Broadcast')
}
