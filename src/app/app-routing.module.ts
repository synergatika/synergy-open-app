// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/pages/home/home.component';
import { AboutComponent } from './views/pages/about/about.component';
import { JoinComponent } from './views/pages/join/join.component';
import { HowtoComponent } from './views/pages/howto/howto.component';
import { RedeemComponent } from './views/pages/redeem/redeem.component';
import { SupportComponent } from './views/pages/support/support.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { EventArchiveComponent } from './views/pages/event-archive/event-archive.component';
import { OfferSingleComponent } from './views/pages/offer-single/offer-single.component';
import { CommunitySingleComponent } from './views/pages/community-single/community-single.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { EventSingleComponent } from './views/pages/event-single/event-single.component';
import { MicrocreditSingleComponent } from './views/pages/microcredit-single/microcredit-single.component';
import { OfferArchiveComponent } from './views/pages/offer-archive/offer-archive.component';
import { MicrocreditArchiveComponent } from './views/pages/microcredit-archive/microcredit-archive.component';
import { CommunityArchiveComponent } from './views/pages/community-archive/community-archive.component';

import { ConfigGuard } from './core/helpers/config.guard';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			//Main Pages
			{
				path: '', component: HomeComponent,
				data: {
					title: 'Αρχική'
				}
			},
			{
				path: 'join', component: JoinComponent,
				data: {
					title: 'MENU.Join'
				}
			},
			{
				path: 'howto', component: HowtoComponent,
				data: {
					title: 'MENU.HowTo'
				}
			},
			{
				path: 'about', component: AboutComponent,
				data: {
					title: 'MENU.About'
				}
			},
			{
				path: 'contact', component: ContactComponent,
				data: {
					title: 'MENU.Contact'
				}
			},
			//Archive
			{
				path: 'partners',
				component: CommunityArchiveComponent,
				data: {
					title: 'PAGE_TITLES.partners-title',
				}
			},
			{
				path: 'offers',
				component: OfferArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					title: 'PAGE_TITLES.offers-title',
					accessIndex: 1
				}
			},
			{
				path: 'events',
				component: EventArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					title: 'PAGE_TITLES.news-title',
					accessIndex: 0
				}
			},
			{
				path: 'support',
				component: MicrocreditArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					title: 'PAGE_TITLES.microcredits-title',
					accessIndex: 2
				}
			},
			//Singles
			{
				path: 'partner/:partner_id',
				component: CommunitySingleComponent
			},
			{
				path: 'offer/:partner_id',
				component: OfferSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 1
				}
			},
			{
				path: 'offer/:partner_id/:offer_id',
				component: OfferSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 1
				}
			},
			{
				path: 'post/:partner_id/:post_event_id',
				component: EventSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 0
				}
			},
			{
				path: 'event/:partner_id/:post_event_id',
				component: EventSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 0
				}
			},
			{
				path: 'microcredit/:partner_id',
				component: MicrocreditSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 2
				}
			},
			{
				path: 'microcredit/:partner_id/:campaign_id',
				component: MicrocreditSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 2
				}
			},
			{
				path: '**', component: NotFoundComponent
			},
		]
	},
	{ path: '**', component: NotFoundComponent },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
