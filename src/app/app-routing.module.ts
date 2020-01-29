// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/pages/home/home.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { EventArchiveComponent } from './views/pages/event-archive/event-archive.component';
import { OfferSingleComponent } from './views/pages/offer-single/offer-single.component';
import { CommunitySingleComponent } from './views/pages/community-single/community-single.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { EventSingleComponent } from './views/pages/event-single/event-single.component';
import { MicrocreditSingleComponent } from './views/pages/microcredit-single/microcredit-single.component';

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
				path: 'events', component:EventArchiveComponent
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
				path: 'offer', component:OfferSingleComponent
			},
			{
				path: 'offer/:id', component:OfferSingleComponent
			},
			{
				path: 'event', component:EventSingleComponent
			},
			{
				path: 'event/:id', component:EventSingleComponent
			},
			{
				path: 'microcredit', component:MicrocreditSingleComponent
			},
			{
				path: 'microcredit/:id', component:MicrocreditSingleComponent
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
