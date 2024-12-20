import { CmdContext, RelateAccount } from '@/interface'
import {
  BLIDNotFoundError,
  SessionPromotionCancelError,
  SessionPromotionTimeoutError,
} from '@/errors'

export const handleBeatLeaderIDBind = async <T, C>(c: CmdContext<T, C>) => {
  const player = await c.api.BeatLeader.getPlayerInfoById(c.input)
  if (!player) {
    throw new BLIDNotFoundError({ accountId: c.input })
  }
  // 如果当前bind 是 oauth？改为 id？
  const now = new Date()
  const { blAccount } = await c.db.getUserAccountsByUid(c.session.u.id)

  const text =
    c.session.text('commands.bsbot.bind.ack-prompt', {
      user: `${player.name}(${player.id})`,
    }) +
    (blAccount
      ? ',' +
        c.session.text('commands.bsbot.bind.exist', {
          id: blAccount.platformUid,
        })
      : '')

  await c.session.sendQuote(text)

  const prompt = await c.session.prompt(30000)
  if (!prompt || (prompt != 'y' && prompt != 'yes')) {
    throw prompt
      ? new SessionPromotionCancelError()
      : new SessionPromotionTimeoutError()
  }

  // const binds = c.db.getAccountsByPlatformAndUid()
  // const u = c.session.u
  // 如果当前 u为...，已绑定就进行替换
  const account: Partial<RelateAccount> = {
    uid: c.session.u.id,
    platform: 'beatleader',
    platformUid: player.id.toString(),
    platformUname: player.name,
    otherPlatformInfo: {},
    lastModifiedAt: now,
    lastRefreshAt: now,
    type: 'id',
    status: 'ok',
  }
  if (blAccount) {
    account.id = blAccount.id
  }
  await c.db.addUserBindingInfo(account)
  c.session.sendQuote(
    c.session.text('commands.bsbot.bind.bl.success', {
      name: player.name,
      id: player.id,
    })
  )
}
