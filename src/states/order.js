import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const orderAtom = atom({
  key: 'orders',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export { orderAtom }
