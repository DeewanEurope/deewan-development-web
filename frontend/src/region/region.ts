import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

// The site is served under two region prefixes: /european/... and /jordan/...
// Everything is shared between them except the contact details (see data/region.ts).
export const REGIONS = ['european', 'jordan'] as const
export type Region = (typeof REGIONS)[number]

// "Other parts of the world" is served by the team in Jordan
export const DEFAULT_REGION: Region = 'jordan'

export const isRegion = (value: string | undefined): value is Region =>
  !!value && (REGIONS as readonly string[]).includes(value)

/** The region prefix of a path ("/european/about" -> "european"), or null without one. */
export const regionOf = (pathname: string): Region | null => {
  const first = pathname.split('/')[1]
  return isRegion(first) ? first : null
}

/** A path without its region prefix ("/european/about" -> "/about"). */
export const stripRegion = (pathname: string) =>
  regionOf(pathname) ? pathname.replace(/^\/[^/]+/, '') || '/' : pathname

/** Current region from the URL; falls back to the default outside a region prefix. */
export function useRegion(): Region {
  const { pathname } = useLocation()
  return regionOf(pathname) ?? DEFAULT_REGION
}

/** Prefixes an app path ("/offer#web") with the current region ("/european/offer#web"). */
export function useRegionPath() {
  const region = useRegion()
  return useCallback(
    (path: string) => `/${region}${path === '/' ? '' : path.startsWith('/') ? path : `/${path}`}`,
    [region],
  )
}
