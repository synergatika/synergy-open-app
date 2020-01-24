import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { LayoutComponent } from './views/layout/layout.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { TopbarComponent } from './views/layout/header/topbar/topbar.component';
import { MenuComponent } from './views/layout/header/menu/menu.component';
import { LanguageSwitcherComponent } from './views/layout/header/language-switcher/language-switcher.component';
import { UserMenuComponent } from './views/layout/header/user-menu/user-menu.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { HomeComponent } from './views/pages/home/home.component';
import { CommunityListComponent } from './views/content/community-list/community-list.component';
import { CardComponent } from './views/layout/card/card.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { EventsComponent } from './views/pages/events/events.component';
import { EventsListComponent } from './views/content/events-list/events-list.component';
import { OfferListComponent } from './views/content/offer-list/offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutComponent,
    HeaderComponent,
    TopbarComponent,
    LanguageSwitcherComponent,
    UserMenuComponent,
    FooterComponent,
    HomeComponent,
    CommunityListComponent,
    CardComponent,
    ContactComponent,
    EventsComponent,
    EventsListComponent,
    OfferListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	AppRoutingModule,
	NgbModule,
	AgmCoreModule.forRoot({
		//apiKey: '33zaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
