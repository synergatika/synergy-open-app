import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

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
import { EventsListComponent } from './views/content/events-list/events-list.component';
import { OfferListComponent } from './views/content/offer-list/offer-list.component';
import { CommunitySingleComponent } from './views/pages/community-single/community-single.component';
import { LoadJsonService } from './core/services/loadjson.service';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { OfferSingleComponent } from './views/pages/offer-single/offer-single.component';
import { PostsListComponent } from './views/content/posts-list/posts-list.component';
import { EventSingleComponent } from './views/pages/event-single/event-single.component';
import { EventArchiveComponent } from './views/pages/event-archive/event-archive.component';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from "@angular/material";

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
    EventsListComponent,
    OfferListComponent,
    CommunitySingleComponent,
    NotFoundComponent,
    OfferSingleComponent,
    PostsListComponent,
    EventSingleComponent,
    EventArchiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	AppRoutingModule,
	NgbModule,
	AgmCoreModule.forRoot({
		//apiKey: '33zaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    }),
	HttpClientModule,
	MatInputModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatProgressSpinnerModule
  ],
  providers: [LoadJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
