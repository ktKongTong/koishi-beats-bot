// import { RemoteRenderOpts } from '../interfaces'
// import { h } from 'koishi'
//
// export const renderRemoteMap = async (
//   mapId: string,
//   opts: RemoteRenderOpts
// ) => {
//   try {
//     const buffer = await screenshot(
//       opts.puppeteer,
//       `${opts.renderBaseURL}/render/map/${mapId}`,
//       '#render-result',
//       opts.onRenderStart,
//       opts.waitTimeout
//     )
//     const image = h.image(buffer, 'image/png')
//     return image
//   } catch (err) {
//     console.error(err)
//     return null
//   }
// }
//
// export const renderRemoteRank = async (
//   uid: string,
//   platform: string,
//   renderOpts: RemoteRenderOpts
// ) => {
//   const url = `${renderOpts.renderBaseURL}/render/${platform}/${uid}`
//   const buffer = await screenshot(
//     renderOpts.puppeteer,
//     url,
//     '#render-result',
//     renderOpts.onRenderStart,
//     renderOpts.waitTimeout
//   )
//   const image = h.image(buffer, 'image/png')
//   return image
// }
//
// export const renderRemoteScore = async (
//   scoreId: string,
//   platform: string,
//   renderOpts: RemoteRenderOpts
// ) => {
//   const url = `${renderOpts.renderBaseURL}/render/${platform}/score/${scoreId}`
//   const buffer = await screenshot(
//     renderOpts.puppeteer,
//     url,
//     '#render-result',
//     renderOpts.onRenderStart,
//     renderOpts.waitTimeout
//   )
//   return h.image(buffer, 'image/png')
// }
