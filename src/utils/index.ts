import { Challenge } from '@prisma/client'

export const getChallengeExists = (
  challenges: Challenge[] | undefined,
  a: string,
  b: string,
) =>
  challenges?.some((c) => {
    if (typeof c.outcome === 'number' && typeof c.reveal === 'number')
      return false

    const { attackerId: _a, attackeeId: _b } = c
    return (_b === a && _a === b) || (_a === a && _b === b)
  })

export const formatAddress = (s: string) => `${s.slice(0, 6)}...${s.slice(-4)}`

export * from './hooks'
export * from './requests'
