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

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'home', component:HomeComponent
			},
			{
				path: 'explore', component:ExploreComponent
			},
			{
				path: 'support', component:SupportComponent
			},
			{
				path: 'events', component:EventArchiveComponent
			},
			{
				path: 'join-us', component:JoinComponent
			},
			{
				path: 'about', component:AboutComponent
			},
			{
				path: 'contact', component:ContactComponent
			},
			{
				path: 'coop', component:CommunitySingleComponent
			},
			{
				path: 'coop/:id', component:CommunitySingleComponent
			},
			{
				path: 'offers', component:OfferArchiveComponent
			},
			{
				path: 'offer', component:OfferSingleComponent
			},
			{
				path: 'offer/:id', component:OfferSingleComponent
			},
			{
				path: 'offer/:id/:id2', component:OfferSingleComponent
			},
			{
				path: 'event', component:EventSingleComponent
			},
			{
				path: 'event/:id', component:EventSingleComponent
			},
			{
				path: 'microcredits', component:MicrocreditArchiveComponent
			},
			{
				path: 'microcredit', component:MicrocreditSingleComponent
			},
			{
				path: 'microcredit/:id', component:MicrocreditSingleComponent
			},
			{
				path: 'microcredit/:id/:id2', component:MicrocreditSingleComponent
			},
			{
				path: '**', component: NotFoundComponent
			},
		]
	},
	{path: '**', component: NotFoundComponent},
	
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
