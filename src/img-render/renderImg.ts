import Puppeteer from "koishi-plugin-puppeteer";

export const screenshot = async (puppeteer:Puppeteer, url: string, selector:string, onLoad?:()=>any, waitTime:number = 5000) => {
  const page = await puppeteer.page()
  await page.setViewport({
    width: 1024,
    height: 720 ,
    deviceScaleFactor: 2,
  })
  await page.goto(url);
  onLoad?.()
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, waitTime)
  })
  const elm = await page.waitForSelector(selector, {timeout: 5000})
  const buffer = await elm.screenshot({})
  // = await page.screenshot({})
  await page.close()
  return buffer
  // const image = h.image(buffer, 'image/png')
  // return image
}
export const screenshotRemoteMap = async (puppeteer:Puppeteer, url: string, selector:string, onLoad?:()=>any, waitTime:number = 5000) => {
  const page = await puppeteer.page()
  await page.setViewport({
    width: 300,
    height: 1080,
    deviceScaleFactor: 2,
  })
  await page.goto(url, {timeout: 0, waitUntil:'domcontentloaded'});
  onLoad?.()
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, waitTime)
  })
  const elm = await page.waitForSelector(selector, {timeout: waitTime})
  const buffer = await elm.screenshot({})
  await page.close()
  return buffer
}