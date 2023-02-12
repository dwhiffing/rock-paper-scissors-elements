import { Player, Challenge } from '@prisma/client'

export const poll = async () =>
  (await (await fetch('/api/poll')).json()) as {
    players: Player[]
    challenges: Challenge[]
  }

export const attack = (
  attacker: string,
  attackee: string,
  attackerHand: number[],
  wager: number,
) =>
  fetch('/api/attack', {
    method: 'POST',
    body: JSON.stringify({ attacker, attackee, wager, attackerHand }),
  })

export const view = (id: number, address: string) =>
  fetch('/api/view', {
    method: 'POST',
    body: JSON.stringify({ id, address }),
  })

export const finalize = (id: number, reveal: number) =>
  fetch('/api/finalize', {
    method: 'POST',
    body: JSON.stringify({ id, reveal }),
  })

export const respond = (id: number, hand?: number[]) =>
  fetch('/api/respond', {
    method: 'POST',
    body: JSON.stringify({ id, attackeeHand: hand }),
  })
