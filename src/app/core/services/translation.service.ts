// Angular
import { Injectable, Inject } from '@angular/core';
// Tranlsation
import { TranslateService } from '@ngx-translate/core';
// For Angular Universal
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export interface Locale {
	lang: string;
	// tslint:disable-next-line:ban-types
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	// Private properties
	private langIds: any = [];

	/**
	 * Service Constructor
	 *
	 * @param translate: TranslateService
	 */
	constructor(@Inject(PLATFORM_ID) private platformId: Object, private translate: TranslateService) {
		// add new langIds to the list
		this.translate.addLangs(['en']);

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang('en');
	}

	/**
	 * Load Translation
	 *
	 * @param args: Locale[]
	 */
	loadTranslations(...args: Locale[]): void {
		const locales = [...args];

		locales.forEach(locale => {
			// use setTranslation() with the third argument set to true
			// to append translations instead of replacing them
			this.translate.setTranslation(locale.lang, locale.data, true);

			this.langIds.push(locale.lang);
		});

		// add new languages to the list
		this.translate.addLangs(this.langIds);
	}

	/**
	 * Setup language
	 *
	 * @param lang: any
	 */
	setLanguage(lang) {
		if (lang) {
			this.translate.use(this.translate.getDefaultLang());
			this.translate.use(lang);
			if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('language', lang);
			}
			
		}
	}

	/**
	 * Returns selected language
	 */
	getSelectedLanguage(): any {
		if (isPlatformBrowser(this.platformId)) {
			return localStorage.getItem('language') || this.translate.getDefaultLang();
		}
		else {
			return this.translate.getDefaultLang();
		}
		
	}
}
