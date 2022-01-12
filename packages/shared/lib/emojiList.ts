import { pick } from './utils'

const EMOJIS = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '😗',
    '😙',
    '😚',
    '☺',
    '🙂',
    '🤗',
    '🤔',
    '😐',
    '😑',
    '😶',
    '🙄',
    '😏',
    '😣',
    '😥',
    '😮',
    '🤐',
    '😯',
    '😪',
    '😫',
    '😴',
    '😌',
    '🤓',
    '😛',
    '😜',
    '😝',
    '🤤',
    '😒',
    '😓',
    '😔',
    '😕',
    '🙃',
    '🤑',
    '😲',
    '☹',
    '🙁',
    '😖',
    '😞',
    '😟',
    '😤',
    '😢',
    '😭',
    '😦',
    '😧',
    '😨',
    '😩',
    '😬',
    '😰',
    '😱',
    '😳',
    '😵',
    '😡',
    '😠',
    '😇',
    '🤠',
    '🤡',
    '🤥',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤧',
    '😈',
    '👿',
    '👹',
    '👺',
    '💀',
    '☠',
    '👻',
    '👽',
    '👾',
    '🤖',
    '💩',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '🙈',
    '🙉',
    '🙊',
    '👯',
    '🕴',
    '🗣',
    '👤',
    '👥',
    '🤺',
    '🏇',
    '⛷',
    '🏂',
    '🏌',
    '🏎',
    '🏍',
    '👣',
    '👀',
    '👁',
    '👁‍🗨',
    '👅',
    '👄',
    '💋',
    '💘',
    '❤',
    '💓',
    '💔',
    '💕',
    '💖',
    '💗',
    '💙',
    '💚',
    '💛',
    '💜',
    '🖤',
    '💝',
    '💞',
    '💟',
    '❣',
    '💌',
    '💤',
    '💢',
    '💣',
    '💥',
    '💦',
    '💨',
    '💫',
    '💬',
    '🗨',
    '🕳',
    '👓',
    '🕶',
    '👔',
    '👕',
    '👖',
    '👗',
    '👘',
    '👙',
    '👚',
    '👛',
    '👜',
    '👝',
    '🛍',
    '🎒',
    '👞',
    '👟',
    '👠',
    '👡',
    '👢',
    '👑',
    '👒',
    '🎩',
    '🎓',
    '⛑',
    '📿',
    '💄',
    '💍',
    '💎',
    '🐵',
    '🐒',
    '🦍',
    '🐶',
    '🐕',
    '🐩',
    '🐺',
    '🦊',
    '🐱',
    '🐈',
    '🦁',
    '🐯',
    '🐅',
    '🐆',
    '🐴',
    '🐎',
    '🦌',
    '🦄',
    '🐮',
    '🐂',
    '🐃',
    '🐄',
    '🐷',
    '🐖',
    '🐗',
    '🐽',
    '🐏',
    '🐑',
    '🐐',
    '🐪',
    '🐫',
    '🐘',
    '🦏',
    '🐭',
    '🐁',
    '🐀',
    '🐹',
    '🐰',
    '🐇',
    '🐿',
    '🦇',
    '🐻',
    '🐨',
    '🐼',
    '🐾',
    '🦃',
    '🐔',
    '🐓',
    '🐣',
    '🐤',
    '🐥',
    '🐦',
    '🐧',
    '🕊',
    '🦅',
    '🦆',
    '🦉',
    '🐸',
    '🐊',
    '🐢',
    '🦎',
    '🐍',
    '🐲',
    '🐉',
    '🐳',
    '🐋',
    '🐬',
    '🐟',
    '🐠',
    '🐡',
    '🦈',
    '🐙',
    '🐚',
    '🦀',
    '🦐',
    '🦑',
    '🦋',
    '🐌',
    '🐛',
    '🐜',
    '🐝',
    '🐞',
    '🕷',
    '🕸',
    '🦂',
    '💐',
    '🌸',
    '💮',
    '🏵',
    '🌹',
    '🥀',
    '🌺',
    '🌻',
    '🌼',
    '🌷',
    '🌱',
    '🌲',
    '🌳',
    '🌴',
    '🌵',
    '🌾',
    '🌿',
    '☘',
    '🍀',
    '🍁',
    '🍂',
    '🍃',
    '🍇',
    '🍈',
    '🍉',
    '🍊',
    '🍋',
    '🍌',
    '🍍',
    '🍎',
    '🍏',
    '🍐',
    '🍑',
    '🍒',
    '🍓',
    '🥝',
    '🍅',
    '🥑',
    '🍆',
    '🥔',
    '🥕',
    '🌽',
    '🌶',
    '🥒',
    '🍄',
    '🥜',
    '🌰',
    '🍞',
    '🥐',
    '🥖',
    '🥞',
    '🧀',
    '🍖',
    '🍗',
    '🥓',
    '🍔',
    '🍟',
    '🍕',
    '🌭',
    '🌮',
    '🌯',
    '🥙',
    '🥚',
    '🍳',
    '🥘',
    '🍲',
    '🥗',
    '🍿',
    '🍱',
    '🍘',
    '🍙',
    '🍚',
    '🍛',
    '🍜',
    '🍝',
    '🍠',
    '🍢',
    '🍣',
    '🍤',
    '🍥',
    '🍡',
    '🍦',
    '🍧',
    '🍨',
    '🍩',
    '🍪',
    '🎂',
    '🍰',
    '🍫',
    '🍬',
    '🍭',
    '🍮',
    '🍯',
    '🍼',
    '🥛',
    '☕',
    '🍵',
    '🍶',
    '🍾',
    '🍷',
    '🍸',
    '🍹',
    '🍺',
    '🍻',
    '🥂',
    '🥃',
    '🍽',
    '🍴',
    '🥄',
    '🔪',
    '🏺',
    '🌍',
    '🌎',
    '🌏',
    '🌐',
    '🗺',
    '🗾',
    '🏔',
    '⛰',
    '🌋',
    '🗻',
    '🏕',
    '🏖',
    '🏜',
    '🏝',
    '🏞',
    '🏟',
    '🏛',
    '🏗',
    '🏘',
    '🏙',
    '🏚',
    '🏠',
    '🏡',
    '🏢',
    '🏣',
    '🏤',
    '🏥',
    '🏦',
    '🏨',
    '🏩',
    '🏪',
    '🏫',
    '🏬',
    '🏭',
    '🏯',
    '🏰',
    '💒',
    '🗼',
    '🗽',
    '⛪',
    '🕌',
    '🕍',
    '⛩',
    '🕋',
    '⛲',
    '⛺',
    '🌁',
    '🌃',
    '🌄',
    '🌅',
    '🌆',
    '🌇',
    '🌉',
    '♨',
    '🌌',
    '🎠',
    '🎡',
    '🎢',
    '💈',
    '🎪',
    '🎭',
    '🖼',
    '🎨',
    '🎰',
    '🚂',
    '🚃',
    '🚄',
    '🚅',
    '🚆',
    '🚇',
    '🚈',
    '🚉',
    '🚊',
    '🚝',
    '🚞',
    '🚋',
    '🚌',
    '🚍',
    '🚎',
    '🚐',
    '🚑',
    '🚒',
    '🚓',
    '🚔',
    '🚕',
    '🚖',
    '🚗',
    '🚘',
    '🚙',
    '🚚',
    '🚛',
    '🚜',
    '🚲',
    '🛴',
    '🛵',
    '🚏',
    '🛣',
    '🛤',
    '⛽',
    '🚨',
    '🚥',
    '🚦',
    '🚧',
    '🛑',
    '⚓',
    '⛵',
    '🛶',
    '🚤',
    '🛳',
    '⛴',
    '🛥',
    '🚢',
    '✈',
    '🛩',
    '🛫',
    '🛬',
    '💺',
    '🚁',
    '🚟',
    '🚠',
    '🚡',
    '🚀',
    '🛰',
    '🛎',
    '🚪',
    '🛌',
    '🛏',
    '🛋',
    '🚽',
    '🚿',
    '🛁',
    '⌛',
    '⏳',
    '⌚',
    '⏰',
    '⏱',
    '⏲',
    '🕰',
    '🌑',
    '🌒',
    '🌓',
    '🌔',
    '🌕',
    '🌖',
    '🌗',
    '🌘',
    '🌙',
    '🌚',
    '🌛',
    '🌜',
    '🌡',
    '☀',
    '🌝',
    '🌞',
    '⭐',
    '🌟',
    '🌠',
    '☁',
    '⛅',
    '⛈',
    '🌤',
    '🌥',
    '🌦',
    '🌧',
    '🌨',
    '🌩',
    '🌪',
    '🌬',
    '🌀',
    '🌈',
    '🌂',
    '☂',
    '☔',
    '⛱',
    '⚡',
    '❄',
    '☃',
    '⛄',
    '☄',
    '🔥',
    '💧',
    '🌊',
    '🎃',
    '🎄',
    '🎆',
    '🎇',
    '✨',
    '🎈',
    '🎉',
    '🎊',
    '🎋',
    '🎍',
    '🎎',
    '🎏',
    '🎐',
    '🎑',
    '🎀',
    '🎁',
    '🎗',
    '🎟',
    '🎫',
    '🎖',
    '🏆',
    '🏅',
    '🥇',
    '🥈',
    '🥉',
    '⚽',
    '⚾',
    '🏀',
    '🏐',
    '🏈',
    '🏉',
    '🎾',
    '🎱',
    '🎳',
    '🏏',
    '🏑',
    '🏒',
    '🏓',
    '🏸',
    '🥊',
    '🥋',
    '🥅',
    '🎯',
    '⛳',
    '⛸',
    '🎣',
    '🎽',
    '🎿',
    '🎮',
    '🕹',
    '🎲',
    '♠',
    '♥',
    '♦',
    '♣',
    '🃏',
    '🀄',
    '🎴',
    '🔇',
    '🔈',
    '🔉',
    '🔊',
    '📢',
    '📣',
    '📯',
    '🔔',
    '🔕',
    '🎼',
    '🎵',
    '🎶',
    '🎙',
    '🎚',
    '🎛',
    '🎤',
    '🎧',
    '📻',
    '🎷',
    '🎸',
    '🎹',
    '🎺',
    '🎻',
    '🥁',
    '📱',
    '📲',
    '☎',
    '📞',
    '📟',
    '📠',
    '🔋',
    '🔌',
    '💻',
    '🖥',
    '🖨',
    '⌨',
    '🖲',
    '💽',
    '💾',
    '💿',
    '📀',
    '🎥',
    '🎞',
    '📽',
    '🎬',
    '📺',
    '📷',
    '📸',
    '📹',
    '📼',
    '🔍',
    '🔎',
    '🔬',
    '🔭',
    '📡',
    '🕯',
    '💡',
    '🔦',
    '🏮',
    '📔',
    '📕',
    '📖',
    '📗',
    '📘',
    '📙',
    '📚',
    '📓',
    '📒',
    '📃',
    '📜',
    '📄',
    '📰',
    '🗞',
    '📑',
    '🔖',
    '🏷',
    '💰',
    '💴',
    '💵',
    '💶',
    '💷',
    '💸',
    '💳',
    '💹',
    '💱',
    '💲',
    '✉',
    '📧',
    '📨',
    '📩',
    '📤',
    '📥',
    '📦',
    '📫',
    '📪',
    '📬',
    '📭',
    '📮',
    '🗳',
    '✏',
    '✒',
    '🖋',
    '🖊',
    '🖌',
    '🖍',
    '📝',
    '💼',
    '📁',
    '📂',
    '🗂',
    '📅',
    '📆',
    '🗒',
    '🗓',
    '📇',
    '📈',
    '📉',
    '📊',
    '📋',
    '📌',
    '📍',
    '📎',
    '🖇',
    '📏',
    '📐',
    '✂',
    '🗃',
    '🗄',
    '🗑',
    '🔒',
    '🔓',
    '🔏',
    '🔐',
    '🔑',
    '🗝',
    '🔨',
    '⛏',
    '⚒',
    '🛠',
    '🗡',
    '⚔',
    '🔫',
    '🏹',
    '🛡',
    '🔧',
    '🔩',
    '⚙',
    '🗜',
    '⚗',
    '⚖',
    '🔗',
    '⛓',
    '💉',
    '💊',
    '🚬',
    '⚰',
    '⚱',
    '🗿',
    '🛢',
    '🔮',
    '🛒',
    '🏧',
    '🚮',
    '🚰',
    '♿',
    '🚹',
    '🚺',
    '🚻',
    '🚼',
    '🚾',
    '🛂',
    '🛃',
    '🛄',
    '🛅',
    '⚠',
    '🚸',
    '⛔',
    '🚫',
    '🚳',
    '🚭',
    '🚯',
    '🚱',
    '🚷',
    '📵',
    '🔞',
    '☢',
    '☣',
    '⬆',
    '↗',
    '➡',
    '↘',
    '⬇',
    '↙',
    '⬅',
    '↖',
    '↕',
    '↔',
    '↩',
    '↪',
    '⤴',
    '⤵',
    '🔃',
    '🔄',
    '🔙',
    '🔚',
    '🔛',
    '🔜',
    '🔝',
    '🛐',
    '⚛',
    '🕉',
    '✡',
    '☸',
    '☯',
    '✝',
    '☦',
    '☪',
    '☮',
    '🕎',
    '🔯',
    '♈',
    '♉',
    '♊',
    '♋',
    '♌',
    '♍',
    '♎',
    '♏',
    '♐',
    '♑',
    '♒',
    '♓',
    '⛎',
    '🔀',
    '🔁',
    '🔂',
    '▶',
    '⏩',
    '⏭',
    '⏯',
    '◀',
    '⏪',
    '⏮',
    '🔼',
    '⏫',
    '🔽',
    '⏬',
    '⏸',
    '⏹',
    '⏺',
    '⏏',
    '🎦',
    '🔅',
    '🔆',
    '📶',
    '📳',
    '📴',
    '♻',
    '📛',
    '⚜',
    '🔰',
    '🔱',
    '⭕',
    '✅',
    '☑',
    '✔',
    '✖',
    '❌',
    '❎',
    '➕',
    '➖',
    '➗',
    '➰',
    '➿',
    '〽',
    '✳',
    '✴',
    '❇',
    '‼',
    '⁉',
    '❓',
    '❔',
    '❕',
    '❗',
    '〰',
    '©',
    '®',
    '™',
    '💯',
    '🔠',
    '🔡',
    '🔢',
    '🔣',
    '🔤',
    '🅰',
    '🆎',
    '🅱',
    '🆑',
    '🆒',
    '🆓',
    'ℹ',
    '🆔',
    'Ⓜ',
    '🆕',
    '🆖',
    '🅾',
    '🆗',
    '🅿',
    '🆘',
    '🆙',
    '🆚',
    '🈁',
    '🈂',
    '🈷',
    '🈶',
    '🈯',
    '🉐',
    '🈹',
    '🈚',
    '🈲',
    '🉑',
    '🈸',
    '🈴',
    '🈳',
    '㊗',
    '㊙',
    '🈺',
    '🈵',
    '▪',
    '▫',
    '◻',
    '◼',
    '◽',
    '◾',
    '⬛',
    '🔶',
    '🔷',
    '🔸',
    '🔹',
    '🔺',
    '🔻',
    '💠',
    '🔘',
    '🔲',
    '🔳',
    '⚫',
    '🔴',
    '🔵',
    '🏁',
    '🚩',
    '🎌',
    '🏴',
]

const randomEmoji = (): string => {
    return pick(EMOJIS)
}

export const randomEmojis = (length: number): string => {
    if (!length) return ''

    return Array(length).fill(randomEmoji()).join('')
}
