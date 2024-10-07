import { Provider as PagesProvider } from '#context/Pages'
import { Content } from '#page/Content'
import type { IndexPageProps } from '../+onBeforeRender.js'
import { Provider as CountdownProvider } from '#context/ConfCountdown'

export const Page = ({ pages, page }: IndexPageProps) => (
	<PagesProvider pages={pages}>
		<CountdownProvider>
			<Content page={page} />
		</CountdownProvider>
	</PagesProvider>
)
