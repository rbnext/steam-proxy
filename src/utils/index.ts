import { MapSteamMarketRenderResponse, SteamMarketRender, SteamMarketSearchRender } from '@/types'

export const getInspectLink = (link: string, assetId: string, listingId: string): string => {
  return link.replace('%assetid%', assetId).replace('%listingid%', listingId)
}

export function extractSteamItemInfo(input: string): string[] {
  let match

  const stickers: string[] = []
  const titleRegex = /title="([^"]+)"/g

  while ((match = titleRegex.exec(input)) !== null) stickers.push(match[1])

  return stickers.map((name) => name.replace('Sticker: ', '').replace('Charm: ', ''))
}

export const mapSteamMarketRenderResponse = (data: SteamMarketRender) => {
  return Object.keys(data.listinginfo).reduce<MapSteamMarketRenderResponse[]>((acc, listingId) => {
    const listing = data.listinginfo[listingId]
    const price = Number(((listing.converted_price + listing.converted_fee) / 100).toFixed(2))

    const link = listing.asset.market_actions[0].link
    const inspectUrl = getInspectLink(link, listing.asset.id, listingId)

    const assetInfo = data.assets[730][listing.asset.contextid][listing.asset.id]
    const charmTemplate = assetInfo.descriptions.find((el) => el.value.includes('Charm Template'))?.value || ''
    const stickerInfo = assetInfo.descriptions.find((el) => el.value.includes('sticker_info'))?.value || ''

    const stickers = extractSteamItemInfo(stickerInfo)

    const pattern = charmTemplate ? Number(charmTemplate.match(/\d+/g)) : null

    return [...acc, { price, listingId, pattern, stickers, inspectUrl }]
  }, [])
}

export const mapSteamMarketSearchRenderResponse = (data: SteamMarketSearchRender) => {
  return data.results.map((item) => ({
    sellPrice: item.sell_price,
    sellListings: item.sell_listings,
    marketHashName: item.asset_description.market_hash_name,
  }))
}
