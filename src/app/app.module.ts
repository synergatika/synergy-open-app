import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { LayoutComponent } from './views/layout/layout.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { TopbarComponent } from './views/layout/header/topbar/topbar.component';
import { MenuComponent } from './views/layout/header/menu/menu.component';
import { SideMenuComponent } from './views/layout/header/side-menu/side-menu.component';
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
import { LoadEventsService } from './core/services/loadEvents.service';
import { LoadCommunityService } from './core/services/loadCommunity.service';
import { TranslationService } from './core/services/translation.service';
import { MenuService } from './core/services/menu.service';
import { LoadWpContentService } from './core/services/load-wp-content.service';

import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { OfferSingleComponent } from './views/pages/offer-single/offer-single.component';
import { EventSingleComponent } from './views/pages/event-single/event-single.component';
import { EventArchiveComponent } from './views/pages/event-archive/event-archive.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatCardModule } from "@angular/material";
import { MapComponent } from './views/content/map/map.component';
import { MicrocreditListComponent } from './views/content/microcredit-list/microcredit-list.component';
import { MicrocreditSingleComponent } from './views/pages/microcredit-single/microcredit-single.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './views/pages/about/about.component';
import { HomeHeroComponent } from './views/content/home-hero/home-hero.component';
import { ContainerComponent } from './views/layout/container/container.component';
import { SupportComponent } from './views/pages/support/support.component';
import { ExploreComponent } from './views/pages/explore/explore.component';
import { MicrocreditArchiveComponent } from './views/pages/microcredit-archive/microcredit-archive.component';
import { OfferArchiveComponent } from './views/pages/offer-archive/offer-archive.component';
import { CommunityArchiveComponent } from './views/pages/community-archive/community-archive.component';
import { JoinComponent } from './views/pages/join/join.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
		SideMenuComponent,
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
    EventSingleComponent,
    EventArchiveComponent,
    MapComponent,
    MicrocreditListComponent,
    MicrocreditSingleComponent,
    AboutComponent,
    HomeHeroComponent,
    ContainerComponent,
    SupportComponent,
    ExploreComponent,
    MicrocreditArchiveComponent,
    OfferArchiveComponent,
    CommunityArchiveComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
		AppRoutingModule,
		NgbModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyC8tI34nghyWlMaQhGluC9f6jG7E8swyVQ'
			}),
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		MatInputModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatCardModule,
		NgxPaginationModule,
		FormsModule,
		ReactiveFormsModule,
		CarouselModule,
  ],
	providers: [
		LoadJsonService,
		LoadEventsService,
		LoadCommunityService,
		TranslationService,
		MenuService,
		LoadWpContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
