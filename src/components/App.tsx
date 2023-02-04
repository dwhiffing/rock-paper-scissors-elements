import { useEffect, useState } from 'react'
import { Player, Challenge } from '@prisma/client'
import useSWR from 'swr'
import { PlayerItem } from './PlayerItem'
import { ChallengeItem } from './ChallengeItem'
import { AttackModal } from './AttackModal'
import { formatAddress, generateId, useLocalStorage } from '@/utils'

export const App = () => {
  const [attackee, setAttackee] = useState('')
  const [isResponse, setIsResponse] = useState(0)
  const [address, setAddress] = useLocalStorage<string>('address', '')

  const fetcher = async () =>
    (await (await fetch('/api/poll')).json()) as {
      players: Player[]
      challenges: Challenge[]
    }

  const { data, mutate: refetch } = useSWR('/api/poll', fetcher)
  const { players, challenges } = data || {}

  useEffect(() => {
    if (!window.localStorage.getItem('address')) setAddress(generateId())
  }, [address, setAddress])

  const attack = (hand: string, wager: string) => {
    fetch('/api/attack', {
      method: 'POST',
      body: JSON.stringify({
        attacker: address,
        attackee: attackee,
        wager,
        attackerHand: hand,
      }),
    }).then(() => refetch())
  }
  const respond = (id: number, attackeeHand?: string) => {
    fetch('/api/respond', {
      method: 'POST',
      body: JSON.stringify({ id, attackeeHand }),
    }).then(() => refetch())
  }

  const getChallengeExists = (a: string, b: string) =>
    challenges?.some(
      (c) =>
        typeof c.winnerIndex !== 'number' &&
        ((c.attackeeId === a && c.attackerId === b) ||
          (c.attackerId === a && c.attackeeId === b)),
    )

  const onAttack = (address: string) => {
    setIsResponse(0)
    setAttackee(address)
  }

  const onAccept = (c: Challenge) => {
    setIsResponse(c.id)
    setAttackee(c.attackerId)
  }
  const onReject = (c: Challenge) => respond(c.id)
  // usePollingEffect(refetch, [], { interval: 3000 })
  const otherPlayers = players?.filter((p) => p.address !== address) || []

  const activeChallenges =
    challenges
      ?.filter((c) => typeof c.winnerIndex !== 'number')
      ?.filter((c) => c.attackeeId === address) || []

  const pastChallenges =
    challenges
      ?.filter((c) => c.attackeeId === address || c.attackerId === address)
      ?.filter((c) => typeof c.winnerIndex === 'number') || []

  const onPurge = () => fetch('/api/purge').then(() => refetch())
  const onPing = () =>
    fetch('/api/ping?address=' + address).then(() => refetch())

  const onSubmitAttack = (hand: string, wager: string) => {
    if (isResponse) {
      respond(isResponse, hand)
    } else {
      attack(hand, wager)
    }
    setAttackee('')
  }

  return (
    <div className="flex flex-col max-w-sm mx-auto my-10 gap-4">
      <p>{address}</p>

      <div className="flex justify-evenly">
        <button onClick={onPing}>ping</button>
        <button onClick={() => refetch()}>poll</button>
        <button onClick={onPurge}>purge</button>
      </div>

      <p className="font-bold">Players</p>
      <div className="flex flex-col gap-1">
        {otherPlayers.map((p) => (
          <PlayerItem
            key={p.address}
            disabled={!!getChallengeExists(p.address, address)}
            player={p}
            onClick={() => onAttack(p.address)}
          />
        ))}
      </div>

      <p className="font-bold">Challenges</p>
      <div className="flex flex-col gap-1">
        {activeChallenges.map((c) => (
          <ChallengeItem
            challenge={c}
            key={c.id}
            onAccept={() => onAccept(c)}
            onReject={() => onReject(c)}
          />
        ))}
      </div>

      <p className="font-bold">History</p>
      <div className="flex flex-col gap-1">
        {pastChallenges.map((c) => (
          <div className="flex flex-col" key={c.id}>
            <p>
              {formatAddress(c.attackerId)} vs. {formatAddress(c.attackeeId)} (
              {c.wager})
            </p>
            <p>
              {c.attackerHand} vs {c.attackeeHand}
            </p>
            <p>winnerIndex: {c.winnerIndex}</p>
          </div>
        ))}
      </div>

      <AttackModal
        onSubmit={onSubmitAttack}
        isResponse={!!isResponse}
        open={!!attackee}
        onClose={() => setAttackee('')}
      />
    </div>
  )
}
