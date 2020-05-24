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
				path: 'explore', component: ExploreComponent
			},
			{
				path: 'support', component: SupportComponent
			},
			{
				path: 'join-us', component: JoinComponent
			},
			{
				path: 'about', component: AboutComponent
			},
			{
				path: 'contact', component: ContactComponent
			},
			{
				path: 'coops', component: CommunityArchiveComponent
			},
			{
				path: 'coop', component: CommunitySingleComponent
			},
			{
				path: 'coop/:id', component: CommunitySingleComponent
			},
			{
				path: 'offers',
				component: OfferArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					title: 'PAGE_TITLES.offers-title', accessIndex: 1
				}
			},
			{
				path: 'offer',
				component: OfferSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 1
				}
			},
			{
				path: 'offer/:id',
				component: OfferSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 1
				}
			},
			{
				path: 'offer/:id/:id2',
				component: OfferSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 1
				}
			},
			{
				path: 'events',
				component: EventArchiveComponent,
				canActivate: [ConfigGuard],
				data: { title: 'PAGE_TITLES.news-title', accessIndex: 0 }
			},
			{
				path: 'event',
				component: EventSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 0
				}
			},
			{
				path: 'event/:id/:id2/:type',
				component: EventSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 0
				}
			},
			{
				path: 'microcredits',
				component: MicrocreditArchiveComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 2
				}
			},
			{
				path: 'microcredit',
				component: MicrocreditSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 2
				}
			},
			{
				path: 'microcredit/:id',
				component: MicrocreditSingleComponent,
				canActivate: [ConfigGuard],
				data: {
					accessIndex: 2
				}
			},
			{
				path: 'microcredit/:id/:id2',
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
