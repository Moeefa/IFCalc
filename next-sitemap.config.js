/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/` || 'https://ifcalc.vercel.app',
  generateRobotsTxt: false,
  generateIndexSitemap: false
}
