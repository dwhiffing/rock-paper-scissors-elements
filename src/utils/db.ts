import { PrismaClient, Challenge } from '@prisma/client'

const prisma = new PrismaClient()

export const createChallenge = async (
  attackerId: string,
  attackeeId: string,
  wager: number,
  attackerHand: number[],
) => {
  if (await getActiveChallenge(attackerId, attackeeId))
    throw new Error('Challenge already exists')

  // deduct wager from attacker balance
  const data = { balance: { decrement: wager } }
  await prisma.player.update({ where: { address: attackerId }, data })

  return prisma.challenge.create({
    data: {
      attackerHand: attackerHand.join(','),
      wager: +wager,
      attackee: { connect: { address: attackeeId } },
      attacker: { connect: { address: attackerId } },
    },
  })
}

export const rejectChallenge = async (challenge: Challenge) => {
  await prisma.challenge.delete({ where: { id: challenge.id } })
  await adjustBalance(challenge.attackerId, challenge.wager)
}

export const respondToChallenge = async (
  challenge: Challenge,
  attackeeHand: any,
) => {
  const { attackerId, attackeeId, wager } = challenge
  const attackerHand = challenge.attackerHand.split(',').map(Number)

  await adjustBalance(attackeeId, -wager)

  const outcome = getOutcome(attackerHand, attackeeHand)
  if (outcome === 0) {
    await adjustBalance(attackerId, wager)
    await adjustBalance(attackeeId, wager)
  } else if (outcome > 0) {
    await adjustBalance(attackerId, wager * 2)
  } else {
    await adjustBalance(attackeeId, wager * 2)
  }

  await prisma.challenge.update({
    where: { id: challenge.id },
    data: { attackeeHand: attackeeHand.join(','), outcome },
  })
}

export const viewChallenge = async (challenge: Challenge, address: string) => {
  if (address === challenge.attackerId) {
    await prisma.challenge.update({
      where: { id: challenge.id },
      data: { attackerSeenOutcomeAt: new Date() },
    })
  }
}

export const finalizeChallenge = async (
  challenge: Challenge,
  reveal: number,
) => {
  await prisma.challenge.update({
    where: { id: challenge.id },
    data: { reveal },
  })
}

export const touchOrCreatePlayer = async (address: string) => {
  const player = await prisma.player.findUnique({ where: { address } })

  if (player) {
    const lastOnlineAt = new Date()
    await prisma.player.update({ where: { address }, data: { lastOnlineAt } })
  } else {
    await prisma.player.create({ data: { address, balance: 100 } })
  }

  return player
}

export const getPlayer = (address: string) =>
  prisma.player.findUnique({ where: { address } })

export const getPlayerBalance = async (address: string) =>
  (await getPlayer(address))?.balance || 0

export const getChallenge = (id: number) =>
  prisma.challenge.findUnique({ where: { id } })

// TODO: should just return challenges that relate to the player and players who were only recently
export const getAppData = async () => {
  const players = await prisma.player.findMany()
  const challenges = await prisma.challenge.findMany()
  return { players, challenges }
}

export const purge = async () => {
  await prisma.challenge.deleteMany()
  await prisma.player.deleteMany()
}

const getOutcome = (attackerHand: number[], attackeeHand: number[]) => {
  let outcome = 0
  for (let i = 0; i < 5; i++) {
    const a = attackerHand[i]
    const b = attackeeHand[i]
    const a1 = (a + 1) % 5
    const a2 = (a + 2) % 5
    const _outcome = a === b ? 0 : b === a1 || b === a2 ? 1 : -1
    outcome += _outcome
  }
  return outcome
}

const adjustBalance = (address: string, increment: number) =>
  prisma.player.update({ where: { address }, data: { balance: { increment } } })

const getActiveChallenge = async (attackerId: string, attackeeId: string) => {
  const attackerChallenge = await prisma.challenge.findFirst({
    where: { attackerId, attackeeId, outcome: null },
  })

  const attackeeChallenge = await prisma.challenge.findFirst({
    where: { attackerId: attackeeId, attackeeId: attackerId, outcome: null },
  })
  return attackerChallenge || attackeeChallenge
}
