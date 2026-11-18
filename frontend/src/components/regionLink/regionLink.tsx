import { Link, type LinkProps } from 'react-router-dom'
import { useRegionPath } from '../../region/region'

// Drop-in for <Link>: "/offer#web" becomes "/european/offer#web" for a European visitor.
function RegionLink({ to, ...props }: LinkProps) {
  const withRegion = useRegionPath()
  return <Link to={typeof to === 'string' && to.startsWith('/') ? withRegion(to) : to} {...props} />
}

export default RegionLink
