// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/pages/home/home.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { EventsComponent } from './views/pages/events/events.component';

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
				path: 'events', component:EventsComponent
			},
			{
				path: 'contact', component:ContactComponent
			},
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
