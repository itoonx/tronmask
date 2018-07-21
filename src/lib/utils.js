/**
 * 1000000 sun = 1 TRX
 */
export const ONE_TRX = 1000000

export function getTokenAmount(rawAmount) {
    return rawAmount / ONE_TRX
}

export function getTokenRawAmount(amount) {
    return amount * ONE_TRX
}
