import { BotFrameworkAdapter, ConversationReference } from 'botbuilder'
import * as bp from '.botpress'

type TeamsConfig = bp.configuration.Configuration

export const getAdapter = (config: TeamsConfig) => {
  return new BotFrameworkAdapter({
    channelAuthTenant: config.tenantId,
    appId: config.appId,
    appPassword: config.appPassword,
  })
}

export const getConversationReference = async ({
  conversationId,
  client,
}: {
  conversationId: string
  client: bp.Client
}) => {
  const stateRes = await client.getState({
    id: conversationId,
    name: 'conversation',
    type: 'conversation',
  })
  const { state } = stateRes
  return state.payload as ConversationReference
}

export const sleep = (ms: number) => {
  return new Promise<undefined>((resolve) => {
    setTimeout(() => resolve(undefined), ms)
  })
}

export const getError = (thrown: unknown) => {
  return thrown instanceof Error ? thrown : new Error(String(thrown))
}
