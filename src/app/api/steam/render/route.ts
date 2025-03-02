import { mapSteamMarketRenderResponse } from '@/utils'
import axios from 'axios'
import { NextResponse } from 'next/server'
import UserAgent from 'user-agents'

export const POST = async (request: Request) => {
  const { market_hash_name, filter } = await request.json()

  const { data } = await axios.get(
    `https://steamcommunity.com/market/listings/730/${encodeURIComponent(market_hash_name)}/render/`,
    {
      params: {
        start: 0,
        count: 10,
        country: 'BY',
        language: 'english',
        currency: 1,
        filter,
      },
      headers: {
        Host: 'steamcommunity.com',
        Referer: `https://steamcommunity.com/market/listings/730/` + encodeURIComponent(market_hash_name),
        'User-Agent': new UserAgent().toString(),
      },
      signal: AbortSignal.timeout(5_000),
      timeout: 5_000,
    }
  )

  return NextResponse.json(mapSteamMarketRenderResponse(data))
}
