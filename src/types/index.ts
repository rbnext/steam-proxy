type SteamListingInfoAsset = {
  link: string
  name: string
}

type SteamAssetDescription = {
  type: string
  value: string
}

type SteamListingInfoItem = {
  listingid: string
  converted_price: number
  converted_fee: number
  asset: {
    id: string
    market_actions: SteamListingInfoAsset[]
    contextid: string
  }
}

export type SteamMarketRender = {
  pagesize: number
  success: boolean
  total_count: number
  results_html: string
  listinginfo: {
    [listingid: string]: SteamListingInfoItem
  }
  assets: {
    [appid: number]: {
      [contextid: string]: {
        [id: string]: {
          market_actions: SteamListingInfoAsset[]
          descriptions: SteamAssetDescription[]
        }
      }
    }
  }
}

export type SteamMarketSearchRenderItem = {
  sell_price: number
  sell_listings: number
  asset_description: {
    market_hash_name: string
  }
}

export type SteamMarketSearchRender = {
  results: SteamMarketSearchRenderItem[]
}

export type MapSteamMarketRenderResponse = {
  price: number | null
  listingId: string
  pattern: null | number
  inspectUrl: string
  stickers: string[]
}

type CSFloatListingItemStickerItem = {
  name: string
  reference: {
    price: number
  }
}

type CSFloatListingItemCharmItem = {
  pattern: number
  name: string
  reference: {
    price: number
  }
  stickerId: number
}

type CSFloatListingItem = {
  created_at: string
  id: string
  price: number
  item: {
    market_hash_name: string
    float_value: number
    is_stattrak: boolean
    is_souvenir: boolean
    is_commodity: boolean
    stickers?: CSFloatListingItemStickerItem[]
    keychains?: CSFloatListingItemCharmItem[]
  }
  seller: {
    steam_id: string
    statistics: {
      total_trades: number
    }
  }
  reference: {
    base_price: number
    last_updated: string
    predicted_price: number
    quantity: number
  }
  type: 'buy_now'
}

export type CSFloatListing = {
  data: CSFloatListingItem[]
}
