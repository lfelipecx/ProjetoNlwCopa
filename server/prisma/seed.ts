import { PrismaClient } from '@prisma/client'

//conectar ao banco
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Tiquinho Gol',
            email: 'tiquinho.gol@gmail.com',
            avatarUrl: 'https://github.com/lfelipecx.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Bolão Show',
            code: 'SHOW123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-10T12:00:00.924Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-10T12:00:00.924Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
    
}

main()