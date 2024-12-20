// import { Config } from '../config'
// import { BotService, DB, Logger, Session, SubWithGroupRes } from '@/interface'
// import { RenderService } from '@/img-render'
// import { APIService } from '@/api'
//
// interface Alert {
//   id: number
//   head: string
//   body: string
//   type: string
//   time: string
// }
//
// const AlertMonitor =
//   <T>(
//     config: Config,
//     db: DB<T>,
//     render: RenderService,
//     api: APIService,
//     logger: Logger,
//     botService: BotService<T, Session<T>>
//   ) =>
//   async () => {
//     logger.info('trigger alertMonitor')
//
//     const subscribes = await db.getSubscriptionInfoByType('beatsaver-alert')
//
//     // const selection = ctx.database.join(['BeatSaverOAuthAccount','BeatSaverNotifySub'])
//     // const subscribe = await selection.where(row=>
//     //   $.and($.eq(row.BeatSaverOAuthAccount.id,row.BeatSaverNotifySub.oauthAccountId),$.eq(row.BeatSaverOAuthAccount.valid,'ok'))).execute()
//     // const subscribes = subscribe.map(item=> ({
//     //   sub: item.BeatSaverNotifySub,
//     //   account:item.BeatSaverOAuthAccount
//     // }))
//     logger.info(`handle ${subscribes.length} account's notification`)
//     for (const item of subscribes) {
//       await handleOauthNotify(item, config, db, render, api, logger, botService)
//     }
//     logger.info(`handle notification over`)
//   }
//
// export default AlertMonitor
//
// const handleOauthNotify = async <T>(
//   item: SubWithGroupRes<T>,
//   config: Config,
//   db: DB<T>,
//   render: RenderService,
//   api: APIService,
//   logger: Logger,
//   botService: BotService<T, Session<T>>
// ) => {
//   // get
//   const session = botService.getSessionByChannelInfo(item.groupChannel)
//   if (!session) {
//     logger.info('no bot found, skip')
//     return
//   }
//   // let alerts = await api.BeatSaver.().getUnreadAlertsByPage(
//   //   item.account.accessToken,
//   //   0
//   // )
//   // const dbAccount = item.account
//   // if (!alerts.isSuccess()) {
//   //   // logger.info('accessToken invalid, try to refresh')
//   //   // const token = await api.BeatSaver.wrapperResult().refreshOAuthToken(
//   //   //   item.account.refreshToken
//   //   // )
//   //   // const now = new Date()
//   //   // if (!token.isSuccess()) {
//   //   //   logger.info(
//   //   //     `failed to refresh, invalid this account,${JSON.stringify(dbAccount)}`
//   //   //   )
//   //   //   dbAccount.valid = 'invalid'
//   //   //   dbAccount.lastModifiedAt = now
//   //   //   session.send(
//   //   //     '似乎 BeatSaver 通知的 token 已经失效了，通过bbbindbs 重新绑定吧'
//   //   //   )
//   //   //   return
//   //   // }
//   //
//   //   // logger.info(`refresh beatsaver token successfully ${item.account.id}`)
//   //   dbAccount.accessToken = token.data.access_token
//   //   dbAccount.refreshToken = token.data.refresh_token
//   //   dbAccount.lastRefreshAt = now
//   //   dbAccount.lastModifiedAt = now
//   //   // update Alert data
//   //   // await ctx.database.upsert('BSRelateOAuthAccount', [dbAccount])
//   //   alerts = await api.BeatSaver.wrapperResult().getUnreadAlertsByPage(
//   //     dbAccount.accessToken,
//   //     0
//   //   )
//   // }
//   const todo = []
//
//   // alerts.data
//   // // .filter((it) => item.sub?.data?.lastNotifiedId < it.id)
//   // .sort((a, b) => a.id - b.id)
//   // const res = Object.assign({}, item.sub)
//   try {
//     for (const it of todo) {
//       try {
//         // const msg = await buildMessage(it, render, api, ctx, config, logger)
//         // logger.info(`send alert id:${it.id}, type:${it.type}`)
//         // bot.sendMessage(item.sub.channelId, msg)
//         // res.data.lastNotifiedId = it.id
//         // res.data = {
//         //   ...res.data,
//         //   lastNotifiedId: it.id,
//         //   lastNotifiedAt: new Date(),
//         // }
//       } catch (err) {
//         logger.error(err)
//         logger.error('some error happen during send msg', it)
//       }
//     }
//   } catch (e) {
//     logger.error(e)
//   } finally {
//     // ctx.database.upsert('BSBotSubscribe', [res])
//   }
// }
// // @Joetastic just released #3c19b
// // check beatsaver source code of alert
// // https://github.com/beatmaps-io/beatsaver-main/blob/4049a4f6fe0649597ff58a37cceb7cca0725d54e/src/jvmMain/kotlin/io/beatmaps/api/maps.kt#L225
//
// const releasedRegex = /^@([\w._]+)\sjust\sreleased+\s#([a-f0-9]{1,5})/
// const curatedRegex = /^@([\w._]+)\sjust\scurated+\s#([a-f0-9]{1,5})/
// const reviewRegex =
//   /^(@\w._+)\sjust\sreviewed\syour\smap\s#([a-f0-9]{1,5}):\s\*\*(.+)\*\*\..+\*"(.+)"\*/
// const selfReviewDeletionRegex =
//   /^A\smoderator\sdeleted\syour\sreview\son\s#([a-f0-9]{1,5}).+Reason:\s\*"(.+)"\*$/
//
// const followRegex = /^@([\w._]+)\s.+/
// const selfMapCuratedRegex = /^(@\w._+)\sjust\scurated+\s#([a-f0-9]{1,5})/
// const selfMapUncuratedRegex =
//   /^(@\w._+)\sjust\suncrated\syour\smap\s#([a-f0-9]{1,5}):\s\*\*(.+)\*\*.+Reason:\s\*"(.+)"\*/
// const selfMapDeletionRegex = /^Your map #([a-f0-9]{1,5}):.+Reason:\s\*"(.+)"\*$/
//
// const noop = () => {}
//
// // async function buildMessage(
// //   alert: Alert,
// //   render: RenderService,
// //   api: APIService,
// //   cfg: Config,
// //   logger: Logger
// // ) {
// //   let msg = []
// //   if (alert.type === 'MapRelease') {
// //     const [full, username, mapId] = releasedRegex.exec(alert.body)
// //     const res = await api.BeatSaver.wrapperResult().searchMapById(mapId)
// //     if (!res.isSuccess()) {
// //       logger.info(`failed to retrieve release map ${mapId},body: ${alert.body}`)
// //       msg = [
// //         `你关注的「${username}」发布了新谱面，但似乎因为某些原因找不到了，谱面ID：「${mapId}」`,
// //       ]
// //     } else {
// //       const image = await render.renderMap(res.data, noop, noop, 'local')
// //       msg = [
// //         `你关注的「${username}」发布了新谱面`,
// //         h('message', [image]),
// //         h('audio', {
// //           src: res.data.versions[0].previewURL,
// //         }),
// //       ]
// //     }
// //   } else if (alert.type === 'MapCurated') {
// //     const [full, username, mapId] = curatedRegex.exec(alert.body)
// //     const res = await api.BeatSaver.wrapperResult().searchMapById(mapId)
// //     if (!res.isSuccess()) {
// //       logger.info(`failed to retrieve release map ${mapId},body: ${alert.body}`)
// //       msg = [
// //         `你关注的「${username}」Curate 了新谱面，但似乎因为某些原因找不到了，谱面ID：「${mapId}」`,
// //       ]
// //     } else {
// //       const image = await render.renderMap(res.data, noop, noop, 'local')
// //       msg = [
// //         `你关注的「${username}」Curate 了新谱面`,
// //         h('message', [image]),
// //         h('audio', {
// //           src: res.data.versions[0].previewURL,
// //         }),
// //       ]
// //     }
// //   } else if (alert.type === 'Curation') {
// //     const [full, username, mapId] = selfMapCuratedRegex.exec(alert.body)
// //     const res = await api.BeatSaver.wrapperResult().searchMapById(mapId)
// //     const image = await render.renderMap(res.data, noop, noop, 'local')
// //     msg = [
// //       `🎉，「${username}」刚刚 Curate 了你的谱面 ${mapId}`,
// //       h('message', [image]),
// //       h('audio', { src: res.data.versions[0].previewURL }),
// //     ]
// //   } else if (alert.type === 'Uncuration') {
// //     const [full, username, mapId, name, reason] = selfMapUncuratedRegex.exec(
// //       alert.body
// //     )
// //     const res = await api.BeatSaver.wrapperResult().searchMapById(mapId)
// //     const image = await render.renderMap(res.data, noop, noop, 'local')
// //     msg = [
// //       `😯，「${username}」 刚刚 Uncurate 了你的谱面 ${mapId}，原因：${reason}`,
// //       h('message', [image]),
// //       h('audio', { src: res.data.versions[0].previewURL }),
// //     ]
// //   } else if (alert.type === 'Deletion') {
// //     const [full, mapId, reason] = selfMapDeletionRegex.exec(alert.body)
// //     msg = [`你的谱面 ${mapId} 被移除了，原因：${reason}`]
// //   } else if (alert.type === 'Follow') {
// //     const [full, username] = followRegex.exec(alert.body)
// //     msg = [
// //       `BeatSaver用户「${username}」 刚刚关注你啦, https://beatsaver.com/profile/username/${username}`,
// //     ]
// //   } else if (alert.type === 'Review') {
// //     const [full, username, mapId, mapName, review] = reviewRegex.exec(
// //       alert.body
// //     )
// //     const res = await api.BeatSaver.wrapperResult().searchMapById(mapId)
// //     const image = await render.renderMap(res.data, noop, noop, 'local')
// //     msg = [
// //       `「${username}」 刚刚在你的谱面${mapName}(${mapId})中发表了评论：${review}`,
// //       h('message', [image]),
// //       h('audio', { src: res.data.versions[0].previewURL }),
// //     ]
// //   } else if (alert.type === 'ReviewDeletion') {
// //     const [full, mapId, reason] = selfReviewDeletionRegex.exec(alert.body)
// //     msg = [`你在谱面 ${mapId} 中的评论被移除了，原因：${reason}`]
// //   }
// //   return h('message', msg)
// // }
