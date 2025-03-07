import { mapSteamMarketSearchRenderResponse } from '@/utils'
import axios from 'axios'
import { NextResponse } from 'next/server'
import UserAgent from 'user-agents'

export const POST = async (request: Request) => {
  const { start, count, query } = await request.json()

  const { data } = await axios.get('https://steamcommunity.com/market/search/render/', {
    params: {
      query,
      start,
      count,
      norender: 1,
      search_descriptions: 1,
      sort_column: 'price',
      sort_dir: 'asc',
      appid: 730,
      'category_730_Exterior[]': ['tag_WearCategory0', 'tag_WearCategory1', 'tag_WearCategory2'],
      'category_730_Weapon[]': ['any'],
      'category_730_Quality[]': ['tag_strange', 'tag_normal'],
      'category_730_Rarity[]': [
        'tag_Rarity_Mythical_Weapon',
        'tag_Rarity_Legendary_Weapon',
        'tag_Rarity_Ancient_Weapon',
      ],
    },
    headers: {
      Host: 'steamcommunity.com',
      'User-Agent': new UserAgent().toString(),
      Referer: 'https://steamcommunity.com/market/search/',
    },
    signal: AbortSignal.timeout(6000),
    timeout: 6000,
  })

  return NextResponse.json(mapSteamMarketSearchRenderResponse(data))
}
