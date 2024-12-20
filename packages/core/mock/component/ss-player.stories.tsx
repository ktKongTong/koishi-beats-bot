// @ts-ignore
import SSPlayerPage from '../../src/img-render/result/ss-player'
import { ssScores } from '../ss-score'
import { ssUser } from '../ss-user'

export default {
  component: SSPlayerPage,
}

export const SSPlayerPageStory = {
  args: {
    leaderItems: ssScores,
    scoreUser: ssUser,
    bg: 'https://loliapi.com/acg/pc',
  },
}
