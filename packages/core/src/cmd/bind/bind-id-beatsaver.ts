import { CmdContext, RelateAccount } from '@/interface'

import {
  BSIDNotFoundError,
  SessionPromotionCancelError,
  SessionPromotionTimeoutError,
} from '@/errors'

export const handleBeatSaverIDBind = async <T, C>(c: CmdContext<T, C>) => {
  const mapper = await c.api.BeatSaver.getBSMapperById(c.input)
  if (!mapper) {
    throw new BSIDNotFoundError({ accountId: c.input })
  }
  // 如果当前bind 是 oauth？改为 id？
  const now = new Date()
  const { bsAccount } = await c.db.getUserAccountsByUid(c.session.u.id)

  const text =
    c.session.text('commands.bsbot.bind.ack-prompt', {
      user: `${mapper.name}(${mapper.id})`,
    }) +
    (bsAccount
      ? ',' +
        c.session.text('commands.bsbot.bind.exist', {
          id: bsAccount.platformUid,
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
    platform: 'beatsaver',
    platformUid: mapper.id.toString(),
    platformUname: mapper.name,
    otherPlatformInfo: {},
    lastModifiedAt: now,
    lastRefreshAt: now,
    type: 'id',
    status: 'ok',
  }
  if (bsAccount) {
    account.id = bsAccount.id
  }
  await c.db.addUserBindingInfo(account)
  c.session.sendQuote(
    c.session.text('commands.bsbot.bind.bs.success', {
      name: mapper.name,
      id: mapper.id,
    })
  )
}
