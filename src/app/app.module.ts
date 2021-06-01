//Basic Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Layout
import { LayoutComponent } from './views/layout/layout.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { TopbarComponent } from './views/layout/header/topbar/topbar.component';
import { MenuComponent } from './views/layout/header/menu/menu.component';
import { SideMenuComponent } from './views/layout/header/side-menu/side-menu.component';
import { LanguageSwitcherComponent } from './views/layout/header/language-switcher/language-switcher.component';
import { UserMenuComponent } from './views/layout/header/user-menu/user-menu.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { ContainerComponent } from './views/layout/container/container.component';

//Content
import { MapComponent } from './views/content/map/map.component';
import { CommunityListComponent } from './views/content/community-list/community-list.component';
import { EventsListComponent } from './views/content/events-list/events-list.component';
import { OfferListComponent } from './views/content/offer-list/offer-list.component';
import { MicrocreditListComponent } from './views/content/microcredit-list/microcredit-list.component';
import { HomeHeroComponent } from './views/content/home-hero/home-hero.component';

//Cards
import { MicrocreditCampaignCardComponent } from './views/cards/microcredit_campaign-card/microcredit_campaign-card.component';
import { OfferCardComponent } from './views/cards/offer-card/offer-card.component';
import { PartnerCardComponent } from './views/cards/partner-card/partner-card.component';
import { PostEventCardComponent } from './views/cards/post_event-card/post_event-card.component';

//Pages
import { HomeComponent } from './views/pages/home/home.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { AboutComponent } from './views/pages/about/about.component'
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { SupportComponent } from './views/pages/support/support.component';
import { RedeemComponent } from './views/pages/redeem/redeem.component';
import { JoinComponent } from './views/pages/join/join.component';

//Archives
import { CommunityArchiveComponent } from './views/pages/community-archive/community-archive.component';
import { EventArchiveComponent } from './views/pages/event-archive/event-archive.component';
import { MicrocreditArchiveComponent } from './views/pages/microcredit-archive/microcredit-archive.component';
import { OfferArchiveComponent } from './views/pages/offer-archive/offer-archive.component';

//Singles
import { CommunitySingleComponent } from './views/pages/community-single/community-single.component';
import { OfferSingleComponent } from './views/pages/offer-single/offer-single.component';
import { EventSingleComponent } from './views/pages/event-single/event-single.component';
import { MicrocreditSingleComponent } from './views/pages/microcredit-single/microcredit-single.component';

//Widgets
import { ShareIconComponent } from './views/widgets/share-icon/share-icon.component';
import { SupportWindowComponent } from './views/widgets/support-window/support-window.component';

//Services
import { LoadJsonService } from './core/services/loadjson.service';
import { LoadEventsService } from './core/services/loadEvents.service';
import { LoadCommunityService } from './core/services/loadCommunity.service';
import { TranslationService } from './core/services/translation.service';
import { MenuService } from './core/services/menu.service';
import { LoadWpContentService } from './core/services/load-wp-content.service';
import { ContentService } from './core/services/content-data.service';

//Style & UX
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatCardModule, MatSelectModule, MatDialogModule, MatCheckboxModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

//Env
import { environment } from '../environments/environment';
import { SectorFilterPipe } from './core/pipes/sector_filter.pipe';
import { ContentTranslatePipe } from './core/pipes/content_translate.pipe';
import { CampaignStatusPipe } from './core/pipes/campaign_status.pipe';
import { RichEditorViewComponent } from './views/widgets/rich-editor-view/rich-editor-view.component';

//Pipes

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    //Layout
    AppComponent,
    MenuComponent,
    SideMenuComponent,
    LayoutComponent,
    HeaderComponent,
    TopbarComponent,
    LanguageSwitcherComponent,
    UserMenuComponent,
    FooterComponent,
    ContainerComponent,
    //Pages
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
    AboutComponent,
    SupportComponent,
    RedeemComponent,
    JoinComponent,
    //Content
    CommunityListComponent,
    EventsListComponent,
    MicrocreditListComponent,
    OfferListComponent,
    MapComponent,
    HomeHeroComponent,
    //Cards
    MicrocreditCampaignCardComponent,
    OfferCardComponent,
    PartnerCardComponent,
    PostEventCardComponent,
    //Widgets
    ShareIconComponent,
    SupportWindowComponent,
    //Singles
    CommunitySingleComponent,
    OfferSingleComponent,
    EventSingleComponent,
    MicrocreditSingleComponent,
    //Archive
    EventArchiveComponent,
    MicrocreditArchiveComponent,
    OfferArchiveComponent,
    CommunityArchiveComponent,

    SectorFilterPipe,
    ContentTranslatePipe,
    CampaignStatusPipe,

    RichEditorViewComponent
  ],
  exports: [SupportWindowComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    }),
    // CKEditorModule.fotRoot(),
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
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxPayPalModule
  ],
  providers: [
    LoadJsonService,
    LoadEventsService,
    LoadCommunityService,
    TranslationService,
    MenuService,
    LoadWpContentService,
    ContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
