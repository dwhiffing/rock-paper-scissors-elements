import { ConnectKitButton } from 'connectkit'
import { useEffect, useState } from 'react'
import { Challenge } from '@prisma/client'
import { useAccount } from 'wagmi'
import useSWR from 'swr'

import { ActiveChallengeItem, PastChallengeItem } from './ChallengeItem'
import { AttackModal } from './AttackModal'
import { PlayerItem } from './PlayerItem'
import * as utils from '@/utils'

export const App = () => {
  const [attackee, setAttackee] = useState('')
  const [isResponse, setIsResponse] = useState(0)
  const { address: _address } = useAccount()
  const address = _address || ''
  const { data, mutate: refetch } = useSWR('/api/poll', utils.poll)
  const { players, challenges } = data || {}
  const balance = players?.find((p) => p.address === address)?.balance || 0

  useEffect(() => {
    if (address) fetch('/api/ping?address=' + address).then(() => refetch())
  }, [address, refetch])

  utils.usePollingEffect(refetch, [], { interval: 3000 })

  const onAttack = (address: string) => {
    setIsResponse(0)
    setAttackee(address)
  }

  const onAccept = (c: Challenge) => {
    setIsResponse(c.id)
    setAttackee(c.attackerId)
  }

  const onPurge = () => fetch('/api/purge').then(() => refetch())
  const onReject = (c: Challenge) => utils.respond(c.id).then(() => refetch())

  const otherPlayers = players?.filter((p) => p.address !== address) || []

  const ourChallenges = (
    challenges?.filter(
      (c) => c.attackeeId === address || c.attackerId === address,
    ) || []
  ).sort((a, b) => {
    return +new Date(b.updatedAt) - +new Date(a.updatedAt)
  })

  const activeChallenges = ourChallenges.filter(
    (c) => typeof c.outcome !== 'number' || typeof c.reveal !== 'number',
  )

  const pastChallenges = ourChallenges.filter(
    (c) => !activeChallenges.includes(c),
  )

  const onView = (c: Challenge) => {
    utils.view(c.id, address).then(() => refetch())
  }

  const onFinalizeHand = (id: number, reveal: number) => {
    utils.finalize(id, reveal).then(() => refetch())
    setAttackee('')
  }
  const onReveal = (c: Challenge) => onFinalizeHand(c.id, 1)
  const onFold = (c: Challenge) => onFinalizeHand(c.id, -1)

  const onSubmitAttack = (hand: number[], wager: number) => {
    if (isResponse) {
      utils.respond(isResponse, hand).then(() => refetch())
    } else {
      utils.attack(address, attackee, hand, wager).then(() => refetch())
    }
    setAttackee('')
  }

  return (
    <div className="flex flex-col max-w-sm mx-auto my-10 gap-4 px-4">
      <div className="flex items-center justify-between">
        <ConnectKitButton />
        <p>balance: {balance}</p>
      </div>

      <div
        className="fixed top-2 right-2 cursor-pointer bg-red-500 text-black rounded-full w-3 aspect-square flex justify-center items-center"
        onClick={onPurge}
      />

      {address && (
        <>
          <p className="font-bold">Players</p>
          <div className="flex flex-col gap-1">
            {otherPlayers.map((p) => (
              <PlayerItem
                key={p.address}
                disabled={
                  !!utils.getChallengeExists(challenges, p.address, address)
                }
                player={p}
                onClick={() => onAttack(p.address)}
              />
            ))}
          </div>

          <p className="font-bold">Challenges</p>
          <div className="flex flex-col gap-1">
            {activeChallenges.map((c) => (
              <ActiveChallengeItem
                challenge={c}
                address={address}
                balance={balance}
                key={c.id}
                onAccept={() => onAccept(c)}
                onFold={() => onFold(c)}
                onReveal={() => onReveal(c)}
                onReject={() => onReject(c)}
                onView={() => onView(c)}
              />
            ))}
          </div>

          <p className="font-bold">History</p>
          <div className="flex flex-col gap-4">
            {pastChallenges.map((challenge) => (
              <PastChallengeItem
                key={challenge.id}
                address={address}
                challenge={challenge}
              />
            ))}
          </div>

          <AttackModal
            balance={balance}
            onSubmit={onSubmitAttack}
            isResponse={!!isResponse}
            open={!!attackee}
            onClose={() => setAttackee('')}
          />
        </>
      )}
    </div>
  )
}
