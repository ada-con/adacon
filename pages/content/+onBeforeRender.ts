import type { Page } from '#context/Pages'
import { loadMarkdownContent } from '../loadMarkdownContent'
import type { PageMeta } from '../../renderer/+onRenderHtml'
export type Role = {
	name: string
	order: number
}

export type Speaker = {
	name: string
	slug: string
	html: string
	photo?: string
	pronouns?: string
	homepage?: string
	linkedIn?: string
	gitHub?: string
	email?: string
	mastodon?: string
	/**
	 * @deprecated Avoid, full of Nazis.
	 */
	twitter?: string
	/**
	 * @deprecated Avoid, full of Nazis.
	 */
	bluesky?: string
	roles?: Array<Role>
} & {
	events: number[]
}

export type Host = Speaker & {
	roles: Array<{
		name: 'host'
		order: number
	}>
}

export type IndexPageProps = { pages: Page[]; page: Page; speakers: Speaker[] }

export const onBeforeRender = async (args: {
	routeParams: { slug: string }
}): Promise<{
	pageContext: { pageProps: IndexPageProps; pageMeta: PageMeta }
}> => {
	const pages = await loadMarkdownContent<Page>('content')
	const speakers = await loadMarkdownContent<Speaker>('speakers')
	const page = pages.find(({ slug }) => slug === args.routeParams.slug)
	if (page === undefined)
		throw new Error(`Failed to find content for "${args.routeParams.slug}"!`)
	return {
		pageContext: {
			pageProps: {
				pages,
				page,
				speakers,
			},
			pageMeta: {
				title: page.title,
				lang: page.lang,
			},
		},
	}
}
