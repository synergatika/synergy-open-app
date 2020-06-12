// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/pages/home/home.component';
import { AboutComponent } from './views/pages/about/about.component';
import { JoinComponent } from './views/pages/join/join.component';
import { ExploreComponent } from './views/pages/explore/explore.component';
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
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'home', component: HomeComponent,
				data: {
					title: 'MENU.Home'
				}
			},
			{
				path: 'explore', component: ExploreComponent,
				data: {
					title: 'MENU.explore'
				}
			},
			{
				path: 'support', component: SupportComponent,
				data: {
					title: 'MENU.support'
				}
			},
			{
				path: 'join', component: JoinComponent,
				data: {
					title: 'MENU.join'
				}
			},
			{
				path: 'about', component: AboutComponent,
				data: {
					title: 'MENU.about'
				}
			},
			{
				path: 'contact', component: ContactComponent,
				data: {
					title: 'MENU.contact'
				}
			},


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
				path: 'microcredits',
				component: MicrocreditArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					title: 'PAGE_TITLES.microcredits-title',
					accessIndex: 2
				}
			},


			// {
			// 	path: 'partner',
			// 	component: CommunitySingleComponent
			// },
			{
				path: 'partner/:partner_id',
				component: CommunitySingleComponent
			},

			// {
			// 	path: 'offer',
			// 	component: OfferSingleComponent,
			// 	canActivate: [ConfigGuard],
			// 	data: {
			// 		accessIndex: 1
			// 	}
			// },
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

			// {
			// 	path: 'event',
			// 	component: EventSingleComponent,
			// 	canActivate: [ConfigGuard],
			// 	data: {
			// 		accessIndex: 0
			// 	}
			// },
			{
				path: 'event/:partner_id/:post_event_id/:type',
				component: EventSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 0
				}
			},


			// {
			// 	path: 'microcredit',
			// 	component: MicrocreditSingleComponent,
			// 	canActivate: [ConfigGuard],
			// 	data: {
			// 		accessIndex: 2
			// 	}
			// },
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
