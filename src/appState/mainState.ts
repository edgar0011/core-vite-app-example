import { createStore, delay } from '@e1011/es-kit'

type MainState = {

  appName: string
  appData: unknown[]
  sharedData: Record<string, unknown>
  userName?: string
}

const initialState: Partial<MainState> = {
  appName: '',
}


export const mainAppStore = createStore<MainState>(initialState, {
  getUser: async (getState, setState, id: unknown): Promise<Partial<MainState>> => {
    await delay(1000)

    return setState({
      ...getState(),
      userName: `user${id as string}`,
    })
  },
})
